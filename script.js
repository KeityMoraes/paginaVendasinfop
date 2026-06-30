/* ===========================================================
   CÓDIGO DA ABUNDÂNCIA — Interações
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const inners = document.querySelectorAll('.slide__inner');
  const dots = Array.from(document.querySelectorAll('.dot'));

  /* --- Revela o conteúdo de cada slide ao entrar na tela --- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelector('.slide__inner')?.classList.add('visible');
        }
      });
    },
    { threshold: 0.35 }
  );
  slides.forEach((slide) => revealObserver.observe(slide));

  /* --- Atualiza o ponto ativo conforme o slide visível --- */
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = slides.indexOf(entry.target);
          dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }
      });
    },
    { threshold: 0.5 }
  );
  slides.forEach((slide) => activeObserver.observe(slide));

  /* --- Navegação ao clicar (pontos e botão "Começar") --- */
  const goTo = (n) => {
    const target = document.getElementById('slide-' + n);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  document.querySelectorAll('[data-goto]').forEach((el) => {
    el.addEventListener('click', () => goTo(el.dataset.goto));
  });

  /* --- Navegação por teclado (setas) --- */
  let current = 0;
  const trackObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) current = slides.indexOf(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  slides.forEach((slide) => trackObserver.observe(slide));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goTo(Math.min(current + 2, slides.length));
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(Math.max(current, 1));
    }
  });

  /* --- Brilho sutil ao passar nas afirmações (efeito de toque) --- */
  document.querySelectorAll('.affirmations li').forEach((li) => {
    li.addEventListener('click', () => {
      li.animate(
        [
          { boxShadow: '0 0 0 rgba(212,175,55,0)' },
          { boxShadow: '0 0 28px rgba(212,175,55,0.5)' },
          { boxShadow: '0 0 0 rgba(212,175,55,0)' },
        ],
        { duration: 900, easing: 'ease-out' }
      );
    });
  });
});
