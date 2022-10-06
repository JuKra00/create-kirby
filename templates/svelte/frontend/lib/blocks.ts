export const install = async () => {
  const modules = Object.entries(import.meta.glob("../blocks/*.ts")).map(
    ([key, value]) => {
      return [key.slice(10, -3), value];
    }
  );

  modules.forEach(async ([name, func]) => {
    const selector = `[data-block-type="${(name as string).toLowerCase()}"]`;
    const elements = [...document.querySelectorAll<HTMLElement>(selector)];
    if (elements.length === 0) return;
    if (typeof func !== "function") return;
    const Module = (await func()) as any;
    elements.map((el) => new Module.default(el));
  });
};
