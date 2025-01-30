import {getTransformValues} from "./valueUtils";

// Чтобы функции работали корректно нужно биндить им контекст

export function startMovePolygon(event) {
    if (event.target.tagName === 'path') {
        event.preventDefault();

        this.data.dragPolygon = event.target;
        this.data.startX = event.clientX;
        this.data.startY = event.clientY;

        const {x, y} = getTransformValues(this.data.dragPolygon);
        this.data.offsetPolygonX = x || 0;
        this.data.offsetPolygonY = y || 0;
    }
}

export function movePolygon(event) {
    if (this.data.dragPolygon) {
        this.data.offsetPolygonX += event.clientX - this.data.startX;
        this.data.offsetPolygonY += event.clientY - this.data.startY;

        this.data.startX = event.clientX;
        this.data.startY = event.clientY;

        this.data.dragPolygon.setAttribute('transform',
            `translate(${this.data.offsetPolygonX}, ${this.data.offsetPolygonY})`
        );
    }
}

export function endMovePolygon(event) {
    if (this.data.dragPolygon) {
        this.data.dragPolygon = null;
    }
}

export function moveToOtherZone(event) {
    if (this.data.dragPolygon){
        const customEvt = new CustomEvent('drag-polygon',
            {detail: {polygonId: Number(this.data.dragPolygon.id)}}
        );
        this.dispatchEvent(customEvt);
        endMovePolygon.call(this);
        this.data.offsetPolygonX = 0;
        this.data.offsetPolygonY = 0;
    }
}