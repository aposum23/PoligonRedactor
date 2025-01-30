import { drawGrid } from "../utils/gridUtils";
import {endMovePolygon, movePolygon, moveToOtherZone, startMovePolygon} from "../utils/mouseUtils";

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

    setBaseData() {
        this.data = {
            scale: 1,
            offsetX: 0,
            offsetY: 0,
            offsetPolygonX: null,
            offsetPolygonY: null,
            dragPolygon: null,
            isDragging: false,
            startX: null,
            startY: null,
            polygonsGroup: null,
        };
    }

    drawGridInField() {
        const grid = this.shadow.getElementById('grid');
        const axes = this.shadow.getElementById('axes');
        const labels = this.shadow.getElementById('labels');
        const svg = this.shadow.getElementById('gridCanvas');

        drawGrid(grid, axes, labels, this.data.scale, this.data.offsetX, this.data.offsetY, svg);
    }

    setPolygonsTransform() {
        this.data.polygonsGroup.setAttribute('transform',
            `translate(${this.data.offsetX * -1}, ${this.data.offsetY * -1}) scale(${this.data.scale})`
        );
    }

    changeScale(event) {
        event.preventDefault();
        const scaleFactor = 1.1;
        this.data.scale *= event.deltaY < 0 ? scaleFactor : 1 / scaleFactor;
        this.drawGridInField();

        this.setPolygonsTransform();
    }

    onMouseDown(event) {
        if (event.target.tagName === 'path') {
            const polygonMove = startMovePolygon.bind(this);
            polygonMove(event);
        }
        else {
            this.data.isDragging = true;
            this.data.startX = event.clientX;
            this.data.startY = event.clientY;
        }
    }

    onMouseMove(event) {
        if (!this.data?.isDragging) return;
        this.data.offsetX -= event.clientX - this.data.startX;
        this.data.offsetY -= event.clientY - this.data.startY;
        this.data.startX = event.clientX;
        this.data.startY = event.clientY;

        this.drawGridInField();
        this.setPolygonsTransform();
    }

    onMouseUp() {
        this.data.isDragging = false;
    }

    connectedCallback() {
        this.setBaseData();
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
                <svg id="gridCanvas" width="300" height="200">
                    <g id="grid"></g>
                    <g id="polygons">${this.imagePolygonsList()}</g>
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
                }
                svg:active {
                    cursor: grabbing;
                }
                path {
                    cursor: grab;
                }
                path:active {
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

        this.drawGridInField();

        const svg = this.shadow.querySelector('svg');
        svg.addEventListener("mousedown", this.onMouseDown.bind(this));
        svg.addEventListener("mousemove", this.onMouseMove.bind(this));
        svg.addEventListener("mouseup", this.onMouseUp.bind(this));
        svg.addEventListener("wheel", this.changeScale.bind(this));
        svg.addEventListener('mouseleave', moveToOtherZone.bind(this));

        window.addEventListener('mousemove', movePolygon.bind(this));
        window.addEventListener('mouseup', endMovePolygon.bind(this));

        this.data.polygonsGroup = this.shadow.getElementById('polygons');
        this.setPolygonsTransform();
    }
}

customElements.define('polygons-placement', PolygonsPlacement);