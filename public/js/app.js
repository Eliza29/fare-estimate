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
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

function initMap() {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
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

// uEDUdI3cnJay7F8jd9WbsOAVolKhN9HI ID
// TOKEN XlaqCTZjMlVmadQPgMnuAANm3W-uQG911SVpYmba