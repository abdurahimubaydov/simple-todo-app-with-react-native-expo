import { use, useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import Header from './components/header';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

export default function App() {
  const [data, setData] = useState([])
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/todos');
      setIsLoading(false);
      setValue()
      setData(res.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const addData = async () => {
    if (!value) alert('Please fill the form')
    else {
      setAddLoading(true);
      setTimeout(async ()  => {
        const newData = { title: value, isComplited: false };
        try {
          const res = await axios.post('http://localhost:8000/todos', newData)
          setAddLoading(false);
          getData();
        } catch (error) {
          console.error(error);
          setAddLoading(false);
        };
      }, 500-250)
    }
  };

  const removeData = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/todos/${id}`);
      getData();
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    getData()
  }, [])


  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Simple Todo-App</Text>
      <Header
        value={value}
        setValue={setValue}
        addData={addData}
        addLoading={addLoading}
      />

      <ScrollView style={{ padding: 20 }}>
        {data.length === 0 && !isLoading && <Text style={styles.addTodo}>add some todos :)</Text>}

        {isLoading && <ActivityIndicator />}

        {data && !isLoading && data.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginRight: 5 }}>
                <Checkbox
                  disabled={item.isComplited}
                  value={item.isComplited}
                />
              </TouchableOpacity>
              <Text style={{ textDecorationLine: item.isComplited === true ? 'line-through' : '' }}>{item.title}</Text>
            </View>

            <TouchableOpacity
              style={styles.iconCard}
              onPress={() => removeData(item.id)}
            >
              <AntDesign
                name="delete"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },

  header: {
    fontSize: 35,
    marginHorizontal: 20,
    fontWeight: '700'
  },

  addTodo: {
    fontSize: 30,
    color: 'red',
    fontWeight: '600'
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: .5,
    paddingBottom: 10,
    marginBottom: 15,
    alignItems: 'center'
  },

  iconCard: {
    width: 35,
    height: 35,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
