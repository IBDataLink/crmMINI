/* ==========================================================================
   TELEGRAM MINI APP APPLICATION LOGIC (CRM ADAPTED)
   ========================================================================== */

// 1. Initial State & Default Data Mappings
const DEFAULT_BLOCKS = [
  { id: 'pdf', name: 'Работа с PDF', type: 'text' },
  { id: 'hex', name: 'Коды HEX', type: 'hex' }
];

const DEFAULT_PDF_ITEMS = [
  {
    id: 'pdf_1',
    title: 'Поменять первую страницу между двумя файлами',
    description: 'Меняет первую страницу в файле bauka.pdf на первую страницу с файла ilyar.pdf',
    code: 'qpdf kana.pdf --pages client.pdf 1 kana.pdf 2-z -- result.pdf'
  },
  {
    id: 'pdf_2',
    title: 'Разархивировать файл',
    description: 'Разархивирует файл PDF в декомпрессированном (qdf) виде для отладки',
    code: 'qpdf --qdf --stream-data=uncompress "/Users/market/Desktop/My Comp/Справки/кана1.pdf" "/Users/market/Desktop/My Comp/Справки/unpacked121.pdf"'
  },
  {
    id: 'pdf_3',
    title: 'Заархивировать файл',
    description: 'Сжимает файл PDF обратно',
    code: 'qpdf "unpacked121.pdf" "Выписка_по_счету_KZ82722S000039772537.pdf"'
  },
  {
    id: 'pdf_4',
    title: 'Путь к папке "Справки"',
    description: 'Быстрый переход в рабочую папку со справками',
    code: 'cd "/Users/market/Desktop/My Comp/Справки/"'
  }
];

const DEFAULT_HEX_MAPPINGS = {
  "0": "0013", "1": "0014", "2": "0015", "3": "0016", "4": "0017", "\u00A0": "0003", 
  "5": "0018", "6": "0019", "7": "001a", "8": "001b", "9": "001c", "/": "0012", 
  " ": "0003", "-": "0010", "+": "000e", ",": "000f", ".": "0011", 
  "А": "023a", "Б": "023b", "В": "023c", "Г": "023d", "Д": "023e", "Е": "023f", "Ж": "0240", "З": "0241", 
  "И": "0242", "Й": "0243", "К": "0244", "Қ": "0514", "Л": "0245", "М": "0246", "Н": "0247", "О": "0248", 
  "П": "0249", "Р": "024a", "С": "024b", "Т": "024c", "У": "024d", "Ф": "024e", "Х": "024f", "Ц": "0250", 
  "Ч": "0251", "Ш": "0252", "Щ": "0253", "Ъ": "0254", "Ы": "0255", "Э": "0257", "Ю": "0258", "Я": "0259", 
  "а": "025a", "б": "025b", "в": "025c", "г": "025d", "д": "025e", "е": "025f", "ж": "0260", "з": "0261", 
  "и": "0262", "й": "0263", "к": "0264", "қ": "0515", "л": "0265", "м": "0266", "н": "0267", "о": "0268", 
  "п": "0269", "р": "026a", "с": "026b", "т": "026c", "у": "026d", "ү": "051b", "ұ": "051d", "ф": "026e", 
  "х": "026f", "ц": "0270", "ч": "0271", "ш": "0272", "щ": "0273", "ъ": "0274", "ы": "0275", "ь": "0276", 
  "э": "0277", "ю": "0278", "я": "0279", "ә": "0525", "ғ": "0511", 
  "A": "0024", "B": "0025", "C": "0026", "D": "0027", "E": "0028", "F": "0029", "G": "002a", "H": "002b", 
  "I": "002c", "J": "002d", "K": "002e", "L": "002f", "M": "0030", "N": "0031", "O": "0032", "P": "0033", 
  "Q": "0034", "R": "0035", "S": "0036", "T": "0037", "U": "0038", "V": "0039", "W": "003a", "X": "003b", 
  "Y": "003c", "Z": "003d", 
  "a": "0044", "b": "0045", "c": "0046", "d": "0047", "e": "0048", "f": "0049", "g": "004a", "h": "004b", 
  "i": "004c", "j": "004d", "k": "004e", "l": "004f", "m": "0050", "n": "0051", "o": "0052", "p": "0053", 
  "q": "0054", "r": "0055", "s": "0056", "t": "0057", "u": "0058", "v": "0059", "w": "005a", "x": "005b", 
  "y": "005c", "z": "005d"
};

