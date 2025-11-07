gsap.registerPlugin(ScrollTrigger);

// Fungsi bantu untuk aktifkan section
function activateSection(selector) {
  const section = document.querySelector(selector);
  if (section) {
    section.classList.add("active");
  }
}

// HTML Section
ScrollTrigger.create({
  trigger: ".html",
  start: "top 80%",
  onEnter: () => activateSection(".html"),
  onLeaveBack: () => {
    const section = document.querySelector(".html");
    if (section) section.classList.remove("active");
  },
  markers: false
});

// CSS Section
ScrollTrigger.create({
  trigger: ".css",
  start: "top 80%",
  onEnter: () => activateSection(".css"),
  onLeaveBack: () => {
    const section = document.querySelector(".css");
    if (section) section.classList.remove("active");
  },
  markers: false
});

// JS Section
ScrollTrigger.create({
  trigger: ".js",
  start: "top 80%",
  onEnter: () => activateSection(".js"),
  onLeaveBack: () => {
    const section = document.querySelector(".js");
    if (section) section.classList.remove("active");
  },
  markers: false
});

// Refresh layout setelah semua konten (termasuk video) dimuat
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});



