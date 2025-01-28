import {drawGrid} from "../utils/gridUtils";

class PolygonsPlacement extends HTMLElement {
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

    setBaseData() {
        this.data = {
            scale: 1,
            offsetX: 0,
            offsetY: 0,
            isDragging: false,
            startX: null,
            startY: null
        };
    }

    drawGridInField() {
        const grid = this.shadow.getElementById('grid');
        const axes = this.shadow.getElementById('axes');
        const labels = this.shadow.getElementById('labels');
        const svg = this.shadow.getElementById('gridCanvas');

        drawGrid(grid, axes, labels, this.data.scale, this.data.offsetX, this.data.offsetY, svg);
    }

    changeScale(event) {
        event.preventDefault();
        const scaleFactor = 1.1;
        this.data.scale *= event.deltaY < 0 ? scaleFactor : 1 / scaleFactor;
        this.drawGridInField();
    }

    onMouseDown(event) {
        this.data.isDragging = true;
        this.data.startX = event.clientX;
        this.data.startY = event.clientY;
    }

    onMouseMove(event) {
        if (!this.data?.isDragging) return;
        this.data.offsetX -= event.clientX - this.data.startX;
        this.data.offsetY -= event.clientY - this.data.startY;
        this.data.startX = event.clientX;
        this.data.startY = event.clientY;
        this.drawGridInField();
    }

    onMouseUp() {
        this.data.isDragging = false;
    }

    connectedCallback() {
        console.log(this.getAttribute('poligons'));
        this.setBaseData();
        this.render();
        this.drawGridInField();

        const svg = this.shadow.querySelector('svg');
        svg.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
        svg.addEventListener("wheel", this.changeScale.bind(this));
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
                <svg id="gridCanvas" width="600" height="400">
                    <g id="grid"></g>
                    <g id="axes"></g>
                    <g id="labels"></g>
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
                    cursor: grab;
                }
                svg:active {
                    cursor: grabbing;
                }
                #axes {
                    stroke: white;
                    stroke-width: 4rem;
                }
                text {
                    user-select: none;
                    font-size: 12px;
                }
            </style>
        `;
    }
}

customElements.define('polygons-placement', PolygonsPlacement);