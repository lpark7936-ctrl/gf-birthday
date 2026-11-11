
(() => {
  const KEY = "oceanWebsiteLanguage";

  const dutch = {
    "Home": "Startpagina",
    "Back": "Terug",
    "Next": "Volgende",
    "Continue": "Doorgaan",
    "Welcome": "Welkom",
    "Happy Birthday": "Gefeliciteerd met je verjaardag",
    "I love you": "Ik hou van je",
    "Our World": "Onze wereld",
    "Our Two Clocks": "Onze twee klokken",
    "Theater": "Bioscoop",
    "Holidays": "Feestdagen",
    "Drawing Studio": "Tekenstudio",
    "Safe Harbor": "Veilige haven",
    "Sleep Sanctuary": "Slaapplek",
    "Important Contacts": "Belangrijke contacten",
    "Focus Reef": "Focusrif",
    "Save": "Opslaan",
    "Close": "Sluiten",
    "Start": "Starten",
    "Pause": "Pauzeren",
    "Reset": "Opnieuw instellen"
  };

  const original = new WeakMap();

  function translate() {
    const lang = localStorage.getItem(KEY) || "en";
    document.documentElement.lang = lang;

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest(
        "script, style, textarea, input, select"
      )) continue;

      if (!original.has(node)) {
        original.set(node, node.nodeValue);
      }

      const english = original.get(node);
      const trimmed = english.trim();
      const translated =
        lang === "nl" ? (dutch[trimmed] || trimmed) : trimmed;

      if (dutch[trimmed]) {
        node.nodeValue = english.replace(trimmed, translated);
      }
    }

    const button = document.getElementById("ocean-language-button");
    if (button) {
      button.textContent =
        lang === "nl" ? "🇬🇧 English" : "🇳🇱 Nederlands";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const path = location.pathname;
    const homepage = path.endsWith("/") ||
      path.endsWith("/index.html");

    if (homepage) {
      const button = document.createElement("button");
      button.id = "ocean-language-button";
      button.style.cssText = `
        position:fixed;
        top:15px;
        right:15px;
        z-index:999999;
        padding:12px 18px;
        border-radius:30px;
        background:#075985;
        color:white;
        border:2px solid #67e8f9;
        cursor:pointer;
        font-weight:bold;
      `;

      button.onclick = () => {
        const current = localStorage.getItem(KEY) || "en";
        localStorage.setItem(
          KEY, current === "nl" ? "en" : "nl"
        );
        translate();
      };

      document.body.appendChild(button);
    }

    translate();
  });
})();
