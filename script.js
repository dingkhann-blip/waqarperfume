function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  grid.innerHTML = PERFUMES.map(p => {
    const num = String(p.id).padStart(2, '0');
    const waMessage = encodeURIComponent(
      `Hello Waqar Perfume, I'd like to order: ${p.name} (${p.size}) - $${p.price}`
    );
    return `
      <div class="perfume-card">
        <div class="card-top">
          <span class="card-num">No. ${num}</span>
          <span class="card-size">${p.size}</span>
        </div>
        <div class="card-name">${p.name}</div>
        <div class="card-rule"></div>
        <div class="card-bottom">
          <span class="card-price">$${p.price}</span>
          <a class="card-order" href="https://wa.me/${BUSINESS.whatsappNumber}?text=${waMessage}" target="_blank" rel="noopener">Order &rarr;</a>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', renderCatalog);
