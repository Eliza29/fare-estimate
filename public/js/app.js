// Initialize Firebase
var config = {
  apiKey: 'AIzaSyB_TG-mZRk5rVDuxPZo7_yZJetd3bxW86Q',
  authDomain: 'fare-estimate-2dc03.firebaseapp.com',
  databaseURL: 'https://fare-estimate-2dc03.firebaseio.com',
  projectId: 'fare-estimate-2dc03',
  storageBucket: '',
  messagingSenderId: '75640139368'
};
firebase.initializeApp(config);

/* Funcionalidad del proyecto*/

let inputFrom = document.getElementById('inputFrom');
let inputTo = document.getElementById('inputTo');
let btnRoad = document.getElementById('search-road');
let tokenServerApi = 'XlaqCTZjMlVmadQPgMnuAANm3W-uQG911SVpYmba';
let distance;

// funcionalidad para el autocompletado de inputs
let autocompleteInputs = () => {
  new google.maps.places.Autocomplete(inputFrom);
  new google.maps.places.Autocomplete(inputTo);
};

// funcionalidad para mostrar la ruta buscada
let calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
  directionsService.route({
    origin: inputFrom.value,
    destination: inputTo.value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      let startLongitude = response.routes[0].bounds.b.b;
      let endLongitude = response.routes[0].bounds.b.f;
      let startLatitude = response.routes[0].bounds.f.b;
      let endLatitude = response.routes[0].bounds.f.f; 
      estimatePricesRoute(startLatitude, startLongitude, endLatitude, endLongitude);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

// funcionalidad para estimar el precio de la ruta con API UBER
let succes = (data) => {
  console.log(data);
  console.log('estoy en succes');
};

let handleError = () => {
  console.log('error');
};

let estimatePricesRoute = (startLatitude, startLongitude, endLatitude, endLongitude) => {
  let proxy = 'https://cors-anywhere.herokuapp.com/';
  let apiLink = 'https://api.uber.com/v1/estimates/price';
  $.ajax({
    url: proxy + apiLink,
    headers: {
      Authorization: 'Token ' + tokenServerApi,
    },
    data: {
      start_latitude: startLatitude,
      start_longitude: startLongitude,
      end_latitude: endLatitude,
      end_longitude: endLongitude
    },
    ContentType: 'application/json',               
  })
    .done(succes)
    .fail(handleError);
};

function initMap() {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: -12.1191427,
      lng: -77.0349046,
    }
  });

  directionsDisplay.setMap(map);
  let initRoad = (event) => {
    event.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  autocompleteInputs();
  // asociando evento a elemento del DOM 
  btnRoad.addEventListener('click', initRoad);
}