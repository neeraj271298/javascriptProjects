import {elements} from '../views/base';

export default class Like {
    constructor(){
        this.likes = [];
    }
    addLike(id,img,title,author){
        let obj = {
            id,
            img,
            title,
            author
        }
        this.likes.push(obj);
        return obj;
    }

    deleteLike(id){
        const index = this.likes.findIndex( el => el.id == id);
        this.likes.splice(index,1);
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1 ;
    }

    getNumLikes(){
        return this.likes.length;
    }
}   
