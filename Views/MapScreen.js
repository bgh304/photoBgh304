import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
  console.log('MapScreen SIVU:');
  console.log(route.params.data);
  const [address, setAddress] = React.useState('');
  const [region, setRegion] = React.useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [laLo, setLaLo] = React.useState({
    latitude: 60.201373,
    longitude: 24.934041,
  });

  React.useEffect(() => {
    //console.log(route.params);
    fetch('http://www.mapquestapi.com/geocoding/v1/address?key=N6AZCApyXKwGIhhZtHpxsw4Oj6teGlJA&location=' + route.params.data)
      .then(response => response.json())
      .then(responseData => {
        setLaLo({
          latitude: responseData.results[0].locations[0].latLng.lat,
          longitude: responseData.results[0].locations[0].latLng.lng,
        })
        setRegion({
          latitude: responseData.results[0].locations[0].latLng.lat,
          longitude: responseData.results[0].locations[0].latLng.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        });
      })
      .catch(err => console.error(err))
  }, []);

  return (
    <MapView
      style={styles.map}
      region={region} >
      <Marker
        coordinate={laLo}
        title={route.params.data} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})
