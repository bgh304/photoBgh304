import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Input, ListItem, Icon, Header, Divider } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('photo.db');

export default function MainScreen({ navigation, route }) {
  const [photo, setPhoto] = useState({
    name: '',
    description: '',
    location: '',
  });
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists photo (id integer primary key not null, name text, description text, location text);');
    });
    updateList();
  }, []);

  useEffect(() => {
    if (typeof route.params === 'object') {
      setPhoto(route.params.data);
      console.log(route.params.data);
      addItem();
    }
  }, [route]);

  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into photo (name, description, location) values (?, ?, ?);', [photo.name, photo.description, photo.location]);
    }, updateError, updateList)
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from photo where id = ?;', [id]);
    }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from photo;', [], (_, { rows }) =>
        setItems(rows._array)
      );
    });
  }

  const updateError = () => {
    updateList();
    console.log(items);
    console.log('UPDATE ERROR!');
  }

  const renderItem = ({ item }) => (
    <ListItem bottomDivider >
      <ListItem.Content>
        <ListItem.Title onLongPress={() => deleteItem(item.id)} >{item.photo.name}</ListItem.Title>
        <ListItem.Subtitle>{item.photo.location}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content>
        <Icon name='delete' color='red' onPress={() => deleteItem(item.id)} />
      </ListItem.Content>
    </ListItem>
  )

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '80%',
          backgroundColor: '#fff',
          marginLeft: '10%'
        }}
      />
    );
  };
  //
  return (
    <View style={styles.container} >
      <Button raised icon={{ name: 'camera' }} title='TAKE PHOTO' onPress={() => navigation.navigate('TakePhoto')} />
      <Divider style={{ height: '5%', backgroundColor: '#fff' }} />
      <Header
        centerComponent={{ text: 'PHOTOS', style: { color: '#fff' } }}
      />
      <Divider style={{ height: '2%', backgroundColor: '#fff' }} />
      <FlatList
        style={{ marginLeft: '5%' }}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        data={items}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  )
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