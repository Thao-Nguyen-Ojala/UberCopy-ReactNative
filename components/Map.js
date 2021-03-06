import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useRef } from 'react'
import { selectDestination, selectOrigin, setTravelTimeInfo } from '../Redux/slices/navSlice'
import { useDispatch, useSelector } from 'react-redux'

import { GOOGLE_MAPS_APIKEY } from '@env'
import MapViewDirections from 'react-native-maps-directions'
import { StyleSheet } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const Map = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!origin || !destination) return;

    //Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50}
    })
  }, [origin, destination])

  useEffect(() => {
    if(!origin || !destination) return
    const getTravelTime = async() => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      fetch(url)
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTimeInfo(data.rows[0].elements[0]))
        })
    }

    getTravelTime()
  },[origin, destination, GOOGLE_MAPS_APIKEY])
  
  return (
    <MapView
      ref={mapRef}
      style={ tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          lineDashPattern={[0]}
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor='black'
          strokeWidth={4}
        />
      )}
      
      {origin?.location && (
        <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title='From'
          description={origin.description}
          identifier='origin'
        />
        )}

      {destination?.location && (
        <Marker 
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title='To'
          description={destination.description}
          identifier='destination'
        />
        )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})
