//initialize github class object
const github = new Github();

//initialize ui class object
const view = new UserView();

//search DOM
const search = document.querySelector('.search');

//add event listner to it
search.addEventListener('keyup',(e) => {
    const searchValue = e.target.value;
    if(searchValue !== null){
        github.getUser(e.target.value)
        .then(data => {
            if(data.message === "Not Found"){
               //show alert messaege
               view.showAlert();
            }else{
                console.log(data);
                view.seachResult(data);
                //getting repos 
                github.getRepos(e.target.value)
                .then(repos => {
                    view.showRepos(repos); 
                });
            }
        });
    } else {
        view.clearProfile();
    }
});