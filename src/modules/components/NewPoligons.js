import { startMovePolygon, endMovePolygon, moveToOtherZone, movePolygon } from "../utils/mouseUtils";

class NewPoligons extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow(
            {mode: "closed"}
        );
    }

    setBaseData() {
        this.data = {
            ...this.data,
            offsetPolygonX: null,
            offsetPolygonY: null,
            dragPolygon: null,
            startX: null,
            startY: null,
        };
    }

    imagePolygonsList() {
        let result = '';

        if (this.data?.polygons) {
            for (const polygon of this.data?.polygons) {
                let pathD = '';
                for (const point in polygon.points){
                    const pointStr = point > 0
                        ? `L${polygon.points[point].x} ${polygon.points[point].y}`
                        : `M${polygon.points[point].x} ${polygon.points[point].y}`;
                    pathD = `${pathD} ${pointStr}`;
                }
                result = `${result} <path d="${pathD}" fill="#c2323d" id="${polygon.id}"/>`;
            }
        }

        return result;
    }

    connectedCallback() {
        this.setBaseData();
        this.render();

        window.addEventListener('mousemove', movePolygon.bind(this));
        window.addEventListener('mouseup', endMovePolygon.bind(this));
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
                
                path {
                    cursor: grab;
                }
                path:active {
                    cursor: grabbing;
                }
            </style>
        `;

        const svg = this.shadow.querySelector('svg');
        svg.addEventListener("mousedown", startMovePolygon.bind(this));
        svg.addEventListener('mouseleave', moveToOtherZone.bind(this));
    }
}

customElements.define('new-poligons', NewPoligons);