document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".profile-section, .fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Optional: stop observing once visible
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});



