export function templateAssortmentType(src,alt_src,name) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="image">
            <img src="${src}" alt="${alt_src}"></img>
        </div>
        <h3>${name}</h3>
    `
    return card;
}

async function copyTextToClipboard(text) {
    try {await navigator.clipboard.writeText(text)} catch (err) {};
}

export function templateProductCard(name,description,price,src,alt_src,timeItem,old_price,discount,src_item) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML=`
        <div class="standart">
            <div class="image">
                <img src="${src}" alt="${alt_src}"></img>
            </div>
            <div class="info">
                <h3>${name}</h3>
                <p>${description}</p>
                <h3>${price}</h3>
            </div>
            <div class="wildcard">
            </div>
        </div>
        <div class="hover">
            <button>
                <p>Add to cart</p>
            </button>
            <button>
                <p>View details</p>
            </button>
            <button class="share icon">
                <app-icon name="share" aria-hidden="true"></app-icon>
                <span>share</span>
            </button>
            <button class="compare icon">
                <app-icon name="compare" aria-hidden="true"></app-icon>
                <span>compare</span>
            </button>
            <button class="like icon">
                <app-icon name="like" aria-hidden="true"></app-icon>
                <span>like</span>
            </button>
        </div>
    `
    const wildcard = card.querySelector('.wildcard');
    const time = new Date();
    const diffDate = time - timeItem;
    if (old_price != null) {
        const oldPriceSpan = document.createElement('span');
        oldPriceSpan.textContent = old_price;
        wildcard.append(oldPriceSpan);
    };
    if (discount != null) {
        const discountSpan = document.createElement('span');
        discountSpan.textContent = discount;
        wildcard.append(discountSpan);
    };
    if (diffDate >= 0 && diffDate <= 604800000) {
        const newItemSpan = document.createElement('span');
        newItemSpan.textContent = 'New';
        wildcard.append(newItemSpan);
    };
    if (!wildcard.children.length > 0) {
        wildcard.remove();
    };

    card.querySelector('.share').addEventListener('click', () =>{
        copyTextToClipboard(src_item);
    });

    return card;
}

function carouselCard(id,name,type,number,src,alt_src) {
    const card = document.createElement('div');
    card.classList.add('card_carousel');
    if (number === 1) {
        card.classList.add('active');
    }
    card.id = id;
    card.innerHTML = `
        <div class="image">
            <img src="${src}" alt="${alt_src}"></img>
        </div>
        <div class="info_block">
            <div>
                <p>${number}</p>
                <p>${type}</p>
            </div>
            <h3>${name}</h3>
            <button class="arrow right icon" aria-label="right arrow">
                <app-icon name="arrow_info_card" aria-hidden="true"></app-icon>
            </button>
        </div>
    `
    return card;
}

export function templateCarousel(carouselCards) {
    const carousel = document.createElement('div');
    carousel.classList.add('all_carousel');
    carousel.innerHTML = `
        <div id="carouselTrack" class="all_cards">
        <!-- TODO template 4-->

        </div>
        <div class="carousel_indicators" role="group" aria-label="">
        </div>
    `

    const complete = document.createDocumentFragment();
    for (const [index,card] of carouselCards.entries()) {
        complete.append(carouselCard(card.id,card.name,card.type,index+1,card.src,card.alt));
    }

    const carouselIndicators = carousel.querySelector('.carousel_indicators');

    carouselCards.forEach((item, index) => {
        const dot = document.createElement('button');
        dot.innerHTML = `
            <span class="dot_render"></span>
        `
        dot.classList.add('dot');
        dot.setAttribute('aria-label',`Слайд ${index+1} из ${carouselCards.length}`);
        if (index === 0) {
            dot.classList.add('active');
            dot.setAttribute('aria-current', 'true');
        }
        carouselIndicators.append(dot);
    });


    carousel.querySelector('.all_cards').replaceChildren(complete);
    return carousel;
}

