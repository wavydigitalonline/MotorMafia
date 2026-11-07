(function () {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const phone = data.get("phone") || "";
      const vehicle = data.get("vehicle") || "";
      const message = data.get("message") || "";
      const text = [
        "Hi Motor Mafia — quote request",
        "Name: " + name,
        "Phone: " + phone,
        vehicle ? "Vehicle: " + vehicle : "",
        "Need: " + message,
      ]
        .filter(Boolean)
        .join("\n");
      window.open("https://wa.me/27849990444?text=" + encodeURIComponent(text), "_blank");
    });
  }
})();