const DEFAULT_HEX_ITEMS = Object.entries(DEFAULT_HEX_MAPPINGS).map(([char, code], idx) => ({
  id: `hex_${idx}`,
  char: char,
  code: code
}));

// CRM Deal details Mappings
const TRIP_DETAILS = {
  rio: {
    name: 'Иван Иванов',
    bank: 'Kaspi Bank',
    startDate: '12.05.2024',
    sender: 'Алексей',
    comment: 'Заявка на проведение транзакции, клиент ожидает подтверждения документации.',
    daysInWork: '5 дней',
    price: '$1,400',
    status: 'in_progress',
    image: 'assets/rio.png'
  },
  tokyo: {
    name: 'Александр Смирнов',
    bank: 'Halyk Bank',
    startDate: '10.05.2024',
    sender: 'Елена',
    comment: 'Клиент запросил подготовку справок за прошлый период.',
    daysInWork: '7 дней',
    price: '$1,850',
    status: 'in_progress',
    image: 'assets/tokyo.png'
  },
  paris: {
    name: 'Мария Петрова',
    bank: 'ForteBank',
    startDate: '01.05.2024',
    sender: 'Дмитрий',
    comment: 'Сделка успешно завершена, все документы переданы адресату.',
    daysInWork: '16 дней',
    price: '$1,200',
    status: 'completed',
    image: 'assets/paris.png'
  }
};

// State Variables
let appBlocks = [];
let appItems = {}; 
let chatMessages = []; 
let selectedAccent = 'indigo';
let syncTgTheme = true;
let isDarkTheme = false;

const WEBHOOK_URL = 'https://dd54-95-56-11-27.ngrok-free.app/webhook-test/d0740166-ee1e-45e2-89d3-f242393f3916';

function loadState() {
  try {
    const savedBlocks = localStorage.getItem('tgapp_blocks');
    const savedItems = localStorage.getItem('tgapp_items');
    const savedChat = localStorage.getItem('tgapp_chat');
    const savedAccent = localStorage.getItem('tgapp_accent');
    const savedSync = localStorage.getItem('tgapp_sync_tg_theme');
    const savedDark = localStorage.getItem('tgapp_dark_mode');

    if (savedBlocks) appBlocks = JSON.parse(savedBlocks);
    else appBlocks = DEFAULT_BLOCKS;

    if (savedItems) appItems = JSON.parse(savedItems);
    else {
      appItems = {
        pdf: DEFAULT_PDF_ITEMS,
        hex: DEFAULT_HEX_ITEMS
      };
    }

    if (savedChat) chatMessages = JSON.parse(savedChat);
    else chatMessages = [];

    if (savedAccent) selectedAccent = savedAccent;
    else selectedAccent = 'indigo';

    if (savedSync !== null) syncTgTheme = savedSync === 'true';
    else syncTgTheme = true;

    if (savedDark !== null) isDarkTheme = savedDark === 'true';
    else isDarkTheme = false;

  } catch (err) {
    console.error('Error loading localStorage state', err);
    appBlocks = DEFAULT_BLOCKS;
    appItems = { pdf: DEFAULT_PDF_ITEMS, hex: DEFAULT_HEX_ITEMS };
    chatMessages = [];
    selectedAccent = 'indigo';
    syncTgTheme = true;
    isDarkTheme = false;
  }
}

