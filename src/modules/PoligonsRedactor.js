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

    setBaseData() {
        this.data = {
            randomPolygons: [],
            placedPolygons: [],
            placementArea: null,
            generatingArea: null
        };
    }

    createNewPoligons() {
        this.data.randomPolygons = generateRandomPolygons();

        this.data.generatingArea.data = { ...this.data.generatingArea.data, polygons: this.data.randomPolygons };
    }

    movePolygonToPlacement({detail}) {
        const polygonIndex = this.data.randomPolygons.findIndex(
            (polygon) => polygon.id === detail.polygonId
        );
        this.data.placedPolygons.push(this.data.randomPolygons[polygonIndex]);
        this.data.randomPolygons.splice(polygonIndex, 1);

        this.data.generatingArea.data = { ...this.data.generatingArea.data, polygons: this.data.randomPolygons };
        this.data.placementArea.data = { ...this.data.placementArea.data, polygons: this.data.placedPolygons };
    }

    movePolygonFromPlacement({detail}) {
        const polygonIndex = this.data.placedPolygons.findIndex(
            (polygon) => polygon.id === detail.polygonId
        );
        this.data.randomPolygons.push(this.data.placedPolygons[polygonIndex]);
        this.data.placedPolygons.splice(polygonIndex, 1);

        this.data.generatingArea.data = { ...this.data.generatingArea.data, polygons: this.data.randomPolygons };
        this.data.placementArea.data = { ...this.data.placementArea.data, polygons: this.data.placedPolygons };
    }

    saveDataToLocalStorage() {
        const storage = window.localStorage;
        storage.setItem('createdPolygons', JSON.stringify({data: this.data.randomPolygons}));
        storage.setItem('placedPolygons', JSON.stringify({data: this.data.placedPolygons}));
    }

    getDataFromLocalStorage() {
        const storage = window.localStorage;
        const createdPolygons = JSON.parse(storage.getItem('createdPolygons'));
        const placedPolygons = JSON.parse(storage.getItem('placedPolygons'));
        if (createdPolygons?.data.length > 0)
            this.data.randomPolygons = createdPolygons.data
        if (placedPolygons?.data.length > 0)
            this.data.placedPolygons = placedPolygons.data

        const generatingArea = this.shadow.querySelector('new-poligons');
        generatingArea.data = { ...generatingArea?.data, polygons: this.data.randomPolygons };

        const polygonPlacementArea = this.shadow.querySelector('polygons-placement');
        polygonPlacementArea.data = { ...polygonPlacementArea?.data, polygons: this.data.placedPolygons};
    }

    resetPolygonsData() {
        this.data.randomPolygons = [];
        this.data.placedPolygons = [];

        const generatingArea = this.shadow.querySelector('new-poligons');
        generatingArea.data = { ...generatingArea?.data, polygons: this.data.randomPolygons };

        const polygonPlacementArea = this.shadow.querySelector('polygons-placement');
        polygonPlacementArea.data = { ...polygonPlacementArea?.data, polygons: this.data.placedPolygons};

        const storage = window.localStorage;
        storage.clear();
    }

    connectedCallback() {
        this.setBaseData();
        this.render();
        this.getDataFromLocalStorage();

        const header = this.shadow.querySelector('.poligons-redactor__header')

        header.addEventListener('create-poligons',
            () => this.createNewPoligons()
        );

        header.addEventListener('save-polygons',
            this.saveDataToLocalStorage.bind(this)
        );

        header.addEventListener('reset-polygons',
            this.resetPolygonsData.bind(this)
        );

        this.shadow.querySelector('.poligons-redactor__new-polygons').addEventListener('drag-polygon',
            this.movePolygonToPlacement.bind(this)
        );

        this.shadow.querySelector('.poligons-redactor__polygons-placement').addEventListener('drag-polygon',
            this.movePolygonFromPlacement.bind(this)
        )

        this.data.generatingArea = this.shadow.querySelector("new-poligons");
        this.data.placementArea = this.shadow.querySelector("polygons-placement");
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