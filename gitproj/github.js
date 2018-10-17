class Github {
    constructor(){
        this.clientID = '1535a1a508858f46b737';
        this.clientSecret = '0c06874600b24c3e88158481b3e48e918c7ece0f';
        this.per_page = 5;
        this.repos_sort = 'created: asc';
    }
    // get user profile data 
    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.clientID}&client_secret=${this.clientSecret}`)
        const profileData = await profileResponse.json();
        return profileData;
    }
    // get user repository data
    async getRepos(user){
        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.per_page}&sort=${this.repos_sort}&client_id=${this.clientID}&client_secret=${this.clientSecret}`)
        const reposData = await reposResponse.json();
        return reposData;
    }
}