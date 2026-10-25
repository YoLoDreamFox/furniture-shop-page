import {templateAssortmentType,templateProductCard} from './template.js';
import {assortmentTypes,cards} from '../data/data.js';




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

function renderAssortmentTypes() {
    const complete = document.createDocumentFragment();
        for (const type of assortmentTypes) {
            complete.append(templateAssortmentType(type.src,type.alt,type.name));
        }
    document.getElementById('assortmentTypes').replaceChildren(complete);
}

// TODO pagination
function renderProductCards() {
    const complete = document.createDocumentFragment();
        for (const card of cards) {
            const price = card.price + '$';
            const old_price = card.old_price != null ? card.old_price + '$' : null;
            const discount = card.discount != null ? '-' + card.discount + '%' : null;
            const timeItem = new Date(card.date.year, card.date.month-1, card.date.day);
            complete.append(templateProductCard(card.name,card.description,price,card.src,card.alt,timeItem,old_price,discount,card.src_item));
        }
    document.getElementById('productCards').replaceChildren(complete);
    
}

renderIcons();
renderAssortmentTypes();
renderProductCards();