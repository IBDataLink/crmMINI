// app.js (добавлен CRM-модуль в конец файла)
// ... (весь существующий код остаётся без изменений) ...

// ==========================================================================
//   CRM MODULE — Управление сделками
// ==========================================================================

// Состояние сделок
let deals = [];
let currentDealFilter = 'active'; // 'active' или 'completed'

// Загрузка из localStorage
function loadDeals() {
  try {
    const saved = localStorage.getItem('crm_deals');
    if (saved) {
      deals = JSON.parse(saved);
    } else {
      // Начальные демо-данные
      deals = [
        {
          id: 'deal_1',
          title: 'ООО «Альфа»',
          bank: 'Kaspi',
          amount: 1250000,
          sender: 'Иван Петров',
          createdAt: new Date(Date.now() - 1000*60*60*24*3).toISOString(), // 3 дня назад
          comment: 'Первая встреча прошла успешно, ждём подписания договора.',
          status: 'active',
          completedAt: null
        },
        {
          id: 'deal_2',
          title: 'ТОО «Бета»',
          bank: 'Halyk',
          amount: 870000,
          sender: 'Мария Смирнова',
          createdAt: new Date(Date.now() - 1000*60*60*24*10).toISOString(),
          comment: 'Оплата получена, сделка закрыта.',
          status: 'completed',
          completedAt: new Date(Date.now() - 1000*60*60*24*2).toISOString()
        }
      ];
      saveDeals();
    }
  } catch (e) {
    console.error('Ошибка загрузки сделок', e);
    deals = [];
  }
}

function saveDeals() {
  localStorage.setItem('crm_deals', JSON.stringify(deals));
}

