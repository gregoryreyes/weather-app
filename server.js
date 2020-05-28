projectData = [];
dataArchive = [];

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( cors() );

// Initialize the main project folder
app.use(express.static( 'website' ));

// Setup Server
const port = process.env.PORT || 8080;
app.listen( port, () => {
  console.log( `Server started on port ${port}` );
});

// GET routes
app.get( '/single', function( request, response ) {
  response.send( projectData );
});

app.get( '/all', function( request, response ) {
  response.send( dataArchive );
});

// POST routes
app.post( '/add', postData );

function postData ( req, res ) {
  projectData = req.body;
  dataArchive.push( req.body );
  res.send( 'POST received' );
}