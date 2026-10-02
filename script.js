
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchMessage = document.getElementById('searchMessage');

menuBtn.addEventListener('click', () => mainNav.classList.toggle('open'));

function runSearch(query) {
  const q = (query || '').trim().toLowerCase();
  const items = [...document.querySelectorAll('[data-search]')];

  let visible = 0;
  items.forEach(item => {
    const haystack = (item.dataset.search + ' ' + item.innerText).toLowerCase();
    const match = !q || haystack.includes(q);
    item.classList.toggle('hidden', !match);
    if (match) visible++;
  });

  if (!q) {
    searchMessage.textContent = '';
  } else if (visible > 0) {
    searchMessage.textContent = `Encontré ${visible} resultado(s) relacionados con “${query}”.`;
  } else {
    searchMessage.textContent = `Todavía no hay contenido para “${query}”. Añádelo como próximo artículo de Tony Games.`;
  }

  document.getElementById('codigos').scrollIntoView({ behavior: 'smooth' });
}

searchBtn.addEventListener('click', () => runSearch(searchInput.value));
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') runSearch(searchInput.value);
});

document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => runSearch(btn.dataset.filter));
});

const modal = document.getElementById('articleModal');
const articleContent = document.getElementById('articleContent');
const closeModal = document.getElementById('closeModal');

const articles = {
  ff: `
    <span class="eyebrow">FREE FIRE</span>
    <h2>Cómo canjear códigos de Free Fire correctamente</h2>
    <p>Usa únicamente el sitio oficial de recompensas de Garena. Inicia sesión con la cuenta vinculada, escribe el código válido y confirma. Algunas recompensas pueden tardar en aparecer.</p>
    <ul>
      <li>No compartas tu contraseña.</li>
      <li>No pagues por supuestos “generadores de códigos”.</li>
      <li>Comprueba la fecha y región de cada código.</li>
      <li>Publica en Tony Games solo códigos que hayas verificado.</li>
    </ul>
  `,
  scam: `
    <span class="eyebrow">SEGURIDAD</span>
    <h2>Cómo detectar páginas falsas de diamantes</h2>
    <p>Desconfía de sitios que prometen cantidades ilimitadas, piden tu contraseña, solicitan instalar archivos desconocidos o te obligan a completar encuestas interminables.</p>
    <ul>
      <li>Usa tiendas y canales oficiales.</li>
      <li>No entregues datos de inicio de sesión.</li>
      <li>Evita APK modificadas o programas de terceros.</li>
      <li>Si una oferta parece demasiado buena para ser cierta, compruébala antes.</li>
    </ul>
  `,
  roblox: `
    <span class="eyebrow">ROBLOX</span>
    <h2>Robux gratis: qué es real y qué suele ser engaño</h2>
    <p>Las promociones legítimas provienen de Roblox o de socios oficiales. Una web que prometa Robux ilimitados a cambio de tu contraseña o de descargar software desconocido debe tratarse como sospechosa.</p>
  `,
  mc: `
    <span class="eyebrow">MINECRAFT</span>
    <h2>Ideas de contenido de Minecraft con búsquedas constantes</h2>
    <p>Publica guías útiles y específicas: semillas, granjas, casas, comandos, supervivencia, aldeanos, encantamientos y tutoriales paso a paso. Cada tema puede convertirse en una página independiente para Google.</p>
  `
};

document.querySelectorAll('.read-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    articleContent.innerHTML = articles[btn.dataset.article] || '<p>Artículo en preparación.</p>';
    modal.showModal();
  });
});

closeModal.addEventListener('click', () => modal.close());
modal.addEventListener('click', e => {
  if (e.target === modal) modal.close();
});

document.getElementById('year').textContent = new Date().getFullYear();
