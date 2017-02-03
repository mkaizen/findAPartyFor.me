var firebase = new Firebase("https://party-1473630564088.firebaseio.com");
var geocoder;
var pos;
var map;
var posted = false;
var infowindow;
      /**
       * The CenterControl adds a control to the map that recenters the map on
       * Chicago.
       * This constructor takes the control DIV as an argument.
       * @constructor
       */
      function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = 'rgb(256,256,256)';
        controlUI.style.border = '6px solid rgb(256,256,256)';
        controlUI.style.borderRadius = '6px';
        //controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(255,81,90)';
        controlText.style.fontFamily = 'Roboto';
        controlText.style.fontSize = '26px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '30px';
        controlText.style.fontWeight = "500";
        controlText.style.fontStyle = 'normal';
        controlText.style.paddingRight = '30px';
        controlText.innerHTML = '+ Party';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
          map.setCenter(pos);
          if(posted === false){
          var ref = new Firebase('https://party-1473630564088.firebaseio.com');
          firebase.push({lat: pos.lat, lng: pos.lng,  timestamp: Firebase.ServerValue.TIMESTAMP });
          posted = true;
        }
        //  ref.update({ timestamp: Firebase.ServerValue.TIMESTAMP });
	//ref.on('timestamp', function(snapshot){ console.log(snapshot.val()) })
 //       });
});
      }
/**
function cleanUpParties(){
var ref = new Firebase('https://party-1473630564088.firebaseio.com');
var now = Date.now();
var cutoff = now - 1000;
var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
var listener = old.on('child_added', function(snapshot) {
    snapshot.ref().remove();
});
}
**/
//etInterval(cleanUpParties, 5000);
   function getAddressFromLatLang(lat,lng){
      console.log("Entering getAddressFromLatLang()");
      var geocoder = new google.maps.Geocoder();
      
        var latLng = new google.maps.LatLng(lat, lng);
        geocoder.geocode( { 'latLng': latLng}, function(results, status) {
        console.log("After getting address");
        console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log(results[0]);
            address = results[0].formatted_address;
            
     

          }
        }else{
          alert("Geocode was not successful  for the following reason: " + status);
        }
        });
        
     
      console.log("Entering getAddressFromLatLang()");
    }


function initMap() {
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: pos.lat, lng: pos.lng},
    zoom: 16,
    disableDefaultUI: true
  });

         var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
  firebase.on("child_added", function(snapshot, prevChildKey) {
    // Get latitude and longitude from the cloud.
    var newPosition = snapshot.val();

    // Create a google.maps.LatLng object for the position of the marker.
    // A LatLng object literal (as above) could be used, but the heatmap
    // in the next step requires a google.maps.LatLng object.
    var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);
    var image = { url: 'http://kaizenwebdesigns.com/findapartyfor.me/Marker.png',
    scaledSize: new google.maps.Size(32, 32)

  };
    infowindow = new google.maps.InfoWindow();
     
    // Place a marker at that location.
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: image,
      optimized: false                                               

    });



    var geocoder = new google.maps.Geocoder();
      
       // var latLng = new google.maps.LatLng(lat, lng);
        geocoder.geocode( { 'latLng': latLng}, function(results, status) {
        console.log("After getting address");
        console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log(results[0]);

            var address = results[0].formatted_address;
         
        //  var infowindow = new google.maps.InfoWindow();
         //   infowindow.setContent(address);
         //   infowindow.open(map, marker);
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(address);
            infowindow.open(map, marker);
        
          
          });
          }
        }else{
          alert("Geocode was not successful  for the following reason: " + status);
        }
        });          
  });

var now = Date.now();
var cutoff = now - 8 * 60 * 60 * 1000;
var old = firebase.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
var listener = old.on('child_added', function(snapshot) {
    snapshot.ref().remove();
});
        
 //var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        

            
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
  // Add marker on user click





}
