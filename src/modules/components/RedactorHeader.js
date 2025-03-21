class RedactorHeader extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow(
            {mode: "closed"}
        );
    }

    createNewPoligons() {
        const event = new CustomEvent('create-poligons');
        this.dispatchEvent(event);
    }

    saveData() {
        const saveEvent = new CustomEvent('save-polygons');
        this.dispatchEvent(saveEvent);
    }

    resetData() {
        const resetEvent = new CustomEvent('reset-polygons');
        this.dispatchEvent(resetEvent);
    }

    connectedCallback() {
        this.render();

        this.shadow.querySelector('.header__create').addEventListener('click',
            () => this.createNewPoligons()
        );

        this.shadow.querySelector('.header__additional__save').addEventListener('click',
            () => this.saveData()
        );

        this.shadow.querySelector('.header__additional__reset').addEventListener('click',
            () => this.resetData()
        );
    }

    render() {
        this.shadow.innerHTML = `
            <div class="header">
                <button class="header__create">Создать</button>
                <div class="header__additional">
                    <button class="header__additional__save">Сохранить</button>
                    <button class="header__additional__reset">Сбросить</button>
                </div>
            </div>
            <style>
                .header {
                    display: flex;
                    flex-direction: row;
                    background: #414141;
                    padding: 18px 28px;
                }
                .header__additional {
                    margin-left: auto;
                    display: flex;
                    flex-direction: row;
                    gap: 18px;
                }
                button {
                    background: #b3b3b3;
                    outline: none;
                    cursor: pointer;
                    border-width: 0;
                    border-radius: 6px;
                    padding: 8px;
                    min-width: 7rem;
                }
            </style>
        `;
    }
}

customElements.define('redactor-header', RedactorHeader);