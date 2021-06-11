# Personal website
Super simple static personal site with some trippy effects. It can be accessed under [kacper.grabow.ski](https://kacper.grabow.ski).

## Local setup
```
git clone https://github.com/grappeq/personal-site.git
cd personal-site
npm install
```

## Deployment
Deployment happens by syncing S3 bucket content with `build` folder.
```
npm run build
npm run deploy
``` 