// Подсчёт дней в работе
function getDaysInWork(createdAt, completedAt = null) {
  const start = new Date(createdAt);
  const end = completedAt ? new Date(completedAt) : new Date();
  const diff = Math.abs(end - start);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Форматирование даты
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Рендер списка сделок
function renderDeals() {
  const container = document.getElementById('deals-list');
  if (!container) return;

  const filtered = deals.filter(d => 
    currentDealFilter === 'active' ? d.status === 'active' : d.status === 'completed'
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>${currentDealFilter === 'active' ? 'Нет активных сделок' : 'Нет завершённых сделок'}</p>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(deal => {
    const days = getDaysInWork(deal.createdAt, deal.completedAt);
    html += `
      <div class="trip-card deal-card" data-deal-id="${deal.id}" onclick="openDealDetails('${deal.id}')">
        <div class="deal-card-bg" style="background: linear-gradient(135deg, var(--accent-color), #6366f1);">
          <div class="deal-card-amount">${Number(deal.amount).toLocaleString('ru-RU')} ₸</div>
        </div>
        <div class="card-gradient"></div>
        <div class="trip-card-content deal-card-content">
          <span class="trip-country">${escapeHtml(deal.bank)}</span>
          <h2 class="trip-name">${escapeHtml(deal.title)}</h2>
          <div class="trip-rating-info">
            <div class="rating-stars">
              <svg class="icon-star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>${formatDate(deal.createdAt)}</span>
            </div>
            <span class="reviews-count">${escapeHtml(deal.sender)}</span>
          </div>
          <div class="card-footer-action">
            <button class="see-more-btn" onclick="event.stopPropagation(); openDealDetails('${deal.id}')">
              <span>Подробнее</span>
              <div class="arrow-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Открытие деталей сделки
function openDealDetails(dealId) {
  const deal = deals.find(d => d.id === dealId);
  if (!deal) return;

  const body = document.getElementById('deal-modal-body');
  const days = getDaysInWork(deal.createdAt, deal.completedAt);
  const isActive = deal.status === 'active';

  body.innerHTML = `
    <div class="modal-trip-header" style="background: linear-gradient(135deg, var(--accent-color), #6366f1); height: 120px; display: flex; align-items: center; justify-content: center; border-radius: 20px; margin-bottom: 20px;">
      <div style="color: white; text-align: center;">
        <div style="font-size: 14px; opacity: 0.8;">${escapeHtml(deal.bank)}</div>
        <h2 style="font-size: 24px; font-weight: 700;">${escapeHtml(deal.title)}</h2>
        <div style="font-size: 18px; font-weight: 600; margin-top: 6px;">${Number(deal.amount).toLocaleString('ru-RU')} ₸</div>
      </div>
    </div>
    <div class="modal-trip-rating-row" style="display: flex; gap: 10px; align-items: center; margin-bottom: 16px;">
      <div class="rating-stars" style="background-color: var(--border-color); color: var(--text-color); padding: 4px 10px; border-radius: 12px;">
        <svg class="icon-star" viewBox="0 0 24 24" fill="currentColor" style="width: 12px; height: 12px; color: #ffcc00;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span style="margin-left: 4px;">${formatDate(deal.createdAt)}</span>
      </div>
      <span style="font-size: 13px; color: var(--text-secondary);">Отправитель: ${escapeHtml(deal.sender)}</span>
    </div>
    <p class="modal-trip-desc" style="margin-bottom: 16px;">${deal.comment ? escapeHtml(deal.comment) : 'Нет комментария'}</p>
    <div class="modal-trip-details-grid">
      <div class="modal-detail-tile">
        <span class="modal-detail-label">Дней в работе</span>
        <span class="modal-detail-val">${days} дн.</span>
      </div>
      <div class="modal-detail-tile">
        <span class="modal-detail-label">Сумма</span>
        <span class="modal-detail-val">${Number(deal.amount).toLocaleString('ru-RU')} ₸</span>
      </div>
    </div>
    <button class="primary-btn" style="width: 100%; height: 50px; border-radius: 16px; font-size: 15px;" 
            onclick="${isActive ? `completeDeal('${deal.id}')` : `editDeal('${deal.id}')`}">
      ${isActive ? '✅ Завершить сделку' : '✏️ Редактировать'}
    </button>
  `;

  openModal('details-modal');
}

function closeDealDetails() {
  closeModal('details-modal');
}

// Завершение сделки
function completeDeal(dealId) {
  const deal = deals.find(d => d.id === dealId);
  if (!deal) return;
  if (deal.status === 'completed') return;

  deal.status = 'completed';
  deal.completedAt = new Date().toISOString();
  saveDeals();
  renderDeals();
  closeDealDetails();
  showToast('Сделка завершена!');
  triggerHaptic('success');
}

// Открытие формы создания/редактирования
function openDealForm(dealId = null) {
  const isEdit = dealId !== null;
  const title = document.getElementById('deal-form-title');
  const idField = document.getElementById('deal-form-id');
  const titleInput = document.getElementById('deal-form-title-input');
  const bankInput = document.getElementById('deal-form-bank-input');
  const amountInput = document.getElementById('deal-form-amount-input');
  const senderInput = document.getElementById('deal-form-sender-input');
  const dateInput = document.getElementById('deal-form-date-input');
  const commentInput = document.getElementById('deal-form-comment-input');

  if (isEdit) {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;
    title.textContent = 'Редактировать сделку';
    idField.value = deal.id;
    titleInput.value = deal.title;
    bankInput.value = deal.bank;
    amountInput.value = deal.amount;
    senderInput.value = deal.sender;
    dateInput.value = deal.createdAt ? deal.createdAt.split('T')[0] : '';
    commentInput.value = deal.comment || '';
  } else {
    title.textContent = 'Новая сделка';
    idField.value = '';
    titleInput.value = '';
    bankInput.value = '';
    amountInput.value = '';
    senderInput.value = '';
    dateInput.value = new Date().toISOString().split('T')[0];
    commentInput.value = '';
  }

  openModal('deal-form-modal');
}

function closeDealForm() {
  closeModal('deal-form-modal');
}

// Сохранение сделки (создание или редактирование)
function saveDealFromForm() {
  const id = document.getElementById('deal-form-id').value;
  const title = document.getElementById('deal-form-title-input').value.trim();
  const bank = document.getElementById('deal-form-bank-input').value.trim();
  const amount = parseFloat(document.getElementById('deal-form-amount-input').value);
  const sender = document.getElementById('deal-form-sender-input').value.trim();
  const date = document.getElementById('deal-form-date-input').value;
  const comment = document.getElementById('deal-form-comment-input').value.trim();

  if (!title || !bank || isNaN(amount) || !sender) {
    showToast('Заполните все обязательные поля!');
    triggerHaptic('warning');
    return;
  }

  const createdAt = date ? new Date(date).toISOString() : new Date().toISOString();

  if (id) {
    // Редактирование
    const index = deals.findIndex(d => d.id === id);
    if (index !== -1) {
      deals[index] = { ...deals[index], title, bank, amount, sender, createdAt, comment };
    }
  } else {
    // Новая сделка
    const newDeal = {
      id: 'deal_' + Date.now(),
      title,
      bank,
      amount,
      sender,
      createdAt,
      comment,
      status: 'active',
      completedAt: null
    };
    deals.unshift(newDeal);
  }

  saveDeals();
  renderDeals();
  closeDealForm();
  showToast(id ? 'Сделка обновлена!' : 'Сделка создана!');
  triggerHaptic('success');
}

// Редактирование (вызывается из модалки деталей)
function editDeal(dealId) {
  closeDealDetails();
  setTimeout(() => openDealForm(dealId), 300);
}

// Удаление (можно добавить, но не требовалось)
function deleteDeal(dealId) {
  if (!confirm('Удалить эту сделку?')) return;
  deals = deals.filter(d => d.id !== dealId);
  saveDeals();
  renderDeals();
  showToast('Сделка удалена');
  triggerHaptic('success');
}

// Инициализация CRM при загрузке
function initCRM() {
  loadDeals();
  renderDeals();

  // Обработчики фильтров
  document.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentDealFilter = this.dataset.filter;
      renderDeals();
    });
  });

  // Кнопка создания
  document.getElementById('create-deal-btn').addEventListener('click', () => openDealForm());

  // Сохранение формы
  document.getElementById('deal-form-save-btn').addEventListener('click', saveDealFromForm);
}

// Добавляем инициализацию CRM после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // ... существующая инициализация ...
  // Добавляем вызов initCRM() после существующих инициализаций
  // Поскольку в исходном коде уже есть DOMContentLoaded, мы просто добавляем наш код в конец
  // или переопределяем? Лучше добавить в уже существующий обработчик.
  // В исходном app.js есть window.addEventListener('DOMContentLoaded', ...) - мы можем добавить туда.
  // Но мы не можем изменить тот файл полностью. Поэтому мы добавим отдельный обработчик.
  // Однако, чтобы не конфликтовать, мы можем поместить initCRM в конец файла и вызвать после загрузки.
  // Поскольку файл выполняется синхронно, мы можем вызвать initCRM в конце скрипта.
});

// Вызовем сразу после определения функций (в конце файла)
// Но нужно дождаться DOM. Поскольку скрипт загружается в конце body, можно вызвать сразу.
// Однако, чтобы быть уверенным, используем DOMContentLoaded.
// Я добавлю в конец файла:

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCRM);
} else {
  initCRM();
}