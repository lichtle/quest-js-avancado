const user = {
  avatarUrl: "",
  name: "",
  bio: "",
  userName: "",
  followers: 0,
  following: 0,
  repositories: [],
  setInfo(gitHubUser) {
    this.avatarUrl = gitHubUser.avatar_url; // Perceba que a chave é escrita em Camel Case e seu valor é escrito da mesma forma que veio no retorno da promise, ou seja, avatar_url
    this.name = gitHubUser.name;
    this.bio = gitHubUser.bio;
    this.userName = gitHubUser.login;
    this.followers = gitHubUser.followers;
    this.following = gitHubUser.following;
  },
  setRepositories(repositories) {
    this.repositories = repositories;
  },
};

export { user };
