import { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Spin } from 'antd';

function PropertyMap({ markers = [], selected, onMarkerClick }) {
  const [map, setMap] = useState(null)
  const [center, setCenter] = useState({
    lat: 43.653225,
    lng: -79.383186,
  })

  useEffect(() => {
    if (markers && markers[0]) {
      setCenter({
        lat: markers[0].address.point.coordinates[1],
        lng: markers[0].address.point.coordinates[0],
      })
    }
  }, [markers])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC6I5s1N6swwbGmCdQFAp_pPbrIxe7PNfI',
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <Spin />
  }

  const handleMarkerLoaded = (marker) => {
    // console.log("MARKER LOADED", marker)
    // const bounds = new window.google.maps.LatLngBounds()
    marker.map.setCenter(marker.position)
    // marker.map.fitBounds(bounds)
    // map.fitBounds(bounds)
  }

  const handleMapLoaded = (map) => {
    // console.log("MAP", map)
    setMap(map)
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={10}
      onLoad={handleMapLoaded}
      center={center}>
      {
        markers.map(marker => {
          if (marker.address && marker.address.point) {
            return (
              <Marker
                key={marker._id}
                animation="DROP"
                icon={{
                  url: '/icon/assisten-mark.svg',
                  scaledSize: selected === marker._id ? new google.maps.Size(50, 50) : new google.maps.Size(37, 37)
                }}
                onLoad={handleMarkerLoaded}
                position={{ lat: marker.address.point.coordinates[1], lng: marker.address.point.coordinates[0] }}
                onClick={(event) => onMarkerClick && onMarkerClick(event, marker, map)}
              />
            )
          }
        })
      }
    </GoogleMap>
  )
}

export default PropertyMap
