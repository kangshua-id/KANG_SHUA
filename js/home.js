// === Structured Data Injection ===
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joshua",
  "url": "https://kangshua.dev",
  "sameAs": [
    "https://www.instagram.com/kang_shuaart/"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kupang",
    "addressRegion": "Nusa Tenggara Timur",
    "addressCountry": "Indonesia"
  },
  "jobTitle": "Web Developer & UI Designer"
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);

// === Cinematic Text Transition ===
document.addEventListener("DOMContentLoaded", () => {
  const indoText = document.querySelector(".teks-indo");
  const baliText = document.querySelector(".teks-bali");

  if (indoText && baliText) {
    indoText.classList.add("active");

    setTimeout(() => {
      indoText.classList.remove("active");
      baliText.classList.add("active");
    }, 3000);
  }
});


