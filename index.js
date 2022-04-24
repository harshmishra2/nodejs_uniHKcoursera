const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

//task1
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use('/dishes', dishRouter);     //what this line means is any req coming to /dishes will be handled by dishrouter

//task1
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// app.use('/dishes/:dishId', dishRouter);              //nope not this
// app.use('/promotions/:promoId', promoRouter);
// app.use('/leaders/:leaderId', leaderRouter);

app.use(morgan('dev'));

app.use(bodyParser.json());

//whenevr require to use middleware say app.use(middleware) here bodyparser allows us to parse body of the req msg formatted in json

//app.all get post are from express, these are callback function

//here we are using express to inplement REST API end point support, express used to construct and inplement rest api

// app.all('/dishes', (req,res,next) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   next();						//goes on to find next fuction with /dishes to execute and modified res will go to the next one
// });

// app.get('/dishes', (req,res,next) => {
//     res.end('Will send all the dishes to you!');
// });

// app.post('/dishes', (req, res, next) => {
//  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
// });

// app.put('/dishes', (req, res, next) => {
//   res.statusCode = 403;
//   res.end('PUT operation not supported on /dishes');
// });
 
// app.delete('/dishes', (req, res, next) => {
//     res.end('Deleting all dishes');
// });

// app.get('/dishes/:dishId', (req,res,next) => {
//     res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
// });

// app.post('/dishes/:dishId', (req, res, next) => {
//   res.statusCode = 403;
//   res.end('POST operation not supported on /dishes/'+ req.params.dishId);
// });

// app.put('/dishes/:dishId', (req, res, next) => {
//   res.write('Updating the dish: ' + req.params.dishId + '\n');
//   res.end('Will update the dish: ' + req.body.name + 
//         ' with details: ' + req.body.description);
// });

// app.delete('/dishes/:dishId', (req, res, next) => {
//     res.end('Deleting dish: ' + req.params.dishId);
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});