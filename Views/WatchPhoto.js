import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { Button, Image } from 'react-native-elements';

export default function WatchPhoto({ navigation, route }) {
console.log('WatchPhoto SIVU\n');
console.log(route.params.data);

  return (
    <View style={styles.container}>
      <View style={styles.image} >
        <Image
          style={{ height: '100%', width: Dimensions.get('window').width }}
          source={{ uri: route.params.data.image }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.text}>
        <Text style={{ fontSize: 30 }}>{route.params.data.name}</Text>
        <Text>{route.params.data.description}</Text>
      </View>
      <View style={{ width: '100%' }} >
        <Button raised icon={{ name: 'place' }} title="LOCATION"
          onPress={() => navigation.navigate('Map location', {data: route.params.data.location})}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    image: {
      flex: 3,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: '5%',
    }
  });