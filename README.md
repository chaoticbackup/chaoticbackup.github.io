## Dev Instructions
Have Nodejs >=16 ([node installation](https://nodejs.org/en/)) installed on your machine. Then navigate to the top level of the project in a run ``npm install --legacy-peer-deps`` (note you may also need to run ``npm dedupe --force``)

### Development Running
To run the website locally
```bash
npm start
```

### Production Building
To have your changes reflected on the live website, you first need to build/bundle the javascript and css
```
npm run build
```
To test out the build locally
```
npx serve
```

Then pushing/merging these changes into master will update the website
