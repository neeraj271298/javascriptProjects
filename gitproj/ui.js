class UserView {
    constructor(){
        this.HTML = document.querySelector('.result');
    }
    //search result 
    seachResult(user){
        this.HTML.innerHTML = `
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mb-3" src="${user.avatar_url}" >
                    <a class="btn btn-primary btn-block mb-4" target="_blank" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                    <span class="badge badge-primary">Public Repository: ${user.public_repos}</span>
                    <span class="badge badge-success">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-info">Followers: ${user.followers}</span>
                    <span class="badge badge-secondary">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/Blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                </div>
            </div>           
        </div>
        <div class="repos"><h2>Latest Repositories</h2></div>
        `;
    }
    //show alert
    showAlert(){
        this.clearProfile();
        // check for is there any alert message 
        const currentAlert = document.querySelector('.alert');

        if(currentAlert){
            currentAlert.remove();
        } else {
            const alert = `
                <div class="alert alert-danger">
                    User Not Found
                </div>
            `;
            //get parent element 
            const parent = document.querySelector('.searchContainer');
            //add to top
            parent.insertAdjacentHTML('afterbegin',alert);
            setTimeout(() => {
                //remove element after 3 sec
                document.querySelector('.alert').remove();
            },3000);
        }
    }
    //clear profile
    clearProfile(){
        this.HTML.innerHTML = '';
    }
    //show latest 5 repos
    showRepos(user){
        let output=``;
        user.forEach((repo) => {
            output +=  `
                <div class="card card-body mb-2>
                    <div class="row">
                        <div class="col-md-6">
                            <a href="${repo.html_url}" target="_blank" >${repo.name}</a> 
                        </div>
                        <div class="col-md-6 ml-auto">
                            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-success">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-info">Forks: ${repo.forks_count}</span>   
                        </div>
                    </div>
                </div>
            `;
        });
        const repos = document.querySelector('.repos');
        repos.insertAdjacentHTML('beforeend',output);
    }
}