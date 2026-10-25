export function templateAssortmentType(src,alt_src,name) {
    const card = document.createElement('card');
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
    const card = document.createElement('card');

    card.innerHTML=`
        <div class="standart">
            <div class="image">
                <img src="${src}" alt="${alt_src}"></img>
            </div>
            <h3>${name}</h3>
            <span>${description}</span>
            <h3>${price}</h3>
            <div class="wildcard">
            </div>
        </div>
        <div class="hover">
            <button>
                <p>Add to cart</p>
            </button>
            <button class="share">
                <!-- <app-icon name="" aria-hidden="true"></app-icon> -->
                <span>share</span>
            </button>
            <button class="compare">
                <!-- <app-icon name="" aria-hidden="true"></app-icon> -->
                <span>compare</span>
            </button>
            <button class="like">
                <!-- <app-icon name="" aria-hidden="true"></app-icon> -->
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