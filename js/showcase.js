

// === Showcase.js ===

// Toggle Sidebar
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
const navbar = document.querySelector(".navbar");

if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // Close sidebar when clicking a link
  document.querySelectorAll(".sidebar .nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  });
}

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
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
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
  if (level) bar.style.width = level;
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
document.querySelectorAll(".card-container").forEach(container => io.observe(container));

// Hero Parallax Effect
const heroImage = document.querySelector(".hero-image");
window.addEventListener("scroll", () => {
  if (heroImage) {
    const offset = window.scrollY * 0.4;
    heroImage.style.transform = `translateY(${offset}px)`;
  }
});

// Alternating section reveal (fade-left / fade-right)
document.querySelectorAll(".alt-layout").forEach((section, i) => {
  section.classList.add("reveal");
  section.dataset.reveal = i % 2 === 0 ? "left" : "right";
  io.observe(section);
});

// === Potensi Section Overlay Animation ===
const potensiItems = document.querySelectorAll(".potensi-item");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

potensiItems.forEach((item, index) => {
  observer.observe(item);
  item.style.transitionDelay = `${index * 0.15}s`;

  const overlay = item.querySelector(".overlay");
  if (overlay) {
    item.addEventListener("mouseenter", () => {
      overlay.style.opacity = "1";
      overlay.style.transform = "translateY(0)";
    });
    item.addEventListener("mouseleave", () => {
      overlay.style.opacity = "0";
      overlay.style.transform = "translateY(20px)";
    });
  }
});

// === Proteksi Interaksi Dasar ===
document.addEventListener('contextmenu', e => {
  e.preventDefault();
  alert("Klik kanan dinonaktifkan!");
});

document.addEventListener('copy', e => {
  e.preventDefault();
  alert("Copy tidak diizinkan!");
});

document.addEventListener('paste', e => {
  e.preventDefault();
  alert("Paste tidak diizinkan!");
});

document.addEventListener('cut', e => {
  e.preventDefault();
  alert("Cut tidak diizinkan!");
});

document.addEventListener('dragstart', e => {
  e.preventDefault();
  alert("Drag tidak diizinkan!");
});

document.addEventListener('selectstart', e => {
  e.preventDefault();
  alert("Seleksi teks tidak diizinkan!");
});

document.addEventListener('keydown', e => {
  const blocked = [
    { ctrl: true, key: 's' },
    { ctrl: true, key: 'u' },
    { ctrl: true, key: 'c' },
    { ctrl: true, key: 'x' },
    { ctrl: true, key: 'a' },
  ];

  blocked.forEach(item => {
    if (item.ctrl && e.ctrlKey && e.key.toLowerCase() === item.key) {
      e.preventDefault();
      alert(`Shortcut Ctrl+${item.key.toUpperCase()} diblokir!`);
    }
  });

  if (e.key === "PrintScreen") {
    e.preventDefault();
    alert("Screenshot diblokir!");
  }

  if (e.key === "F12") {
    e.preventDefault();
    alert("Developer Tools diblokir!");
  }
});


document.addEventListener("keydown", function(e) {
  
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    e.preventDefault();
    alert("Inspect (Ctrl+Shift+I) diblokir!");
  }

  
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
    e.preventDefault();
    alert("Console (Ctrl+Shift+J) diblokir!");
  }

  
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
    e.preventDefault();
    alert("Element Picker (Ctrl+Shift+C) diblokir!");
  }

  
  if (e.key === "F12") {
    e.preventDefault();
    alert("Developer Tools (F12) diblokir!");
  }
});


















