# o_beer

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
Before running your local development server set `VUE_APP_LEDGER_URL=http://localhost:7575` in `ui/.env`
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Deploy to GitHub pages
Before deploying to production set `VUE_APP_LEDGER_URL=myledger.host` in `ui/.env` to your json api end point
```
./deploy.sh git@github.com:<user>/<repo>.git master:gh-pages
```