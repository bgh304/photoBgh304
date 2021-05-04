import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Input, ListItem, Icon, Header, Divider } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('photographyy.db');

export default function MainScreen({ navigation, route }) {
  const [photo, setPhoto] = useState({
    name: '',
    description: '',
    location: '',
    image: '',
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists photographyy (id integer primary key not null, name text, description text, location text, image text);');
    });
    updateList();
  }, []);

  useEffect(() => {
    if (typeof route.params === 'object') {
      setPhoto(route.params.data);
      addItem();
    }
  }, [route]);

  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into photographyy (name, description, location, image) values (?, ?, ?, ?);', [route.params.data.name, route.params.data.description, route.params.data.location, route.params.data.image]);
    }, updateError, updateList)
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from photographyy where id = ?;', [id]);
    }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from photographyy;', [], (_, { rows }) =>
        setItems(rows._array)
      );
    });
  }

  const updateError = () => {
    updateList();
    console.log(items);
    console.log('UPDATE ERROR!');
  }
  //{ data: item.id}
  const renderItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={{ alignItems: 'flex-start', padding: 5 }} >
      <ListItem.Content style={{ marginRight: '10%' }}>
        <ListItem.Title onLongPress={() => deleteItem(item.id)} >{item.name}</ListItem.Title>
        <ListItem.Subtitle style={{ fontSize: 11 }}>{item.location}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content style={{ alignItems: 'center' }}>
        <ListItem.Title style={{ color: '#2E75AC', fontWeight: 'bold' }} onPress={() => navigation.navigate('Watch photo', { data: item })} >WATCH</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content style={{ alignItems: 'flex-end' }}>
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

  return (
    <View style={styles.container} >
      <Divider style={{ height: '2%', backgroundColor: '#fff' }} />
      <View style={styles.container} >
        <Button raised icon={{ name: 'camera' }} title='TAKE PHOTO' onPress={() => navigation.navigate('Take photo')} />
        <Divider style={{ height: '10%', backgroundColor: '#fff' }} />
        <Header
          centerComponent={{ text: 'PHOTOS', style: { color: '#fff', fontSize: 40, marginTop: '-15%' } }}
        />
      </View>
      <View style={styles.flatList} >
        <FlatList
          style={{ width: '100%' }}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          data={items}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  flatList: {
    flex: 3,
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '5%',
  },
});