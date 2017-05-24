// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const cors = require('cors');
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

//OLD SQL SETUP

// // Set up the express app
// const app = express();
// const port = parseInt(process.env.PORT, 10) || 8000;
// app.set('port', port);

// // Parse incoming requests data (https://github.com/expressjs/body-parser)
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(logger('dev'));

// // Serves all files in the bundle
// app.use(express.static(path.join(__dirname, './build')));

// // Entry to routes located in ./server/controllers/index.js
// require('./server/routes')(app);

// const server = http.createServer(app);
// server.listen(port, () => {
//   console.log('Listening on port 8000')
// });

//model dependencies
// const User = require('./models/userModel');
// const Feature = require('./models/featureModel');
// const Item = require('./models/itemModel');

//new MONGO SETUP
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = express.Router();
const userController = require('./server/controllers/userMongo');
const featureController = require('./server/controllers/features');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db;
//mongodb://darrick:123@ds039411.mlab.com:39411/taskify
mongoose.connect('mongodb://kyle:kyle@ds161580.mlab.com:61580/future', function (err, database) {
  if (err) console.log(err);
  else {
    console.log('Connected to DB');
    db = database;
  }
});
// Serves all files in the bundle
app.use(express.static(path.join(__dirname, './build')));

app.use(function (req, res, next) {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(`Access-Control-Allow-Credentials`, `true`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);
  next();
});


app.post('/verifyUser', userController.verifyUser);

app.post('/createUser', userController.createUser);

app.post('/createProject', featureController.createProject);

app.get('/getProject', featureController.getProject);

app.get('/retrieveProject', featureController.retrieveProject);

app.delete('/deleteProject/:title', featureController.deleteProject);

app.listen(8000, () => {
  console.log('Listening on 8000');
})




















      //SAMPLE INSERTIONS TO TEST CONNECTIVITY (CAN REMOVE)

      // const userCollection = db.collection('users');
      // const featureCollection = db.collection('features');
      // const itemCollection = db.collection('items');

      // let user1 = { username: 'Fred', password: 'fu' };
      // let user2 = { username: 'Tom', password: '123' }

      // userCollection.insert([user1, user2], (err, result) => {
      //   if (err) console.log(err);
      //   else {
      //     console.log('Inserted users into userCollection');
      //   }
      // })

      // let feature1 = { title: 'ScratchProject', duration: 60 }
      // let feature2 = { title: 'Wasting My Life', duration: 10000 }

      // featureCollection.insert([feature1, feature2], (err, result) => {
      //   if (err) console.log(err);
      //   else {
      //     console.log('Inserted features into featureCollection');
      //   }
      // })

      // let item1 = { content: 'Do shit', completed: false };
      // let item2 = { content: 'No', completed: false };

      // itemCollection.insert([item1, item2], (err, result) => {
      //   if (err) console.log(err);
      //   else {
      //     console.log('Inserted items into itemCollection');
      //   }
      // })



