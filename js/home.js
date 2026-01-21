

// === Proteksi Interaksi Dasar ===
const blockedActions = [
  { event: 'contextmenu', message: "Klik kanan dinonaktifkan!" },
  { event: 'copy', message: "Copy tidak diizinkan!" },
  { event: 'paste', message: "Paste tidak diizinkan!" },
  { event: 'cut', message: "Cut tidak diizinkan!" },
  { event: 'dragstart', message: "Drag tidak diizinkan!" },
  { event: 'selectstart', message: "Seleksi teks tidak diizinkan!" }
];

blockedActions.forEach(action => {
  document.addEventListener(action.event, e => {
    e.preventDefault();
    console.warn(action.message);
  });
});

// === Proteksi Keyboard Shortcut ===
document.addEventListener('keydown', e => {
  const blockedShortcuts = [
    { ctrl: true, key: 's', message: "Ctrl+S diblokir!" },
    { ctrl: true, key: 'u', message: "Ctrl+U diblokir!" },
    { ctrl: true, key: 'c', message: "Ctrl+C diblokir!" },
    { ctrl: true, key: 'x', message: "Ctrl+X diblokir!" },
    { ctrl: true, key: 'a', message: "Ctrl+A diblokir!" },
    { ctrlShift: true, key: 'i', message: "Ctrl+Shift+I diblokir!" },
    { ctrlShift: true, key: 'j', message: "Ctrl+Shift+J diblokir!" },
    { ctrlShift: true, key: 'c', message: "Ctrl+Shift+C diblokir!" }
  ];

  blockedShortcuts.forEach(item => {
    if (
      (item.ctrl && e.ctrlKey && e.key.toLowerCase() === item.key) ||
      (item.ctrlShift && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === item.key)
    ) {
      e.preventDefault();
      console.warn(item.message);
    }
  });

  if (e.key === "F12") {
    e.preventDefault();
    console.warn("Developer Tools (F12) tidak diizinkan!");
  }
});

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






