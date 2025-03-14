import './modules/PoligonsRedactor';

class App extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow(
            {mode: "closed"}
        );
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <div>
                <poligons-redactor></poligons-redactor>
            </div>
            <style>
            </style>
        `;
    }
}

customElements.define('app-component', App);