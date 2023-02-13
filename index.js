#!/usr/bin/env node
const debug = require('debug')('backend:server');
const http = require('http');
const ejs = require('ejs');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require('./models');
const blogList = require('./blog/src/config/data');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use(cors())


// (process.env.MONGODB_URI || 'mongodb://localhost:27017/blog'

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://wsumit:9034161558@cluster0.ktrqjmb.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.once('open',async () => {
  console.log('dbon')
}).on('error', (error) => {
  console.log('Connection error:', error);
});

// console.log(blogList)
// for(const i of blogList){

//   const newBlog = new Blog({
//     title: i.title,
//     category: i.category,
//     subCategory: i.subCategory,
//     description: i.description,
//     authorName: i.authorName,
//     authorAvatar: i.authorAvatar,
//     cover: i.cover,
//       });

//   const collection=db.collections('blogs');

//   collection.insertOne(newBlog).then(r=>console.log(r)).catch(e=>console.log(e));

// }

// blogList.blogList.forEach((i)=>{

//   const newBlog = new Blog({
//     title: i.title,
//     category: i.category,
//     subCategory: i.subCategory,
//     description: i.description,
//     authorName: i.authorName,
//     authorAvatar: i.authorAvatar,
//     cover: i.cover,
//       });

//   const collection=db.collection('blogs');

//   collection.insertOne(newBlog).then(r=>console.log(r)).catch(e=>console.log(e));

// });


// Endpoints for blog app
app.get('/api/blogs', async (req, res) => {

  // const collection = db.collection('blogs');
  
  // var x=data.slice();
  
  // x=x.map((i)=>{

  //   return new Blog({
  //         title: i.title,
  //         category: i.category,
  //         subCategory: i.subCategory.split(',\s*'),
  //         description: i.description,
  //         authorName: i.authorName,
  //         authorAvatar: i.authorAvatar,
  //         cover: i.cover,
  //     });
    

  //   })
  
  // try{
  //   await collection.insertMany(x);
  // }
  // catch(e){

  //     console.log(e);
  // }




    Blog.find()
        .then((blogs) => {
            blogs.forEach((blog) => {
                blog.id= blog._id.valueOf();
            });
            res.send(blogs);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/api/blogs/:id', (req, res) => {
    // const collection = db.collection('blogs');

    Blog.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        .then((blog) => {
            // blog._id = blog._id.valueOf();
            res.send(blog);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post('/api/blogs', (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        category: req.body.category,
        subCategory: req.body.subCategory.split(', '),
        description: req.body.description,
        authorName: req.body.authorName,
        authorAvatar: req.body.authorAvatar,
        cover: req.body.cover,
    });

    console.log(newBlog);

    // const collection = db.collection('blogs');

    newBlog.save()
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});


// Code for running the http server

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,()=>console.log('goo'));
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
