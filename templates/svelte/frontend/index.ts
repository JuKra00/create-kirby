import "@styles/index.scss";

// Auto-load modules in lib
for (const m of Object.values(
  import.meta.glob("./lib/*.ts", { eager: true })
)) {
  (m as any).install?.();
}

// Auto-load templates
const templates = Object.fromEntries(
  Object.entries(import.meta.glob("./templates/*.ts")).map(([key, value]) => [
    key.slice(12, -3).toLowerCase(),
    value,
  ])
);

templates[document.body.dataset.template ?? ""]?.().then((m) => {
  return new (m as any).default();
});


// Remove temporary stylesheet (to prevent FOUC) in development mode
if (import.meta.env.DEV) {
  for (const el of document.querySelectorAll(
    `[data-stylesheet*="vite-dev-css"]`
  )) {
    setTimeout(() => {
      el.remove();
    }, 400);
  }
}
