# AuScope App Store 


### Purpose

** You can see what it looks like here: http://avre.auscope.org/store**

This project is a simple App Store for AuScope

### How to initiate
**Note** that this project requires npm >= 8.19.3 & nodejs >= 16.19.0

In order to get started:
```bash
$ git clone https://github.com/AuScope/AppStore
$ cd AppStore/ui
# To install the project's dependencies
$ npm install
```

### Start a local dev server
```bash
# Run `npm start` to start the front-end dev server.
# Navigate to `http://localhost:4200`. It should automatically reload if you change any 
# of the source files.
$ npm start
```

### Build for production server
```bash
# As currently set up, the prod build will output the production website files to `dist` directory
# This can be deployed to an Apache server or something similar. 
$ ng build --prod
```