function saveState() {
  localStorage.setItem('tgapp_blocks', JSON.stringify(appBlocks));
  localStorage.setItem('tgapp_items', JSON.stringify(appItems));
  localStorage.setItem('tgapp_chat', JSON.stringify(chatMessages));
  localStorage.setItem('tgapp_accent', selectedAccent);
  localStorage.setItem('tgapp_sync_tg_theme', syncTgTheme.toString());
  localStorage.setItem('tgapp_dark_mode', isDarkTheme.toString());
}

const tg = window.Telegram?.WebApp;

function initTelegram() {
  if (tg) {
    tg.ready();
    tg.expand();
    
    document.getElementById('tg-platform').innerText = tg.platform || 'unknown';
    document.getElementById('tg-version').innerText = tg.version || '1.0';
    document.getElementById('tg-color-scheme').innerText = tg.colorScheme || 'light';
    
    if (tg.setHeaderColor) {
      tg.setHeaderColor(tg.themeParams.header_bg_color || '#f6f7f9');
    }

    const user = tg.initDataUnsafe?.user;
    if (user) {
      document.getElementById('tg-user-id').innerText = user.id || 'N/A';
      const nickname = user.username ? `@${user.username}` : `${user.first_name || ''} ${user.last_name || ''}`.trim();
      if (nickname) {
        document.getElementById('user-name').innerText = nickname;
      }
      if (user.photo_url) {
        document.getElementById('user-avatar').src = user.photo_url;
      } else {
        const initials = ((user.first_name?.[0] || '') + (user.last_name?.[0] || '')).toUpperCase() || 'U';
        createLetterAvatar(initials);
      }
    } else {
      document.getElementById('tg-user-id').innerText = 'N/A';
      document.getElementById('user-name').innerText = 'Ilyar Arzuyev';
      createLetterAvatar('IA');
    }

    tg.onEvent('themeChanged', function() {
      if (syncTgTheme) {
        applyThemeSettings();
      }
    });

  } else {
    document.getElementById('tg-user-id').innerText = 'N/A (Browser)';
    document.getElementById('tg-version').innerText = 'N/A';
    document.getElementById('user-name').innerText = 'Ilyar Arzuyev';
    createLetterAvatar('IA');
  }

  applyThemeSettings();
}

function createLetterAvatar(initials) {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  
  const gradients = [
    ['#ff9a9e', '#fecfef'],
    ['#a1c4fd', '#c2e9fb'],
    ['#84fab0', '#8fd3f4'],
    ['#fccb90', '#d5d2e3'],
    ['#e0c3fc', '#8ec5fc'],
    ['#f093fb', '#f5576c']
  ];
  const selectedGrad = gradients[Math.floor(Math.random() * gradients.length)];
  const grad = ctx.createLinearGradient(0, 0, 100, 100);
  grad.addColorStop(0, selectedGrad[0]);
  grad.addColorStop(1, selectedGrad[1]);
  
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.font = 'bold 38px Outfit';
  ctx.fillStyle = '#1c1c1e';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, 50, 52);
  
  document.getElementById('user-avatar').src = canvas.toDataURL();
}

function triggerHaptic(type = 'light') {
  if (tg && tg.HapticFeedback) {
    if (type === 'light') tg.HapticFeedback.impactOccurred('light');
    else if (type === 'medium') tg.HapticFeedback.impactOccurred('medium');
    else if (type === 'heavy') tg.HapticFeedback.impactOccurred('heavy');
    else if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
    else if (type === 'warning') tg.HapticFeedback.notificationOccurred('warning');
  }
}

