// ===============================
// GSAP + ScrollTrigger Setup
// ===============================
gsap.registerPlugin(ScrollTrigger);

// ===============================
// Hero Image Fade-in
// ===============================
gsap.from(".hero-image img", {
  opacity: 0,
  scale: 0.9,
  duration: 1.2,
  ease: "power2.out"
});

// ===============================
// Navbar Slide-in
// ===============================
gsap.from(".navbar", {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

// ===============================
// Section Reveal on Scroll
// ===============================
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

// ===============================
// Gallery Hover Pulse (Microinteraction)
// ===============================
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("mouseenter", () => {
    gsap.to(img, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.out"
    });
  });

  img.addEventListener("mouseleave", () => {
    gsap.to(img, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out"
    });
  });
});

// ===============================
// Caption Reveal on Scroll
// ===============================
const captions = document.querySelectorAll(".hidden-caption");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

captions.forEach(caption => observer.observe(caption));

// ===============================
// Tools & Workflow Reveal
// ===============================
gsap.utils.toArray(".tool-item").forEach((item, i) => {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    delay: i * 0.2,
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });
});

// ===============================
// Story Text Reveal
// ===============================
gsap.utils.toArray(".story-text").forEach((text, i) => {
  gsap.to(text, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    delay: i * 0.3,
    scrollTrigger: {
      trigger: text,
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });
});

// ===============================
// Kang Shua Illustration Reveal
// ===============================
gsap.to(".kangshua-illustration img", {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".kangshua-illustration",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

// ===============================
// Culture Heading Reveal
// ===============================
gsap.to(".culture-heading", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".culture-heading",
    start: "top 90%",
    toggleActions: "play none none none"
  }
});

// ===============================
// Culture Text Reveal
// ===============================
gsap.utils.toArray(".culture-text").forEach((text, i) => {
  gsap.to(text, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    delay: i * 0.2,
    scrollTrigger: {
      trigger: text,
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });
});

// ===============================
// Tenun Background Fade-in
// ===============================
gsap.fromTo(".tenun-bg", {
  opacity: 0,
}, {
  opacity: 0.1,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".section.culture",
    start: "top 95%",
    toggleActions: "play none none none"
  }
});


