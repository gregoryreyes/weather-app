/* Global Variables */
const apiKey = 'c40eef61fab5968e0a12ecbbf7760348';
let baseURL = `http://api.openweathermap.org/data/2.5/weather`;

// Create a new date instance dynamically with JS
const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
];

let d = new Date();
let month = d.getMonth();
let newDate = `${months[d.getMonth()]}/${d.getDate()}/${d.getFullYear()}`;

const button = document.getElementById('generate');
button.addEventListener('click', getInfo );

function getInfo() {
  const zip = document.getElementById('zip').value;

  if ( zip === '' ) {
    alert( 'Please enter a zip code' );
    return;
  } else {
    const url = `${baseURL}?zip=${zip}&appid=${apiKey}&units=imperial`;
    getWeather( url );
  }

}

const getWeather = async ( url ) => {
  const response = await fetch( url );
  try {
    const feelings = document.getElementById('feelings').value;
    const data = await response.json()
    .then( data => {
      let city = data.name;
      let temp = data.main.temp;
      let description = data.weather[0].description;

      weatherInfo = {
        'city': city,
        'temperature': temp,
        'description': description,
        'userFeelings': feelings
      }

      postWeather( '/add', { result: weatherInfo } );
      getSingle( '/single' );
    })
  } catch( error ) {
    console.log( 'error', error );
  }
}

// Async POST
const postWeather = async ( url = '', data = {} ) => {
  const response = await fetch( url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  })
  try {
    const newData = await response;
    return newData;
  }
  catch( error ) {
    console.log( 'error', error );
  }
}

// Async GET
const getSingle = async ( url = '' ) => {
  const request = await fetch( url );
  try {
    const data = await request.json()
    .then( data => {
      document.getElementById('date').innerHTML = `Today's date: ${newDate}`;
      document.getElementById('temp').innerHTML = `Current temperature in ${data.result.city}: ${data.result.temperature} <span class="degrees">&#8457;</span>`;
      document.getElementById('description').innerHTML = `Condition: ${data.result.description}`;
      document.getElementById('content').innerHTML = `Journal Entry: ${data.result.userFeelings}`;
      document.getElementById('zip').value = '';
      document.getElementById('feelings').value = '';
    })
  } catch( error ) {
    console.log( 'error', error );
  }
}