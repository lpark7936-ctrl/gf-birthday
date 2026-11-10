
/* OUR PRIVATE OCEAN — INVITATION GATE */

(() => {
    "use strict";

    // CHANGE THIS TO YOUR OWN PRIVATE INVITATION CODE.
    const INVITATION_CODE = "DIAMOND-OCEAN-2026";

    // Browser remembers successful entry.
    const STORAGE_KEY = "our-private-ocean-access-v1";

    // Change this version if you want to reset access.
    const ACCESS_VERSION = "1";

    const allowed =
        localStorage.getItem(STORAGE_KEY) === ACCESS_VERSION;

    // Hide the website while the entrance is checked.
    const initialStyle = document.createElement("style");
    initialStyle.textContent = `
        html.ocean-locked body {
            visibility: hidden !important;
        }
    `;
    document.head.appendChild(initialStyle);

    if (!allowed) {
        document.documentElement.classList.add("ocean-locked");
    }

    function createGate() {
        if (allowed) return;

        const style = document.createElement("style");

        style.textContent = `
            #oceanGate {
                position: fixed;
                inset: 0;
                z-index: 2147483647;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                overflow-y: auto;
                background:
                    radial-gradient(
                        circle at 20% 20%,
                        #51408a,
                        transparent 45%
                    ),
                    radial-gradient(
                        circle at 80% 80%,
                        #087f9c,
                        transparent 50%
                    ),
                    linear-gradient(
                        145deg,
                        #080e2e,
                        #25185a,
                        #075c83
                    );
                font-family: Georgia, serif;
                color: white;
                text-align: center;
                visibility: visible !important;
            }

            #oceanGate * {
                box-sizing: border-box;
            }

            .ocean-gate-card {
                width: min(450px, 100%);
                padding: 35px 25px;
                background: rgba(12, 27, 72, 0.95);
                border: 2px solid #8df2ff;
                border-radius: 28px;
                box-shadow:
                    0 0 45px rgba(113, 245, 255, 0.2);
                animation: gateAppear 0.8s ease;
            }

            .ocean-gate-icon {
                font-size: 4.5rem;
                animation: gateFloat 3s ease-in-out infinite;
            }

            .ocean-gate-card h1 {
                color: #8df2ff;
                font-size: 2rem;
                margin: 18px 0;
            }

            .ocean-gate-card p {
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
                border: 1px solid #8df2ff;
                border-radius: 35px;
                background:
                    linear-gradient(100deg, #168da9, #7352b8);
                color: white;
                font: inherit;
                cursor: pointer;
                transition: transform 0.2s;
            }

            #oceanEnter:hover {
                transform: translateY(-3px);
            }

            #oceanError {
                min-height: 1.5em;
                color: #ffd0d0;
                font-size: 0.9rem;
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
                .ocean-gate-card,
                .ocean-gate-icon {
                    animation: none;
                }
            }
        `;

        document.head.appendChild(style);

        const gate = document.createElement("div");
        gate.id = "oceanGate";

        gate.innerHTML = `
            <div class="ocean-gate-card">
                <div class="ocean-gate-icon">🐬💎</div>

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
                        required
                    >

                    <button id="oceanEnter" type="submit">
                        🔓 Unlock Our Ocean
                    </button>
                </form>

                <p id="oceanError" role="status"></p>

                <p style="font-size:0.85rem;">
                    Made with love, across every ocean. 🌙
                </p>
            </div>
        `;

        document.body.appendChild(gate);

        // Make only the gate visible.
        document.documentElement.classList.remove("ocean-locked");

        const form = document.getElementById("oceanGateForm");
        const input = document.getElementById("oceanCode");
        const error = document.getElementById("oceanError");

        form.addEventListener("submit", event => {
            event.preventDefault();

            if (input.value.trim() === INVITATION_CODE) {
                localStorage.setItem(
                    STORAGE_KEY,
                    ACCESS_VERSION
                );

                gate.remove();

                document.body.style.visibility = "";

                // Optional welcome message.
                alert("Welcome to our little ocean, hon! 🐬💜");
            } else {
                error.textContent =
                    "That isn't the right invitation code. Try again! 🐚";

                input.value = "";
                input.focus();
            }
        });
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

    // Manual lock function for future buttons.
    window.lockOurOcean = function () {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    };
})();
