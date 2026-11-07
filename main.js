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


  // Gallery: auto-load images/work-1.jpg … work-24.jpg (skips missing)
  (function loadWorkGallery() {
    const grid = document.getElementById("workGrid");
    if (!grid) return;
    const max = 24;
    let pending = max;
    let found = 0;

    function finish() {
      if (found === 0) {
        grid.innerHTML = '<p class="work-empty" style="grid-column:1/-1;text-align:center;color:var(--muted)">Gallery photos coming soon.</p>';
      }
    }

    for (let i = 1; i <= max; i++) {
      const src = "images/work-" + i + ".jpg";
      const img = new Image();
      img.onload = function () {
        found++;
        const fig = document.createElement("figure");
        fig.className = "work-item";
        const el = document.createElement("img");
        el.src = src;
        el.alt = "Motor Mafia work " + i;
        el.loading = "lazy";
        fig.appendChild(el);
        grid.appendChild(fig);
        pending--;
        if (pending === 0) finish();
      };
      img.onerror = function () {
        pending--;
        if (pending === 0) finish();
      };
      img.src = src;
    }
  })();

})();
