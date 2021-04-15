import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, Input, ListItem, Icon, Header, Divider } from 'react-native-elements';

export default function SavePhoto({ navigation, route }) {
  const [photo, setPhoto] = useState({
    name: '',
    description: '',
    location: '',
  });

  return (
    <View style={{ flex: 4 }} >
      <Image style={{ flex: 1 }} source={{ uri: route.params.data }} />
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
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5%',
    },
  });