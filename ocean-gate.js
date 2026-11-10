
/* Our Private Ocean — Invitation Gate */
(() => {
  "use strict";

  const INVITATION_CODE = "DIAMOND-OCEAN-2026";
  const STORAGE_KEY = "our-private-ocean-access-v1";
  const ACCESS_VERSION = "1";

  let allowed = false;

  try {
    allowed =
      localStorage.getItem(STORAGE_KEY) === ACCESS_VERSION;
  } catch (error) {}

  const css = document.createElement("style");

  css.textContent = `
    html.ocean-locked {
      overflow: hidden !important;
    }

    html.ocean-locked body > :not(#oceanGate) {
      visibility: hidden !important;
    }

    #oceanGate {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: auto;
      padding: 20px;
      box-sizing: border-box;
      background:
        radial-gradient(circle at 20% 20%,
          #51408a, transparent 45%),
        radial-gradient(circle at 80% 80%,
          #087f9c, transparent 50%),
        linear-gradient(145deg,
          #080e2e, #25185a, #075c83);
      color: white;
      font-family: Georgia, serif;
      text-align: center;
      visibility: visible !important;
    }

    #oceanGate * {
      box-sizing: border-box;
    }

    #oceanGate .gate-card {
      width: min(450px, 100%);
      padding: 35px 25px;
      background: rgba(12, 27, 72, 0.97);
      border: 2px solid #8df2ff;
      border-radius: 28px;
      box-shadow: 0 0 45px rgba(113,245,255,.2);
      animation: gateAppear .7s ease;
    }

    #oceanGate .gate-icon {
      font-size: 4.5rem;
      animation: gateFloat 3s ease-in-out infinite;
    }

    #oceanGate h1 {
      color: #8df2ff;
      font-size: 2rem;
      margin: 18px 0;
    }

    #oceanGate p {
      color: #e1d7ff;
      line-height: 1.7;
    }

    #oceanCode {
      display: block;
      width: 100%;
      padding: 15px;
      margin: 24px 0 12px;
      background: #142d63;
      border: 1px solid #8df2ff;
      border-radius: 14px;
      color: white;
      font: inherit;
      font-size: 1rem;
      text-align: center;
    }

    #oceanEnter {
      width: 100%;
      padding: 15px;
      margin: 0;
      border: 1px solid #8df2ff;
      border-radius: 35px;
      background: linear-gradient(100deg,
        #168da9, #7352b8);
      color: white;
      font: inherit;
      cursor: pointer;
    }

    #oceanEnter:hover {
      filter: brightness(1.15);
    }

    #oceanError {
      min-height: 1.5em;
      color: #ffd0d0 !important;
      font-size: .9rem;
    }

    @keyframes gateFloat {
      50% { transform: translateY(-12px); }
    }

    @keyframes gateAppear {
      from {
        opacity: 0;
        transform: translateY(25px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #oceanGate .gate-card,
      #oceanGate .gate-icon {
        animation: none;
      }
    }
  `;

  document.head.appendChild(css);

  if (!allowed) {
    document.documentElement.classList.add("ocean-locked");
  }

  function createGate() {
    if (allowed || document.getElementById("oceanGate")) {
      return;
    }

    const gate = document.createElement("div");
    gate.id = "oceanGate";

    gate.innerHTML = `
      <div class="gate-card">
        <div class="gate-icon">🐬💎</div>

        <h1>Our Private Ocean 🌊</h1>

        <p>
          Beyond these waves lies a little world
          made with love, just for you.
        </p>

        <p>
          Enter your special invitation code
          to begin your adventure. 💜
        </p>

        <form id="oceanGateForm">
          <input
            id="oceanCode"
            type="password"
            placeholder="Your secret invitation code..."
            autocomplete="off"
            aria-label="Invitation code"
            required
          >

          <button id="oceanEnter" type="submit">
            🔓 Unlock Our Ocean
          </button>
        </form>

        <p id="oceanError" role="status"></p>

        <p style="font-size:.85rem">
          Made with love, across every ocean. 🌙
        </p>
      </div>
    `;

    document.body.appendChild(gate);

    const input = document.getElementById("oceanCode");
    const form = document.getElementById("oceanGateForm");

    form.addEventListener("submit", event => {
      event.preventDefault();

      if (input.value.trim() === INVITATION_CODE) {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            ACCESS_VERSION
          );
        } catch (error) {}

        gate.remove();

        document.documentElement.classList.remove(
          "ocean-locked"
        );

        alert(
          "Welcome to our little ocean, hon! 🐬💜"
        );
      } else {
        document.getElementById("oceanError").textContent =
          "That isn't the right invitation code. Try again! 🐚";

        input.value = "";
        input.focus();
      }
    });

    input.focus();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      createGate,
      { once: true }
    );
  } else {
    createGate();
  }

  window.lockOurOcean = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {}

    location.reload();
  };
})();
