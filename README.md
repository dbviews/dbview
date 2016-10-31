# DBView

DBView is a lightweight tool to view and manage your remotely hosted databases in the browser. While desktop database management software is powerful, it can be overwhelming and require unecessary overhead when your only needs are viewing tables and performing standard tasks (especially for those with limited database experience). On the other hand, CLIs are lightweight, but they are not well suited to viewing data, and using them to build large queries can be frustrating. DBView was created to provide developers an easy way to acesss their databases without any installation. This project is still in the very early stages of development.

## Installation
```
git clone https://github.com/dbviews/dbview
cd dbview
npm install
```
Then run `npm start` to start the local server.
We also provide an npm script to create a sample table in your database. To execute this script, run `npm run fillDB`.

## Running tests
We use [mocha](https://mochajs.org/), [supertest](https://github.com/visionmedia/supertest), and [karma](http://karma-runner.github.io/1.0/index.html) to run tests. 

### Server side tests
Located in `test/supertest.js`
```
npm test
```

### Client side tests
It's easiest to run the client side tests if you install the karma CLI globally. 
```
npm install -g karma-cli
```
Then, navigate to `dview/` and run the tests:
```
karma start
```

These tests are located in `test/client/`.