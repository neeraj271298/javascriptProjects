import {elements} from '../views/base';

export const toggleBtn = isLiked => {
    const str = isLiked ? 'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute(`href`,`img/icons.svg#${str}`);
};

export const addInList = (likeRecipe) => {
    const markup = `
        <li>
            <a class="likes__link" href="#${likeRecipe.id}">
                <figure class="likes__fig">
                    <img src="${likeRecipe.img}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${likeRecipe.title}</h4>
                    <p class="likes__author">${likeRecipe.author}</p>
                </div>
            </a>
        </li>
        `;
    elements.likeList.insertAdjacentHTML('afterbegin',markup);
};

export const delLike = id => {
    const el = document.querySelector(`.likes__link[href='#${id}']`);
    if(el) el.parentElement.removeChild(el);
};