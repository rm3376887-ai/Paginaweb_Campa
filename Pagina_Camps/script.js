/* =========================================================
   NAVEGACIÓN Y COMPORTAMIENTO
   ========================================================= */
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");

function closeMenu() {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
}

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
    navItems.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

/* Resalta la sección visible en el menú. */
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

/* Aparición progresiva de tarjetas y bloques. */
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* Botón flotante para regresar al inicio. */
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

/* Copia el ejemplo de código al portapapeles. */
document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const originalText = button.textContent;
    try {
      await navigator.clipboard.writeText(button.dataset.copy.replace(/\\n/g, "\n"));
      button.textContent = "Copiado";
    } catch (error) {
      button.textContent = "No disponible";
    }
    window.setTimeout(() => { button.textContent = originalText; }, 1800);
  });
});

/* Cierra el menú si se amplía la ventana a escritorio. */
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});
