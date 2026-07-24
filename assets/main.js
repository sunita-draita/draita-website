// ---- assets/main.js ----

// Mobile nav toggle & basic enhancements
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
toggle?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

// Dynamic year
const yr = document.getElementById("year");
if (yr) yr.textContent = new Date().getFullYear();

// EmailJS init (v4)
(function () {
  emailjs.init({ publicKey: "uXZcR6dFVDpQZ17Qo" });
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successCard = document.getElementById("form-success");
  if (!form || !successCard) return;

  const btn = form.querySelector('button[type="submit"]');

  const SERVICE_ID = "service_g4vhe9d";
  const TEMPLATE_ID = "template_p62q71p";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // ✅ Basic validation (now using name="name" etc.)
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in your Name, Email, and Message before submitting.");
      return;
    }

    // Lock button
    const originalBtnText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        form.style.display = "none"; // hide form
        successCard.classList.remove("hidden"); // show thank-you card

        // Track successful contact form submission
        if (typeof pendo !== "undefined") {
          pendo.track("contact_form_submitted", {
            hasPhone: !!form.phone.value.trim(),
            messageLength: message.length
          });
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Sorry—something went wrong. Please try again, or email hello@draita.ai.");
        btn.disabled = false;
        btn.textContent = originalBtnText;

        // Track failed contact form submission
        if (typeof pendo !== "undefined") {
          pendo.track("contact_form_submission_failed", {
            errorMessage: String(err && err.text || err).substring(0, 200),
            messageLength: message.length
          });
        }
      });
  });
});