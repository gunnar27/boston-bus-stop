// Fetch data to get all latitude and longitudes from api

mapboxgl.accessToken =
'pk.eyJ1IjoibWFsLXdvb2QiLCJhIjoiY2oyZ2t2em50MDAyMzJ3cnltMDFhb2NzdiJ9.X-D4Wvo5E5QxeP7K_I3O8w';


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-71.092003, 42.360001],
    zoom: 12
});

let counter = 0;

async function run(){
    const locations = await getBusLocations();
    if(counter>locations.length) return;
    console.log(locations[0].attributes)
    new mapboxgl.Marker().setLngLat([locations[counter].attributes.longitude, locations[counter].attributes.latitude]).setPopup(new mapboxgl.Popup().setHTML(`<h5> Lat /Long: [${locations[counter].attributes.longitude},
    ${locations[counter].attributes.latitude}]
    </h5>`)).addTo(map);

    counter +=1;

    //timer
    setTimeout(run,1000);
}

async function getBusLocations(){
    var url =  'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

