
(() => {
  "use strict";

  const translations = {
    "Happy Birthday, My Love 🌊": "Gefeliciteerd met je verjaardag, mijn liefste 🌊",
    "A birthday surprise made with love": "Een verjaardagsverrassing gemaakt met liefde",
    "A little world, made just for you.": "Een kleine wereld, speciaal voor jou gemaakt.",
    "Even though oceans separate us, you're always close to my heart.": "Ook al scheiden oceanen ons, je bent altijd dicht bij mijn hart.",
    "Discover Your Surprise ✨": "Ontdek je verrassing ✨",
    "Play a Little Game ♡": "Speel een spelletje ♡",
    "Our Holiday Ocean": "Onze Feestdagenoceaan",
    "Our Little Ocean Theater": "Ons kleine oceaantheater",
    "Focus Reef": "Focusrif",
    "Important Contacts": "Belangrijke contacten",
    "Our Ocean Drawing Studio": "Onze oceaan-tekenstudio",
    "Our Two Clocks": "Onze twee klokken",
    "Sleep Sanctuary": "Slaapheiligdom",
    "Gentle Habit Tracker": "Zachte gewoontetracker",
    "The Safe Harbor": "De veilige haven",
    "Our Little World": "Onze kleine wereld",
    "🐬 Need Help Studying?": "🐬 Hulp nodig met studeren?",
    "Memory Match ♡": "Memoryspel ♡",
    "Find all four matching pairs!": "Vind alle vier de bijpassende paren!",
    "My Rarest Diamond": "Mijn zeldzaamste diamant",
    "A letter from my heart to yours": "Een brief van mijn hart aan het jouwe",
    "With all my love, always ♡": "Met al mijn liefde, voor altijd ♡",
    "A Gift Across the Ocean": "Een cadeau over de oceaan",
    "A little world created with love, just for you.": "Een kleine wereld met liefde gemaakt, speciaal voor jou.",
    "A Little Shelter From the Storm": "Een kleine schuilplaats voor de storm",
    "For the Days When the Ocean Feels Stormy": "Voor de dagen waarop de oceaan stormachtig voelt",
    "Open a Little Comfort 💌": "Open een beetje troost 💌",
    "Our Ocean Journey": "Onze oceaanreis",
    "Storm Breaker": "Stormbreker",
    "Who is exploring right now?": "Wie is er nu op ontdekking?",
    "Just visiting": "Gewoon op bezoek",
    "Visits on this browser": "Bezoeken in deze browser",
    "Total active time": "Totale actieve tijd",
    "This visit": "Dit bezoek",
    "Previous visit": "Vorig bezoek",
    "Reset splashes ↺": "Spetters resetten ↺",
    "Made with love, across every ocean. 🌙": "Met liefde gemaakt, over elke oceaan heen. 🌙",
    "Hey Hon! ❤️": "Hé schat! ❤️",
    "Back to My Birthday Surprise": "Terug naar mijn verjaardagsverrassing",
    "♡ Play Our Song ♡": "♡ Speel ons liedje ♡"
  };

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let applying = false;

  function language() {
    try {
      return localStorage.getItem("oceanLanguage") === "nl"
        ? "nl" : "en";
    } catch {
      return window.oceanLanguage === "nl" ? "nl" : "en";
    }
  }

  function saveLanguage(value) {
    window.oceanLanguage = value;
    try {
      localStorage.setItem("oceanLanguage", value);
    } catch {}
  }

  function translate() {
    if (applying) return;
    applying = true;

    const lang = language();
    document.documentElement.lang = lang;

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {
      const parent = node.parentElement;
      if (!parent || parent.closest(
        "script, style, textarea, noscript, [data-no-translate]"
      )) return;

      if (!originalText.has(node)) {
        originalText.set(node, node.nodeValue);
      }

      const original = originalText.get(node);
      const trimmed = original.trim();
      const translated = translations[trimmed];

      if (translated) {
        node.nodeValue = lang === "nl"
          ? original.replace(trimmed, translated)
          : original;
      }
    });

    document.querySelectorAll(
      "[placeholder], [title], [aria-label]"
    ).forEach(element => {
      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, {});
      }

      const originals = originalAttributes.get(element);

      ["placeholder", "title", "aria-label"].forEach(attr => {
        if (!element.hasAttribute(attr)) return;

        if (!(attr in originals)) {
          originals[attr] = element.getAttribute(attr);
        }

        const english = originals[attr];
        element.setAttribute(
          attr,
          lang === "nl"
            ? translations[english] || english
            : english
        );
      });
    });

    const button = document.getElementById("languageToggle");

    if (button) {
      button.textContent = lang === "nl"
        ? "🇬🇧 English"
        : "🇳🇱 Nederlands";
    }

    applying = false;
  }

  window.toggleLanguage = function () {
    saveLanguage(language() === "nl" ? "en" : "nl");
    translate();
  };

  function init() {
    translate();

    const button = document.getElementById("languageToggle");
    if (button) {
      button.addEventListener("click", window.toggleLanguage);
    }

    const observer = new MutationObserver(() => {
      if (!applying) translate();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
