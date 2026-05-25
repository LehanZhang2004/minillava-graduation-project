const slides = Array.from(document.querySelectorAll('.slide'));
const tocLinks = Array.from(document.querySelectorAll('.toc a'));
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function currentSlideIndex() {
  const mid = window.scrollY + window.innerHeight / 2;
  let idx = 0;
  slides.forEach((slide, i) => {
    if (slide.offsetTop <= mid) idx = i;
  });
  return idx;
}

function updateUI() {
  const idx = currentSlideIndex();
  const percent = slides.length <= 1 ? 100 : (idx / (slides.length - 1)) * 100;
  progress.style.width = `${percent}%`;

  const currentId = slides[idx].id;
  tocLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

function animateCount(el) {
  if (el.dataset.done === 'true') return;
  el.dataset.done = 'true';

  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  el.textContent = String(target);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    entry.target.querySelectorAll('[data-count]').forEach(animateCount);
  });
}, { threshold: 0.35 });

slides.forEach(slide => observer.observe(slide));

function go(delta) {
  const idx = Math.max(0, Math.min(slides.length - 1, currentSlideIndex() + delta));
  slides[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.addEventListener('scroll', updateUI, { passive: true });
window.addEventListener('resize', updateUI);
window.addEventListener('keydown', event => {
  if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    go(1);
  }
  if (['ArrowUp', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    go(-1);
  }
  if (event.key === 'Home') slides[0].scrollIntoView({ behavior: 'smooth' });
  if (event.key === 'End') slides[slides.length - 1].scrollIntoView({ behavior: 'smooth' });
});
prevBtn?.addEventListener('click', () => go(-1));
nextBtn?.addEventListener('click', () => go(1));

const personaCopy = {
  default: '回答风格客观、简洁、专业，适合常规图像描述和视觉问答。',
  boss: '在保持图像内容相关性的基础上，回复更有压迫感和戏剧化表达，适合展示 LoRA 风格切换。',
  teen: '语气更夸张、更有中二感，能够增强现场演示的趣味性和辨识度。'
};
const personaText = document.getElementById('personaText');
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    personaText.textContent = personaCopy[btn.dataset.persona];
  });
});

updateUI();
slides[0]?.classList.add('is-visible');
