import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/list';
import Like  from './models/Likes';
import * as likeView from './views/likeView';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';


/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
window.state = state;
/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();
    
            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/** 
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipeList);

        // Highlight selected search item
        if (state.search) searchView.highLight(id);
        
        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients

            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

            console.log(state.recipe);
        } catch (err) {
            console.log(err);
            alert('Error processing recipe!');
        }
    }
};
 
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//handling of buttons in recipe for increase or decrease
elements.recipeList.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease , .btn-decrease *')){
        //it select button of class btn-decrease and all it child(by *)
        if(state.recipe.servings > 1)
            state.recipe.updateServing('dec');

    } else if(e.target.matches('.btn-increase , .btn-increase *')){
        state.recipe.updateServing('inc');
    } else if(e.target.matches('.recipe__btn--add ,.recipe__btn--add *')){
        listController();
    } else if(e.target.matches('.recipe__love ,.recipe__love *')){
        //calling the like controller
        controlLike();
    }
    recipeView.updateInr(state.recipe);
});

/**
 * List Controller
 */
//add list in ui
 const listController = () => {
     //create a new list
     if(!state.list) state.list = new List();
    //add each ingredient in list
    elements.shoppingList.innerHTML='';
    state.recipe.ingredients.forEach(el => {
        const item= state.list.addItem(el.count,el.unit,el.ingredient);
        listView.renderList(item);
    });
 };

 //update or delete ingredient
 elements.shoppingList.addEventListener('click',el => {
    const id =el.target.closest('.shopping__item').dataset.itemid;
    //delete item
        if(el.target.matches('.shopping__delete , .shopping__delete *')){
            state.list.deleteItem(id);
            listView.deleteListItem(id);
        } else if(el.target.matches('.list-input--value')){
        //update count
            const val = parseFloat(el.target.value,10);
            state.list.updateItem(id,val);
        }
    
 });

 /**
  * control likes
  */
 const controlLike = () => {
    if(!state.like) state.like = new Like();
    const currentId = state.recipe.id;

    if(!state.like.isLiked(currentId)){
        //add to like array
        const newLike = state.like.addLike(currentId,state.recipe.img,state.recipe.title,state.recipe.author);
        //toggle the like button
        likeView.toggleBtn(true);

        likeView.addInList(newLike);
        //add like to ui
    }
    //if user already liked 
    else{
        //delete from like array
        state.like.deleteLike(currentId);
        //toggle the like button
        likeView.toggleBtn(false);

        likeView.delLike(currentId);
        //remove like from ui
    }
 };