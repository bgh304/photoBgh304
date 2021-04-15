import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Camera } from 'expo-camera';

export default function TakePhoto({ navigation }) {
  const [hasCameraPermission, setPermission] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');

  const camera = useRef(null);

  const askCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setPermission(status == 'granted');
  }

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({ base64: true });
      setPhotoName(photo.uri);
      setPhotoBase64(photo.base64);
      console.log('takePhoto');
    } 
  }

  useEffect(() => {
    askCameraPermission();
  }, []);

  return (
    <View style={{ flex: 1 }} >
      { hasCameraPermission ?
        (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 2 }} ref={camera} />
            <Button title='Take photo' onPress={takePhoto} />
            <Button title='Set photo info' onPress={() => navigation.navigate('SavePhoto', { data: photoName })} />
          </View>
        ) : (
          <Text>No acces to camera</Text>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '5%',
  },
});