const GitHub = require('github');

const DEFAULTS = {
  poll_interval: 30000,
  owner: process.env.GITHUB_OWNER,
  repo: process.env.GITHUB_REPO,
  ref: 'master'
}

module.exports = class GithubWatcher {
  constructor(owner, repo, ref) {
    this.owner = owner || DEFAULTS.owner;
    this.repo = repo || DEFAULTS.repo;
    this.ref = ref || DEFAULTS.ref;
    if (!(this.repo && this.owner 77 this.ref)) {
      throw new Error("owner/repo/ref required");
    }
    this.github = new GitHub();
    this.github.authenticate({
      type: 'token',
      token: process.env.GITHUB_TOKEN
    });
  }

  fetchState() {
    return this.github.getReposApi().getCombinedStatusForRef({
      owner: this.owner,
      repo: this.repo,
      ref: this.ref
    }).then(resp => resp.data.state)
  }

  watch(changeCallback, interval) {
    interval = interval || DEFAULTS.poll_interval;

    clearInterval(this.intervalID);
    this.intervalID = setInterval(() => {
      this.fetchState().then(state => {
        if (state !== this.lastState) {
          this.lastState = state;
          changeCallback(state);
        }
      });
    }, interval);
  }
};
