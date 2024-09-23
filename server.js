require('dotenv').config();
projectData = [];
dataArchive = [];
weatherUrl = process.env.WEATHER_URL;

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
app.get( '/all', function( request, response ) {
  response.send( dataArchive );
});

app.get( '/getweather', async function( req, res ) {
  const zip = req.query.zip;
  const url = `${weatherUrl}&zip=${zip}&units=imperial`;
  
  try {
    const myWeather = ( await fetch(url)  ).json()
    .then(  data  => {
      res.json( data );
    })
  } catch (error) {
    res.send(error).status(404);
  }
});

// POST routes
app.post( '/add', postData );

function postData ( req, res ) {
  projectData = req.body;
  dataArchive.push( req.body );
  res.send( 'POST received' );
}