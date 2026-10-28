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


function scrollButtonCreate(allCards) {
    const scrollButtonRight = document.getElementById('scrollButtonRight');
    const scrollButtonLeft = document.getElementById('scrollButtonLeft');
    let isScrolling = false;
    
    scrollButtonRight.addEventListener('click', () => {
        allCards.scrollBy({
            left: allCards.querySelector('.card').offsetWidth,
            behavior: 'smooth'
        })
    });

    scrollButtonLeft.addEventListener('click', () => {
        allCards.scrollBy({
            left: -allCards.querySelector('.card').offsetWidth,
            behavior: 'smooth'
        })
    });

    allCards.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                scrollButton(allCards);
                isScrolling = false;
            });
            isScrolling = true;
        };
    });

}

function scrollButton(allCards) {
    const scrollButtonRight = document.getElementById('scrollButtonRight');
    const scrollButtonLeft = document.getElementById('scrollButtonLeft');
    if (allCards.clientWidth < allCards.scrollWidth) {
        scrollButtonRight.classList.remove('invisible');
        scrollButtonLeft.classList.remove('invisible');
    } else {
        scrollButtonRight.classList.add('invisible');
        scrollButtonLeft.classList.add('invisible');
    }
    if (allCards.scrollLeft <= 0) {
        scrollButtonLeft.classList.add('invisible');
    }
    if (Math.ceil(allCards.scrollLeft) >= allCards.scrollWidth - allCards.clientWidth){
        scrollButtonRight.classList.add('invisible');
    }
    
}

function scrollForAllCards() {
    const allCards = document.getElementById('assortmentTypes');
    scrollButtonCreate(allCards);
    
    const resizeObserver = new ResizeObserver(() => {
            scrollButton(allCards);
    });
    resizeObserver.observe(allCards);
    for (const card of allCards.querySelectorAll('.card')){
        resizeObserver.observe(card);
    }
}


function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function demo() {
    const demos = document.querySelectorAll('.demo');
    for (const demo of demos){
        demo.addEventListener('click', () => {
            showToast('This button is not available because this is a demo page.')
        });
    }
}

renderIcons();
renderAssortmentTypes();
renderProductCards();
renderCarousel();
carouselLogic();
scrollForAllCards();
demo();