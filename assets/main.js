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

document.addEventListener("DOMContentLoaded", () => {
  //Initialize EmailJs once content is loaded.
  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: "uXZcR6dFVDpQZ17Qo" });
  }
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
    const interest = form.elements["interest"]?.value;
    
    if (!name || !email || !message || !interest) {
      alert("Please fill in your Name, Email, Message and Interest before submitting.");
      return;
    }
// Toggle expandable deliverables in service cards
function toggleDeliverables(trayId, btnElement) {
  const tray = document.getElementById(trayId);
  if (!tray) return;

  const isHidden = tray.classList.toggle('hidden');
  const label = btnElement.querySelector('span');
  
  if (label) {
    label.textContent = isHidden ? 'View Deliverables' : 'Hide Deliverables';
  }
  btnElement.classList.toggle('active', !isHidden);
}

// Auto-select dropdown option and smooth scroll to form
function scrollToEnquiry(optionValue) {
  const contactSection = document.getElementById('contact');
  const selectDropdown = document.getElementById('interest');

  if (selectDropdown && optionValue) {
    selectDropdown.value = optionValue;
  }

  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
      })
      .catch((err) => {
        console.error(err);
        alert("Sorry—something went wrong. Please try again, or email sunita@draita.ai.");
        btn.disabled = false;
        btn.textContent = originalBtnText;
      });
  });
});
