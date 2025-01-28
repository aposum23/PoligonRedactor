import './components/RedactorHeader';
import './components/NewPoligons';
import './components/PolygonsPlacement';
import { generateRandomPolygons } from './utils/polygonsGeneration';

class PoligonsRedactor extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow(
            {mode: "closed"}
        );
    }

    createNewPoligons() {
        const randomPolygons = generateRandomPolygons();
        console.log('randomPolygons:', randomPolygons);

        const child = this.shadow.querySelector("new-poligons");
        child.data = { polygons: randomPolygons };
    }

    connectedCallback() {
        this.render();

        this.shadow.querySelector('.poligons-redactor__header').addEventListener('create-poligons',
            () => this.createNewPoligons()
        );
    }

    render() {
        this.shadow.innerHTML = `
            <div class="poligons-redactor">
                <redactor-header class="poligons-redactor__header"></redactor-header>
                <new-poligons class="poligons-redactor__new-polygons"></new-poligons>
                <polygons-placement class="poligons-redactor__polygons-placement"></polygons-placement>
            </div>
            <style>
                .poligons-redactor {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    height: 100vh;
                }
            </style>
        `;
    }
}

customElements.define('poligons-redactor', PoligonsRedactor);