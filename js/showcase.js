document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.highlight-track');
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // Mouse Events
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('active');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch Events
  track.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('touchend', () => {
    isDown = false;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  }, { passive: false });

  // Wheel Scroll
  track.addEventListener('wheel', (e) => {
    e.preventDefault();
    track.scrollLeft += e.deltaY * 0.6;
  });

  // Tap-to-toggle overlay (Mobile)
  document.querySelectorAll('.highlight-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });
});



