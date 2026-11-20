(() => {
  const root = document.documentElement;
  const key = "trelia-color-theme";
  try {
    if (localStorage.getItem(key) === "light") root.dataset.theme = "light";
  } catch {
    // Keep the default when storage is unavailable.
  }

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-toggle");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const update = () => {
      const light = root.dataset.theme === "light";
      button.setAttribute("aria-pressed", String(light));
      themeColor.content = light ? "#f5f7f1" : "#0d0f0e";
    };
    update();
    button.hidden = false;
    button.addEventListener("click", () => {
      const theme = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = theme;
      try {
        localStorage.setItem(key, theme);
      } catch {
        // The selection still applies for the current page.
      }
      update();
    });
  });
})();
