import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default function SavePhoto({ navigation, route }) {
  const [photo, setPhoto] = useState({
    name: '',
    description: '',
    location: '',
    image: route.params.data,
  });

  return (
    <View style={styles.container}>
      <View style={styles.image} >
        <Image
          style={{ height: '100%', width: Dimensions.get('window').width }}
          source={{ uri: route.params.data }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={{ width: '100%' }}>
        <Input placeholder='Enter name' label='NAME' onChangeText={name => setPhoto({...photo, name: name})}
          value={photo.name.toString()}
        />
        <Input placeholder='Enter desciption' label='DESCRIPTION' onChangeText={description => setPhoto({...photo, description: description})}
          value={photo.description.toString()}
        />
        <Input placeholder='Enter location' label='LOCATION' onChangeText={location => setPhoto({...photo, location: location})}
          value={photo.location.toString()}
        />
        <Button raised icon={{name: 'save'}} title="SAVE PHOTO" onPress={() => navigation.navigate('MainScreen', {data: photo})} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    image: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '5%',
    }
  });