

// showcase.js

// Toggle Sidebar
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Close sidebar when clicking a link
const navLinks = document.querySelectorAll(".sidebar .nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Manual Carousel
function setupCarousel(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) return;
  const track = root.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  root.querySelectorAll(`[data-next="${rootSelector}"]`).forEach(btn => {
    btn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      update();
    });
  });

  root.querySelectorAll(`[data-prev="${rootSelector}"]`).forEach(btn => {
    btn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });
  });

  update();
}
setupCarousel("#codingCarousel");

// Scroll Reveal (IntersectionObserver)
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// File Tree accessibility (keyboard toggle)
document.querySelectorAll(".file-tree summary").forEach(sum => {
  sum.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      sum.parentElement.open = !sum.parentElement.open;
    }
  });
});

// === Tambahan fitur baru ===

// Progress bar animation trigger (skill meter)
document.querySelectorAll(".progress-bar").forEach(bar => {
  const level = bar.style.getPropertyValue("--skill-level");
  if (level) {
    bar.style.width = level;
  }
});

// Animated ticker duplication for seamless loop
const ticker = document.querySelector(".ticker p");
if (ticker) {
  const clone = ticker.cloneNode(true);
  ticker.parentElement.appendChild(clone);
}

// Floating badge animation (fade-in on load)
document.querySelectorAll(".badge").forEach(badge => {
  badge.style.opacity = 0;
  setTimeout(() => {
    badge.style.transition = "opacity 1s ease";
    badge.style.opacity = 1;
  }, 300);
});

// Two-column grid reveal effect
document.querySelectorAll(".card-container").forEach(container => {
  io.observe(container);
});






