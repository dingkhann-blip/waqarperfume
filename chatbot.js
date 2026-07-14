(function () {
  const messagesEl = document.getElementById('chat-messages');
  const formEl = document.getElementById('chat-form');
  const inputEl = document.getElementById('chat-input');
  const quickEl = document.getElementById('chat-quick');
  const toggleBtn = document.getElementById('chat-toggle');
  const panelEl = document.getElementById('chat-panel');
  const iconOpen = document.getElementById('chat-icon-open');
  const iconClose = document.getElementById('chat-icon-close');

  const waLink = (text) => `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;

  const QUICK_REPLIES = [
    { label: 'Prices', query: 'prices' },
    { label: 'Delivery', query: 'delivery' },
    { label: 'Payment methods', query: 'payment' },
    { label: 'Talk to a human', query: 'human' }
  ];

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.innerHTML = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function findPerfumeInText(text) {
    const lower = text.toLowerCase();
    return PERFUMES.find(p => lower.includes(p.name.toLowerCase()));
  }

  function formatPriceList() {
    return PERFUMES
      .map(p => `${p.id}. ${p.name} — ${p.size} — $${p.price}`)
      .join('<br>');
  }

  function getBotReply(rawText) {
    const text = rawText.toLowerCase().trim();

    // Specific perfume mentioned
    const matched = findPerfumeInText(rawText);
    if (matched) {
      return `<strong>${matched.name}</strong> — ${matched.size} — $${matched.price}.<br>` +
        `Free delivery across Afghanistan. <a href="${waLink(`Hello, I'd like to order ${matched.name} (${matched.size}) - $${matched.price}`)}" target="_blank" rel="noopener">Order this on WhatsApp &rarr;</a>`;
    }

    // Greetings
    if (/^(hi|hello|salam|assalam|hey)\b/.test(text)) {
      return `Hello! Welcome to Waqar Perfume. I can help with prices, sizes, delivery, and payment. What would you like to know?`;
    }

    // Prices / list / catalog
    if (/price|cost|how much|list|catalog|catalogue/.test(text)) {
      return `Here are all our fragrances (all bottles are 50 mL):<br><br>${formatPriceList()}<br><br>Tell me a name and I'll give you the order link.`;
    }

    // Size
    if (/size|ml|volume|bottle/.test(text)) {
      return `Every perfume in our collection comes in a 50 mL bottle.`;
    }

    // Delivery
    if (/deliver|shipping|ship|arrive|how long/.test(text)) {
      return `${BUSINESS.delivery}. Send us your address on WhatsApp and we'll confirm delivery time for your area.`;
    }

    // Payment
    if (/pay|payment|bank|transfer|cash|cod/.test(text)) {
      return `We accept:<br>• Bank Transfer<br>• Cash on Delivery<br><br>Bank details are sent when you confirm your order on WhatsApp.`;
    }

    // Contact / human / whatsapp
    if (/human|contact|whatsapp|number|phone|call|talk to (someone|person)/.test(text)) {
      return `You can reach us directly here: <a href="${waLink('Hello Waqar Perfume, I have a question.')}" target="_blank" rel="noopener">Message us on WhatsApp &rarr;</a><br>(${BUSINESS.whatsappDisplay})`;
    }

    // Recommendation
    if (/recommend|suggest|best|which one|popular/.test(text)) {
      return `A few favorites: <strong>Waqar Special Perfume</strong> ($25) for everyday wear, <strong>Royal Oud</strong> ($30) for something bold, and <strong>Black Orchid</strong> ($32) if you like deep, rich scents. Want details on any of these?`;
    }

    // Thanks
    if (/thank|thanks|shukria/.test(text)) {
      return `You're most welcome! Anything else I can help with?`;
    }

    // Fallback
    return `I'm not sure I understood that — I can help with prices, sizes, delivery, and payment. For anything else, our team will reply as soon as they're online: <a href="${waLink(rawText)}" target="_blank" rel="noopener">Continue on WhatsApp &rarr;</a>`;
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    inputEl.value = '';
    setTimeout(() => {
      addMessage(getBotReply(text), 'bot');
    }, 350);
  }

  function renderQuickReplies() {
    quickEl.innerHTML = '';
    QUICK_REPLIES.forEach(q => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = q.label;
      btn.addEventListener('click', () => handleUserMessage(q.query));
      quickEl.appendChild(btn);
    });
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserMessage(inputEl.value);
  });

  toggleBtn.addEventListener('click', () => {
    const isOpen = panelEl.classList.toggle('open');
    iconOpen.style.display = isOpen ? 'none' : 'block';
    iconClose.style.display = isOpen ? 'block' : 'none';
    if (isOpen) inputEl.focus();
  });

  // Initial greeting
  document.addEventListener('DOMContentLoaded', () => {
    renderQuickReplies();
    addMessage(
      `Welcome to Waqar Perfume 🌸<br>I'm here 24/7 — ask me about prices, sizes, delivery, or payment.`,
      'bot'
    );
  });
})();
