class NewPoligons extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow(
            {mode: "closed"}
        );
    }

    imagePolygonsList() {
        let result = '';

        if (this.data?.polygons) {
            for (const polygon of this.data?.polygons) {
                let pathD = '';
                for (const point in polygon){
                    const pointStr = point > 0
                        ? `L${polygon[point].x} ${polygon[point].y}`
                        : `M${polygon[point].x} ${polygon[point].y}`;
                    pathD = `${pathD} ${pointStr}`;
                }
                result = `${result} <path d="${pathD}" fill="#c2323d"/>`;
            }
        }

        return result;
    }

    connectedCallback() {
        console.log(this.getAttribute('poligons'))
        this.render();
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <div class="new-poligons">
                <svg>
                    ${this.imagePolygonsList()}
                </svg>
            </div>
            <style>
                .new-poligons {
                    width: 100%;
                    height: 45vh;
                    background: #414141;
                }
                svg {
                    width: 100%;
                    height: 100%;
                }
            </style>
        `;
    }
}

customElements.define('new-poligons', NewPoligons);