function applyThemeSettings() {
  document.body.className = '';
  
  if (tg && syncTgTheme) {
    document.body.classList.add('tg-theme');
    isDarkTheme = tg.colorScheme === 'dark';
    if (isDarkTheme) document.body.classList.add('dark-mode');
  } else {
    if (isDarkTheme) document.body.classList.add('dark-mode');
  }

  if (tg && tg.setHeaderColor) {
    const bg = getComputedStyle(document.body).getPropertyValue('--header-bg').trim();
    tg.setHeaderColor(bg || '#f6f7f9');
  }

  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');
  if (sunIcon && moonIcon) {
    if (isDarkTheme) {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  document.documentElement.style.setProperty('--accent-color', `var(--accent-${selectedAccent})`);
  
  const accentRGBs = {
    indigo: '88, 86, 214',
    violet: '175, 82, 222',
    emerald: '52, 199, 89',
    amber: '255, 149, 0'
  };
  document.documentElement.style.setProperty('--accent-color-rgb', accentRGBs[selectedAccent]);

  const syncToggle = document.getElementById('sync-tg-theme');
  if (syncToggle) syncToggle.checked = syncTgTheme;
}

function initTabs() {
  const dockButtons = document.querySelectorAll('.dock-btn');
  const panes = document.querySelectorAll('.tab-pane');

  dockButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      if (!target) return;

      triggerHaptic('light');

      dockButtons.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      this.classList.add('active');
      const targetPane = document.getElementById(target);
      if (targetPane) {
        targetPane.classList.add('active');
        if (target === 'tab-chat') {
          scrollChatToBottom();
        } else if (target === 'tab-data') {
          recalculateAccordionHeights();
        }
      }
    });
  });
}

function initCategoryFilters() {
  const categoryPills = document.querySelectorAll('.category-pill');
  const cards = document.querySelectorAll('.trip-card');

  categoryPills.forEach(pill => {
    pill.addEventListener('click', function() {
      categoryPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      
      const filterText = this.innerText.trim();

      cards.forEach(card => {
        const status = card.getAttribute('data-status');
        if (filterText === 'в работе') {
          card.style.display = (status === 'in_progress') ? 'block' : 'none';
        } else if (filterText === 'Завершенные') {
          card.style.display = (status === 'completed') ? 'block' : 'none';
        }
      });
    });
  });

  // Default display trigger
  cards.forEach(card => {
    const status = card.getAttribute('data-status');
    card.style.display = (status === 'in_progress') ? 'block' : 'none';
  });
}

function openTripDetails(tripId) {
  const details = TRIP_DETAILS[tripId];
  if (!details) return;

  triggerHaptic('light');

  const actionButtonText = details.status === 'completed' ? 'Редактировать' : 'Завершить';

  const container = document.getElementById('trip-modal-body');
  container.innerHTML = `
    <div class="modal-trip-header">
      <img src="${details.image}" alt="${details.bank}" class="modal-trip-img">
      <div class="card-gradient"></div>
      <div class="modal-trip-info-overlay">
        <span class="modal-trip-country">${escapeHtml(details.bank)}</span>
        <h2 class="modal-trip-title">${escapeHtml(details.name)}</h2>
      </div>
    </div>
    <div class="modal-trip-rating-row" style="display: flex; gap: 10px; align-items: center; margin-bottom: 16px;">
      <span style="font-size: 13px; color: var(--text-secondary);">Отправитель: ${escapeHtml(details.sender)}</span>
    </div>
    <p class="modal-trip-desc">${escapeHtml(details.comment)}</p>
    <div class="modal-trip-details-grid">
      <div class="modal-detail-tile">
        <span class="modal-detail-label">Сколько дней заявке</span>
        <span class="modal-detail-val">${escapeHtml(details.daysInWork)}</span>
      </div>
      <div class="modal-detail-tile">
        <span class="modal-detail-label">Стоимость сделки</span>
        <span class="modal-detail-val">${escapeHtml(details.price)}</span>
      </div>
    </div>
    <button class="primary-btn" style="width: 100%; height: 50px; border-radius: 16px; font-size: 15px;" onclick="closeTripDetails()">${actionButtonText}</button>
  `;

  openModal('details-modal');
}

function closeTripDetails() {
  closeModal('details-modal');
}

// Global modal handlers & Toast
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerText = message;
  toast.classList.add('show');

  if (window.toastTimeout) clearTimeout(window.toastTimeout);

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTelegram();
  initTabs();
  initCategoryFilters();
});