const translations = {
  en: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "Home",
    nav_author: "Author Profile",
    nav_potensi: "The Things I Can Do",
    nav_coding: "Coding",
    nav_art: "Visual 2D",
    nav_blender: "3D Blender",
    nav_speaking: "Public Speaking & Journalism",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(Art and Science united in Education)",
    hero_cta: "Know Me",

    // Author Section
    author_heading: "ME",
    author_subtitle: "Educational Technology Student | Universitas Terbuka, FKIP 2024",
    author_intro: "I am Joshua.gr.s, an ordinary student studying Educational Technology at Universitas Terbuka.",
    author_story: "Although I don’t have official achievements yet, I actively experiment and learn autodidactically, often assisted by AI and references. My passions include basic coding, 2D visual art, 3D exploration, and journalism through public speaking and interviews.",
    author_quote: "\"I believe every small experiment is a step toward contributing to human progress.\"",
    author_passions_title: "Fields I pursue:",
    passion_coding: "Basic coding (HTML, CSS, JS) — self-taught, assisted by AI",
    passion_art: "2D visual art — drawing since childhood",
    passion_blender: "3D design — learning Blender with references and AI",
    passion_journalism: "Journalism — public speaking, interviews since high school",

    // Potensi Section
    potensi_heading: "The Things I Can Do",
    potensi_coding_title: "Coding",
    potensi_coding_desc: "Building interactive UIs with HTML, CSS, and JavaScript.",
    potensi_coding_fact: "Fact: I only started coding in college, self-taught with AI. Sometimes forget, sometimes remember.",
    potensi_art_title: "Art",
    potensi_art_desc: "Visual branding with NTT cultural touch.",
    potensi_art_fact: "Fact: Loved drawing since childhood, but results are ordinary. Honest, not pro.",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "3D modeling with realistic lighting and textures.",
    potensi_blender_fact: "Fact: Like coding, I started Blender in college, self-taught + references + AI.",
    potensi_speaking_title: "Public Speaking",
    potensi_speaking_desc: "Interviews and presentations to deliver ideas clearly.",
    potensi_speaking_fact: "Fact: Used to it since high school, often assignments in interviews & presentations. So I’m fairly confident speaking in public.",
    potensi_journalism_title: "Journalism",
    potensi_journalism_desc: "Voicing local identity through writing and interviews.",
    potensi_journalism_fact: "Fact: No official achievements yet, still experimenting. But I enjoy new things for human progress.",

    // Coding Section
    coding_heading: "Coding Projects",
    coding_subtitle: "Reflective Learning Journey & Implementation",
    coding_para1: `
      <strong><u>Coding journey</u></strong> started in college,
      with <em>self-taught</em> methods through online references and
      help from <strong>AI</strong>. Projects included <em>e-commerce</em>,
      hotel systems, personal portfolios, and the most challenging:
      <strong><u>LMS (Learning Management System)</u></strong>.
    `,
    coding_para2: `
      I realize my skills are still <em>basic coding</em>. Complex languages are often forgotten,
      but when it comes to <strong>real implementation</strong>, I feel more prepared.
      This is what I call a <em>technical mindset</em>: focusing on how something can
      <strong>be done</strong> and <strong>function</strong>.
    `,
    coding_para3: `
      From <strong>UI/UX</strong>, <strong>data</strong>, and <strong>content</strong>, I feel confident.
      For me, the essence of educational technology is how we
      <strong><u>use, develop, and create</u></strong> something relevant to society.
    `,
    coding_para4: `
      <strong><u>Local context</u></strong> is also important. Kupang and NTT education present unique challenges:
      limited access to technology, need for inclusive online learning systems, and drive to create
      <em>practical</em> and <em>sustainable</em> solutions. Therefore, every project is not only technical,
      but also about <strong>field execution</strong> and social relevance.
    `,
    coding_para5: `
      Fundamental questions I always carry are:
      <strong><u>what</u></strong> I want to achieve,
      <strong><u>why</u></strong> it matters,
      <strong><u>who</u></strong> will benefit,
      <strong><u>goals</u></strong>,
      <strong><u>targets</u></strong>,
      <strong><u>precision</u></strong>, and
      <strong><u>problems</u></strong> to solve.
    `,
    coding_para6: `
      With this approach, I hope every coding work is not just <em>technical practice</em>,
      but a real contribution rooted in <strong>local identity</strong> and
      <strong>international standards</strong>.
    `,
    coding_figcaption: `
      <strong>Documentation of front-end projects</strong> summarizing all
      <em>screenshots</em> I’ve worked on: from <em>e-commerce</em>, hotel systems,
      personal portfolios, to <strong>LMS</strong>.  
      <br><br>
      All born from <strong><u>self-learning</u></strong> since college,
      with <em>online references</em> and help from <strong>AI</strong>.
      Honestly: often <em>forget my own code</em>, sometimes repeat.
      But that’s where learning feels real — not just memorization,
      but <strong>experiment</strong> and <strong>field implementation</strong>.  
      <br><br>
      Reflection: how an <strong>Educational Tech student</strong> sees coding as a way
      to <u>use, develop, and create</u> something relevant to Kupang and NTT education.
    `,
    coding_fact_title: "Fact",
    coding_fact_desc: `
      Web building, testing, development is fun lol.<br>
      Only used 2 devices.<br>
      Software: Visual Studio Code.<br>
      Team: me and AI lol.
    `,

    // Art Section
    art_heading: "Art 2D",
    art_subtitle: "Reflective Visual Journey & Cultural Exploration",
    art_para1: `
      <strong><u>My journey in 2D art</u></strong> began in childhood,
      with simple drawings. Later I experimented with <em>digital art</em> and <em>comics</em>,
      while carrying <strong>NTT culture</strong> as visual identity.
    `,
    art_para2: `
      I realize my works are still <em>ordinary</em>, not spectacular.
      But that’s honesty: every stroke is <strong>experiment</strong>, not just result.
      I focus on how art can <strong>tell stories</strong> and <strong>function</strong>.
    `,
    art_para3: `
      From <strong>layout</strong>, <strong>colors</strong>, and <strong>visual narrative</strong>,
      I feel confident. For me, art is not just aesthetics, but how it can
      <strong><u>use, develop, and create</u></strong> something relevant.
    `,
    art_para4: `
      <strong><u>Local context</u></strong> is important. Kupang and NTT culture inspire motifs,
      traditions, and daily stories. The challenge is turning them into <em>modern</em> yet <em>rooted</em> works.
    `,
    art_para5: `
      Fundamental questions: <strong><u>what</u></strong> to express,
      <strong><u>why</u></strong> it matters,
      <strong><u>who</u></strong> will feel it,
      <strong><u>goals</u></strong>,
      <strong><u>targets</u></strong>,
      <strong><u>precision</u></strong>, and
      <strong><u>story</u></strong> to bring alive.
    `,
        art_para6: `
      With this approach, I hope every 2D art work is not just <em>visual practice</em>,
      but a real contribution rooted in <strong>local identity</strong> and
      <strong>international standards</strong>.
    `,
    art_figcaption: `
      <strong>Documentation of visual works</strong> summarizing my journey:
      from <em>simple comics</em>, digital illustrations, to exploration of
      <strong>NTT woven motifs</strong>.  
      <br><br>
      All born from <strong><u>self-learning</u></strong> since childhood,
      with many <em>experiments</em> and help from <strong>AI</strong>.
      Honestly: often feel my works are <em>ordinary</em>, sometimes repeat.
      But that’s where learning feels real — not just results, but
      <strong>story</strong> and <strong>identity</strong>.  
      <br><br>
      Reflection: how an <strong>Educational Tech student</strong> sees art
      as a way to <u>use, develop, and create</u> something relevant to
      Kupang and NTT culture.
    `,
    art_fact_title: "Fact",
    art_fact_desc: `
      Media: pencil, ink, digital tablet.<br>
      Software: Krita & Photoshop.<br>
      Inspiration: woven motifs, NTT nature.<br>
      Team: me and AI lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "Reflective Learning Journey & Visual Experiment",
    blender_para1: `
      <strong><u>My journey in 3D</u></strong> began in college,
      without <em>basic</em> knowledge. I learned with intention,
      assisted by <strong>AI</strong> and references. It was tiring,
      often made my laptop <em>lag</em>, but that’s where I found
      the meaning of learning.
    `,
    blender_para2: `
      My works are limited, only a few models. But each trial is
      <strong>experiment</strong>, not just result. From 2D sketches,
      I tried to execute them into 3D models. It taught me that
      <strong>visualization</strong> bridges ideas and reality.
    `,
    blender_para3: `
      For me, <strong><u>using 3D media</u></strong> is important in
      educational technology. 3D models help explain abstract concepts,
      provide simulations, and enrich learning. It’s not just art,
      but also a <strong>pedagogical tool</strong>.
    `,
    blender_para4: `
      <strong><u>Local context</u></strong> gives challenges. In Kupang
      and NTT, limited devices make 3D harder. But each work proves
      technology can be used <em>modestly</em> to produce something
      <strong>meaningful</strong>.
    `,
    blender_para5: `
      Fundamental questions: <strong><u>what</u></strong> to achieve,
      <strong><u>why</u></strong> it matters,
      <strong><u>who</u></strong> benefits,
      <strong><u>goals</u></strong>,
      <strong><u>targets</u></strong>,
      <strong><u>precision</u></strong>, and
      <strong><u>problems</u></strong> to solve.
    `,
    blender_para6: `
      With this approach, I hope every 3D work is not just <em>technical practice</em>,
      but a real contribution rooted in <strong>local identity</strong> and
      <strong>international standards</strong>.
    `,
    blender_figcaption: `
      <strong>Documentation of 3D works</strong> I created with <em>Blender</em>:
      from simple models to realistic lighting and textures.  
      <br><br>
      All born from <strong><u>self-learning</u></strong> since college,
      with <strong>AI</strong> and references. Honestly: my laptop is basic,
      rendering is heavy. But that’s where learning feels real —
      <strong>experiment</strong> and <strong>perseverance</strong>.  
      <br><br>
      Reflection: how an <strong>Educational Tech student</strong> sees 3D
      as a way to <u>visualize, develop, and create</u> something relevant
      to Kupang and NTT education.
    `,
    blender_fact_title: "Fact",
    blender_fact_desc: `
      Software: Blender 3D.<br>
      Hardware: basic laptop.<br>
      Workflow: 2D sketch → 3D execution.<br>
      Team: me and AI lol.
    `,

    // Speaking Section
    speaking_heading: "Public Speaking & Journalism",
    speaking_subtitle: "Reflective Communication Journey & Local Education",
    speaking_para1: `
      <strong><u>My communication journey</u></strong> began in high school.
      Presentations and writing opened the door to <strong>public speaking</strong>
      and <strong>journalism</strong>. Nervous at first, but each chance was
      <em>practice</em> to deliver ideas clearly.
    `,
    speaking_para2: `
      In college, it grew into <strong>academic approach</strong>.
      Public speaking became <strong>argument building</strong>,
      data processing, and precise delivery. Journalism became
      <strong>information gathering</strong> and narrative building.
    `,
    speaking_quote: `
      “Communication is the bridge between <strong>local identity</strong>
      and <strong>global standards</strong>.”
    `,
    speaking_para3: `
      <strong><u>Local education in Kupang and NTT</u></strong> gives challenges.
      Limited media access makes learning harder, but proves regional voices
      can appear nationally. Public speaking and journalism are <em>pedagogical tools</em>.
    `,
    speaking_para4: `
      For me, essence is <strong><u>exploring, adapting, and structuring</u></strong>
      information relevant to education. Fundamental questions:
      <strong><u>what</u></strong>, <strong><u>why</u></strong>,
      <strong><u>who</u></strong>, and <strong><u>goals</u></strong>.
    `,
    speaking_para5: `
      With this approach, I hope every communication work is not just <em>technical practice</em>,
      but a real contribution rooted in <strong>local identity</strong> and
      <strong>international standards</strong>.
    `,
    speaking_figcaption: `
      <strong>Documentation of public speaking</strong> and journalism:
      from high school, college, to reflective articles.  
      <br><br>
      All born from <strong><u>self-learning</u></strong> and field experience.
      Honestly: often nervous, but that’s where learning feels real.  
      <br><br>
      Reflection: how an <strong>Educational Tech student</strong> sees communication
      as a way to <u>voice identity</u> and <u>build bridges</u>.
    `,
    speaking_fact_title: "Fact",
    speaking_fact_desc: `
      Start: high school assignments.<br>
      Development: college, academic approach.<br>
      Focus: education & local identity.<br>
      Challenge: limited media.<br>
      Team: me and AI.
    `,

    // Patreon Section
    patreon_heading: "Explore More with Me",
    patreon_intro: `
      KANG_SHUA is not just showcase, but academic and creative experiments.
      Through Patreon, you can see behind-the-scenes, new ideas, and steps
      toward national and international standards.
    `,
    patreon_roadmap_title: "My Experimental Journey:",
    patreon_node1: "Coding, visual art, and 3D experiments",
    patreon_node2: "Self-learning assisted by AI",
    patreon_node3: "Journalism & public speaking reflections",
    patreon_node4: "Updates on academic journey in Educational Technology",
    patreon_quote: "\"Every small support is a big investment for creative and academic future.\"",
    patreon_cta: "Join the Journey",

    // Footer
    footer_about_title: "About",
    footer_about_desc: `
      <strong>KANG_SHUA</strong> is a personal initiative combining technology,
      art, and local NTT culture in academic showcase format.
      Designed to meet national standards and compete internationally.
    `,
    footer_contact_title: "Contact",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>Educational Technology Student, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "Navigation",
    footer_nav_author: "Author",
    footer_nav_potensi: "The Things I Can Do",
    footer_nav_coding: "Coding",
    footer_nav_art: "Art",
    footer_nav_blender: "3D",
    footer_nav_speaking: "Speaking",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>Disclaimer:</strong> All works displayed are results of experiments,
      self-learning, and academic exploration. They do not represent official institutions,
      but are committed to national academic standards and international openness.
    `,
    footer_copy: "© 2026 KANG_SHUA. All rights reserved."
  },

  es: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "Inicio",
    nav_author: "Perfil del Autor",
    nav_potensi: "Lo que puedo hacer",
    nav_coding: "Programación",
    nav_art: "Visual 2D",
    nav_blender: "3D Blender",
    nav_speaking: "Oratoria y Periodismo",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(Arte y Ciencia unidas en la Educación)",
    hero_cta: "Conóceme",

    // Author Section
    author_heading: "YO",
    author_subtitle: "Estudiante de Tecnología Educativa | Universitas Terbuka, FKIP 2024",
    author_intro: "Soy Joshua.gr.s, un estudiante común que cursa Tecnología Educativa en Universitas Terbuka.",
    author_story: "Aunque aún no tengo logros oficiales, experimento y aprendo de manera autodidacta, a menudo con ayuda de la IA y referencias. Mis pasiones incluyen programación básica, arte visual 2D, exploración 3D y periodismo mediante oratoria y entrevistas.",
    author_quote: "\"Creo que cada pequeño experimento es un paso hacia contribuir al progreso humano.\"",
    author_passions_title: "Áreas que sigo:",
    passion_coding: "Programación básica (HTML, CSS, JS) — autodidacta, asistido por IA",
    passion_art: "Arte visual 2D — dibujando desde la infancia",
    passion_blender: "Diseño 3D — aprendiendo Blender con referencias e IA",
    passion_journalism: "Periodismo — oratoria y entrevistas desde la secundaria",

    // Potensi Section
    potensi_heading: "Lo que puedo hacer",
    potensi_coding_title: "Programación",
    potensi_coding_desc: "Construir interfaces interactivas con HTML, CSS y JavaScript.",
    potensi_coding_fact: "Dato: Empecé a programar en la universidad, autodidacta con ayuda de IA. A veces olvido, a veces recuerdo.",
    potensi_art_title: "Arte",
    potensi_art_desc: "Branding visual con un toque cultural de NTT.",
    potensi_art_fact: "Dato: Me gusta dibujar desde niño, pero los resultados son normales. Honesto, no profesional.",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "Modelado 3D con iluminación y texturas realistas.",
    potensi_blender_fact: "Dato: Como la programación, empecé Blender en la universidad, autodidacta + referencias + IA.",
    potensi_speaking_title: "Oratoria",
    potensi_speaking_desc: "Entrevistas y presentaciones para transmitir ideas claramente.",
    potensi_speaking_fact: "Dato: Acostumbrado desde la secundaria, con tareas de entrevistas y presentaciones. Bastante seguro hablando en público.",
    potensi_journalism_title: "Periodismo",
    potensi_journalism_desc: "Dar voz a la identidad local mediante escritura y entrevistas.",
    potensi_journalism_fact: "Dato: Sin logros oficiales aún, sigo experimentando. Pero disfruto cosas nuevas para el progreso humano.",

    // Coding Section
    coding_heading: "Proyectos de Programación",
    coding_subtitle: "Viaje Reflexivo de Aprendizaje e Implementación",
    coding_para1: `
      <strong><u>Mi viaje en programación</u></strong> comenzó en la universidad,
      con métodos <em>autodidactas</em> usando referencias en línea y ayuda de <strong>IA</strong>.
      Proyectos incluyen <em>e-commerce</em>, sistemas hoteleros, portafolios personales,
      y el más desafiante: <strong><u>LMS (Learning Management System)</u></strong>.
    `,
    coding_para2: `
      Reconozco que mis habilidades aún son <em>básicas</em>. Los lenguajes complejos
      a menudo se olvidan, pero en la <strong>implementación real</strong> me siento más preparado.
      Lo llamo <em>mentalidad técnica</em>: enfocarse en cómo algo puede
      <strong>hacerse</strong> y <strong>funcionar</strong>.
    `,
    coding_para3: `
      En <strong>UI/UX</strong>, <strong>datos</strong> y <strong>contenido</strong>, me siento seguro.
      Para mí, la esencia de la tecnología educativa es
      <strong><u>usar, desarrollar y crear</u></strong> algo relevante para la sociedad.
    `,
    coding_para4: `
      <strong><u>El contexto local</u></strong> también es importante. Kupang y NTT presentan desafíos únicos:
      acceso limitado a tecnología, necesidad de sistemas inclusivos y soluciones
      <em>prácticas</em> y <em>sostenibles</em>. Cada proyecto no solo es técnico,
      también <strong>ejecución en campo</strong> y relevancia social.
    `,
    coding_para5: `
      Preguntas fundamentales:
      <strong><u>qué</u></strong> quiero lograr,
      <strong><u>por qué</u></strong> es importante,
      <strong><u>quién</u></strong> se beneficiará,
      <strong><u>objetivos</u></strong>,
      <strong><u>metas</u></strong>,
      <strong><u>precisión</u></strong>, y
      <strong><u>problemas</u></strong> a resolver.
    `,
    coding_para6: `
      Con este enfoque, espero que cada trabajo de programación no sea solo <em>práctica técnica</em>,
      sino una contribución real basada en <strong>identidad local</strong> y
      <strong>estándares internacionales</strong>.
    `,
    coding_figcaption: `
      <strong>Documentación de proyectos front-end</strong> que resumen
      <em>capturas</em> de webs: <em>e-commerce</em>, sistemas hoteleros,
      portafolios personales y <strong>LMS</strong>.  
      <br><br>
      Todo nacido de <strong><u>aprendizaje autodidacta</u></strong> desde la universidad,
      con <em>referencias en línea</em> y ayuda de <strong>IA</strong>.
      Honestamente: a veces <em>olvido mi propio código</em>, repito.
      Pero ahí el aprendizaje es real: <strong>experimento</strong> e <strong>implementación</strong>.  
      <br><br>
      Reflexión: cómo un <strong>estudiante de Tecnología Educativa</strong> ve la programación
      como forma de <u>usar, desarrollar y crear</u> algo relevante en Kupang y NTT.
    `,
    coding_fact_title: "Dato",
    coding_fact_desc: `
      Construcción web, pruebas, desarrollo es divertido jaja.<br>
      Solo usé 2 dispositivos.<br>
      Software: Visual Studio Code.<br>
      Equipo: yo y la IA jaja.
    `,

    // Art Section
    art_heading: "Arte 2D",
    art_subtitle: "Viaje Visual Reflexivo y Exploración Cultural",
    art_para1: `
      <strong><u>Mi viaje en arte 2D</u></strong> comenzó en la infancia,
      con dibujos simples. Luego experimenté con <em>arte digital</em> y <em>cómics</em>,
      llevando <strong>cultura NTT</strong> como identidad visual.
    `,
    art_para2: `
      Mis obras aún son <em>ordinarias</em>, no espectaculares.
      Pero cada trazo es <strong>experimento</strong>, no solo resultado.
      Me enfoco en cómo el arte puede <strong>contar historias</strong> y <strong>funcionar</strong>.
    `,
    art_para3: `
      En <strong>diseño</strong>, <strong>colores</strong> y <strong>narrativa visual</strong>,
      me siento seguro. El arte no es solo estética, es
      <strong><u>usar, desarrollar y crear</u></strong> algo relevante.
    `,
    art_para4: `
      <strong><u>El contexto local</u></strong> inspira: Kupang y NTT con motivos de tejido,
      símbolos tradicionales y relatos diarios. El reto es convertirlos en obras
      <em>modernas</em> y <em>arraigadas</em>.
    `,
        art_para5: `
      Preguntas fundamentales:
      <strong><u>qué</u></strong> expresar,
      <strong><u>por qué</u></strong> es importante,
      <strong><u>quién</u></strong> lo sentirá,
      <strong><u>objetivos</u></strong> principales,
      <strong><u>metas</u></strong> realistas,
      <strong><u>precisión</u></strong> en la ejecución, y
      <strong><u>historia</u></strong> que debe cobrar vida.
    `,
    art_para6: `
      Con este enfoque, espero que cada obra de arte 2D no sea solo <em>práctica visual</em>,
      sino una contribución real basada en <strong>identidad local</strong> y
      <strong>estándares internacionales</strong>.
    `,
    art_figcaption: `
      <strong>Documentación de obras visuales</strong> que resumen mi viaje:
      desde <em>cómics simples</em>, ilustraciones digitales, hasta exploración de
      <strong>motivos de tejido NTT</strong>.  
      <br><br>
      Todo nacido de <strong><u>aprendizaje autodidacta</u></strong> desde la infancia,
      con muchos <em>experimentos</em> y ayuda de <strong>IA</strong>.
      Honestamente: a veces siento que mis obras son <em>ordinarias</em>, repito muchas veces.
      Pero ahí el aprendizaje es real: <strong>historia</strong> e <strong>identidad</strong>.  
      <br><br>
      Reflexión: cómo un <strong>estudiante de Tecnología Educativa</strong> ve el arte
      como forma de <u>usar, desarrollar y crear</u> algo relevante para Kupang y NTT.
    `,
    art_fact_title: "Dato",
    art_fact_desc: `
      Medios: lápiz, tinta, tableta digital.<br>
      Software: Krita & Photoshop.<br>
      Inspiración: motivos de tejido, naturaleza de NTT.<br>
      Equipo: yo y la IA jaja.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "Viaje Reflexivo de Aprendizaje y Experimento Visual",
    blender_para1: `
      <strong><u>Mi viaje en 3D</u></strong> comenzó en la universidad,
      sin <em>base</em> previa. Aprendí con intención, asistido por <strong>IA</strong>
      y referencias en línea. Fue agotador, mi laptop <em>se colgaba</em>,
      pero ahí encontré el verdadero significado de aprender.
    `,
    blender_para2: `
      Mis obras son limitadas, pocos modelos probados. Pero cada intento es
      <strong>experimento</strong>, no solo resultado. De bocetos 2D simples,
      intenté ejecutarlos en 3D. Aprendí que la <strong>visualización</strong>
      es puente entre ideas y realidad.
    `,
    blender_para3: `
      Para mí, <strong><u>usar medios 3D</u></strong> es vital en tecnología educativa.
      Los modelos 3D ayudan a explicar conceptos abstractos, simular realidades
      y enriquecer el aprendizaje. No es solo arte, también <strong>herramienta pedagógica</strong>.
    `,
    blender_para4: `
      <strong><u>El contexto local</u></strong> da retos. En Kupang y NTT,
      el acceso limitado a dispositivos hace más difícil el 3D. Pero cada obra
      prueba que la tecnología puede usarse <em>modestamente</em> para producir algo
      <strong>significativo</strong>.
    `,
    blender_para5: `
      Preguntas fundamentales:
      <strong><u>qué</u></strong> lograr,
      <strong><u>por qué</u></strong> importa,
      <strong><u>quién</u></strong> se beneficia,
      <strong><u>objetivos</u></strong>,
      <strong><u>metas</u></strong>,
      <strong><u>precisión</u></strong>, y
      <strong><u>problemas</u></strong> a resolver.
    `,
    blender_para6: `
      Con este enfoque, espero que cada obra 3D no sea solo <em>práctica técnica</em>,
      sino una contribución real basada en <strong>identidad local</strong> y
      <strong>estándares internacionales</strong>.
    `,
    blender_figcaption: `
      <strong>Documentación de obras 3D</strong> creadas con <em>Blender</em>:
      desde modelos simples hasta iluminación y texturas realistas.  
      <br><br>
      Todo nacido de <strong><u>aprendizaje autodidacta</u></strong> desde la universidad,
      con <strong>IA</strong> y referencias. Honestamente: mi laptop es básica,
      el renderizado es pesado. Pero ahí el aprendizaje es real:
      <strong>experimento</strong> y <strong>perseverancia</strong>.  
      <br><br>
      Reflexión: cómo un <strong>estudiante de Tecnología Educativa</strong> ve el 3D
      como forma de <u>visualizar, desarrollar y crear</u> algo relevante en Kupang y NTT.
    `,
    blender_fact_title: "Dato",
    blender_fact_desc: `
      Software: Blender 3D.<br>
      Hardware: laptop básica.<br>
      Flujo: boceto 2D → ejecución 3D.<br>
      Equipo: yo y la IA jaja.
    `,

    // Speaking Section
    speaking_heading: "Oratoria y Periodismo",
    speaking_subtitle: "Viaje Reflexivo de Comunicación y Educación Local",
    speaking_para1: `
      <strong><u>Mi viaje en comunicación</u></strong> comenzó en la secundaria.
      Presentaciones y escritura abrieron la puerta a <strong>oratoria</strong> y
      <strong>periodismo</strong>. Nervioso al inicio, pero cada oportunidad fue
      <em>práctica</em> para transmitir ideas claramente.
    `,
    speaking_para2: `
      En la universidad, se convirtió en <strong>enfoque académico</strong>.
      La oratoria pasó a ser <strong>construcción de argumentos</strong>,
      procesamiento de datos y precisión. El periodismo se volvió
      <strong>recolección de información</strong> y narrativas relevantes.
    `,
    speaking_quote: `
      “La comunicación es el puente entre <strong>identidad local</strong>
      y <strong>estándares globales</strong>.”
    `,
    speaking_para3: `
      <strong><u>La educación local en Kupang y NTT</u></strong> da retos y oportunidades.
      El acceso limitado a medios hace más difícil, pero prueba que voces regionales
      pueden aparecer a nivel nacional. La oratoria y el periodismo son <em>herramientas pedagógicas</em>.
    `,
    speaking_para4: `
      Para mí, la esencia es <strong><u>explorar, adaptar y estructurar</u></strong>
      información relevante. Preguntas fundamentales:
      <strong><u>qué</u></strong>, <strong><u>por qué</u></strong>,
      <strong><u>quién</u></strong>, y <strong><u>objetivos</u></strong>.
    `,
    speaking_para5: `
      Con este enfoque, espero que cada obra de comunicación no sea solo <em>práctica técnica</em>,
      sino una contribución real basada en <strong>identidad local</strong> y
      <strong>estándares internacionales</strong>.
    `,
    speaking_figcaption: `
      <strong>Documentación de oratoria</strong> y periodismo:
      desde secundaria, universidad, hasta artículos reflexivos.  
      <br><br>
      Todo nacido de <strong><u>aprendizaje autodidacta</u></strong> y experiencia en campo.
      Honestamente: a menudo nervioso, pero ahí el aprendizaje es real.  
      <br><br>
      Reflexión: cómo un <strong>estudiante de Tecnología Educativa</strong> ve la comunicación
      como forma de <u>dar voz</u> y <u>construir puentes</u>.
    `,
    speaking_fact_title: "Dato",
    speaking_fact_desc: `
      Inicio: tareas de secundaria.<br>
      Desarrollo: universidad, enfoque académico.<br>
      Enfoque: educación e identidad local.<br>
      Reto: medios limitados.<br>
      Equipo: yo y la IA.
    `,

    // Patreon Section
    patreon_heading: "Explora más conmigo",
    patreon_intro: `
      KANG_SHUA no es solo un escaparate, sino un viaje experimental académico y creativo.
      A través de Patreon, puedes ver procesos, nuevas ideas y pasos hacia estándares nacionales e internacionales.
    `,
    patreon_roadmap_title: "Mi viaje experimental:",
    patreon_heading: "Explora más conmigo",
    patreon_intro: `
      KANG_SHUA no es solo un escaparate, sino un viaje experimental académico y creativo.
      A través de Patreon, puedes ver procesos detrás de escena, nuevas ideas y pasos hacia
      estándares nacionales e internacionales.
    `,
    patreon_roadmap_title: "Mi viaje experimental:",
    patreon_node1: "Experimentos de programación, arte visual y 3D",
    patreon_node2: "Aprendizaje autodidacta asistido por IA",
    patreon_node3: "Reflexiones de periodismo y oratoria",
    patreon_node4: "Actualizaciones del viaje académico en Tecnología Educativa",
    patreon_quote: "\"Cada pequeño apoyo es una gran inversión para un futuro creativo y académico.\"",
    patreon_cta: "Únete al viaje",

    // Footer
    footer_about_title: "Acerca de",
    footer_about_desc: `
      <strong>KANG_SHUA</strong> es una iniciativa personal que combina tecnología,
      arte y cultura local de NTT en un formato académico.
      Diseñado para cumplir estándares nacionales y competir internacionalmente.
    `,
    footer_contact_title: "Contacto",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>Estudiante de Tecnología Educativa, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "Navegación",
    footer_nav_author: "Autor",
    footer_nav_potensi: "Lo que puedo hacer",
    footer_nav_coding: "Programación",
    footer_nav_art: "Arte",
    footer_nav_blender: "3D",
    footer_nav_speaking: "Oratoria",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>Descargo de responsabilidad:</strong> Todas las obras mostradas son resultado de experimentos,
      aprendizaje autodidacta y exploración académica. No representan instituciones oficiales,
      pero están comprometidas con estándares académicos nacionales y apertura internacional.
    `,
    footer_copy: "© 2026 KANG_SHUA. Todos los derechos reservados."
  },

  fr: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "Accueil",
    nav_author: "Profil de l’Auteur",
    nav_potensi: "Ce que je peux faire",
    nav_coding: "Programmation",
    nav_art: "Visuel 2D",
    nav_blender: "3D Blender",
    nav_speaking: "Prise de parole & Journalisme",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(Art et Science unies dans l’Éducation)",
    hero_cta: "Me découvrir",

    // Author Section
    author_heading: "MOI",
    author_subtitle: "Étudiant en Technologie Éducative | Universitas Terbuka, FKIP 2024",
    author_intro: "Je suis Joshua.gr.s, un étudiant ordinaire en Technologie Éducative à l’Universitas Terbuka.",
    author_story: "Bien que je n’aie pas encore de réalisations officielles, j’expérimente et j’apprends de manière autodidacte, souvent aidé par l’IA et diverses références. Mes passions incluent la programmation de base, l’art visuel 2D, l’exploration 3D et le journalisme à travers la prise de parole et les interviews.",
    author_quote: "\"Je crois que chaque petit essai est une étape vers une contribution au progrès humain.\"",
    author_passions_title: "Domaines que je poursuis :",
    passion_coding: "Programmation de base (HTML, CSS, JS) — autodidacte, assisté par IA",
    passion_art: "Art visuel 2D — dessin depuis l’enfance",
    passion_blender: "Conception 3D — apprentissage de Blender avec références et IA",
    passion_journalism: "Journalisme — prise de parole, interviews depuis le lycée",

    // Potensi Section
    potensi_heading: "Ce que je peux faire",
    potensi_coding_title: "Programmation",
    potensi_coding_desc: "Construire des interfaces interactives avec HTML, CSS et JavaScript.",
    potensi_coding_fact: "Fait : J’ai commencé la programmation à l’université, autodidacte avec l’aide de l’IA. Parfois j’oublie, parfois je me souviens.",
    potensi_art_title: "Art",
    potensi_art_desc: "Branding visuel avec une touche culturelle NTT.",
    potensi_art_fact: "Fait : J’aime dessiner depuis l’enfance, mais les résultats sont ordinaires. Honnête, pas pro.",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "Modélisation 3D avec éclairage et textures réalistes.",
    potensi_blender_fact: "Fait : Comme la programmation, j’ai commencé Blender à l’université, autodidacte + références + IA.",
    potensi_speaking_title: "Prise de parole",
    potensi_speaking_desc: "Interviews et présentations pour transmettre des idées clairement.",
    potensi_speaking_fact: "Fait : Habitué depuis le lycée, souvent des devoirs d’interviews et présentations. Assez confiant en public.",
    potensi_journalism_title: "Journalisme",
    potensi_journalism_desc: "Exprimer l’identité locale par l’écriture et les interviews.",
    potensi_journalism_fact: "Fait : Pas encore de réalisations officielles, toujours en expérimentation. Mais j’aime les nouveautés pour le progrès humain.",

    // Coding Section
    coding_heading: "Projets de Programmation",
    coding_subtitle: "Parcours Réflexif d’Apprentissage et d’Implémentation",
    coding_para1: `
      <strong><u>Mon parcours en programmation</u></strong> a commencé à l’université,
      avec une approche <em>autodidacte</em> via des références en ligne et l’aide de <strong>IA</strong>.
      Projets : <em>e-commerce</em>, systèmes hôteliers, portefeuilles personnels,
      et le plus difficile : <strong><u>LMS (Learning Management System)</u></strong>.
    `,
    coding_para2: `
      Je reconnais que mes compétences sont encore <em>basiques</em>. Les langages complexes
      sont souvent oubliés, mais lors de <strong>l’implémentation réelle</strong>, je me sens prêt.
      C’est ce que j’appelle une <em>mentalité technique</em> : se concentrer sur comment
      <strong>faire</strong> et <strong>fonctionner</strong>.
    `,
    coding_para3: `
      En <strong>UI/UX</strong>, <strong>données</strong> et <strong>contenu</strong>, je suis confiant.
      Pour moi, l’essence de la technologie éducative est
      <strong><u>utiliser, développer et créer</u></strong> quelque chose de pertinent pour la société.
    `,
    coding_para4: `
      <strong><u>Le contexte local</u></strong> est aussi important. Kupang et NTT présentent des défis :
      accès limité à la technologie, besoin de systèmes inclusifs et solutions
      <em>pratiques</em> et <em>durables</em>. Chaque projet est technique mais aussi
      <strong>exécution sur le terrain</strong> et pertinence sociale.
    `,
    coding_para5: `
      Questions fondamentales :
      <strong><u>quoi</u></strong> atteindre,
      <strong><u>pourquoi</u></strong> c’est important,
      <strong><u>qui</u></strong> en bénéficiera,
      <strong><u>objectifs</u></strong>,
      <strong><u>cibles</u></strong>,
      <strong><u>précision</u></strong>, et
      <strong><u>problèmes</u></strong> à résoudre.
    `,
    coding_para6: `
      Avec cette approche, j’espère que chaque travail de programmation ne sera pas seulement <em>pratique technique</em>,
      mais une contribution réelle basée sur <strong>identité locale</strong> et
      <strong>normes internationales</strong>.
    `,
    coding_figcaption: `
      <strong>Documentation des projets front-end</strong> résumant toutes les
      <em>captures</em> de sites : <em>e-commerce</em>, systèmes hôteliers,
      portefeuilles personnels, et <strong>LMS</strong>.  
      <br><br>
      Tout né de <strong><u>l’apprentissage autodidacte</u></strong> à l’université,
      avec <em>références en ligne</em> et aide de <strong>IA</strong>.
      Honnêtement : souvent <em>j’oublie mon propre code</em>, je répète.
      Mais là l’apprentissage est réel : <strong>expérimentation</strong> et <strong>implémentation</strong>.  
      <br><br>
      Réflexion : comment un <strong>étudiant en Technologie Éducative</strong> voit la programmation
      comme moyen d’<u>utiliser, développer et créer</u> quelque chose de pertinent à Kupang et NTT.
    `,
    coding_fact_title: "Fait",
    coding_fact_desc: `
      Création web, tests, développement sont amusants lol.<br>
      Seulement 2 appareils utilisés.<br>
      Logiciel : Visual Studio Code.<br>
      Équipe : moi et l’IA lol.
    `,

        // Art Section
    art_heading: "Art 2D",
    art_subtitle: "Parcours Visuel Réflexif & Exploration Culturelle",
    art_para1: `
      <strong><u>Mon parcours en art 2D</u></strong> a commencé dans l’enfance,
      avec des dessins simples. Plus tard, j’ai expérimenté <em>l’art numérique</em> et les <em>bandes dessinées</em>,
      tout en portant la <strong>culture NTT</strong> comme identité visuelle.
    `,
    art_para2: `
      Mes œuvres restent <em>ordinaires</em>, pas spectaculaires.
      Mais chaque trait est un <strong>expériment</strong>, pas seulement un résultat.
      Je me concentre sur la façon dont l’art peut <strong>raconter des histoires</strong> et <strong>fonctionner</strong>.
    `,
    art_para3: `
      En termes de <strong>mise en page</strong>, <strong>couleurs</strong> et <strong>narration visuelle</strong>,
      je suis plus confiant. Pour moi, l’art n’est pas seulement esthétique,
      mais une manière d’<strong><u>utiliser, développer et créer</u></strong> quelque chose de pertinent.
    `,
    art_para4: `
      <strong><u>Le contexte local</u></strong> est aussi une source d’inspiration.
      Kupang et NTT apportent des motifs de tissage, des symboles traditionnels et des récits quotidiens.
      Le défi est de transformer tout cela en œuvres <em>modernes</em> et <em>ancrées</em>.
    `,
    art_para5: `
      Questions fondamentales :
      <strong><u>quoi</u></strong> exprimer,
      <strong><u>pourquoi</u></strong> c’est important,
      <strong><u>qui</u></strong> le ressentira,
      <strong><u>objectifs</u></strong>,
      <strong><u>cibles</u></strong>,
      <strong><u>précision</u></strong>, et
      <strong><u>histoire</u></strong> à faire vivre.
    `,
    art_para6: `
      Avec cette approche, j’espère que chaque œuvre 2D ne sera pas seulement <em>pratique visuelle</em>,
      mais une contribution réelle basée sur <strong>identité locale</strong> et
      <strong>normes internationales</strong>.
    `,
    art_figcaption: `
      <strong>Documentation des œuvres visuelles</strong> résumant mon parcours :
      des <em>bandes dessinées simples</em>, des illustrations numériques, jusqu’à l’exploration des
      <strong>motifs de tissage NTT</strong>.  
      <br><br>
      Tout est né de <strong><u>l’apprentissage autodidacte</u></strong> depuis l’enfance,
      avec beaucoup d’<em>expériences</em> et l’aide de <strong>IA</strong>.
      Honnêtement : parfois je trouve mes œuvres <em>ordinaires</em>, je répète souvent.
      Mais là l’apprentissage est réel : <strong>histoire</strong> et <strong>identité</strong>.  
      <br><br>
      Réflexion : comment un <strong>étudiant en Technologie Éducative</strong> voit l’art
      comme moyen d’<u>utiliser, développer et créer</u> quelque chose de pertinent pour Kupang et NTT.
    `,
    art_fact_title: "Fait",
    art_fact_desc: `
      Médias : crayon, encre, tablette numérique.<br>
      Logiciels : Krita & Photoshop.<br>
      Inspiration : motifs de tissage, nature de NTT.<br>
      Équipe : moi et l’IA lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "Parcours Réflexif d’Apprentissage & Expérimentation Visuelle",
    blender_para1: `
      <strong><u>Mon parcours en 3D</u></strong> a commencé à l’université,
      sans <em>base</em> préalable. J’ai appris avec intention, assisté par <strong>IA</strong>
      et références en ligne. C’était fatigant, mon ordinateur <em>ramait</em>,
      mais là j’ai trouvé le vrai sens de l’apprentissage.
    `,
    blender_para2: `
      Mes œuvres sont limitées, peu de modèles testés. Mais chaque essai est un <strong>expériment</strong>,
      pas seulement un résultat. À partir de croquis 2D simples, j’ai tenté de les exécuter en 3D.
      Cela m’a appris que la <strong>visualisation</strong> est un pont entre idées et réalité.
    `,
    blender_para3: `
      Pour moi, <strong><u>utiliser les médias 3D</u></strong> est essentiel en technologie éducative.
      Les modèles 3D aident à expliquer des concepts abstraits, à simuler et à enrichir l’apprentissage.
      Ce n’est pas seulement de l’art, mais aussi un <strong>outil pédagogique</strong>.
    `,
    blender_para4: `
      <strong><u>Le contexte local</u></strong> apporte des défis. À Kupang et NTT,
      l’accès limité aux appareils rend le 3D plus difficile. Mais chaque œuvre prouve
      que la technologie peut être utilisée <em>simplement</em> pour produire quelque chose de <strong>significatif</strong>.
    `,
    blender_para5: `
      Questions fondamentales :
      <strong><u>quoi</u></strong> atteindre,
      <strong><u>pourquoi</u></strong> c’est important,
      <strong><u>qui</u></strong> en bénéficiera,
      <strong><u>objectifs</u></strong>,
      <strong><u>cibles</u></strong>,
      <strong><u>précision</u></strong>, et
      <strong><u>problèmes</u></strong> à résoudre.
    `,
    blender_para6: `
      Avec cette approche, j’espère que chaque œuvre 3D ne sera pas seulement <em>pratique technique</em>,
      mais une contribution réelle basée sur <strong>identité locale</strong> et
      <strong>normes internationales</strong>.
    `,
    blender_figcaption: `
      <strong>Documentation des œuvres 3D</strong> créées avec <em>Blender</em> :
      des modèles simples jusqu’à l’éclairage et les textures réalistes.  
      <br><br>
      Tout est né de <strong><u>l’apprentissage autodidacte</u></strong> à l’université,
      avec <strong>IA</strong> et références. Honnêtement : mon ordinateur est basique,
      le rendu est lourd. Mais là l’apprentissage est réel :
      <strong>expérimentation</strong> et <strong>persévérance</strong>.  
      <br><br>
      Réflexion : comment un <strong>étudiant en Technologie Éducative</strong> voit le 3D
      comme moyen d’<u>visualiser, développer et créer</u> quelque chose de pertinent à Kupang et NTT.
    `,
    blender_fact_title: "Fait",
    blender_fact_desc: `
      Logiciel : Blender 3D.<br>
      Matériel : ordinateur portable basique.<br>
      Processus : croquis 2D → exécution 3D.<br>
      Équipe : moi et l’IA lol.
    `,

    // Speaking Section
    speaking_heading: "Prise de parole & Journalisme",
    speaking_subtitle: "Parcours Réflexif de Communication & Éducation Locale",
    speaking_para1: `
      <strong><u>Mon parcours en communication</u></strong> a commencé au lycée.
      Les présentations et l’écriture ont ouvert la porte à <strong>la prise de parole</strong> et au <strong>journalisme</strong>.
      Nerveux au début, mais chaque occasion était une <em>pratique</em> pour transmettre des idées clairement.
    `,
    speaking_para2: `
      À l’université, cela est devenu un <strong>approche académique</strong>.
      La prise de parole est devenue <strong>construction d’arguments</strong>,
      traitement de données et précision. Le journalisme est devenu
      <strong>collecte d’informations</strong> et narration pertinente.
    `,
    speaking_quote: `
      “La communication est le pont entre <strong>identité locale</strong> et <strong>normes globales</strong>.”
    `,
    speaking_para3: `
      <strong><u>L’éducation locale à Kupang et NTT</u></strong> apporte défis et opportunités.
      L’accès limité aux médias rend l’apprentissage plus difficile, mais prouve que les voix régionales
      peuvent apparaître au niveau national. La prise de parole et le journalisme sont des <em>outils pédagogiques</em>.
    `,
        speaking_para4: `
      Pour moi, l’essence est d’<strong><u>explorer, adapter et structurer</u></strong>
      l’information de manière pertinente pour l’éducation.
      Questions fondamentales :
      <strong><u>quoi</u></strong>, <strong><u>pourquoi</u></strong>,
      <strong><u>qui</u></strong>, et <strong><u>objectifs</u></strong>.
    `,
    speaking_para5: `
      Avec cette approche, j’espère que chaque travail de communication ne sera pas seulement <em>pratique technique</em>,
      mais une contribution réelle basée sur <strong>identité locale</strong> et
      <strong>normes internationales</strong>.
    `,
    speaking_figcaption: `
      <strong>Documentation des activités de prise de parole</strong> et de journalisme :
      du lycée, de l’université, jusqu’aux articles réflexifs sur l’éducation à NTT.  
      <br><br>
      Tout est né de <strong><u>l’apprentissage autodidacte</u></strong> et de l’expérience sur le terrain.
      Honnêtement : souvent nerveux, mais là l’apprentissage est réel.  
      <br><br>
      Réflexion : comment un <strong>étudiant en Technologie Éducative</strong> voit la communication
      comme moyen de <u>donner une voix</u> et de <u>construire des ponts</u>.
    `,
    speaking_fact_title: "Fait",
    speaking_fact_desc: `
      Début : devoirs au lycée.<br>
      Développement : université, approche académique.<br>
      Focus : éducation & identité locale.<br>
      Défi : médias limités.<br>
      Équipe : moi et l’IA.
    `,

    // Patreon Section
    patreon_heading: "Explorez davantage avec moi",
    patreon_intro: `
      KANG_SHUA n’est pas seulement une vitrine, mais un parcours expérimental académique et créatif.
      Grâce à Patreon, vous pouvez voir les coulisses, de nouvelles idées et des étapes vers
      des standards nationaux et internationaux.
    `,
    patreon_roadmap_title: "Mon parcours expérimental :",
    patreon_node1: "Expériences en programmation, art visuel et 3D",
    patreon_node2: "Apprentissage autodidacte assisté par IA",
    patreon_node3: "Réflexions sur le journalisme et la prise de parole",
    patreon_node4: "Mises à jour du parcours académique en Technologie Éducative",
    patreon_quote: "\"Chaque petit soutien est un grand investissement pour un avenir créatif et académique.\"",
    patreon_cta: "Rejoignez le parcours",

    // Footer
    footer_about_title: "À propos",
    footer_about_desc: `
      <strong>KANG_SHUA</strong> est une initiative personnelle combinant technologie,
      art et culture locale de NTT dans un format académique.
      Conçu pour répondre aux standards nationaux et concurrencer à l’international.
    `,
    footer_contact_title: "Contact",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>Étudiant en Technologie Éducative, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "Navigation",
    footer_nav_author: "Auteur",
    footer_nav_potensi: "Ce que je peux faire",
    footer_nav_coding: "Programmation",
    footer_nav_art: "Art",
    footer_nav_blender: "3D",
    footer_nav_speaking: "Prise de parole",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>Avertissement :</strong> Toutes les œuvres présentées sont le résultat d’expériences,
      d’apprentissage autodidacte et d’exploration académique. Elles ne représentent pas des institutions officielles,
      mais respectent les standards académiques nationaux et l’ouverture internationale.
    `,
    footer_copy: "© 2026 KANG_SHUA. Tous droits réservés."
  },

  de: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "Startseite",
    nav_author: "Autorenprofil",
    nav_potensi: "Was ich tun kann",
    nav_coding: "Programmierung",
    nav_art: "Visuell 2D",
    nav_blender: "3D Blender",
    nav_speaking: "Reden & Journalismus",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(Kunst und Wissenschaft vereint in der Bildung)",
    hero_cta: "Lerne mich kennen",

    // Author Section
    author_heading: "ICH",
    author_subtitle: "Student für Bildungstechnologie | Universitas Terbuka, FKIP 2024",
    author_intro: "Ich bin Joshua.gr.s, ein gewöhnlicher Student, der Bildungstechnologie an der Universitas Terbuka studiert.",
    author_story: "Obwohl ich noch keine offiziellen Erfolge habe, experimentiere ich aktiv und lerne autodidaktisch, oft mit Hilfe von KI und Referenzen. Meine Leidenschaften umfassen grundlegendes Programmieren, 2D‑Kunst, 3D‑Erkundung und Journalismus durch Reden und Interviews.",
    author_quote: "\"Ich glaube, jedes kleine Experiment ist ein Schritt zum Fortschritt der Menschheit.\"",
    author_passions_title: "Bereiche, die ich verfolge:",
    passion_coding: "Grundlegendes Programmieren (HTML, CSS, JS) — autodidaktisch, unterstützt durch KI",
    passion_art: "2D‑Kunst — zeichne seit meiner Kindheit",
    passion_blender: "3D‑Design — lerne Blender mit Referenzen und KI",
    passion_journalism: "Journalismus — Reden und Interviews seit der Oberstufe",

    // Potensi Section
    potensi_heading: "Was ich tun kann",
    potensi_coding_title: "Programmierung",
    potensi_coding_desc: "Interaktive Benutzeroberflächen mit HTML, CSS und JavaScript erstellen.",
    potensi_coding_fact: "Fakt: Ich begann erst im Studium mit dem Programmieren, autodidaktisch mit KI. Manchmal vergesse ich, manchmal erinnere ich mich.",
    potensi_art_title: "Kunst",
    potensi_art_desc: "Visuelles Branding mit kulturellem NTT‑Touch.",
    potensi_art_fact: "Fakt: Ich zeichne seit meiner Kindheit, aber die Ergebnisse sind gewöhnlich. Ehrlich, kein Profi.",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "3D‑Modellierung mit realistischer Beleuchtung und Texturen.",
    potensi_blender_fact: "Fakt: Wie beim Programmieren begann ich Blender im Studium, autodidaktisch + Referenzen + KI.",
    potensi_speaking_title: "Reden",
    potensi_speaking_desc: "Interviews und Präsentationen, um Ideen klar zu vermitteln.",
    potensi_speaking_fact: "Fakt: Gewöhnt seit der Oberstufe, oft Aufgaben mit Interviews & Präsentationen. Ziemlich selbstbewusst beim Sprechen.",
    potensi_journalism_title: "Journalismus",
    potensi_journalism_desc: "Lokale Identität durch Schreiben und Interviews ausdrücken.",
    potensi_journalism_fact: "Fakt: Noch keine offiziellen Erfolge, immer noch Experimente. Aber ich liebe Neues für den Fortschritt der Menschheit.",

    // Coding Section
    coding_heading: "Programmierungsprojekte",
    coding_subtitle: "Reflexiver Lernweg & Umsetzung",
    coding_para1: `
      <strong><u>Mein Programmierweg</u></strong> begann im Studium,
      autodidaktisch mit <em>Online‑Referenzen</em> und Hilfe von <strong>KI</strong>.
      Projekte: <em>E‑Commerce</em>, Hotelsysteme, persönliche Portfolios,
      und das schwierigste: <strong><u>LMS (Learning Management System)</u></strong>.
    `,
    coding_para2: `
      Ich erkenne, dass meine Fähigkeiten noch <em>grundlegend</em> sind.
      Komplexe Sprachen vergesse ich oft, aber bei <strong>realer Umsetzung</strong>
      fühle ich mich vorbereitet. Das nenne ich <em>technische Denkweise</em>:
      Fokus darauf, wie etwas <strong>gemacht</strong> und <strong>funktioniert</strong>.
    `,
    coding_para3: `
      In <strong>UI/UX</strong>, <strong>Daten</strong> und <strong>Inhalten</strong> bin ich zuversichtlich.
      Für mich ist die Essenz der Bildungstechnologie,
      <strong><u>etwas zu nutzen, zu entwickeln und zu schaffen</u></strong>,
      das für die Gesellschaft relevant ist.
    `,
    coding_para4: `
      <strong><u>Lokaler Kontext</u></strong> ist wichtig. Kupang und NTT bringen Herausforderungen:
      begrenzter Zugang zu Technologie, Bedarf an inklusiven Online‑Systemen,
      und der Antrieb für <em>praktische</em> und <em>nachhaltige</em> Lösungen.
      Jedes Projekt ist nicht nur technisch, sondern auch <strong>praktische Umsetzung</strong> und soziale Relevanz.
    `,
    coding_para5: `
      Grundfragen:
      <strong><u>was</u></strong> ich erreichen will,
      <strong><u>warum</u></strong> es wichtig ist,
      <strong><u>wer</u></strong> profitiert,
      <strong><u>Ziele</u></strong>,
      <strong><u>realistische Ziele</u></strong>,
      <strong><u>Präzision</u></strong>, und
      <strong><u>Probleme</u></strong> zu lösen.
    `,
    coding_para6: `
      Mit diesem Ansatz hoffe ich, dass jedes Programmierwerk nicht nur <em>technische Übung</em> ist,
      sondern ein echter Beitrag basierend auf <strong>lokaler Identität</strong> und
      <strong>internationalen Standards</strong>.
    `,
    coding_figcaption: `
      <strong>Dokumentation von Frontend‑Projekten</strong> mit Screenshots:
      <em>E‑Commerce</em>, Hotelsysteme, Portfolios, bis hin zum <strong>LMS</strong>.  
      <br><br>
      Alles entstand durch <strong><u>autodidaktisches Lernen</u></strong> im Studium,
      mit <em>Online‑Referenzen</em> und Hilfe von <strong>KI</strong>.
      Ehrlich: oft <em>vergesse ich meinen eigenen Code</em>, wiederhole.
      Aber genau da ist Lernen real: <strong>Experiment</strong> und <strong>Praxis</strong>.  
      <br><br>
      Reflexion: wie ein <strong>Bildungstechnologie‑Student</strong> Programmieren sieht
      als Weg, <u>zu nutzen, zu entwickeln und zu schaffen</u> für Kupang und NTT.
    `,
    coding_fact_title: "Fakt",
    coding_fact_desc: `
      Webentwicklung, Tests, Entwicklung machen Spaß lol.<br>
      Nur 2 Geräte genutzt.<br>
      Software: Visual Studio Code.<br>
      Team: ich und KI lol.
    `,

    // Art Section
    art_heading: "Kunst 2D",
    art_subtitle: "Reflexiver visueller Weg & kulturelle Erkundung",
    art_para1: `
      <strong><u>Mein Weg in 2D‑Kunst</u></strong> begann in der Kindheit,
      mit einfachen Zeichnungen. Später experimentierte ich mit <em>digitaler Kunst</em> und <em>Comics</em>,
      während ich die <strong>NTT‑Kultur</strong> als visuelle Identität trug.
    `,
    art_para2: `
      Meine Werke sind noch <em>gewöhnlich</em>, nicht spektakulär.
      Aber jeder Strich ist ein <strong>Experiment</strong>, nicht nur Ergebnis.
      Ich konzentriere mich darauf, wie Kunst <strong>Geschichten erzählen</strong> und <strong>funktionieren</strong> kann.
    `,
    art_para3: `
      In <strong>Layout</strong>, <strong>Farben</strong> und <strong>visueller Erzählung</strong> bin ich sicherer.
      Für mich ist Kunst nicht nur Ästhetik, sondern
      <strong><u>etwas zu nutzen, zu entwickeln und zu schaffen</u></strong>, das relevant ist.
    `,
        art_para4: `
      <strong><u>Lokaler Kontext</u></strong> inspiriert: Kupang und NTT mit Webmustern,
      traditionellen Symbolen und Alltagsgeschichten. Die Herausforderung ist,
      all dies in <em>moderne</em> und zugleich <em>verwurzelte</em> Werke zu verwandeln.
    `,
    art_para5: `
      Grundfragen:
      <strong><u>was</u></strong> ausdrücken,
      <strong><u>warum</u></strong> es wichtig ist,
      <strong><u>wer</u></strong> es spürt,
      <strong><u>Ziele</u></strong>,
      <strong><u>realistische Ziele</u></strong>,
      <strong><u>Präzision</u></strong>, und
      <strong><u>Geschichte</u></strong> zum Leben erwecken.
    `,
    art_para6: `
      Mit diesem Ansatz hoffe ich, dass jede 2D‑Arbeit nicht nur <em>visuelle Übung</em> ist,
      sondern ein echter Beitrag basierend auf <strong>lokaler Identität</strong> und
      <strong>internationalen Standards</strong>.
    `,
    art_figcaption: `
      <strong>Dokumentation visueller Arbeiten</strong> meines Weges:
      von <em>einfachen Comics</em>, digitalen Illustrationen bis zur Erkundung von
      <strong>NTT‑Webmustern</strong>.  
      <br><br>
      Alles entstand durch <strong><u>autodidaktisches Lernen</u></strong> seit meiner Kindheit,
      mit vielen <em>Experimenten</em> und Hilfe von <strong>KI</strong>.
      Ehrlich: oft empfinde ich meine Werke als <em>gewöhnlich</em>, wiederhole vieles.
      Aber genau da ist Lernen real: <strong>Geschichte</strong> und <strong>Identität</strong>.  
      <br><br>
      Reflexion: wie ein <strong>Bildungstechnologie‑Student</strong> Kunst sieht
      als Weg, <u>zu nutzen, zu entwickeln und zu schaffen</u> für Kupang und NTT.
    `,
    art_fact_title: "Fakt",
    art_fact_desc: `
      Medien: Bleistift, Tinte, Grafiktablett.<br>
      Software: Krita & Photoshop.<br>
      Inspiration: Webmuster, Natur von NTT.<br>
      Team: ich und KI lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "Reflexiver Lernweg & visuelles Experiment",
    blender_para1: `
      <strong><u>Mein Weg in 3D</u></strong> begann im Studium,
      ohne <em>Grundlagen</em>. Ich lernte mit Absicht, unterstützt von <strong>KI</strong>
      und Online‑Referenzen. Es war anstrengend, mein Laptop <em>hängte</em> oft,
      aber genau da fand ich den Sinn des Lernens.
    `,
    blender_para2: `
      Meine Werke sind begrenzt, nur wenige Modelle. Aber jeder Versuch ist ein <strong>Experiment</strong>,
      nicht nur Ergebnis. Von einfachen 2D‑Skizzen versuchte ich, sie in Blender in 3D umzusetzen.
      Das lehrte mich, dass <strong>Visualisierung</strong> eine Brücke zwischen Idee und Realität ist.
    `,
    blender_para3: `
      Für mich ist <strong><u>die Nutzung von 3D‑Medien</u></strong> wichtig in der Bildungstechnologie.
      3D‑Modelle helfen, abstrakte Konzepte zu erklären, Simulationen zu bieten und Lernen zu bereichern.
      Es ist nicht nur Kunst, sondern auch ein <strong>pädagogisches Werkzeug</strong>.
    `,
    blender_para4: `
      <strong><u>Lokaler Kontext</u></strong> bringt Herausforderungen. In Kupang und NTT
      erschwert begrenzter Gerätezugang das 3D‑Lernen. Aber jede Arbeit beweist,
      dass Technologie auch <em>einfach</em> genutzt werden kann, um etwas <strong>Bedeutsames</strong> zu schaffen.
    `,
    blender_para5: `
      Grundfragen:
      <strong><u>was</u></strong> erreichen,
      <strong><u>warum</u></strong> es wichtig ist,
      <strong><u>wer</u></strong> profitiert,
      <strong><u>Ziele</u></strong>,
      <strong><u>realistische Ziele</u></strong>,
      <strong><u>Präzision</u></strong>, und
      <strong><u>Probleme</u></strong> lösen.
    `,
    blender_para6: `
      Mit diesem Ansatz hoffe ich, dass jede 3D‑Arbeit nicht nur <em>technische Übung</em> ist,
      sondern ein echter Beitrag basierend auf <strong>lokaler Identität</strong> und
      <strong>internationalen Standards</strong>.
    `,
    blender_figcaption: `
      <strong>Dokumentation von 3D‑Arbeiten</strong> mit <em>Blender</em>:
      von einfachen Modellen bis zu realistischen Licht‑ und Texturversuchen.  
      <br><br>
      Alles entstand durch <strong><u>autodidaktisches Lernen</u></strong> im Studium,
      mit <strong>KI</strong> und Referenzen. Ehrlich: mein Laptop ist einfach,
      Rendering ist schwer. Aber genau da ist Lernen real:
      <strong>Experiment</strong> und <strong>Ausdauer</strong>.  
      <br><br>
      Reflexion: wie ein <strong>Bildungstechnologie‑Student</strong> 3D sieht
      als Weg, <u>zu visualisieren, zu entwickeln und zu schaffen</u> für Kupang und NTT.
    `,
    blender_fact_title: "Fakt",
    blender_fact_desc: `
      Software: Blender 3D.<br>
      Hardware: einfacher Laptop.<br>
      Ablauf: 2D‑Skizze → 3D‑Umsetzung.<br>
      Team: ich und KI lol.
    `,

    // Speaking Section
    speaking_heading: "Reden & Journalismus",
    speaking_subtitle: "Reflexiver Kommunikationsweg & lokale Bildung",
    speaking_para1: `
      <strong><u>Mein Kommunikationsweg</u></strong> begann in der Oberstufe.
      Präsentationen und Schreiben öffneten die Tür zu <strong>Reden</strong> und <strong>Journalismus</strong>.
      Anfangs nervös, aber jede Gelegenheit war <em>Übung</em>, um Ideen klar zu vermitteln.
    `,
    speaking_para2: `
      Im Studium wurde es ein <strong>akademischer Ansatz</strong>.
      Reden bedeutete <strong>Argumente aufbauen</strong>, Daten verarbeiten und präzise präsentieren.
      Journalismus wurde <strong>Informationssammlung</strong> und relevante Narrative.
    `,
    speaking_quote: `
      “Kommunikation ist die Brücke zwischen <strong>lokaler Identität</strong> und <strong>globalen Standards</strong>.”
    `,
    speaking_para3: `
      <strong><u>Lokale Bildung in Kupang und NTT</u></strong> bringt Herausforderungen und Chancen.
      Begrenzter Medienzugang erschwert das Lernen, aber beweist, dass regionale Stimmen
      national erscheinen können. Reden und Journalismus sind <em>pädagogische Werkzeuge</em>.
    `,
    speaking_para4: `
      Für mich ist die Essenz, <strong><u>Informationen zu erkunden, anzupassen und zu strukturieren</u></strong>,
      damit sie für die Bildung relevant sind. Grundfragen:
      <strong><u>was</u></strong>, <strong><u>warum</u></strong>,
      <strong><u>wer</u></strong>, und <strong><u>Ziele</u></strong>.
    `,
    speaking_para5: `
      Mit diesem Ansatz hoffe ich, dass jede Kommunikationsarbeit nicht nur <em>technische Übung</em> ist,
      sondern ein echter Beitrag basierend auf <strong>lokaler Identität</strong> und
      <strong>internationalen Standards</strong>.
    `,
    speaking_figcaption: `
      <strong>Dokumentation von Reden</strong> und Journalismus:
      von Schulaufgaben, Studium bis zu reflektierenden Artikeln über Bildung in NTT.  
      <br><br>
      Alles entstand durch <strong><u>autodidaktisches Lernen</u></strong> und Felderfahrung.
      Ehrlich: oft nervös, aber genau da ist Lernen real.  
      <br><br>
      Reflexion: wie ein <strong>Bildungstechnologie‑Student</strong> Kommunikation sieht
      als Weg, <u>Identität auszudrücken</u> und <u>Brücken zu bauen</u>.
    `,
    speaking_fact_title: "Fakt",
        speaking_fact_desc: `
      Anfang: Aufgaben in der Oberstufe.<br>
      Entwicklung: Studium, akademischer Ansatz.<br>
      Fokus: Bildung & lokale Identität.<br>
      Herausforderung: begrenzte Medien & Technologie.<br>
      Team: ich und KI.
    `,

    // Patreon Section
    patreon_heading: "Entdecke mehr mit mir",
    patreon_intro: `
      KANG_SHUA ist nicht nur eine Ausstellung, sondern ein akademischer und kreativer Experimentierweg.
      Über Patreon kannst du die Prozesse hinter den Kulissen, neue Ideen und kleine Schritte
      hin zu nationalen und internationalen Standards sehen.
    `,
    patreon_roadmap_title: "Mein experimenteller Weg:",
    patreon_node1: "Experimente in Programmierung, visueller Kunst und 3D",
    patreon_node2: "Autodidaktisches Lernen mit Unterstützung von KI",
    patreon_node3: "Reflexionen über Journalismus & Reden",
    patreon_node4: "Updates zum akademischen Weg in Bildungstechnologie",
    patreon_quote: "\"Jede kleine Unterstützung ist eine große Investition in eine kreative und akademische Zukunft.\"",
    patreon_cta: "Begleite den Weg",

    // Footer
    footer_about_title: "Über",
    footer_about_desc: `
      <strong>KANG_SHUA</strong> ist eine persönliche Initiative, die Technologie,
      Kunst und lokale NTT‑Kultur in einem akademischen Format kombiniert.
      Entworfen, um nationale Standards zu erfüllen und international zu konkurrieren.
    `,
    footer_contact_title: "Kontakt",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>Student für Bildungstechnologie, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "Navigation",
    footer_nav_author: "Autor",
    footer_nav_potensi: "Was ich tun kann",
    footer_nav_coding: "Programmierung",
    footer_nav_art: "Kunst",
    footer_nav_blender: "3D",
    footer_nav_speaking: "Reden",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>Haftungsausschluss:</strong> Alle gezeigten Werke sind Ergebnisse von Experimenten,
      autodidaktischem Lernen und akademischer Erkundung. Sie repräsentieren keine offiziellen Institutionen,
      sondern verpflichten sich zu nationalen akademischen Standards und internationaler Offenheit.
    `,
    footer_copy: "© 2026 KANG_SHUA. Alle Rechte vorbehalten."
  },

  nl: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "Home",
    nav_author: "Auteurprofiel",
    nav_potensi: "Wat ik kan doen",
    nav_coding: "Programmeren",
    nav_art: "Visueel 2D",
    nav_blender: "3D Blender",
    nav_speaking: "Publiek Spreken & Journalistiek",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(Kunst en Wetenschap verenigd in Onderwijs)",
    hero_cta: "Leer mij kennen",

    // Author Section
    author_heading: "IK",
    author_subtitle: "Student Onderwijstechnologie | Universitas Terbuka, FKIP 2024",
    author_intro: "Ik ben Joshua.gr.s, een gewone student die Onderwijstechnologie studeert aan de Universitas Terbuka.",
    author_story: "Hoewel ik nog geen officiële prestaties heb, experimenteer en leer ik autodidactisch, vaak met hulp van AI en referenties. Mijn passies zijn basisprogrammeren, 2D‑kunst, 3D‑exploratie en journalistiek via spreken en interviews.",
    author_quote: "\"Ik geloof dat elk klein experiment een stap is naar menselijke vooruitgang.\"",
    author_passions_title: "Velden die ik beoefen:",
    passion_coding: "Basisprogrammeren (HTML, CSS, JS) — autodidactisch, met hulp van AI",
    passion_art: "2D‑kunst — tekenen sinds mijn jeugd",
    passion_blender: "3D‑ontwerp — Blender leren met referenties en AI",
    passion_journalism: "Journalistiek — spreken en interviews sinds de middelbare school",

    // Potensi Section
    potensi_heading: "Wat ik kan doen",
    potensi_coding_title: "Programmeren",
    potensi_coding_desc: "Interactieve UI’s bouwen met HTML, CSS en JavaScript.",
    potensi_coding_fact: "Feit: Ik begon pas met programmeren op de universiteit, autodidactisch met AI. Soms vergeet ik, soms herinner ik me.",
    potensi_art_title: "Kunst",
    potensi_art_desc: "Visuele branding met een NTT‑culturele touch.",
    potensi_art_fact: "Feit: Ik teken sinds mijn jeugd, maar de resultaten zijn gewoon. Eerlijk, geen professional.",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "3D‑modellering met realistische belichting en texturen.",
    potensi_blender_fact: "Feit: Net als programmeren begon ik Blender op de universiteit, autodidactisch + referenties + AI.",
    potensi_speaking_title: "Publiek Spreken",
    potensi_speaking_desc: "Interviews en presentaties om ideeën duidelijk over te brengen.",
    potensi_speaking_fact: "Feit: Gewend sinds de middelbare school, vaak opdrachten met interviews & presentaties. Redelijk zelfverzekerd in het openbaar.",
    potensi_journalism_title: "Journalistiek",
    potensi_journalism_desc: "Lokale identiteit uitdrukken via schrijven en interviews.",
    potensi_journalism_fact: "Feit: Nog geen officiële prestaties, nog steeds experimenteren. Maar ik hou van nieuwe dingen voor menselijke vooruitgang.",

    // Coding Section
    coding_heading: "Programme projecten",
    coding_subtitle: "Reflectieve Leerreis & Implementatie",
    coding_para1: `
      <strong><u>Mijn programmeerreis</u></strong> begon op de universiteit,
      autodidactisch met <em>online referenties</em> en hulp van <strong>AI</strong>.
      Projecten: <em>e‑commerce</em>, hotelsystemen, persoonlijke portfolio’s,
      en het meest uitdagende: <strong><u>LMS (Learning Management System)</u></strong>.
    `,
    coding_para2: `
      Ik besef dat mijn vaardigheden nog <em>basis</em> zijn.
      Complexe talen vergeet ik vaak, maar bij <strong>echte implementatie</strong>
      voel ik me voorbereid. Dit noem ik een <em>technische mindset</em>:
      focussen op hoe iets <strong>gemaakt</strong> en <strong>werkt</strong>.
    `,
    coding_para3: `
      In <strong>UI/UX</strong>, <strong>data</strong> en <strong>inhoud</strong> ben ik zelfverzekerd.
      Voor mij is de essentie van onderwijstechnologie
      <strong><u>gebruiken, ontwikkelen en creëren</u></strong> wat relevant is voor de samenleving.
    `,
    coding_para4: `
      <strong><u>Lokale context</u></strong> is belangrijk. Kupang en NTT brengen uitdagingen:
      beperkte toegang tot technologie, behoefte aan inclusieve online systemen,
      en de drang naar <em>praktische</em> en <em>duurzame</em> oplossingen.
      Elk project is niet alleen technisch, maar ook <strong>praktische uitvoering</strong> en sociale relevantie.
    `,
    coding_para5: `
      Fundamentele vragen:
      <strong><u>wat</u></strong> ik wil bereiken,
      <strong><u>waarom</u></strong> het belangrijk is,
      <strong><u>wie</u></strong> profiteert,
      <strong><u>doelen</u></strong>,
      <strong><u>realistische doelen</u></strong>,
      <strong><u>precisie</u></strong>, en
      <strong><u>problemen</u></strong> oplossen.
    `,
    coding_para6: `
      Met deze aanpak hoop ik dat elk programmeerwerk niet alleen <em>technische oefening</em> is,
      maar een echte bijdrage gebaseerd op <strong>lokale identiteit</strong> en
      <strong>internationale standaarden</strong>.
    `,
    coding_figcaption: `
      <strong>Documentatie van front‑end projecten</strong> met screenshots:
      <em>e‑commerce</em>, hotelsystemen, portfolio’s, tot het <strong>LMS</strong>.  
      <br><br>
      Alles ontstond door <strong><u>autodidactisch leren</u></strong> op de universiteit,
      met <em>online referenties</em> en hulp van <strong>AI</strong>.
      Eerlijk: vaak <em>vergat ik mijn eigen code</em>, herhaalde ik.
      Maar daar is leren echt: <strong>experiment</strong> en <strong>praktijk</strong>.  
      <br><br>
      Reflectie: hoe een <strong>student Onderwijstechnologie</strong> programmeren ziet
      als manier om <u>te gebruiken, te ontwikkelen en te creëren</u> voor Kupang en NTT.
    `,
    coding_fact_title: "Feit",
    coding_fact_desc: `
      Webontwikkeling, testen, bouwen is leuk lol.<br>
      Slechts 2 apparaten gebruikt.<br>
      Software: Visual Studio Code.<br>
      Team: ik en AI lol.
    `,

    // Art Section
    art_heading: "Kunst 2D",
    art_subtitle: "Reflectieve Visuele Reis & Culturele Verkenning",
    art_para1: `
      <strong><u>Mijn reis in 2D‑kunst</u></strong> begon in mijn jeugd,
      met eenvoudige tekeningen. Later experimenteerde ik met <em>digitale kunst</em> en <em>strips</em>,
      terwijl ik de <strong>NTT‑cultuur</strong> als visuele identiteit droeg.
    `,
    art_para2: `
      Mijn werken zijn nog <em>gewoon</em>, niet spectaculair.
      Maar elke lijn is een <strong>experiment</strong>, niet alleen resultaat.
      Ik focus op hoe kunst <strong>verhalen kan vertellen</strong> en <strong>functioneren</strong>.
    `,
    art_para3: `
      In <strong>lay‑out</strong>, <strong>kleuren</strong> en <strong>visuele narratief</strong> ben ik zelfverzekerd.
      Voor mij is kunst niet alleen esthetiek, maar
      <strong><u>gebruiken, ontwikkelen en creëren</u></strong> wat relevant is.
    `,
    art_para4: `
      <strong><u>Lokale context</u></strong> inspireert: Kupang en NTT met weefpatronen,
      traditionele symbolen en dagelijkse verhalen. De uitdaging is dit om te zetten in
      <em>moderne</em> en <em>gewortelde</em> werken.
    `,
        art_para5: `
      Fundamentele vragen:
      <strong><u>wat</u></strong> uitdrukken,
      <strong><u>waarom</u></strong> het belangrijk is,
      <strong><u>wie</u></strong> het ervaart,
      <strong><u>doelen</u></strong>,
      <strong><u>realistische doelen</u></strong>,
      <strong><u>precisie</u></strong>, en
      <strong><u>verhaal</u></strong> tot leven brengen.
    `,
    art_para6: `
      Met deze aanpak hoop ik dat elke 2D‑kunst niet alleen <em>visuele oefening</em> is,
      maar een echte bijdrage gebaseerd op <strong>lokale identiteit</strong> en
      <strong>internationale standaarden</strong>.
    `,
    art_figcaption: `
      <strong>Documentatie van visuele werken</strong> die mijn reis samenvatten:
      van <em>eenvoudige strips</em>, digitale illustraties tot de verkenning van
      <strong>NTT‑weefpatronen</strong>.  
      <br><br>
      Alles ontstond door <strong><u>autodidactisch leren</u></strong> sinds mijn jeugd,
      met veel <em>experimenten</em> en hulp van <strong>AI</strong>.
      Eerlijk: vaak vind ik mijn werken <em>gewoon</em>, herhaal ik veel.
      Maar daar is leren echt: <strong>verhaal</strong> en <strong>identiteit</strong>.  
      <br><br>
      Reflectie: hoe een <strong>student Onderwijstechnologie</strong> kunst ziet
      als manier om <u>te gebruiken, te ontwikkelen en te creëren</u> voor Kupang en NTT.
    `,
    art_fact_title: "Feit",
    art_fact_desc: `
      Media: potlood, inkt, digitale tablet.<br>
      Software: Krita & Photoshop.<br>
      Inspiratie: weefpatronen, natuur van NTT.<br>
      Team: ik en AI lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "Reflectieve Leerreis & Visueel Experiment",
    blender_para1: `
      <strong><u>Mijn reis in 3D</u></strong> begon op de universiteit,
      zonder <em>basis</em>. Ik leerde bewust, ondersteund door <strong>AI</strong>
      en online referenties. Het was zwaar, mijn laptop <em>liep vast</em>,
      maar daar vond ik de betekenis van leren.
    `,
    blender_para2: `
      Mijn werken zijn beperkt, slechts enkele modellen. Maar elke poging is een <strong>experiment</strong>,
      niet alleen resultaat. Van eenvoudige 2D‑schetsen probeerde ik ze in 3D uit te voeren.
      Dat leerde me dat <strong>visualisatie</strong> een brug is tussen idee en realiteit.
    `,
    blender_para3: `
      Voor mij is <strong><u>het gebruik van 3D‑media</u></strong> belangrijk in onderwijstechnologie.
      3D‑modellen helpen abstracte concepten uit te leggen, simulaties te bieden en leren te verrijken.
      Het is niet alleen kunst, maar ook een <strong>pedagogisch hulpmiddel</strong>.
    `,
    blender_para4: `
      <strong><u>Lokale context</u></strong> brengt uitdagingen. In Kupang en NTT
      maakt beperkte toegang tot apparaten 3D moeilijker. Maar elk werk bewijst
      dat technologie <em>eenvoudig</em> kan worden gebruikt om iets <strong>betekenisvols</strong> te creëren.
    `,
    blender_para5: `
      Fundamentele vragen:
      <strong><u>wat</u></strong> bereiken,
      <strong><u>waarom</u></strong> het belangrijk is,
      <strong><u>wie</u></strong> profiteert,
      <strong><u>doelen</u></strong>,
      <strong><u>realistische doelen</u></strong>,
      <strong><u>precisie</u></strong>, en
      <strong><u>problemen</u></strong> oplossen.
    `,
    blender_para6: `
      Met deze aanpak hoop ik dat elk 3D‑werk niet alleen <em>technische oefening</em> is,
      maar een echte bijdrage gebaseerd op <strong>lokale identiteit</strong> en
      <strong>internationale standaarden</strong>.
    `,
    blender_figcaption: `
      <strong>Documentatie van 3D‑werken</strong> gemaakt met <em>Blender</em>:
      van eenvoudige modellen tot realistische belichting en texturen.  
      <br><br>
      Alles ontstond door <strong><u>autodidactisch leren</u></strong> op de universiteit,
      met <strong>AI</strong> en referenties. Eerlijk: mijn laptop is eenvoudig,
      renderen is zwaar. Maar daar is leren echt:
      <strong>experiment</strong> en <strong>doorzettingsvermogen</strong>.  
      <br><br>
      Reflectie: hoe een <strong>student Onderwijstechnologie</strong> 3D ziet
      als manier om <u>te visualiseren, te ontwikkelen en te creëren</u> voor Kupang en NTT.
    `,
    blender_fact_title: "Feit",
    blender_fact_desc: `
      Software: Blender 3D.<br>
      Hardware: eenvoudige laptop.<br>
      Proces: 2D‑schets → 3D‑uitvoering.<br>
      Team: ik en AI lol.
    `,

    // Speaking Section
    speaking_heading: "Publiek Spreken & Journalistiek",
    speaking_subtitle: "Reflectieve Communicatie & Lokale Educatie",
    speaking_para1: `
      <strong><u>Mijn communicatiepad</u></strong> begon op de middelbare school.
      Presentaties en schrijven openden de deur naar <strong>publiek spreken</strong> en <strong>journalistiek</strong>.
      In het begin zenuwachtig, maar elke kans was <em>oefening</em> om ideeën duidelijk te brengen.
    `,
    speaking_para2: `
      Op de universiteit werd het een <strong>academische aanpak</strong>.
      Publiek spreken werd <strong>argumenten opbouwen</strong>, data verwerken en precies presenteren.
      Journalistiek werd <strong>informatie verzamelen</strong> en relevante verhalen bouwen.
    `,
    speaking_quote: `
      “Communicatie is de brug tussen <strong>lokale identiteit</strong> en <strong>wereldwijde standaarden</strong>.”
    `,
    speaking_para3: `
      <strong><u>Lokale educatie in Kupang en NTT</u></strong> brengt uitdagingen en kansen.
      Beperkte toegang tot media maakt leren moeilijker, maar bewijst dat regionale stemmen
      nationaal kunnen verschijnen. Publiek spreken en journalistiek zijn <em>pedagogische hulpmiddelen</em>.
    `,
    speaking_para4: `
      Voor mij is de essentie <strong><u>informatie verkennen, aanpassen en structureren</u></strong>
      die relevant is voor onderwijs. Fundamentele vragen:
      <strong><u>wat</u></strong>, <strong><u>waarom</u></strong>,
      <strong><u>wie</u></strong>, en <strong><u>doelen</u></strong>.
    `,
    speaking_para5: `
      Met deze aanpak hoop ik dat elke communicatie niet alleen <em>technische oefening</em> is,
      maar een echte bijdrage gebaseerd op <strong>lokale identiteit</strong> en
      <strong>internationale standaarden</strong>.
    `,
    speaking_figcaption: `
      <strong>Documentatie van spreken</strong> en journalistiek:
      van middelbare school, universiteit tot reflectieve artikelen.  
      <br><br>
      Alles ontstond door <strong><u>autodidactisch leren</u></strong> en praktijkervaring.
      Eerlijk: vaak zenuwachtig, maar daar is leren echt.  
      <br><br>
      Reflectie: hoe een <strong>student Onderwijstechnologie</strong> communicatie ziet
      als manier om <u>identiteit te uiten</u> en <u>bruggen te bouwen</u>.
    `,
    speaking_fact_title: "Feit",
    speaking_fact_desc: `
      Start: middelbare school opdrachten.<br>
      Ontwikkeling: universiteit, academische aanpak.<br>
      Focus: onderwijs & lokale identiteit.<br>
      Uitdaging: beperkte media.<br>
      Team: ik en AI.
    `,

        // Patreon Section
    patreon_heading: "Ontdek meer met mij",
    patreon_intro: `
      KANG_SHUA is niet alleen een showcase, maar een academische en creatieve experimenteerreis.
      Via Patreon kun je achter de schermen kijken, nieuwe ideeën zien en stappen naar
      nationale en internationale standaarden volgen.
    `,
    patreon_roadmap_title: "Mijn experimentele reis:",
    patreon_node1: "Experimenten in programmeren, visuele kunst en 3D",
    patreon_node2: "Autodidactisch leren met hulp van AI",
    patreon_node3: "Reflecties over journalistiek & spreken",
    patreon_node4: "Updates over mijn academische reis in Onderwijstechnologie",
    patreon_quote: "\"Elke kleine steun is een grote investering in een creatieve en academische toekomst.\"",
    patreon_cta: "Doe mee met de reis",

    // Footer
    footer_about_title: "Over",
    footer_about_desc: `
      <strong>KANG_SHUA</strong> is een persoonlijke initiatief die technologie,
      kunst en lokale NTT‑cultuur combineert in een academisch format.
      Ontworpen om nationale standaarden te halen en internationaal mee te doen.
    `,
    footer_contact_title: "Contact",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>Student Onderwijstechnologie, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "Navigatie",
    footer_nav_author: "Auteur",
    footer_nav_potensi: "Wat ik kan doen",
    footer_nav_coding: "Programmeren",
    footer_nav_art: "Kunst",
    footer_nav_blender: "3D",
    footer_nav_speaking: "Spreken",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>Disclaimer:</strong> Alle getoonde werken zijn resultaten van experimenten,
      autodidactisch leren en academische verkenning. Ze vertegenwoordigen geen officiële instellingen,
      maar zijn toegewijd aan nationale academische standaarden en internationale openheid.
    `,
    footer_copy: "© 2026 KANG_SHUA. Alle rechten voorbehouden."
  },


  ja: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "ホーム",
    nav_author: "著者プロフィール",
    nav_potensi: "できること",
    nav_coding: "プログラミング",
    nav_art: "ビジュアル 2D",
    nav_blender: "3D Blender",
    nav_speaking: "スピーキング & ジャーナリズム",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(芸術と科学が教育に結合する)",
    hero_cta: "私を知る",

    // Author Section
    author_heading: "私",
    author_subtitle: "教育技術専攻 | Universitas Terbuka, FKIP 2024",
    author_intro: "私は Joshua.gr.s、Universitas Terbuka で教育技術を学ぶ普通の学生です。",
    author_story: "まだ公式な成果はありませんが、AIや参考資料を活用しながら独学で実験し学んでいます。情熱は基礎的なプログラミング、2Dアート、3D探求、スピーキングやインタビューを通じたジャーナリズムです。",
    author_quote: "「小さな実験も人類の進歩への一歩だと信じています。」",
    author_passions_title: "取り組んでいる分野:",
    passion_coding: "基礎プログラミング (HTML, CSS, JS) — 独学、AIの助けあり",
    passion_art: "2Dアート — 幼少期から描画",
    passion_blender: "3Dデザイン — Blenderを参照とAIで学習",
    passion_journalism: "ジャーナリズム — 高校からスピーキングとインタビュー",

    // Potensi Section
    potensi_heading: "できること",
    potensi_coding_title: "プログラミング",
    potensi_coding_desc: "HTML, CSS, JavaScript を使ったインタラクティブなUI構築。",
    potensi_coding_fact: "事実: 大学でプログラミングを始め、AIで独学。忘れることもあれば思い出すこともある。",
    potensi_art_title: "アート",
    potensi_art_desc: "NTT文化を取り入れたビジュアルブランディング。",
    potensi_art_fact: "事実: 幼少期から描画が好きだが、結果は普通。正直に言えばプロではない。",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "リアルな照明とテクスチャを持つ3Dモデリング。",
    potensi_blender_fact: "事実: プログラミングと同様、大学でBlenderを始め、独学 + 参照 + AI。",
    potensi_speaking_title: "スピーキング",
    potensi_speaking_desc: "アイデアを明確に伝えるためのインタビューとプレゼンテーション。",
    potensi_speaking_fact: "事実: 高校以来慣れており、インタビューやプレゼン課題が多かった。人前で話すのに自信あり。",
    potensi_journalism_title: "ジャーナリズム",
    potensi_journalism_desc: "執筆やインタビューを通じて地域のアイデンティティを表現。",
    potensi_journalism_fact: "事実: まだ公式な成果はないが、実験を続けている。人類の進歩のために新しいことを楽しむ。",

    // Coding Section
    coding_heading: "プログラミングプロジェクト",
    coding_subtitle: "学習と実装の反省的な旅",
    coding_para1: `
      <strong><u>私のプログラミングの旅</u></strong>は大学から始まり、
      <em>オンライン参照</em>と<strong>AI</strong>の助けで独学しました。
      プロジェクト: <em>eコマース</em>、ホテルシステム、個人ポートフォリオ、
      最も難しいのは <strong><u>LMS (学習管理システム)</u></strong>。
    `,
    coding_para2: `
      私のスキルはまだ<em>基礎的</em>です。
      複雑な言語はよく忘れますが、<strong>実際の実装</strong>では準備ができています。
      これは<em>技術的思考</em>と呼びます: どうやって<strong>作り</strong>、どう<strong>機能する</strong>かに集中。
    `,
    coding_para3: `
      <strong>UI/UX</strong>、<strong>データ</strong>、<strong>コンテンツ</strong>に自信があります。
      教育技術の本質は
      <strong><u>使い、開発し、創造する</u></strong>ことです。
    `,
    coding_para4: `
      <strong><u>地域の文脈</u></strong>も重要です。KupangやNTTは挑戦をもたらします:
      技術へのアクセス制限、包括的なシステムの必要性、
      <em>実用的</em>かつ<em>持続可能</em>な解決策。
      各プロジェクトは技術的だけでなく、<strong>現場での実行</strong>と社会的関連性も含みます。
    `,
    coding_para5: `
      基本的な問い:
      <strong><u>何を</u></strong>達成するか、
      <strong><u>なぜ</u></strong>重要か、
      <strong><u>誰が</u></strong>恩恵を受けるか、
      <strong><u>目標</u></strong>,
      <strong><u>精度</u></strong>, 
      <strong><u>課題</u></strong>を解決する。
    `,
    coding_para6: `
      このアプローチで、各プログラミング作品が単なる<em>技術的練習</em>ではなく、
      <strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>に基づく真の貢献になることを望みます。
    `,
    coding_figcaption: `
      <strong>フロントエンドプロジェクトのドキュメント</strong> スクリーンショットまとめ:
      <em>eコマース</em>、ホテルシステム、ポートフォリオ、<strong>LMS</strong>。  
      <br><br>
      すべて<strong><u>独学</u></strong>で大学から始め、
      <em>オンライン参照</em>と<strong>AI</strong>の助けを得ました。
      正直: よく<em>自分のコードを忘れる</em>、繰り返す。
      しかしそこに本当の学びがある: <strong>実験</strong>と<strong>実装</strong>。  
      <br><br>
      反省: <strong>教育技術の学生</strong>がプログラミングを
      <u>使い、開発し、創造する</u>方法として見る。
    `,
    coding_fact_title: "事実",
    coding_fact_desc: `
      Web構築、テスト、開発は楽しい lol.<br>
      2台のデバイスのみ使用。<br>
      ソフトウェア: Visual Studio Code.<br>
      チーム: 私とAI lol.
    `,

    // Art Section
    art_heading: "アート 2D",
    art_subtitle: "反省的なビジュアルの旅 & 文化的探求",
        art_para1: `
      <strong><u>私の2Dアートの旅</u></strong>は子供の頃から始まり、
      簡単な絵から。後に<em>デジタルアート</em>や<em>漫画</em>を試し、
      <strong>NTT文化</strong>を視覚的アイデンティティとして取り入れました。
    `,
    art_para2: `
      私の作品はまだ<em>普通</em>で、特別ではありません。
      しかし、各線は<strong>実験</strong>であり、単なる結果ではありません。
      芸術が<strong>物語を語り</strong>、<strong>機能する</strong>方法に焦点を当てています。
    `,
    art_para3: `
      <strong>レイアウト</strong>、<strong>色彩</strong>、<strong>視覚的な物語</strong>に自信があります。
      芸術は単なる美学ではなく、
      <strong><u>使い、開発し、創造する</u></strong>ものです。
    `,
    art_para4: `
      <strong><u>地域の文脈</u></strong>はインスピレーションです。KupangやNTTの織物模様、
      伝統的なシンボル、日常の物語。課題はそれらを
      <em>現代的</em>かつ<em>根付いた</em>作品に変えることです。
    `,
    art_para5: `
      基本的な問い:
      <strong><u>何を</u></strong>表現するか、
      <strong><u>なぜ</u></strong>重要か、
      <strong><u>誰が</u></strong>感じるか、
      <strong><u>目標</u></strong>,
      <strong><u>精度</u></strong>, 
      <strong><u>物語</u></strong>を生み出す。
    `,
    art_para6: `
      このアプローチで、各2D作品が単なる<em>視覚的練習</em>ではなく、
      <strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>に基づく真の貢献になることを望みます。
    `,
    art_figcaption: `
      <strong>ビジュアル作品のドキュメント</strong> 私の旅を要約:
      <em>シンプルな漫画</em>、デジタルイラスト、<strong>NTT織物模様</strong>の探求。  
      <br><br>
      すべて<strong><u>独学</u></strong>で幼少期から始め、
      多くの<em>実験</em>と<strong>AI</strong>の助けによって生まれました。
      正直: 作品は<em>普通</em>だと感じることが多く、繰り返しも多い。
      しかしそこに本当の学びがある: <strong>物語</strong>と<strong>アイデンティティ</strong>。  
      <br><br>
      反省: <strong>教育技術の学生</strong>が芸術を
      <u>使い、開発し、創造する</u>方法として見る。
    `,
    art_fact_title: "事実",
    art_fact_desc: `
      メディア: 鉛筆、インク、デジタルタブレット。<br>
      ソフトウェア: Krita & Photoshop。<br>
      インスピレーション: 織物模様、NTTの自然。<br>
      チーム: 私とAI lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "反省的な学習と視覚的実験",
    blender_para1: `
      <strong><u>私の3Dの旅</u></strong>は大学から始まり、
      <em>基礎</em>なし。<strong>AI</strong>とオンライン参照で学びました。
      大変で、ノートPCは<em>フリーズ</em>しましたが、そこで学びの意味を見つけました。
    `,
    blender_para2: `
      作品は限られ、少数のモデルのみ。しかし各試みは<strong>実験</strong>であり、結果だけではありません。
      シンプルな2Dスケッチを3Dに実行しようとしました。
      <strong>視覚化</strong>がアイデアと現実の橋だと学びました。
    `,
    blender_para3: `
      <strong><u>3Dメディアの使用</u></strong>は教育技術に重要です。
      3Dモデルは抽象的な概念を説明し、シミュレーションを提供し、学習を豊かにします。
      芸術だけでなく、<strong>教育ツール</strong>です。
    `,
    blender_para4: `
      <strong><u>地域の文脈</u></strong>は挑戦です。KupangやNTTでは
      デバイスアクセスが限られ、3Dは難しい。しかし各作品は
      技術が<em>簡単に</em>使われても<strong>意味ある</strong>ものを生み出せることを証明します。
    `,
    blender_para5: `
      基本的な問い:
      <strong><u>何を</u></strong>達成するか、
      <strong><u>なぜ</u></strong>重要か、
      <strong><u>誰が</u></strong>利益を得るか、
      <strong><u>目標</u></strong>,
      <strong><u>精度</u></strong>, 
      <strong><u>課題</u></strong>を解決する。
    `,
    blender_para6: `
      このアプローチで、各3D作品が単なる<em>技術的練習</em>ではなく、
      <strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>に基づく真の貢献になることを望みます。
    `,
    blender_figcaption: `
      <strong>3D作品のドキュメント</strong> <em>Blender</em>で制作:
      シンプルなモデルからリアルな照明とテクスチャまで。  
      <br><br>
      すべて<strong><u>独学</u></strong>で大学から始め、
      <strong>AI</strong>と参照を活用。正直: ノートPCは基本的で、
      レンダリングは重い。しかしそこに学びがある:
      <strong>実験</strong>と<strong>忍耐</strong>。  
      <br><br>
      反省: <strong>教育技術の学生</strong>が3Dを
      <u>視覚化し、開発し、創造する</u>方法として見る。
    `,
    blender_fact_title: "事実",
    blender_fact_desc: `
      ソフトウェア: Blender 3D。<br>
      ハードウェア: 基本的なノートPC。<br>
      プロセス: 2Dスケッチ → 3D実行。<br>
      チーム: 私とAI lol.
    `,

    // Speaking Section
    speaking_heading: "スピーキング & ジャーナリズム",
    speaking_subtitle: "反省的なコミュニケーションと地域教育",
    speaking_para1: `
      <strong><u>私のコミュニケーションの旅</u></strong>は高校から始まりました。
      プレゼンと執筆が<strong>スピーキング</strong>と<strong>ジャーナリズム</strong>への扉を開きました。
      初めは緊張しましたが、各機会は<em>練習</em>でした。
    `,
    speaking_para2: `
      大学では<strong>学術的アプローチ</strong>になりました。
      スピーキングは<strong>議論構築</strong>、データ処理、精度。
      ジャーナリズムは<strong>情報収集</strong>と関連する物語。
    `,
    speaking_quote: `
      「コミュニケーションは<strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>の橋です。」
    `,
       speaking_para3: `
      <strong><u>KupangやNTTの地域教育</u></strong>は課題と機会をもたらします。
      メディアへのアクセスが限られているため困難ですが、地域の声が
      全国レベルで現れることを証明します。スピーキングとジャーナリズムは
      <em>教育ツール</em>です。
    `,
    speaking_para4: `
      私にとって本質は<strong><u>情報を探求し、適応し、構造化する</u></strong>ことです。
      基本的な問い:
      <strong><u>何を</u></strong>, <strong><u>なぜ</u></strong>,
      <strong><u>誰が</u></strong>, <strong><u>目標</u></strong>。
    `,
    speaking_para5: `
      このアプローチで、各コミュニケーション作品が単なる<em>技術的練習</em>ではなく、
      <strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>に基づく真の貢献になることを望みます。
    `,
    speaking_figcaption: `
      <strong>スピーキングとジャーナリズムのドキュメント</strong>:
      高校、大学、教育に関する反省的な記事まで。  
      <br><br>
      すべて<strong><u>独学</u></strong>と現場経験から生まれました。
      正直: よく緊張しますが、そこに本当の学びがあります。  
      <br><br>
      反省: <strong>教育技術の学生</strong>がコミュニケーションを
      <u>声を与え</u>、<u>橋を築く</u>方法として見る。
    `,
    speaking_fact_title: "事実",
    speaking_fact_desc: `
      始まり: 高校の課題。<br>
      発展: 大学、学術的アプローチ。<br>
      焦点: 教育と地域アイデンティティ。<br>
      課題: メディアの制限。<br>
      チーム: 私とAI。
    `,

    // Patreon Section
    patreon_heading: "もっと探求しよう",
    patreon_intro: `
      KANG_SHUAは単なるショーケースではなく、学術的かつ創造的な実験の旅です。
      Patreonを通じて、舞台裏のプロセス、新しいアイデア、そして
      国内外の基準へのステップを見ることができます。
    `,
    patreon_roadmap_title: "私の実験的な旅:",
    patreon_node1: "プログラミング、ビジュアルアート、3Dの実験",
    patreon_node2: "AIを活用した独学",
    patreon_node3: "ジャーナリズムとスピーキングの反省",
    patreon_node4: "教育技術の学術的旅のアップデート",
    patreon_quote: "「小さな支援が創造的で学術的な未来への大きな投資です。」",
    patreon_cta: "旅に参加する",

    // Footer
    footer_about_title: "概要",
    footer_about_desc: `
      <strong>KANG_SHUA</strong>は、技術、芸術、NTT地域文化を
      学術的フォーマットで組み合わせた個人的な取り組みです。
      国内基準を満たし、国際的に競争するために設計されています。
    `,
    footer_contact_title: "連絡先",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>教育技術専攻学生, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "ナビゲーション",
    footer_nav_author: "著者",
    footer_nav_potensi: "できること",
    footer_nav_coding: "プログラミング",
    footer_nav_art: "アート",
    footer_nav_blender: "3D",
    footer_nav_speaking: "スピーキング",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>免責事項:</strong> 表示されるすべての作品は、実験、
      独学、学術的探求の結果です。公式な機関を代表するものではありませんが、
      国内の学術基準と国際的な開放性に取り組んでいます。
    `,
    footer_copy: "© 2026 KANG_SHUA. 全著作権所有。"
  },

  zh: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "主页",
    nav_author: "作者简介",
    nav_potensi: "我能做什么",
    nav_coding: "编程",
    nav_art: "视觉 2D",
    nav_blender: "3D Blender",
    nav_speaking: "演讲与新闻",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(艺术与科学在教育中结合)",
    hero_cta: "了解我",

    // Author Section
    author_heading: "我",
    author_subtitle: "教育技术专业学生 | Universitas Terbuka, FKIP 2024",
    author_intro: "我是 Joshua.gr.s，一名在 Universitas Terbuka 学习教育技术的普通学生。",
    author_story: "虽然还没有官方成果，但我通过 AI 和参考资料进行独学和实验。我的热情包括基础编程、2D 艺术、3D 探索，以及通过演讲和采访进行新闻实践。",
    author_quote: "“我相信每一个小实验都是人类进步的一步。”",
    author_passions_title: "我正在追求的领域：",
    passion_coding: "基础编程 (HTML, CSS, JS) — 独学，AI 辅助",
    passion_art: "2D 艺术 — 从小开始绘画",
    passion_blender: "3D 设计 — 通过参考和 AI 学习 Blender",
    passion_journalism: "新闻 — 从高中开始的演讲与采访",

    // Potensi Section
    potensi_heading: "我能做什么",
    potensi_coding_title: "编程",
    potensi_coding_desc: "使用 HTML、CSS 和 JavaScript 构建交互式界面。",
    potensi_coding_fact: "事实：我在大学开始学习编程，独学并借助 AI。有时忘记，有时记得。",
    potensi_art_title: "艺术",
    potensi_art_desc: "带有 NTT 文化元素的视觉品牌设计。",
    potensi_art_fact: "事实：我从小喜欢绘画，但作品很普通。坦诚，不是专业人士。",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "具有真实光照和纹理的 3D 建模。",
    potensi_blender_fact: "事实：和编程一样，我在大学开始学习 Blender，独学 + 参考 + AI。",
    potensi_speaking_title: "演讲",
    potensi_speaking_desc: "通过采访和演讲清晰传达思想。",
    potensi_speaking_fact: "事实：从高中开始习惯，经常有采访和演讲任务。公开演讲较自信。",
    potensi_journalism_title: "新闻",
    potensi_journalism_desc: "通过写作和采访表达地方身份。",
    potensi_journalism_fact: "事实：尚无官方成果，仍在实验。但我喜欢新事物以促进人类进步。",

    // Coding Section
    coding_heading: "编程项目",
    coding_subtitle: "学习与实现的反思之旅",
    coding_para1: `
      <strong><u>我的编程之旅</u></strong>始于大学，
      通过<em>在线参考</em>和<strong>AI</strong>帮助独学。
      项目包括<em>电商</em>、酒店系统、个人作品集，
      以及最具挑战性的<strong><u>LMS (学习管理系统)</u></strong>。
    `,
    coding_para2: `
      我承认我的技能仍然<em>基础</em>。
      复杂语言常常忘记，但在<strong>实际实现</strong>中我更有准备。
      我称之为<em>技术思维</em>：专注于如何<strong>实现</strong>和<strong>运作</strong>。
    `,
    coding_para3: `
      在<strong>UI/UX</strong>、<strong>数据</strong>和<strong>内容</strong>方面我更有信心。
      对我来说，教育技术的本质是
      <strong><u>使用、开发和创造</u></strong>与社会相关的东西。
    `,
    coding_para4: `
      <strong><u>地方背景</u></strong>也很重要。Kupang 和 NTT 带来挑战：
      技术访问有限，需要包容性系统和
      <em>实用</em>、<em>可持续</em>的解决方案。
      每个项目不仅是技术性的，也是<strong>现场执行</strong>和社会相关性。
    `,
    coding_para5: `
      基本问题：
      <strong><u>什么</u></strong>要实现，
      <strong><u>为什么</u></strong>重要，
      <strong><u>谁</u></strong>受益，
      <strong><u>目标</u></strong>,
      <strong><u>精度</u></strong>,
      <strong><u>问题</u></strong>解决。
    `,
    coding_para6: `
      我希望每个编程作品不仅是<em>技术练习</em>，
      而是真正基于<strong>地方身份</strong>和<strong>国际标准</strong>的贡献。
    `,
    coding_figcaption: `
      <strong>前端项目文档</strong> 截图总结：
      <em>电商</em>、酒店系统、个人作品集、<strong>LMS</strong>。  
      <br><br>
      所有作品源于<strong><u>独学</u></strong>，
      借助<em>在线参考</em>和<strong>AI</strong>。
      坦白说：我常常<em>忘记自己的代码</em>，重复。
      但这是真正的学习：<strong>实验</strong>和<strong>实现</strong>。  
      <br><br>
      反思：作为<strong>教育技术学生</strong>，
      我将编程视为<u>使用、开发和创造</u>的方式。
    `,
    coding_fact_title: "事实",
    coding_fact_desc: `
      网站构建、测试、开发很有趣 lol。<br>
      仅使用了 2 台设备。<br>
      软件: Visual Studio Code。<br>
      团队: 我和 AI lol。
    `,

    // Art Section
    art_heading: "艺术 2D",
    art_subtitle: "反思性的视觉之旅与文化探索",
    art_para1: `
      <strong><u>我的2D艺术之旅</u></strong>始于童年，
      从简单的绘画开始。后来尝试了<em>数字艺术</em>和<em>漫画</em>，
      并将<strong>NTT文化</strong>作为视觉身份。
    `,
    art_para2: `
      我的作品仍然<em>普通</em>，并不特别。
      但每一笔都是<strong>实验</strong>，而不仅仅是结果。
      我关注艺术如何<strong>讲述故事</strong>和<strong>发挥作用</strong>。
    `,
    art_para3: `
      在<strong>设计</strong>、<strong>色彩</strong>和<strong>视觉叙事</strong>方面我更有信心。
      对我来说，艺术不仅是美学，
      而是<strong><u>使用、开发和创造</u></strong>有意义的东西。
    `,
    art_para4: `
      <strong><u>地方背景</u></strong>激发灵感：Kupang 和 NTT 的织布图案、
      传统符号和日常故事。挑战是将它们转化为
      <em>现代</em>且<em>根植</em>的作品。
    `,
    art_para5: `
      基本问题：
      <strong><u>什么</u></strong>表达，
      <strong><u>为什么</u></strong>重要，
      <strong><u>谁</u></strong>感受，
      <strong><u>目标</u></strong>,
      <strong><u>精度</u></strong>,
      <strong><u>故事</u></strong>呈现。
    `,
        art_para6: `
      このアプローチで、各2D作品が単なる<em>視覚的練習</em>ではなく、
      <strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>に基づく真の貢献になることを望みます。
    `,
    art_figcaption: `
      <strong>ビジュアル作品のドキュメント</strong> 私の旅を要約:
      <em>シンプルな漫画</em>、デジタルイラスト、<strong>NTT織物模様</strong>の探求。  
      <br><br>
      すべて<strong><u>独学</u></strong>で幼少期から始め、
      多くの<em>実験</em>と<strong>AI</strong>の助けによって生まれました。
      正直: 作品は<em>普通</em>だと感じることが多く、繰り返しも多い。
      しかしそこに本当の学びがある: <strong>物語</strong>と<strong>アイデンティティ</strong>。  
      <br><br>
      反省: <strong>教育技術の学生</strong>が芸術を
      <u>使い、開発し、創造する</u>方法として見る。
    `,
    art_fact_title: "事実",
    art_fact_desc: `
      メディア: 鉛筆、インク、デジタルタブレット。<br>
      ソフトウェア: Krita & Photoshop。<br>
      インスピレーション: 織物模様、NTTの自然。<br>
      チーム: 私とAI lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "反省的な学習と視覚的実験",
    blender_para1: `
      <strong><u>私の3Dの旅</u></strong>は大学から始まり、
      <em>基礎</em>なし。<strong>AI</strong>とオンライン参照で学びました。
      大変で、ノートPCは<em>フリーズ</em>しましたが、そこで学びの意味を見つけました。
    `,
    blender_para2: `
      作品は限られ、少数のモデルのみ。しかし各試みは<strong>実験</strong>であり、結果だけではありません。
      シンプルな2Dスケッチを3Dに実行しようとしました。
      <strong>視覚化</strong>がアイデアと現実の橋だと学びました。
    `,
    blender_para3: `
      <strong><u>3Dメディアの使用</u></strong>は教育技術に重要です。
      3Dモデルは抽象的な概念を説明し、シミュレーションを提供し、学習を豊かにします。
      芸術だけでなく、<strong>教育ツール</strong>です。
    `,
    blender_para4: `
      <strong><u>地域の文脈</u></strong>は挑戦です。KupangやNTTでは
      デバイスアクセスが限られ、3Dは難しい。しかし各作品は
      技術が<em>簡単に</em>使われても<strong>意味ある</strong>ものを生み出せることを証明します。
    `,
    blender_para5: `
      基本的な問い:
      <strong><u>何を</u></strong>達成するか、
      <strong><u>なぜ</u></strong>重要か、
      <strong><u>誰が</u></strong>利益を得るか、
      <strong><u>目標</u></strong>,
      <strong><u>精度</u></strong>, 
      <strong><u>課題</u></strong>を解決する。
    `,
    blender_para6: `
      このアプローチで、各3D作品が単なる<em>技術的練習</em>ではなく、
      <strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>に基づく真の貢献になることを望みます。
    `,
    blender_figcaption: `
      <strong>3D作品のドキュメント</strong> <em>Blender</em>で制作:
      シンプルなモデルからリアルな照明とテクスチャまで。  
      <br><br>
      すべて<strong><u>独学</u></strong>で大学から始め、
      <strong>AI</strong>と参照を活用。正直: ノートPCは基本的で、
      レンダリングは重い。しかしそこに学びがある:
      <strong>実験</strong>と<strong>忍耐</strong>。  
      <br><br>
      反省: <strong>教育技術の学生</strong>が3Dを
      <u>視覚化し、開発し、創造する</u>方法として見る。
    `,
    blender_fact_title: "事実",
    blender_fact_desc: `
      ソフトウェア: Blender 3D。<br>
      ハードウェア: 基本的なノートPC。<br>
      プロセス: 2Dスケッチ → 3D実行。<br>
      チーム: 私とAI lol.
    `,

    // Speaking Section
    speaking_heading: "スピーキング & ジャーナリズム",
    speaking_subtitle: "反省的なコミュニケーションと地域教育",
    speaking_para1: `
      <strong><u>私のコミュニケーションの旅</u></strong>は高校から始まりました。
      プレゼンと執筆が<strong>スピーキング</strong>と<strong>ジャーナリズム</strong>への扉を開きました。
      初めは緊張しましたが、各機会は<em>練習</em>でした。
    `,
    speaking_para2: `
      大学では<strong>学術的アプローチ</strong>になりました。
      スピーキングは<strong>議論構築</strong>、データ処理、精度。
      ジャーナリズムは<strong>情報収集</strong>と関連する物語。
    `,
    speaking_quote: `
      「コミュニケーションは<strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>の橋です。」
    `,
    speaking_para3: `
      <strong><u>KupangやNTTの地域教育</u></strong>は課題と機会をもたらします。
      メディアへのアクセスが限られているため困難ですが、地域の声が
      全国レベルで現れることを証明します。スピーキングとジャーナリズムは
      <em>教育ツール</em>です。
    `,
    speaking_para4: `
      私にとって本質は<strong><u>情報を探求し、適応し、構造化する</u></strong>ことです。
      基本的な問い:
      <strong><u>何を</u></strong>, <strong><u>なぜ</u></strong>,
      <strong><u>誰が</u></strong>, <strong><u>目標</u></strong>。
    `,
    speaking_para5: `
      このアプローチで、各コミュニケーション作品が単なる<em>技術的練習</em>ではなく、
      <strong>地域のアイデンティティ</strong>と<strong>国際基準</strong>に基づく真の貢献になることを望みます。
    `,
    speaking_figcaption: `
      <strong>スピーキングとジャーナリズムのドキュメント</strong>:
      高校、大学、教育に関する反省的な記事まで。  
      <br><br>
      すべて<strong><u>独学</u></strong>と現場経験から生まれました。
      正直: よく緊張しますが、そこに本当の学びがあります。  
      <br><br>
      反省: <strong>教育技術の学生</strong>がコミュニケーションを
      <u>声を与え</u>、<u>橋を築く</u>方法として見る。
    `,
    speaking_fact_title: "事実",
        speaking_fact_desc: `
      始まり: 高校の課題。<br>
      発展: 大学、学術的アプローチ。<br>
      焦点: 教育と地域アイデンティティ。<br>
      課題: メディアの制限。<br>
      チーム: 私とAI。
    `,

    // Patreon Section
    patreon_heading: "もっと探求しよう",
    patreon_intro: `
      KANG_SHUAは単なるショーケースではなく、学術的かつ創造的な実験の旅です。
      Patreonを通じて、舞台裏のプロセス、新しいアイデア、そして
      国内外の基準へのステップを見ることができます。
    `,
    patreon_roadmap_title: "私の実験的な旅:",
    patreon_node1: "プログラミング、ビジュアルアート、3Dの実験",
    patreon_node2: "AIを活用した独学",
    patreon_node3: "ジャーナリズムとスピーキングの反省",
    patreon_node4: "教育技術の学術的旅のアップデート",
    patreon_quote: "「小さな支援が創造的で学術的な未来への大きな投資です。」",
    patreon_cta: "旅に参加する",

    // Footer
    footer_about_title: "概要",
    footer_about_desc: `
      <strong>KANG_SHUA</strong>は、技術、芸術、NTT地域文化を
      学術的フォーマットで組み合わせた個人的な取り組みです。
      国内基準を満たし、国際的に競争するために設計されています。
    `,
    footer_contact_title: "連絡先",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>教育技術専攻学生, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "ナビゲーション",
    footer_nav_author: "著者",
    footer_nav_potensi: "できること",
    footer_nav_coding: "プログラミング",
    footer_nav_art: "アート",
    footer_nav_blender: "3D",
    footer_nav_speaking: "スピーキング",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>免責事項:</strong> 表示されるすべての作品は、実験、
      独学、学術的探求の結果です。公式な機関を代表するものではありませんが、
      国内の学術基準と国際的な開放性に取り組んでいます。
    `,
    footer_copy: "© 2026 KANG_SHUA. 全著作権所有。"
  },

  ko: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "홈",
    nav_author: "저자 프로필",
    nav_potensi: "내가 할 수 있는 것",
    nav_coding: "프로그래밍",
    nav_art: "비주얼 2D",
    nav_blender: "3D Blender",
    nav_speaking: "스피킹 & 저널리즘",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(예술과 과학이 교육에서 결합하다)",
    hero_cta: "나를 알아보기",

    // Author Section
    author_heading: "나",
    author_subtitle: "교육기술 전공 | Universitas Terbuka, FKIP 2024",
    author_intro: "저는 Joshua.gr.s, Universitas Terbuka에서 교육기술을 공부하는 평범한 학생입니다.",
    author_story: "아직 공식적인 성과는 없지만, AI와 참고자료를 활용해 독학하며 실험하고 있습니다. 열정은 기초 프로그래밍, 2D 아트, 3D 탐구, 그리고 스피킹과 인터뷰를 통한 저널리즘입니다.",
    author_quote: "“작은 실험 하나하나가 인류 발전을 향한 한 걸음이라고 믿습니다.”",
    author_passions_title: "내가 추구하는 분야:",
    passion_coding: "기초 프로그래밍 (HTML, CSS, JS) — 독학, AI 도움",
    passion_art: "2D 아트 — 어린 시절부터 그림",
    passion_blender: "3D 디자인 — Blender를 참고와 AI로 학습",
    passion_journalism: "저널리즘 — 고등학교 때부터 스피킹과 인터뷰",

    // Potensi Section
    potensi_heading: "내가 할 수 있는 것",
    potensi_coding_title: "프로그래밍",
    potensi_coding_desc: "HTML, CSS, JavaScript로 인터랙티브 UI 구축.",
    potensi_coding_fact: "사실: 대학에서 프로그래밍을 시작, AI로 독학. 가끔 잊고 가끔 기억.",
    potensi_art_title: "아트",
    potensi_art_desc: "NTT 문화적 요소를 담은 비주얼 브랜딩.",
    potensi_art_fact: "사실: 어린 시절부터 그림을 좋아했지만 결과는 평범. 솔직히 프로는 아님.",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "현실적인 조명과 텍스처를 가진 3D 모델링.",
    potensi_blender_fact: "사실: 프로그래밍처럼 대학에서 Blender 시작, 독학 + 참고 + AI.",
    potensi_speaking_title: "스피킹",
    potensi_speaking_desc: "아이디어를 명확히 전달하기 위한 인터뷰와 발표.",
    potensi_speaking_fact: "사실: 고등학교 때부터 익숙, 인터뷰와 발표 과제가 많았음. 대중 앞에서 자신감 있음.",
    potensi_journalism_title: "저널리즘",
    potensi_journalism_desc: "글쓰기와 인터뷰를 통해 지역 정체성을 표현.",
    potensi_journalism_fact: "사실: 아직 공식 성과는 없지만 실험 중. 인류 발전을 위한 새로움 즐김.",

    // Coding Section
    coding_heading: "프로그래밍 프로젝트",
    coding_subtitle: "학습과 구현의 반성적 여정",
    coding_para1: `
      <strong><u>나의 프로그래밍 여정</u></strong>은 대학에서 시작,
      <em>온라인 참고</em>와 <strong>AI</strong> 도움으로 독학.
      프로젝트: <em>전자상거래</em>, 호텔 시스템, 개인 포트폴리오,
      가장 어려운 <strong><u>LMS (학습관리시스템)</u></strong>.
    `,
    coding_para2: `
      내 기술은 아직 <em>기초적</em>임을 인정.
      복잡한 언어는 자주 잊지만 <strong>실제 구현</strong>에서는 준비됨.
      이것을 <em>기술적 사고</em>라 부름: 어떻게 <strong>만들고</strong> <strong>작동하는지</strong>에 집중.
    `,
    coding_para3: `
      <strong>UI/UX</strong>, <strong>데이터</strong>, <strong>콘텐츠</strong>에 자신 있음.
      교육기술의 본질은
      <strong><u>사용, 개발, 창조</u></strong>하는 것.
    `,
    coding_para4: `
      <strong><u>지역 맥락</u></strong>도 중요. Kupang과 NTT는 도전:
      제한된 기술 접근, 포용적 시스템 필요,
      <em>실용적</em>이고 <em>지속가능한</em> 해결책.
      각 프로젝트는 기술적일 뿐 아니라 <strong>현장 실행</strong>과 사회적 관련성 포함.
    `,
    coding_para5: `
      기본 질문:
      <strong><u>무엇을</u></strong> 달성할지,
      <strong><u>왜</u></strong> 중요한지,
      <strong><u>누가</u></strong> 혜택을 받을지,
      <strong><u>목표</u></strong>,
      <strong><u>정확성</u></strong>,
      <strong><u>문제</u></strong> 해결.
    `,
    coding_para6: `
      이 접근으로 각 프로그래밍 작업이 단순한 <em>기술 연습</em>이 아니라,
      <strong>지역 정체성</strong>과 <strong>국제 기준</strong>에 기반한 진정한 기여가 되길 바람.
    `,
    coding_figcaption: `
      <strong>프론트엔드 프로젝트 문서</strong> 스크린샷 요약:
      <em>전자상거래</em>, 호텔 시스템, 포트폴리오, <strong>LMS</strong>.  
      <br><br>
      모두 <strong><u>독학</u></strong>으로 대학에서 시작,
      <em>온라인 참고</em>와 <strong>AI</strong> 도움.
      솔직히: 자주 <em>내 코드 잊음</em>, 반복.
      그러나 거기서 진짜 학습: <strong>실험</strong>과 <strong>구현</strong>.  
      <br><br>
      반성: <strong>교육기술 학생</strong>이 프로그래밍을
      <u>사용, 개발, 창조</u>하는 방법으로 보는 것.
    `,
    coding_fact_title: "사실",
    coding_fact_desc: `
      웹 구축, 테스트, 개발은 재미있음 lol.<br>
      단 2대의 기기만 사용.<br>
      소프트웨어: Visual Studio Code.<br>
      팀: 나와 AI lol.
    `,

    // Art Section
    art_heading: "아트 2D",
    art_subtitle: "반성적 비주얼 여정 & 문화 탐구",
    art_para1: `
      <strong><u>나의 2D 아트 여정</u></strong>은 어린 시절 시작,
      간단한 그림에서. 이후 <em>디지털 아트</em>와 <em>만화</em>를 시도,
      <strong>NTT 문화</strong>를 시각적 정체성으로 삼음.
    `,
    art_para2: `
      내 작품은 아직 <em>평범</em>, 특별하지 않음.
      그러나 각 선은 <strong>실험</strong>, 단순한 결과 아님.
      예술이 <strong>이야기를 말하고</strong>, <strong>작동</strong>하는 방법에 집중.
    `,
    art_para3: `
      <strong>레이아웃</strong>, <strong>색채</strong>, <strong>시각적 내러티브</strong>에 자신 있음.
      예술은 단순한 미학이 아니라
      <strong><u>사용, 개발, 창조</u></strong>하는 것.
    `,
       art_para4: `
      <strong><u>지역 맥락</u></strong>은 영감. Kupang과 NTT의 직물 패턴,
      전통적 상징, 일상 이야기. 도전은 이를
      <em>현대적</em>이고 <em>뿌리 깊은</em> 작품으로 바꾸는 것.
    `,
    art_para5: `
      기본 질문:
      <strong><u>무엇을</u></strong> 표현할지,
      <strong><u>왜</u></strong> 중요한지,
      <strong><u>누가</u></strong> 느낄지,
      <strong><u>목표</u></strong>,
      <strong><u>정확성</u></strong>,
      <strong><u>이야기</u></strong>를 살아나게 하기.
    `,
    art_para6: `
      이 접근으로 각 2D 작품이 단순한 <em>시각적 연습</em>이 아니라,
      <strong>지역 정체성</strong>과 <strong>국제 기준</strong>에 기반한 진정한 기여가 되길 바람.
    `,
    art_figcaption: `
      <strong>비주얼 작품 문서</strong> 내 여정을 요약:
      <em>간단한 만화</em>, 디지털 일러스트, <strong>NTT 직물 패턴</strong> 탐구.  
      <br><br>
      모두 <strong><u>독학</u></strong>으로 어린 시절부터 시작,
      많은 <em>실험</em>과 <strong>AI</strong> 도움으로 탄생.
      솔직히: 작품은 <em>평범</em>하다고 느끼며 반복도 많음.
      그러나 거기서 진짜 학습: <strong>이야기</strong>와 <strong>정체성</strong>.  
      <br><br>
      반성: <strong>교육기술 학생</strong>이 예술을
      <u>사용, 개발, 창조</u>하는 방법으로 보는 것.
    `,
    art_fact_title: "사실",
    art_fact_desc: `
      매체: 연필, 잉크, 디지털 태블릿.<br>
      소프트웨어: Krita & Photoshop.<br>
      영감: 직물 패턴, NTT 자연.<br>
      팀: 나와 AI lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "반성적 학습과 시각적 실험",
    blender_para1: `
      <strong><u>나의 3D 여정</u></strong>은 대학에서 시작,
      <em>기초</em> 없이. <strong>AI</strong>와 온라인 참고로 학습.
      힘들었고 노트북은 <em>멈춤</em>이 잦았지만, 거기서 학습의 의미를 찾음.
    `,
    blender_para2: `
      작품은 제한적, 몇 개 모델만. 그러나 각 시도는 <strong>실험</strong>,
      단순한 결과 아님. 간단한 2D 스케치를 3D로 구현하려 함.
      <strong>시각화</strong>가 아이디어와 현실의 다리임을 배움.
    `,
    blender_para3: `
      <strong><u>3D 매체 사용</u></strong>은 교육기술에 중요.
      3D 모델은 추상 개념 설명, 시뮬레이션 제공, 학습 풍부화.
      단순한 예술이 아닌 <strong>교육 도구</strong>.
    `,
    blender_para4: `
      <strong><u>지역 맥락</u></strong>은 도전. Kupang과 NTT에서는
      기기 접근 제한으로 3D가 어려움. 그러나 각 작품은
      기술이 <em>간단히</em> 사용돼도 <strong>의미 있는</strong> 결과를 낼 수 있음을 증명.
    `,
    blender_para5: `
      기본 질문:
      <strong><u>무엇을</u></strong> 달성,
      <strong><u>왜</u></strong> 중요한지,
      <strong><u>누가</u></strong> 혜택,
      <strong><u>목표</u></strong>,
      <strong><u>정확성</u></strong>,
      <strong><u>문제</u></strong> 해결.
    `,
    blender_para6: `
      이 접근으로 각 3D 작품이 단순한 <em>기술 연습</em>이 아니라,
      <strong>지역 정체성</strong>과 <strong>국제 기준</strong>에 기반한 기여가 되길 바람.
    `,
    blender_figcaption: `
      <strong>3D 작품 문서</strong> <em>Blender</em>로 제작:
      간단한 모델부터 현실적 조명과 텍스처까지.  
      <br><br>
      모두 <strong><u>독학</u></strong>으로 대학에서 시작,
      <strong>AI</strong>와 참고 활용. 솔직히: 노트북은 기본형,
      렌더링은 무거움. 그러나 거기서 학습: <strong>실험</strong>과 <strong>인내</strong>.  
      <br><br>
      반성: <strong>교육기술 학생</strong>이 3D를
      <u>시각화, 개발, 창조</u>하는 방법으로 보는 것.
    `,
    blender_fact_title: "사실",
    blender_fact_desc: `
      소프트웨어: Blender 3D.<br>
      하드웨어: 기본 노트북.<br>
      과정: 2D 스케치 → 3D 구현.<br>
      팀: 나와 AI lol.
    `,

    // Speaking Section
    speaking_heading: "스피킹 & 저널리즘",
    speaking_subtitle: "반성적 커뮤니케이션과 지역 교육",
    speaking_para1: `
      <strong><u>나의 커뮤니케이션 여정</u></strong>은 고등학교에서 시작.
      발표와 글쓰기가 <strong>스피킹</strong>과 <strong>저널리즘</strong>으로 이어짐.
      처음엔 긴장했지만 각 기회는 <em>연습</em>.
    `,
    speaking_para2: `
      대학에서는 <strong>학문적 접근</strong>으로 발전.
      스피킹은 <strong>논리 구축</strong>, 데이터 처리, 정확성.
      저널리즘은 <strong>정보 수집</strong>과 관련 이야기.
    `,
    speaking_quote: `
      “커뮤니케이션은 <strong>지역 정체성</strong>과 <strong>국제 기준</strong>을 잇는 다리다.”
    `,
    speaking_para3: `
      <strong><u>Kupang과 NTT의 지역 교육</u></strong>은 도전과 기회.
      제한된 미디어 접근은 학습을 어렵게 하지만, 지역의 목소리가
      전국적으로 드러날 수 있음을 증명. 스피킹과 저널리즘은 <em>교육 도구</em>.
    `,
    speaking_para4: `
      본질은 <strong><u>정보 탐구, 적응, 구조화</u></strong>.
      기본 질문:
      <strong><u>무엇</u></strong>, <strong><u>왜</u></strong>,
      <strong><u>누가</u></strong>, <strong><u>목표</u></strong>.
    `,
    speaking_para5: `
      이 접근으로 각 커뮤니케이션 작업이 단순한 <em>기술 연습</em>이 아니라,
      <strong>지역 정체성</strong>과 <strong>국제 기준</strong>에 기반한 기여가 되길 바람.
    `,
    speaking_figcaption: `
      <strong>스피킹과 저널리즘 문서</strong>:
      고등학교, 대학, 교육 관련 반성적 글까지.  
      <br><br>
      모두 <strong><u>독학</u></strong>과 현장 경험에서 탄생.
      솔직히: 자주 긴장하지만 거기서 학습.  
      <br><br>
      반성: <strong>교육기술 학생</strong>이 커뮤니케이션을
      <u>목소리 부여</u>, <u>다리 구축</u> 방법으로 보는 것.
    `,
    speaking_fact_title: "사실",
        speaking_fact_desc: `
      시작: 고등학교 과제.<br>
      발전: 대학, 학문적 접근.<br>
      초점: 교육 & 지역 정체성.<br>
      도전: 제한된 미디어.<br>
      팀: 나와 AI.
    `,

    // Patreon Section
    patreon_heading: "나와 더 깊이 탐험하기",
    patreon_intro: `
      KANG_SHUA는 단순한 쇼케이스가 아니라 학문적이고 창의적인 실험의 여정입니다.
      Patreon을 통해 무대 뒤 과정, 새로운 아이디어, 국내외 기준으로 나아가는 단계를 볼 수 있습니다.
    `,
    patreon_roadmap_title: "나의 실험적 여정:",
    patreon_node1: "프로그래밍, 비주얼 아트, 3D 실험",
    patreon_node2: "AI를 활용한 독학",
    patreon_node3: "저널리즘과 스피킹에 대한 성찰",
    patreon_node4: "교육기술 학문적 여정 업데이트",
    patreon_quote: "“작은 지원이 창의적이고 학문적인 미래에 큰 투자입니다.”",
    patreon_cta: "여정에 함께하기",

    // Footer
    footer_about_title: "소개",
    footer_about_desc: `
      <strong>KANG_SHUA</strong>는 기술, 예술, NTT 지역 문화를
      학문적 형식으로 결합한 개인적 프로젝트입니다.
      국내 기준을 충족하고 국제적으로 경쟁하기 위해 설계되었습니다.
    `,
    footer_contact_title: "연락처",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>교육기술 전공 학생, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "내비게이션",
    footer_nav_author: "저자",
    footer_nav_potensi: "내가 할 수 있는 것",
    footer_nav_coding: "프로그래밍",
    footer_nav_art: "아트",
    footer_nav_blender: "3D",
    footer_nav_speaking: "스피킹",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>면책 조항:</strong> 표시된 모든 작품은 실험,
      독학, 학문적 탐구의 결과입니다. 공식 기관을 대표하지 않지만,
      국내 학문적 기준과 국제적 개방성을 준수합니다.
    `,
    footer_copy: "© 2026 KANG_SHUA. 모든 권리 보유."
  },

  th: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "หน้าแรก",
    nav_author: "โปรไฟล์ผู้เขียน",
    nav_potensi: "สิ่งที่ฉันทำได้",
    nav_coding: "การเขียนโปรแกรม",
    nav_art: "ศิลปะ 2D",
    nav_blender: "3D Blender",
    nav_speaking: "การพูด & วารสารศาสตร์",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(ศิลปะและวิทยาศาสตร์ที่รวมกันในด้านการศึกษา)",
    hero_cta: "รู้จักฉัน",

    // Author Section
    author_heading: "ฉัน",
    author_subtitle: "นักศึกษาด้านเทคโนโลยีการศึกษา | Universitas Terbuka, FKIP 2024",
    author_intro: "ฉันคือ Joshua.gr.s นักศึกษาธรรมดาที่เรียนเทคโนโลยีการศึกษาที่ Universitas Terbuka",
    author_story: "แม้ยังไม่มีผลงานอย่างเป็นทางการ แต่ฉันทดลองและเรียนรู้ด้วยตนเอง โดยมี AI และแหล่งอ้างอิงช่วยสนับสนุน ความสนใจของฉันคือการเขียนโปรแกรมพื้นฐาน ศิลปะ 2D การสำรวจ 3D และวารสารศาสตร์ผ่านการพูดและการสัมภาษณ์",
    author_quote: "“ฉันเชื่อว่าการทดลองเล็ก ๆ ทุกครั้งคือก้าวหนึ่งสู่ความก้าวหน้าของมนุษยชาติ”",
    author_passions_title: "สิ่งที่ฉันสนใจ:",
    passion_coding: "การเขียนโปรแกรมพื้นฐาน (HTML, CSS, JS) — เรียนรู้ด้วยตนเอง มี AI ช่วย",
    passion_art: "ศิลปะ 2D — วาดภาพตั้งแต่เด็ก",
    passion_blender: "การออกแบบ 3D — เรียน Blender ด้วยการอ้างอิงและ AI",
    passion_journalism: "วารสารศาสตร์ — การพูดและสัมภาษณ์ตั้งแต่มัธยม",

    // Potensi Section
    potensi_heading: "สิ่งที่ฉันทำได้",
    potensi_coding_title: "การเขียนโปรแกรม",
    potensi_coding_desc: "สร้าง UI แบบโต้ตอบด้วย HTML, CSS และ JavaScript",
    potensi_coding_fact: "ข้อเท็จจริง: ฉันเริ่มเขียนโปรแกรมในมหาวิทยาลัย เรียนรู้ด้วยตนเองโดยมี AI บางครั้งลืม บางครั้งจำได้",
    potensi_art_title: "ศิลปะ",
    potensi_art_desc: "การสร้างแบรนด์เชิงภาพที่มีวัฒนธรรม NTT",
    potensi_art_fact: "ข้อเท็จจริง: ฉันชอบวาดภาพตั้งแต่เด็ก แต่ผลงานยังธรรมดา ไม่ใช่มืออาชีพ",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "การสร้างโมเดล 3D พร้อมแสงและพื้นผิวสมจริง",
    potensi_blender_fact: "ข้อเท็จจริง: เช่นเดียวกับการเขียนโปรแกรม ฉันเริ่มเรียน Blender ในมหาวิทยาลัย เรียนรู้ด้วยตนเอง + อ้างอิง + AI",
    potensi_speaking_title: "การพูด",
    potensi_speaking_desc: "การสัมภาษณ์และการนำเสนอเพื่อสื่อสารความคิดอย่างชัดเจน",
    potensi_speaking_fact: "ข้อเท็จจริง: คุ้นเคยตั้งแต่มัธยม มีงานสัมภาษณ์และการนำเสนอหลายครั้ง มั่นใจในการพูดต่อหน้าสาธารณะ",
    potensi_journalism_title: "วารสารศาสตร์",
    potensi_journalism_desc: "การเขียนและสัมภาษณ์เพื่อสะท้อนอัตลักษณ์ท้องถิ่น",
    potensi_journalism_fact: "ข้อเท็จจริง: ยังไม่มีผลงานอย่างเป็นทางการ กำลังทดลอง แต่ชอบสิ่งใหม่ ๆ เพื่อความก้าวหน้าของมนุษย์",

    // Coding Section
    coding_heading: "โปรเจกต์การเขียนโปรแกรม",
    coding_subtitle: "การเรียนรู้และการนำไปใช้เชิงสะท้อน",
    coding_para1: `
      <strong><u>การเดินทางด้านการเขียนโปรแกรมของฉัน</u></strong>เริ่มต้นที่มหาวิทยาลัย
      ด้วยการเรียนรู้แบบ<em>อ้างอิงออนไลน์</em>และความช่วยเหลือจาก<strong>AI</strong>.
      โปรเจกต์: <em>อีคอมเมิร์ซ</em>, ระบบโรงแรม, พอร์ตโฟลิโอส่วนตัว,
      และที่ยากที่สุด: <strong><u>LMS (ระบบจัดการการเรียนรู้)</u></strong>.
    `,
    coding_para2: `
      ฉันยอมรับว่าทักษะยัง<em>พื้นฐาน</em>.
      ภาษาที่ซับซ้อนมักลืม แต่เมื่อ<strong>นำไปใช้จริง</strong> ฉันพร้อม.
      นี่คือสิ่งที่เรียกว่า<em>ความคิดเชิงเทคนิค</em>: มุ่งเน้นที่การ<strong>ทำ</strong>และ<strong>ทำงานได้</strong>.
    `,
    coding_para3: `
      ในด้าน<strong>UI/UX</strong>, <strong>ข้อมูล</strong>, และ<strong>เนื้อหา</strong> ฉันมั่นใจ.
      สำหรับฉัน แก่นแท้ของเทคโนโลยีการศึกษาคือ
      <strong><u>การใช้ การพัฒนา และการสร้าง</u></strong>สิ่งที่เกี่ยวข้องกับสังคม.
    `,
    coding_para4: `
      <strong><u>บริบทท้องถิ่น</u></strong>ก็สำคัญ. Kupang และ NTT มีความท้าทาย:
      การเข้าถึงเทคโนโลยีจำกัด, ความจำเป็นของระบบที่ครอบคลุม,
      และแรงผลักดันสู่การแก้ปัญหา<em>เชิงปฏิบัติ</em>และ<em>ยั่งยืน</em>.
      ทุกโปรเจกต์ไม่ใช่แค่เทคนิค แต่ยังเป็น<strong>การปฏิบัติจริง</strong>และความเกี่ยวข้องทางสังคม.
    `,
    coding_para5: `
      คำถามพื้นฐาน:
      <strong><u>อะไร</u></strong>ที่จะบรรลุ,
      <strong><u>ทำไม</u></strong>ถึงสำคัญ,
      <strong><u>ใคร</u></strong>จะได้รับประโยชน์,
      <strong><u>เป้าหมาย</u></strong>,
      <strong><u>ความแม่นยำ</u></strong>,
      <strong><u>ปัญหา</u></strong>ที่จะต้องแก้.
    `,
    coding_para6: `
      ฉันหวังว่าแต่ละงานเขียนโปรแกรมจะไม่ใช่แค่<em>การฝึกเชิงเทคนิค</em>,
      แต่เป็นการมีส่วนร่วมจริงที่อิงกับ<strong>อัตลักษณ์ท้องถิ่น</strong>และ<strong>มาตรฐานสากล</strong>.
    `,
    coding_figcaption: `
      <strong>เอกสารโปรเจกต์ Frontend</strong> รวมภาพหน้าจอ:
      <em>อีคอมเมิร์ซ</em>, ระบบโรงแรม, พอร์ตโฟลิโอ, <strong>LMS</strong>.  
      <br><br>
      ทั้งหมดเกิดจาก<strong><u>การเรียนรู้ด้วยตนเอง</u></strong>ในมหาวิทยาลัย,
      โดยมี<em>อ้างอิงออนไลน์</em>และ<strong>AI</strong>ช่วย.
      จริง ๆ: ฉันมักจะ<em>ลืมโค้ดของตัวเอง</em>, ทำซ้ำ.
      แต่ตรงนั้นคือการเรียนรู้จริง: <strong>การทดลอง</strong>และ<strong>การนำไปใช้</strong>.  
      <br><br>
      การสะท้อน: นักศึกษา<strong>เทคโนโลยีการศึกษา</strong>มองการเขียนโปรแกรม
      เป็นวิธี<u>ใช้ พัฒนา และสร้าง</u>สิ่งที่เกี่ยวข้องกับ Kupang และ NTT.
    `,
    coding_fact_title: "ข้อเท็จจริง",
       coding_fact_desc: `
      การสร้างเว็บ, การทดสอบ, การพัฒนา สนุก lol.<br>
      ใช้เพียง 2 อุปกรณ์.<br>
      ซอฟต์แวร์: Visual Studio Code.<br>
      ทีม: ฉันและ AI lol.
    `,

    // Art Section
    art_heading: "ศิลปะ 2D",
    art_subtitle: "การเดินทางเชิงสะท้อนด้านภาพและการสำรวจวัฒนธรรม",
    art_para1: `
      <strong><u>การเดินทางด้านศิลปะ 2D ของฉัน</u></strong>เริ่มตั้งแต่วัยเด็ก
      จากการวาดภาพง่าย ๆ ต่อมาได้ทดลอง<em>ศิลปะดิจิทัล</em>และ<em>การ์ตูน</em>
      โดยนำ<strong>วัฒนธรรม NTT</strong>มาเป็นอัตลักษณ์ทางภาพ.
    `,
    art_para2: `
      ผลงานของฉันยังคง<em>ธรรมดา</em> ไม่โดดเด่น.
      แต่ทุกเส้นคือ<strong>การทดลอง</strong> ไม่ใช่แค่ผลลัพธ์.
      ฉันมุ่งเน้นว่า ศิลปะสามารถ<strong>เล่าเรื่อง</strong>และ<strong>ทำหน้าที่</strong>ได้อย่างไร.
    `,
    art_para3: `
      ฉันมั่นใจใน<strong>การจัดวาง</strong>, <strong>สีสัน</strong>, และ<strong>การเล่าเรื่องด้วยภาพ</strong>.
      สำหรับฉัน ศิลปะไม่ใช่แค่ความสวยงาม แต่คือ
      <strong><u>การใช้ การพัฒนา และการสร้าง</u></strong>สิ่งที่มีความหมาย.
    `,
    art_para4: `
      <strong><u>บริบทท้องถิ่น</u></strong>เป็นแรงบันดาลใจ: Kupang และ NTT มีลวดลายผ้า,
      สัญลักษณ์ดั้งเดิม และเรื่องราวชีวิตประจำวัน. ความท้าทายคือการเปลี่ยนสิ่งเหล่านี้ให้เป็น
      ผลงานที่<em>ร่วมสมัย</em>และ<em>หยั่งราก</em>.
    `,
    art_para5: `
      คำถามพื้นฐาน:
      <strong><u>อะไร</u></strong>ที่จะแสดงออก,
      <strong><u>ทำไม</u></strong>ถึงสำคัญ,
      <strong><u>ใคร</u></strong>จะสัมผัส,
      <strong><u>เป้าหมาย</u></strong>,
      <strong><u>ความแม่นยำ</u></strong>,
      <strong><u>เรื่องราว</u></strong>ที่จะทำให้มีชีวิต.
    `,
    art_para6: `
      ฉันหวังว่าผลงาน 2D แต่ละชิ้นจะไม่ใช่แค่<em>การฝึกด้านภาพ</em>,
      แต่เป็นการมีส่วนร่วมจริงที่อิงกับ<strong>อัตลักษณ์ท้องถิ่น</strong>และ<strong>มาตรฐานสากล</strong>.
    `,
    art_figcaption: `
      <strong>เอกสารผลงานด้านภาพ</strong> สรุปการเดินทางของฉัน:
      จาก<em>การ์ตูนง่าย ๆ</em>, ภาพดิจิทัล ไปจนถึงการสำรวจ<strong>ลวดลายผ้า NTT</strong>.  
      <br><br>
      ทั้งหมดเกิดจาก<strong><u>การเรียนรู้ด้วยตนเอง</u></strong>ตั้งแต่วัยเด็ก,
      ผ่านการ<em>ทดลองมากมาย</em>และการช่วยเหลือจาก<strong>AI</strong>.
      จริง ๆ: ฉันมักรู้สึกว่าผลงาน<em>ธรรมดา</em>, ทำซ้ำบ่อย.
      แต่ตรงนั้นคือการเรียนรู้จริง: <strong>เรื่องราว</strong>และ<strong>อัตลักษณ์</strong>.  
      <br><br>
      การสะท้อน: นักศึกษา<strong>เทคโนโลยีการศึกษา</strong>มองศิลปะ
      เป็นวิธี<u>ใช้ พัฒนา และสร้าง</u>สิ่งที่เกี่ยวข้องกับ Kupang และ NTT.
    `,
    art_fact_title: "ข้อเท็จจริง",
    art_fact_desc: `
      สื่อ: ดินสอ, หมึก, แท็บเล็ตดิจิทัล.<br>
      ซอฟต์แวร์: Krita & Photoshop.<br>
      แรงบันดาลใจ: ลวดลายผ้า, ธรรมชาติของ NTT.<br>
      ทีม: ฉันและ AI lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "การเรียนรู้เชิงสะท้อนและการทดลองด้านภาพ",
    blender_para1: `
      <strong><u>การเดินทางด้าน 3D ของฉัน</u></strong>เริ่มในมหาวิทยาลัย,
      โดยไม่มี<em>พื้นฐาน</em>. ฉันเรียนรู้ด้วยความตั้งใจ, ใช้<strong>AI</strong>และแหล่งอ้างอิงออนไลน์.
      มันยาก, โน้ตบุ๊กมัก<em>ค้าง</em>, แต่ตรงนั้นคือความหมายของการเรียนรู้.
    `,
    blender_para2: `
      ผลงานมีจำกัด, มีเพียงไม่กี่โมเดล. แต่ทุกครั้งคือ<strong>การทดลอง</strong>,
      ไม่ใช่แค่ผลลัพธ์. จากสเก็ตช์ 2D ง่าย ๆ ฉันพยายามทำให้เป็น 3D.
      ฉันได้เรียนรู้ว่า<strong>การมองเห็น</strong>คือสะพานเชื่อมระหว่างแนวคิดและความจริง.
    `,
    blender_para3: `
      สำหรับฉัน <strong><u>การใช้สื่อ 3D</u></strong>สำคัญในเทคโนโลยีการศึกษา.
      โมเดล 3D ช่วยอธิบายแนวคิดนามธรรม, ให้การจำลอง, และทำให้การเรียนรู้สมบูรณ์ขึ้น.
      มันไม่ใช่แค่ศิลปะ แต่เป็น<strong>เครื่องมือการศึกษา</strong>.
    `,
    blender_para4: `
      <strong><u>บริบทท้องถิ่น</u></strong>นำมาซึ่งความท้าทาย. ใน Kupang และ NTT
      การเข้าถึงอุปกรณ์จำกัดทำให้การเรียนรู้ 3D ยากขึ้น. แต่ทุกผลงานพิสูจน์ว่า
      เทคโนโลยีสามารถใช้ได้อย่าง<em>ง่าย</em>เพื่อสร้างสิ่งที่<strong>มีความหมาย</strong>.
    `,
    blender_para5: `
      คำถามพื้นฐาน:
      <strong><u>อะไร</u></strong>ที่จะบรรลุ,
      <strong><u>ทำไม</u></strong>ถึงสำคัญ,
      <strong><u>ใคร</u></strong>จะได้รับประโยชน์,
      <strong><u>เป้าหมาย</u></strong>,
      <strong><u>ความแม่นยำ</u></strong>,
      <strong><u>ปัญหา</u></strong>ที่จะต้องแก้.
    `,
    blender_para6: `
      ฉันหวังว่าผลงาน 3D แต่ละชิ้นจะไม่ใช่แค่<em>การฝึกเชิงเทคนิค</em>,
      แต่เป็นการมีส่วนร่วมจริงที่อิงกับ<strong>อัตลักษณ์ท้องถิ่น</strong>และ<strong>มาตรฐานสากล</strong>.
    `,
    blender_figcaption: `
      <strong>เอกสารผลงาน 3D</strong> ที่สร้างด้วย<em>Blender</em>:
      จากโมเดลง่าย ๆ ไปจนถึงการทดลองแสงและพื้นผิวสมจริง.  
      <br><br>
      ทั้งหมดเกิดจาก<strong><u>การเรียนรู้ด้วยตนเอง</u></strong>ในมหาวิทยาลัย,
      โดยมี<strong>AI</strong>และการอ้างอิง. จริง ๆ: โน้ตบุ๊กธรรมดา,
      การเรนเดอร์หนัก. แต่ตรงนั้นคือการเรียนรู้จริง:
      <strong>การทดลอง</strong>และ<strong>ความพยายาม</strong>.  
      <br><br>
      การสะท้อน: นักศึกษา<strong>เทคโนโลยีการศึกษา</strong>มอง 3D
      เป็นวิธี<u>การมองเห็น การพัฒนา และการสร้าง</u>สิ่งที่เกี่ยวข้องกับ Kupang และ NTT.
    `,
    blender_fact_title: "ข้อเท็จจริง",
        blender_fact_desc: `
      ซอฟต์แวร์: Blender 3D.<br>
      ฮาร์ดแวร์: โน้ตบุ๊กธรรมดา.<br>
      กระบวนการ: สเก็ตช์ 2D → การทำเป็น 3D.<br>
      ทีม: ฉันและ AI lol.
    `,

    // Speaking Section
    speaking_heading: "การพูด & วารสารศาสตร์",
    speaking_subtitle: "การสื่อสารเชิงสะท้อนและการศึกษาในท้องถิ่น",
    speaking_para1: `
      <strong><u>การเดินทางด้านการสื่อสารของฉัน</u></strong>เริ่มตั้งแต่มัธยม.
      การนำเสนอและการเขียนเปิดประตูสู่<strong>การพูด</strong>และ<strong>วารสารศาสตร์</strong>.
      ตอนแรกฉันตื่นเต้น แต่ทุกโอกาสคือ<em>การฝึกฝน</em>.
    `,
    speaking_para2: `
      ในมหาวิทยาลัยมันกลายเป็น<strong>แนวทางเชิงวิชาการ</strong>.
      การพูดคือ<strong>การสร้างข้อโต้แย้ง</strong>, การจัดการข้อมูล, และการนำเสนออย่างแม่นยำ.
      วารสารศาสตร์คือ<strong>การรวบรวมข้อมูล</strong>และการสร้างเรื่องราวที่เกี่ยวข้อง.
    `,
    speaking_quote: `
      “การสื่อสารคือสะพานเชื่อมระหว่าง<strong>อัตลักษณ์ท้องถิ่น</strong>และ<strong>มาตรฐานสากล</strong>.”
    `,
    speaking_para3: `
      <strong><u>การศึกษาในท้องถิ่นของ Kupang และ NTT</u></strong>มีทั้งความท้าทายและโอกาส.
      การเข้าถึงสื่อจำกัดทำให้การเรียนรู้ยากขึ้น แต่พิสูจน์ได้ว่าเสียงจากภูมิภาค
      สามารถปรากฏในระดับชาติ. การพูดและวารสารศาสตร์คือ<em>เครื่องมือการศึกษา</em>.
    `,
    speaking_para4: `
      สำหรับฉัน แก่นแท้คือ<strong><u>การสำรวจ ปรับใช้ และจัดโครงสร้างข้อมูล</u></strong>
      เพื่อให้เกี่ยวข้องกับการศึกษา. คำถามพื้นฐาน:
      <strong><u>อะไร</u></strong>, <strong><u>ทำไม</u></strong>,
      <strong><u>ใคร</u></strong>, และ<strong><u>เป้าหมาย</u></strong>.
    `,
    speaking_para5: `
      ฉันหวังว่าผลงานด้านการสื่อสารแต่ละชิ้นจะไม่ใช่แค่<em>การฝึกเชิงเทคนิค</em>,
      แต่เป็นการมีส่วนร่วมจริงที่อิงกับ<strong>อัตลักษณ์ท้องถิ่น</strong>และ<strong>มาตรฐานสากล</strong>.
    `,
    speaking_figcaption: `
      <strong>เอกสารการพูดและวารสารศาสตร์</strong>:
      ตั้งแต่งานมัธยม, มหาวิทยาลัย, ไปจนถึงบทความสะท้อนเกี่ยวกับการศึกษาใน NTT.  
      <br><br>
      ทั้งหมดเกิดจาก<strong><u>การเรียนรู้ด้วยตนเอง</u></strong>และประสบการณ์จริง.
      จริง ๆ: ฉันมักจะตื่นเต้น แต่ตรงนั้นคือการเรียนรู้จริง.  
      <br><br>
      การสะท้อน: นักศึกษา<strong>เทคโนโลยีการศึกษา</strong>มองการสื่อสาร
      เป็นวิธี<u>การแสดงออกถึงอัตลักษณ์</u>และ<u>การสร้างสะพาน</u>.
    `,
    speaking_fact_title: "ข้อเท็จจริง",
    speaking_fact_desc: `
      เริ่มต้น: งานมัธยม.<br>
      พัฒนา: มหาวิทยาลัย, แนวทางเชิงวิชาการ.<br>
      โฟกัส: การศึกษา & อัตลักษณ์ท้องถิ่น.<br>
      ความท้าทาย: การเข้าถึงสื่อจำกัด.<br>
      ทีม: ฉันและ AI.
    `,

    // Patreon Section
    patreon_heading: "ค้นพบเพิ่มเติมกับฉัน",
    patreon_intro: `
      KANG_SHUA ไม่ใช่แค่การแสดงผลงาน แต่เป็นการเดินทางเชิงวิชาการและเชิงสร้างสรรค์.
      ผ่าน Patreon คุณสามารถเห็นเบื้องหลัง กระบวนการ ไอเดียใหม่ ๆ และก้าวสู่มาตรฐานระดับชาติและนานาชาติ.
    `,
    patreon_roadmap_title: "การเดินทางเชิงทดลองของฉัน:",
    patreon_node1: "การทดลองด้านการเขียนโปรแกรม ศิลปะ และ 3D",
    patreon_node2: "การเรียนรู้ด้วยตนเองโดยมี AI ช่วย",
    patreon_node3: "การสะท้อนเกี่ยวกับวารสารศาสตร์และการพูด",
    patreon_node4: "อัปเดตเส้นทางวิชาการด้านเทคโนโลยีการศึกษา",
    patreon_quote: "“การสนับสนุนเล็ก ๆ คือการลงทุนครั้งใหญ่ในอนาคตเชิงสร้างสรรค์และวิชาการ.”",
    patreon_cta: "เข้าร่วมการเดินทาง",

    // Footer
    footer_about_title: "เกี่ยวกับ",
    footer_about_desc: `
      <strong>KANG_SHUA</strong> เป็นโครงการส่วนตัวที่รวมเทคโนโลยี,
      ศิลปะ และวัฒนธรรมท้องถิ่น NTT ในรูปแบบเชิงวิชาการ.
      ออกแบบมาเพื่อให้ตรงตามมาตรฐานระดับชาติและแข่งขันในระดับสากล.
    `,
    footer_contact_title: "ติดต่อ",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>นักศึกษาเทคโนโลยีการศึกษา, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "การนำทาง",
    footer_nav_author: "ผู้เขียน",
    footer_nav_potensi: "สิ่งที่ฉันทำได้",
    footer_nav_coding: "การเขียนโปรแกรม",
    footer_nav_art: "ศิลปะ",
    footer_nav_blender: "3D",
    footer_nav_speaking: "การพูด",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>ข้อจำกัดความรับผิดชอบ:</strong> ผลงานทั้งหมดที่แสดงเป็นผลจากการทดลอง,
      การเรียนรู้ด้วยตนเอง และการสำรวจเชิงวิชาการ. ไม่ได้เป็นตัวแทนของสถาบันทางการ,
      แต่ยึดมั่นในมาตรฐานวิชาการระดับชาติและความเปิดกว้างระดับสากล.
    `,
    footer_copy: "© 2026 KANG_SHUA. สงวนลิขสิทธิ์ทั้งหมด."
  },

  ru: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "Главная",
    nav_author: "Профиль автора",
    nav_potensi: "Что я умею",
    nav_coding: "Программирование",
    nav_art: "Визуальное 2D",
    nav_blender: "3D Blender",
    nav_speaking: "Публичные выступления и журналистика",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(Искусство и наука объединены в образовании)",
    hero_cta: "Познакомьтесь со мной",

    // Author Section
    author_heading: "Я",
    author_subtitle: "Студент образовательных технологий | Universitas Terbuka, FKIP 2024",
    author_intro: "Я — Joshua.gr.s, обычный студент, изучающий образовательные технологии в Universitas Terbuka.",
    author_story: "Хотя у меня пока нет официальных достижений, я экспериментирую и учусь самостоятельно, часто с помощью ИИ и справочных материалов. Мои интересы — базовое программирование, 2D‑искусство, 3D‑исследования и журналистика через выступления и интервью.",
    author_quote: "«Я верю, что каждый маленький эксперимент — это шаг к прогрессу человечества.»",
    author_passions_title: "Сферы, которыми я занимаюсь:",
    passion_coding: "Базовое программирование (HTML, CSS, JS) — самообучение, помощь ИИ",
    passion_art: "2D‑искусство — рисую с детства",
    passion_blender: "3D‑дизайн — изучаю Blender по материалам и с помощью ИИ",
    passion_journalism: "Журналистика — выступления и интервью со школы",

    // Potensi Section
    potensi_heading: "Что я умею",
    potensi_coding_title: "Программирование",
    potensi_coding_desc: "Создание интерактивных интерфейсов с HTML, CSS и JavaScript.",
    potensi_coding_fact: "Факт: начал программировать в университете, учился самостоятельно с помощью ИИ. Иногда забываю, иногда вспоминаю.",
    potensi_art_title: "Искусство",
    potensi_art_desc: "Визуальный брендинг с элементами культуры NTT.",
    potensi_art_fact: "Факт: рисую с детства, но работы обычные. Честно говоря, я не профессионал.",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "3D‑моделирование с реалистичным освещением и текстурами.",
    potensi_blender_fact: "Факт: как и программирование, Blender начал изучать в университете, самообучение + материалы + ИИ.",
    potensi_speaking_title: "Публичные выступления",
    potensi_speaking_desc: "Интервью и презентации для ясной передачи идей.",
    potensi_speaking_fact: "Факт: привык со школы, часто были задания с интервью и презентациями. Достаточно уверен в публичных выступлениях.",
    potensi_journalism_title: "Журналистика",
    potensi_journalism_desc: "Выражение местной идентичности через письма и интервью.",
    potensi_journalism_fact: "Факт: пока нет официальных достижений, продолжаю экспериментировать. Люблю новое ради прогресса человечества.",

    // Coding Section
    coding_heading: "Проекты программирования",
    coding_subtitle: "Рефлексивное обучение и реализация",
    coding_para1: `
      <strong><u>Мой путь в программировании</u></strong> начался в университете,
      самообучение с <em>онлайн‑материалами</em> и помощью <strong>ИИ</strong>.
      Проекты: <em>электронная коммерция</em>, гостиничные системы, личные портфолио,
      и самое сложное: <strong><u>LMS (система управления обучением)</u></strong>.
    `,
    coding_para2: `
      Я понимаю, что мои навыки пока <em>базовые</em>.
      Сложные языки часто забываю, но при <strong>реальной реализации</strong> чувствую готовность.
      Это я называю <em>техническим мышлением</em>: сосредоточиться на том, как <strong>создано</strong> и как <strong>работает</strong>.
    `,
    coding_para3: `
      В <strong>UI/UX</strong>, <strong>данных</strong> и <strong>контенте</strong> я уверен.
      Для меня суть образовательных технологий —
      <strong><u>использовать, развивать и создавать</u></strong> то, что важно для общества.
    `,
    coding_para4: `
      <strong><u>Местный контекст</u></strong> тоже важен. Kupang и NTT — это вызовы:
      ограниченный доступ к технологиям, необходимость инклюзивных систем,
      и стремление к <em>практическим</em> и <em>устойчивым</em> решениям.
      Каждый проект — не только технический, но и <strong>практическая реализация</strong> и социальная значимость.
    `,
    coding_para5: `
      Основные вопросы:
      <strong><u>что</u></strong> достичь,
      <strong><u>почему</u></strong> это важно,
      <strong><u>кто</u></strong> получит пользу,
      <strong><u>цели</u></strong>,
      <strong><u>точность</u></strong>,
      <strong><u>проблемы</u></strong> для решения.
    `,
    coding_para6: `
      Я надеюсь, что каждая работа по программированию будет не просто <em>техническим упражнением</em>,
      а настоящим вкладом, основанным на <strong>местной идентичности</strong> и <strong>международных стандартах</strong>.
    `,
    coding_figcaption: `
      <strong>Документация фронтенд‑проектов</strong> со скриншотами:
      <em>электронная коммерция</em>, гостиничные системы, портфолио, <strong>LMS</strong>.  
      <br><br>
      Всё создано через <strong><u>самообучение</u></strong> в университете,
      с <em>онлайн‑материалами</em> и помощью <strong>ИИ</strong>.
      Честно: часто <em>забывал свой код</em>, повторял.
      Но именно там настоящее обучение: <strong>эксперимент</strong> и <strong>практика</strong>.  
      <br><br>
      Рефлексия: как <strong>студент образовательных технологий</strong> видит программирование
      как способ <u>использовать, развивать и создавать</u> для Kupang и NTT.
    `,
    coding_fact_title: "Факт",
    coding_fact_desc: `
      Создание сайтов, тестирование, разработка — весело lol.<br>
      Использовал только 2 устройства.<br>
      ПО: Visual Studio Code.<br>
      Команда: я и ИИ lol.
    `,

    // Art Section
    art_heading: "Искусство 2D",
    art_subtitle: "Рефлексивное визуальное путешествие и культурное исследование",
    art_para1: `
      <strong><u>Мой путь в 2D‑искусстве</u></strong> начался в детстве,
      с простых рисунков. Позже я пробовал <em>цифровое искусство</em> и <em>комиксы</em>,
      включая <strong>культуру NTT</strong> как визуальную идентичность.
    `,
    art_para2: `
      Мои работы пока <em>обычные</em>, не выдающиеся.
      Но каждая линия — это <strong>эксперимент</strong>, а не только результат.
      Я сосредоточен на том, как искусство может <strong>рассказывать истории</strong> и <strong>функционировать</strong>.
    `,
        art_para3: `
      В <strong>макете</strong>, <strong>цветах</strong> и <strong>визуальном повествовании</strong> я уверен.
      Для меня искусство — это не только эстетика,
      но и <strong><u>использовать, развивать и создавать</u></strong> то, что имеет значение.
    `,
    art_para4: `
      <strong><u>Местный контекст</u></strong> вдохновляет: Kupang и NTT с узорами тканей,
      традиционными символами и повседневными историями. Задача — превратить всё это
      в <em>современные</em> и <em>укоренённые</em> произведения.
    `,
    art_para5: `
      Основные вопросы:
      <strong><u>что</u></strong> выразить,
      <strong><u>почему</u></strong> это важно,
      <strong><u>кто</u></strong> это почувствует,
      <strong><u>цели</u></strong>,
      <strong><u>точность</u></strong>,
      <strong><u>история</u></strong> оживает.
    `,
    art_para6: `
      Я надеюсь, что каждая работа в 2D будет не просто <em>визуальным упражнением</em>,
      а настоящим вкладом, основанным на <strong>местной идентичности</strong> и <strong>международных стандартах</strong>.
    `,
    art_figcaption: `
      <strong>Документация визуальных работ</strong> моего пути:
      от <em>простых комиксов</em>, цифровых иллюстраций до исследования <strong>узоров NTT</strong>.  
      <br><br>
      Всё создано через <strong><u>самообучение</u></strong> с детства,
      с множеством <em>экспериментов</em> и помощью <strong>ИИ</strong>.
      Честно: часто считаю свои работы <em>обычными</em>, повторяю многое.
      Но именно там настоящее обучение: <strong>история</strong> и <strong>идентичность</strong>.  
      <br><br>
      Рефлексия: как <strong>студент образовательных технологий</strong> видит искусство
      как способ <u>использовать, развивать и создавать</u> для Kupang и NTT.
    `,
    art_fact_title: "Факт",
    art_fact_desc: `
      Материалы: карандаш, тушь, графический планшет.<br>
      ПО: Krita & Photoshop.<br>
      Вдохновение: узоры тканей, природа NTT.<br>
      Команда: я и ИИ lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "Рефлексивное обучение и визуальные эксперименты",
    blender_para1: `
      <strong><u>Мой путь в 3D</u></strong> начался в университете,
      без <em>базы</em>. Учился с помощью <strong>ИИ</strong> и онлайн‑материалов.
      Было трудно, ноутбук часто <em>зависал</em>, но именно там я понял смысл обучения.
    `,
    blender_para2: `
      Работ мало, всего несколько моделей. Но каждая попытка — это <strong>эксперимент</strong>,
      а не только результат. Из простых 2D‑эскизов я пытался сделать 3D.
      Это научило меня, что <strong>визуализация</strong> — мост между идеей и реальностью.
    `,
    blender_para3: `
      Для меня <strong><u>использование 3D‑медиа</u></strong> важно в образовательных технологиях.
      3D‑модели помогают объяснять абстрактные концепции, давать симуляции и обогащать обучение.
      Это не только искусство, но и <strong>педагогический инструмент</strong>.
    `,
    blender_para4: `
      <strong><u>Местный контекст</u></strong> приносит вызовы. В Kupang и NTT
      ограниченный доступ к устройствам усложняет обучение 3D. Но каждая работа доказывает,
      что технологии можно использовать <em>просто</em>, чтобы создать что‑то <strong>значимое</strong>.
    `,
    blender_para5: `
      Основные вопросы:
      <strong><u>что</u></strong> достичь,
      <strong><u>почему</u></strong> это важно,
      <strong><u>кто</u></strong> получит пользу,
      <strong><u>цели</u></strong>,
      <strong><u>точность</u></strong>,
      <strong><u>проблемы</u></strong> для решения.
    `,
    blender_para6: `
      Я надеюсь, что каждая работа в 3D будет не просто <em>техническим упражнением</em>,
      а настоящим вкладом, основанным на <strong>местной идентичности</strong> и <strong>международных стандартах</strong>.
    `,
    blender_figcaption: `
      <strong>Документация 3D‑работ</strong> в <em>Blender</em>:
      от простых моделей до экспериментов с освещением и текстурами.  
      <br><br>
      Всё создано через <strong><u>самообучение</u></strong> в университете,
      с помощью <strong>ИИ</strong> и материалов. Честно: ноутбук простой,
      рендеринг тяжёлый. Но именно там обучение реально:
      <strong>эксперимент</strong> и <strong>настойчивость</strong>.  
      <br><br>
      Рефлексия: как <strong>студент образовательных технологий</strong> видит 3D
      как способ <u>визуализировать, развивать и создавать</u> для Kupang и NTT.
    `,
    blender_fact_title: "Факт",
    blender_fact_desc: `
      ПО: Blender 3D.<br>
      Устройство: простой ноутбук.<br>
      Процесс: эскиз 2D → реализация в 3D.<br>
      Команда: я и ИИ lol.
    `,

    // Speaking Section
    speaking_heading: "Публичные выступления и журналистика",
    speaking_subtitle: "Рефлексивная коммуникация и местное образование",
    speaking_para1: `
      <strong><u>Мой путь в коммуникации</u></strong> начался в школе.
      Презентации и письма открыли дверь к <strong>выступлениям</strong> и <strong>журналистике</strong>.
      Сначала я нервничал, но каждая возможность была <em>практикой</em>.
    `,
    speaking_para2: `
      В университете это стало <strong>академическим подходом</strong>.
      Выступления — это <strong>построение аргументов</strong>, обработка данных и точная подача.
      Журналистика — это <strong>сбор информации</strong> и создание актуальных нарративов.
    `,
    speaking_quote: `
      «Коммуникация — мост между <strong>местной идентичностью</strong> и <strong>международными стандартами</strong>.»
    `,
    speaking_para3: `
      <strong><u>Местное образование в Kupang и NTT</u></strong> приносит вызовы и возможности.
      Ограниченный доступ к медиа усложняет обучение, но доказывает, что региональные голоса
      могут звучать на национальном уровне. Выступления и журналистика — это <em>педагогические инструменты</em>.
    `,
    speaking_para4: `
      Для меня суть — <strong><u>исследовать, адаптировать и структурировать информацию</u></strong>,
      чтобы она была актуальна для образования. Основные вопросы:
      <strong><u>что</u></strong>, <strong><u>почему</u></strong>,
      <strong><u>кто</u></strong>, <strong><u>цели</u></strong>.
    `,
    speaking_para5: `
      Я надеюсь, что каждая работа в коммуникации будет не просто <em>техническим упражнением</em>,
      а настоящим вкладом, основанным на <strong>местной идентичности</strong> и <strong>международных стандартах</strong>.
    `,
       speaking_figcaption: `
      <strong>Документация выступлений</strong> и журналистики:
      от школьных заданий, университета до рефлексивных статей об образовании в NTT.  
      <br><br>
      Всё создано через <strong><u>самообучение</u></strong> и практический опыт.
      Честно: часто нервничал, но именно там настоящее обучение.  
      <br><br>
      Рефлексия: как <strong>студент образовательных технологий</strong> видит коммуникацию
      как способ <u>выражать идентичность</u> и <u>строить мосты</u>.
    `,
    speaking_fact_title: "Факт",
    speaking_fact_desc: `
      Начало: школьные задания.<br>
      Развитие: университет, академический подход.<br>
      Фокус: образование и местная идентичность.<br>
      Вызов: ограниченный доступ к медиа.<br>
      Команда: я и ИИ.
    `,

    // Patreon Section
    patreon_heading: "Открой больше со мной",
    patreon_intro: `
      KANG_SHUA — это не только витрина, но и академическое и творческое путешествие.
      Через Patreon можно увидеть закулисные процессы, новые идеи и шаги к национальным и международным стандартам.
    `,
    patreon_roadmap_title: "Мой экспериментальный путь:",
    patreon_node1: "Эксперименты в программировании, визуальном искусстве и 3D",
    patreon_node2: "Самообучение с помощью ИИ",
    patreon_node3: "Рефлексия о журналистике и выступлениях",
    patreon_node4: "Обновления академического пути в образовательных технологиях",
    patreon_quote: "«Каждая маленькая поддержка — это большая инвестиция в творческое и академическое будущее.»",
    patreon_cta: "Присоединиться к пути",

    // Footer
    footer_about_title: "О проекте",
    footer_about_desc: `
      <strong>KANG_SHUA</strong> — это личная инициатива, объединяющая технологии,
      искусство и культуру региона NTT в академическом формате.
      Создано для соответствия национальным стандартам и международной конкуренции.
    `,
    footer_contact_title: "Контакты",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>Студент образовательных технологий, FKIP Universitas Terbuka, 2024</em>",
    footer_nav_title: "Навигация",
    footer_nav_author: "Автор",
    footer_nav_potensi: "Что я умею",
    footer_nav_coding: "Программирование",
    footer_nav_art: "Искусство",
    footer_nav_blender: "3D",
    footer_nav_speaking: "Выступления",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>Отказ от ответственности:</strong> Все показанные работы — результат экспериментов,
      самообучения и академических исследований. Они не представляют официальные учреждения,
      но соответствуют национальным академическим стандартам и международной открытости.
    `,
    footer_copy: "© 2026 KANG_SHUA. Все права защищены."
  },


  ar: {
    // Navbar + Sidebar + Hero
    title: "KANG_SHUA | MAIN",
    logo: "KANG_SHUA",
    nav_home: "الرئيسية",
    nav_author: "ملف المؤلف",
    nav_potensi: "ما أستطيع فعله",
    nav_coding: "البرمجة",
    nav_art: "الفن ثنائي الأبعاد",
    nav_blender: "3D Blender",
    nav_speaking: "التحدث والصحافة",
    nav_patreon: "Patreon",

    hero_title: "KANG_SHUA",
    hero_motto: "<em>Ars et Scientia in Educatione Coniunctae</em>",
    hero_subtagline: "(الفن والعلم متحدان في التعليم)",
    hero_cta: "تعرّف عليّ",

    // Author Section
    author_heading: "أنا",
    author_subtitle: "طالب في تكنولوجيا التعليم | Universitas Terbuka, FKIP 2024",
    author_intro: "أنا Joshua.gr.s، طالب عادي يدرس تكنولوجيا التعليم في Universitas Terbuka.",
    author_story: "ليس لدي إنجازات رسمية بعد، لكنني أتعلم ذاتياً وأجرب بمساعدة الذكاء الاصطناعي والمراجع. شغفي هو البرمجة الأساسية، الفن ثنائي الأبعاد، استكشاف ثلاثي الأبعاد، والصحافة عبر التحدث والمقابلات.",
    author_quote: "«أؤمن أن كل تجربة صغيرة هي خطوة نحو تقدم البشرية.»",
    author_passions_title: "المجالات التي أعمل عليها:",
    passion_coding: "برمجة أساسية (HTML, CSS, JS) — تعلم ذاتي بمساعدة الذكاء الاصطناعي",
    passion_art: "فن ثنائي الأبعاد — الرسم منذ الطفولة",
    passion_blender: "تصميم ثلاثي الأبعاد — تعلم Blender عبر المراجع والذكاء الاصطناعي",
    passion_journalism: "الصحافة — التحدث والمقابلات منذ المدرسة الثانوية",

    // Potensi Section
    potensi_heading: "ما أستطيع فعله",
    potensi_coding_title: "البرمجة",
    potensi_coding_desc: "بناء واجهات تفاعلية باستخدام HTML وCSS وJavaScript.",
    potensi_coding_fact: "حقيقة: بدأت البرمجة في الجامعة، تعلمت ذاتياً بمساعدة الذكاء الاصطناعي. أحياناً أنسى وأحياناً أتذكر.",
    potensi_art_title: "الفن",
    potensi_art_desc: "العلامة البصرية مع عناصر ثقافة NTT.",
    potensi_art_fact: "حقيقة: أحب الرسم منذ الطفولة لكن النتائج عادية. بصراحة، لست محترفاً.",
    potensi_blender_title: "3D Blender",
    potensi_blender_desc: "نمذجة ثلاثية الأبعاد بإضاءة وملمس واقعي.",
    potensi_blender_fact: "حقيقة: مثل البرمجة، بدأت Blender في الجامعة، تعلم ذاتي + مراجع + ذكاء اصطناعي.",
    potensi_speaking_title: "التحدث",
    potensi_speaking_desc: "المقابلات والعروض لتوضيح الأفكار.",
    potensi_speaking_fact: "حقيقة: اعتدت منذ المدرسة الثانوية، كانت هناك مهام كثيرة للمقابلات والعروض. واثق في التحدث أمام الجمهور.",
    potensi_journalism_title: "الصحافة",
    potensi_journalism_desc: "التعبير عن الهوية المحلية عبر الكتابة والمقابلات.",
    potensi_journalism_fact: "حقيقة: لا توجد إنجازات رسمية بعد، لكنني أواصل التجربة. أحب الجديد من أجل تقدم البشرية.",

    // Coding Section
    coding_heading: "مشاريع البرمجة",
    coding_subtitle: "رحلة انعكاسية في التعلم والتنفيذ",
    coding_para1: `
      <strong><u>رحلتي في البرمجة</u></strong> بدأت في الجامعة،
      تعلم ذاتي عبر <em>مراجع الإنترنت</em> ومساعدة <strong>الذكاء الاصطناعي</strong>.
      المشاريع: <em>التجارة الإلكترونية</em>، نظام الفنادق، ملف شخصي،
      والأصعب: <strong><u>LMS (نظام إدارة التعلم)</u></strong>.
    `,
    coding_para2: `
      أعترف أن مهاراتي ما زالت <em>أساسية</em>.
      غالباً أنسى اللغات المعقدة، لكن في <strong>التنفيذ الفعلي</strong> أكون مستعداً.
      أسمي هذا <em>التفكير التقني</em>: التركيز على كيفية <strong>البناء</strong> وكيفية <strong>العمل</strong>.
    `,
    coding_para3: `
      أنا واثق في <strong>UI/UX</strong>، <strong>البيانات</strong>، و<strong>المحتوى</strong>.
      بالنسبة لي، جوهر تكنولوجيا التعليم هو
      <strong><u>الاستخدام، التطوير، والإبداع</u></strong>.
    `,
    coding_para4: `
      <strong><u>السياق المحلي</u></strong> مهم أيضاً. Kupang وNTT يجلبان تحديات:
      وصول محدود للتكنولوجيا، الحاجة إلى أنظمة شاملة،
      وحلول <em>عملية</em> و<em>مستدامة</em>.
      كل مشروع ليس تقنياً فقط، بل أيضاً <strong>تنفيذ ميداني</strong> وارتباط اجتماعي.
    `,
    coding_para5: `
      أسئلة أساسية:
      <strong><u>ماذا</u></strong> نحقق،
      <strong><u>لماذا</u></strong> مهم،
      <strong><u>من</u></strong> يستفيد،
      <strong><u>الأهداف</u></strong>,
      <strong><u>الدقة</u></strong>,
      <strong><u>المشاكل</u></strong> للحل.
    `,
    coding_para6: `
      آمل أن تكون كل أعمال البرمجة ليست مجرد <em>تمارين تقنية</em>،
      بل مساهمة حقيقية مبنية على <strong>الهوية المحلية</strong> و<strong>المعايير الدولية</strong>.
    `,
    coding_figcaption: `
      <strong>توثيق مشاريع الواجهة الأمامية</strong> ملخص لقطات شاشة:
      <em>التجارة الإلكترونية</em>، نظام الفنادق، ملف شخصي، <strong>LMS</strong>.  
      <br><br>
      كلها عبر <strong><u>التعلم الذاتي</u></strong> في الجامعة،
      مع <em>مراجع الإنترنت</em> ومساعدة <strong>الذكاء الاصطناعي</strong>.
      بصراحة: غالباً <em>أنسى الكود الخاص بي</em>، أكرر.
      لكن هناك التعلم الحقيقي: <strong>التجربة</strong> و<strong>التنفيذ</strong>.  
      <br><br>
      انعكاس: كـ<strong>طالب تكنولوجيا التعليم</strong> أرى البرمجة
      كطريقة <u>للاستخدام، التطوير، والإبداع</u>.
    `,
    coding_fact_title: "حقيقة",
    coding_fact_desc: `
      بناء المواقع، الاختبار، التطوير ممتع lol.<br>
      استخدمت جهازين فقط.<br>
      البرنامج: Visual Studio Code.<br>
      الفريق: أنا والذكاء الاصطناعي lol.
    `,

    // Art Section
    art_heading: "الفن ثنائي الأبعاد",
    art_subtitle: "رحلة بصرية انعكاسية واستكشاف ثقافي",
    art_para1: `
      <strong><u>رحلتي في الفن ثنائي الأبعاد</u></strong> بدأت منذ الطفولة،
      من رسومات بسيطة. لاحقاً جربت <em>الفن الرقمي</em> و<em>القصص المصورة</em>,
      وأدخلت <strong>ثقافة NTT</strong> كهوية بصرية.
    `,
    art_para2: `
      أعمالي ما زالت <em>عادية</em>، ليست مميزة.
      لكن كل خط هو <strong>تجربة</strong>، وليس مجرد نتيجة.
      أركز على كيف يمكن للفن أن <strong>يسرد القصص</strong> و<strong>يعمل</strong>.
    `,
    art_para3: `
      أنا واثق في <strong>التصميم</strong>، <strong>الألوان</strong>، و<strong>السرد البصري</strong>.
      الفن ليس مجرد جماليات،
      بل هو <strong><u>استخدام، تطوير، وإبداع</u></strong>.
    `,
        art_para4: `
      <strong><u>السياق المحلي</u></strong> مصدر إلهام: Kupang وNTT مع أنماط النسيج،
      الرموز التقليدية والقصص اليومية. التحدي هو تحويلها إلى
      أعمال <em>معاصرة</em> و<em>متجذرة</em>.
    `,
    art_para5: `
      أسئلة أساسية:
      <strong><u>ماذا</u></strong> نعبر،
      <strong><u>لماذا</u></strong> مهم،
      <strong><u>من</u></strong> سيشعر،
      <strong><u>الأهداف</u></strong>,
      <strong><u>الدقة</u></strong>,
      <strong><u>القصة</u></strong> التي تُروى.
    `,
    art_para6: `
      آمل أن تكون كل أعمال 2D ليست مجرد <em>تمارين بصرية</em>،
      بل مساهمة حقيقية مبنية على <strong>الهوية المحلية</strong> و<strong>المعايير الدولية</strong>.
    `,
    art_figcaption: `
      <strong>توثيق الأعمال البصرية</strong> ملخص رحلتي:
      من <em>قصص مصورة بسيطة</em>، رسومات رقمية، إلى استكشاف <strong>أنماط نسيج NTT</strong>.  
      <br><br>
      كلها عبر <strong><u>التعلم الذاتي</u></strong> منذ الطفولة،
      مع الكثير من <em>التجارب</em> ومساعدة <strong>الذكاء الاصطناعي</strong>.
      بصراحة: غالباً أعتبر أعمالي <em>عادية</em>، أكرر كثيراً.
      لكن هناك التعلم الحقيقي: <strong>القصة</strong> و<strong>الهوية</strong>.  
      <br><br>
      انعكاس: كـ<strong>طالب تكنولوجيا التعليم</strong> يرى الفن
      كطريقة <u>للاستخدام، التطوير، والإبداع</u>.
    `,
    art_fact_title: "حقيقة",
    art_fact_desc: `
      الوسائط: قلم رصاص، حبر، جهاز لوحي رقمي.<br>
      البرامج: Krita & Photoshop.<br>
      الإلهام: أنماط النسيج، طبيعة NTT.<br>
      الفريق: أنا والذكاء الاصطناعي lol.
    `,

    // Blender Section
    blender_heading: "3D Blender",
    blender_subtitle: "تعلم انعكاسي وتجارب بصرية",
    blender_para1: `
      <strong><u>رحلتي في 3D</u></strong> بدأت في الجامعة،
      بدون <em>أساس</em>. تعلمت بمساعدة <strong>الذكاء الاصطناعي</strong> والمراجع.
      كان صعباً، الكمبيوتر المحمول كثيراً ما <em>توقف</em>، لكن هناك وجدت معنى التعلم.
    `,
    blender_para2: `
      الأعمال محدودة، بضع نماذج فقط. لكن كل محاولة <strong>تجربة</strong>،
      وليست مجرد نتيجة. حاولت تحويل رسومات 2D بسيطة إلى 3D.
      تعلمت أن <strong>التصور</strong> هو جسر بين الفكرة والواقع.
    `,
    blender_para3: `
      <strong><u>استخدام الوسائط ثلاثية الأبعاد</u></strong> مهم في تكنولوجيا التعليم.
      النماذج ثلاثية الأبعاد تشرح المفاهيم المجردة، تقدم محاكاة، وتثري التعلم.
      ليست مجرد فن، بل <strong>أداة تعليمية</strong>.
    `,
    blender_para4: `
      <strong><u>السياق المحلي</u></strong> تحدٍ. في Kupang وNTT
      الوصول المحدود للأجهزة يجعل 3D صعباً. لكن كل عمل يثبت أن
      التكنولوجيا يمكن أن تُستخدم <em>ببساطة</em> لإنتاج شيء <strong>ذو معنى</strong>.
    `,
    blender_para5: `
      أسئلة أساسية:
      <strong><u>ماذا</u></strong> نحقق،
      <strong><u>لماذا</u></strong> مهم،
      <strong><u>من</u></strong> يستفيد،
      <strong><u>الأهداف</u></strong>,
      <strong><u>الدقة</u></strong>,
      <strong><u>المشاكل</u></strong> للحل.
    `,
    blender_para6: `
      آمل أن تكون كل أعمال 3D ليست مجرد <em>تمارين تقنية</em>،
      بل مساهمة حقيقية مبنية على <strong>الهوية المحلية</strong> و<strong>المعايير الدولية</strong>.
    `,
    blender_figcaption: `
      <strong>توثيق أعمال 3D</strong> في <em>Blender</em>:
      من نماذج بسيطة إلى تجارب بالإضاءة والملمس.  
      <br><br>
      كلها عبر <strong><u>التعلم الذاتي</u></strong> في الجامعة،
      بمساعدة <strong>الذكاء الاصطناعي</strong> والمراجع. بصراحة: الكمبيوتر المحمول بسيط،
      الرندر ثقيل. لكن هناك التعلم الحقيقي:
      <strong>التجربة</strong> و<strong>الصبر</strong>.  
      <br><br>
      انعكاس: كـ<strong>طالب تكنولوجيا التعليم</strong> يرى 3D
      كطريقة <u>للتصور، التطوير، والإبداع</u>.
    `,
    blender_fact_title: "حقيقة",
    blender_fact_desc: `
      البرنامج: Blender 3D.<br>
      الجهاز: كمبيوتر محمول بسيط.<br>
      العملية: رسم 2D → تنفيذ 3D.<br>
      الفريق: أنا والذكاء الاصطناعي lol.
    `,

    // Speaking Section
    speaking_heading: "التحدث والصحافة",
    speaking_subtitle: "اتصال انعكاسي وتعليم محلي",
    speaking_para1: `
      <strong><u>رحلتي في الاتصال</u></strong> بدأت في المدرسة الثانوية.
      العروض والكتابة فتحت الباب لـ<strong>التحدث</strong> و<strong>الصحافة</strong>.
      في البداية كنت متوتراً، لكن كل فرصة كانت <em>تدريباً</em>.
    `,
    speaking_para2: `
      في الجامعة أصبحت <strong>نهجاً أكاديمياً</strong>.
      التحدث يعني <strong>بناء الحجج</strong>، معالجة البيانات، والدقة.
      الصحافة تعني <strong>جمع المعلومات</strong> وصياغة قصص ذات صلة.
    `,
    speaking_quote: `
      «الاتصال هو جسر بين <strong>الهوية المحلية</strong> و<strong>المعايير الدولية</strong>.»
    `,
    speaking_para3: `
      <strong><u>التعليم المحلي في Kupang وNTT</u></strong> يجلب تحديات وفرص.
      الوصول المحدود للإعلام يجعل التعلم صعباً، لكنه يثبت أن الأصوات المحلية
      يمكن أن تظهر على المستوى الوطني. التحدث والصحافة هما <em>أدوات تعليمية</em>.
    `,
    speaking_para4: `
      الجوهر بالنسبة لي هو <strong><u>استكشاف المعلومات، التكيف، وهيكلتها</u></strong>.
      أسئلة أساسية:
      <strong><u>ماذا</u></strong>, <strong><u>لماذا</u></strong>,
      <strong><u>من</u></strong>, <strong><u>الأهداف</u></strong>.
    `,
    speaking_para5: `
      آمل أن تكون كل أعمال الاتصال ليست مجرد <em>تمارين تقنية</em>،
      بل مساهمة حقيقية مبنية على <strong>الهوية المحلية</strong> و<strong>المعايير الدولية</strong>.
    `,
    speaking_figcaption: `
      <strong>توثيق التحدث والصحافة</strong>:
      من مهام المدرسة الثانوية، الجامعة، إلى مقالات انعكاسية عن التعليم.  
      <br><br>
      كلها عبر <strong><u>التعلم الذاتي</u></strong> والخبرة العملية.
      بصراحة: غالباً ما كنت متوتراً، لكن هناك التعلم الحقيقي.  
      <br><br>
      انعكاس: كـ<strong>طالب تكنولوجيا التعليم</strong> يرى الاتصال
      كطريقة <u>لإعطاء صوت</u> و<u>بناء جسور</u>.
    `,
    speaking_fact_title: "حقيقة",
    speaking_fact_desc: `
      البداية: مهام المدرسة الثانوية.<br>
      التطور: الجامعة، نهج أكاديمي.<br>
      التركيز: التعليم والهوية المحلية.<br>
      التحدي: وصول محدود للإعلام.<br>
      الفريق: أنا والذكاء الاصطناعي.
    `,

        // Patreon Section
    patreon_heading: "اكتشف المزيد معي",
    patreon_intro: `
      KANG_SHUA ليس مجرد عرض، بل رحلة أكاديمية وإبداعية.
      عبر Patreon يمكنك رؤية ما وراء الكواليس، العمليات، الأفكار الجديدة،
      والخطوات نحو المعايير الوطنية والدولية.
    `,
    patreon_roadmap_title: "رحلتي التجريبية:",
    patreon_node1: "تجارب في البرمجة، الفن البصري، و3D",
    patreon_node2: "تعلم ذاتي بمساعدة الذكاء الاصطناعي",
    patreon_node3: "انعكاسات حول الصحافة والتحدث",
    patreon_node4: "تحديثات حول مساري الأكاديمي في تكنولوجيا التعليم",
    patreon_quote: "«كل دعم صغير هو استثمار كبير في مستقبل إبداعي وأكاديمي.»",
    patreon_cta: "انضم إلى الرحلة",

    // Footer
    footer_about_title: "حول",
    footer_about_desc: `
      <strong>KANG_SHUA</strong> هو مشروع شخصي يجمع بين التكنولوجيا،
      الفن، وثقافة NTT المحلية في صيغة أكاديمية.
      صُمم ليتوافق مع المعايير الوطنية ويكون قادراً على المنافسة دولياً.
    `,
    footer_contact_title: "اتصال",
    footer_email: "kangshua25@gmail.com",
    footer_youtube: "YouTube",
    footer_instagram: "@kang_shuaart",
    footer_github: "GitHub",
    footer_patreon: "Patreon",
    footer_twitter: "X (Twitter)",
    footer_threads: "Threads",
    footer_identity: "<em>طالب تكنولوجيا التعليم، FKIP Universitas Terbuka، 2024</em>",
    footer_nav_title: "التنقل",
    footer_nav_author: "المؤلف",
    footer_nav_potensi: "ما أستطيع فعله",
    footer_nav_coding: "البرمجة",
    footer_nav_art: "الفن",
    footer_nav_blender: "3D",
    footer_nav_speaking: "التحدث",
    footer_nav_patreon: "Patreon",
    footer_disclaimer: `
      <strong>تنويه:</strong> جميع الأعمال المعروضة هي نتيجة تجارب،
      تعلم ذاتي، واستكشاف أكاديمي. لا تمثل مؤسسات رسمية،
      لكنها تلتزم بالمعايير الأكاديمية الوطنية والانفتاح الدولي.
    `,
    footer_copy: "© 2026 KANG_SHUA. جميع الحقوق محفوظة."
  }
};




























// Fungsi update bahasa
function updateLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
}

// Jalankan setelah halaman siap
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("langSelect");

  // Simpan teks default (Indonesia) ke translations.id
  translations.id = {};
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    translations.id[key] = el.innerHTML;
  });

  // Set default bahasa ke Indonesia
  updateLanguage("id");

  // Ganti bahasa saat dropdown berubah
  langSelect.addEventListener("change", e => {
    updateLanguage(e.target.value);
  });
});








