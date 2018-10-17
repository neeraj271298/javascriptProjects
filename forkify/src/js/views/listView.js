import {elements} from './base';

export const renderList =(list) => {
    const markup =
        `<li class="shopping__item" data-itemid=${list.id} >
            <div class="shopping__count">
                <input type="number" value="${list.count}" step="${list.count}" class="list-input--value">
                <p>${list.unit}</p>
            </div>
            <p class="shopping__description">${list.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shoppingList.insertAdjacentHTML('afterbegin',markup);
};

export const deleteListItem = id => {
    const item = document.querySelector(`[data-itemid='${id}']`);
    item.parentElement.removeChild(item);
};