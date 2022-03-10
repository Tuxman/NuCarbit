# NuCarbit

## Project setup
```
yarn install
```

## Development
Before running your local development server you need to set a few environment variables in `ui/.env`
Set `VUE_APP_LEDGER_URL=http://localhost:7575` (this is the default)
Set `VUE_APP_LEDGER_ID=your-ledger-id` to your ledger-id, if running the `daml sandbox` ledger this will be `o_beer`, 
if running another ledger please refer to their docs, often this is reported in the output of the Daml Driver (ie. runtime) that's connected to your node.

### Compiles and hot-reloads for development
```
yarn serve
```

## Production

Note: This application should not be used in production, the below is provided merely as an example that allows one Party (via `VUE_APP_TOKEN`) to interact with a remotely hosted ledger.

Before deploying to production set the following in in `ui/.env`:
`VUE_APP_LEDGER_URL=your-ledger.host`
`VUE_APP_LEDGER_ID=your-ledger-id`
`VUE_APP_TOKEN=mytoken`
You should be able to obtain all of this information from your ledger or ledger provider, please refer to the documentation for the ledger or ledger provider you're deploying to.

### Compiles and minifies for production
```
yarn build
```

### Deploy to GitHub pages
```
./deploy.sh git@github.com:<user>/<repo>.git master:gh-pages
```
