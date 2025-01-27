import './components/RedactorHeader';

class PoligonsRedactor extends HTMLElement {
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
                <redactor-header></redactor-header>
            </div>
            <style>
            </style>
        `;
    }
}

customElements.define('poligons-redactor', PoligonsRedactor);