import "@styles/examples/infobox.scss";
export default class InfoBox {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
    this.addListeners();
  }

  addListeners() {
    this.element.addEventListener("click", () => {
      this.element.remove();
    });
  }
}
