const bookingEmail = "booking@restauranthammurabi.se";

function setLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-en]").forEach((element) => {
    element.textContent = element.dataset[lang];
  });

  document.querySelectorAll(".lang button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  localStorage.setItem("hammurabiLang", lang);
}

document.querySelectorAll(".lang button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

function bindForm(id, subject) {
  const form = document.getElementById(id);
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const body = [
      "Hello Restaurant Hammurabi,",
      "",
      `Name: ${data.get("name")}`,
      `Contact: ${data.get("contact")}`,
      `Guests: ${data.get("guests")}`,
      `Date and time: ${data.get("date")}`,
      `Message: ${data.get("message") || "-"}`
    ].join("\n");

    window.location.href = `mailto:${bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

bindForm("bookingForm", "Booking request for Restaurant Hammurabi");
bindForm("cateringRequestForm", "Catering request for Restaurant Hammurabi");

setLanguage(localStorage.getItem("hammurabiLang") || "en");
