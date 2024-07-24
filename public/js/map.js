
    document.addEventListener('DOMContentLoaded', function() {
        mapboxgl.accessToken = mapToken;
        
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: listing.geometry.coordinates, // starting position [lng, lat]
            zoom: 10 // starting zoom
        });
    
        console.log('Map initialized successfully');
        // console.log('Coordinates:', coordinates);
    
        map.on('load', () => {
            const marker = new mapboxgl.Marker({color: "red"})
                .setLngLat(listing.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.location}</h4><p>Exact location will be provides after booking</p>`))
                .addTo(map);
    
            console.log('Marker added successfully:', marker);
        });
    });
    