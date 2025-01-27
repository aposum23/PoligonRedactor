class App extends HTMLElement {
    constructor() {
        super();
        this.name = 'App';
        this.shadow = this.attachShadow(
            {mode: "closed"}
        );
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                h1 {
                    color: red;
                }
            </style>
            <h1>
                Hello, world!
            </h1>
        `;
    }
}

customElements.define('app-component', App);