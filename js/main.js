import {templateAssortmentType,templateProductCard,templateCarousel} from './template.js';
import {assortmentTypes,cards,carouselCards} from '../data/data.js';




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
    document.getElementById('productCards').append(complete);   
}

function renderCarousel() {
    const complete = document.createDocumentFragment();
    complete.append(templateCarousel(carouselCards));
    document.getElementById('carousel').append(complete);
}

function updateCarouselButtonsVisibility(currentIndex,cards) {
    if (currentIndex === 0) {
        document.getElementById('carouselScrollButtonLeft').classList.add('invisible');
    } else {
        document.getElementById('carouselScrollButtonLeft').classList.remove('invisible');
    }

    if (currentIndex === cards.length - 1) {
        document.getElementById('carouselScrollButtonRight').classList.add('invisible');
    } else {
        document.getElementById('carouselScrollButtonRight').classList.remove('invisible');
    }
}

function carouselLogic() {
    const carouselTrack = document.getElementById('carouselTrack');
    const cards = Array.from(document.querySelectorAll('.card_carousel'));
    const dots = document.querySelectorAll('.dot');
    let currentCardId = 0; 

    function goToCard(cardIndex) {
        if (cardIndex < 0 || cardIndex > cards.length-1) return;
        const targetCard = cards[cardIndex];
        const cardWidth = targetCard.clientWidth;
        carouselTrack.style.transform = `translateX(-${cardIndex * (cardWidth + parseFloat(window.getComputedStyle(carouselTrack).gap || 0))}px)`;
        currentCardId = cardIndex;
        cards.forEach(card => {
            if (card === targetCard) {
                targetCard.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        dots.forEach((dot,index) => {
            if (index === cardIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
        updateCarouselButtonsVisibility(cardIndex,cards);
    };


    dots.forEach((dot, index) => {
        dot.addEventListener('click', (event) => {
            if (event.currentTarget.classList.contains('active')) return; 
            goToCard(index);
        })
    });

    document.getElementById('carouselScrollButtonRight').addEventListener('click', () => goToCard(currentCardId + 1));
    document.getElementById('carouselScrollButtonLeft').addEventListener('click', () => goToCard(currentCardId - 1));

    window.addEventListener('resize', () => goToCard(currentCardId));
    updateCarouselButtonsVisibility(0,cards);
}

renderIcons();
renderAssortmentTypes();
renderProductCards();
renderCarousel();
carouselLogic();