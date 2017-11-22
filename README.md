This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Developing

The current state of development is kinda messy. Create-react-app assumes you have an external
API that you're integrating with. I tacked on a local server, after reading suggestions in
their docs. It's awkward because you need the run the react dev server + the node server
while developing. The react server proxies /api/* requests to the node server.


Install deps:
```
yarn install
```

Run UI hotloader:
```
yarn start
```

Run Node server:
```
node server.js
```

# Deploying

```
yarn build
```
And then... copy these files to production: package.json, server.js, api, build

Set he HUE_USER and GITHUB_TOKEN, GITHUB_REPO, GITHUB_OWNER env vars, and then in that production directory:
```
NODE_ENV=production npm install
node server.js
```
