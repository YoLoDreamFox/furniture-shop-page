




function renderIcons() {
    class renderIcon extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({mode: 'open'});
        }
        
        connectedCallback() {
            const name = this.getAttribute('name');
            this.shadowRoot.innerHTML = `
                <svg>
                    <style>
                        svg {
                            width: 100%;
                            height: 100%;
                        }
                        :host {
                            display: inline-block;
                            width: var(--icon-size);
                            height: var(--icon-size);
                        }
                    </style>
                    <use href="./libs/icons.svg#${name}"></use>
                </svg>
            `;
        }
    }

    customElements.define('app-icon', renderIcon);
}



renderIcons();