const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toast = document.getElementById('toast');
function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

const WHATSAPP_NUMBER = '523513065877';
const CONTACT_EMAIL = 'vorasolutionshys@gmail.com';

function buildSummary(){
  const name = document.getElementById('name').value.trim();
  const company = document.getElementById('company').value.trim();
  const need = document.getElementById('need').value.trim();
  if(!name || !need){
    showToast('Por favor completa al menos tu nombre y la necesidad principal.');
    return null;
  }
  return `Hola, soy ${name}${company ? ` de ${company}` : ''}. Quiero platicar sobre un proyecto con VORA Solutions. Necesidad principal: ${need}`;
}

async function copySummary(summary){
  try {
    await navigator.clipboard.writeText(summary);
  } catch {}
}

const form = document.getElementById('projectForm');
const emailBtn = document.getElementById('emailBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const summary = buildSummary();
  if(!summary) return;
  await copySummary(summary);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
  window.open(whatsappUrl, '_blank', 'noopener');
  showToast('Abriendo WhatsApp con tu mensaje listo.');
});

emailBtn?.addEventListener('click', async () => {
  const summary = buildSummary();
  if(!summary) return;
  await copySummary(summary);
  const subject = encodeURIComponent('Solicitud de proyecto - VORA Solutions');
  const body = encodeURIComponent(`${summary}\n\nEnviado desde el portafolio web de VORA Solutions.`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  showToast('Abriendo tu correo con el mensaje preparado.');
});
