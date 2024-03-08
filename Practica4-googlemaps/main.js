let map;
let inputLat = document.getElementById('latitude')
let inputLon = document.getElementById('longitude')
let findloc = document.getElementById('findloc')
let adreca = document.getElementById('adreca')
let boton2 = document.getElementById('boton2')


boton2.addEventListener('click', function (){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        map.setCenter(pos);
        map.setZoom(16);
        let marker = new google.maps.Marker({
        position: pos,
        map: map
        });
        });
        }
});

async function findLocation() {
    let direccion = adreca.value;
    let geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ 'address': direccion }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            let latitude = results[0].geometry.location.lat();
            let longitude = results[0].geometry.location.lng();
            
            console.log({ lat: latitude, lng: longitude }); 

            let center = new google.maps.LatLng(latitude, longitude);
            map.setCenter(center);
            map.setZoom(16);
            const marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map,
                    icon: 'location.png',
                    title: "Hello Juanma!", 
                  });
            inputLon.value = longitude; 
            inputLat.value= latitude
            const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading">Hola Juanma</h1>' +
            '<div id="bodyContent">' +
            "<p>Aqui va un texto super interesante y explicativo sobre las " +
            "maravillas que hay en esta zona perdida del mapa</p>" +
            '<p>Y aqui un enlace a mi linkedin, por si conoces a alguien que pueda darme trabajo :P: <a href="https://www.linkedin.com/in/itamar-keydar-antoni-a4970726a">' +
            "www.linkedin.com/in/itamar-keydar-antoni-a4970726a</a> " +
            "(last visited June 22, 2009).</p>" +
            "</div>" +
            "</div>";
            let infowindow = new google.maps.InfoWindow({
                content:contentString,
                ariaLabel: "Uluru",
                });
            
            marker.addListener("click", () => {
            infowindow.open({
            anchor: marker,
            map,
                });
            });

        } else {
            alert("Error al obtener la dirección    ");
        }

    });
}


async function initMap( ) {
    let jsonData;
    try {
        const response = await fetch('mapStyle.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        jsonData = await response.json();
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        styles: jsonData
    });
    new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map,
        title: "Hello Juanma!",
    });
  }


async function getAddres(adreca){
    let geocoder = new google.maps.Geocoder();
    let address = adreca;
    geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
    }
    alert(`latitud: ${latitude}, longitud: ${longitude}`)
    return {lat: latitude, lng: longitude}
});
}

initMap();
