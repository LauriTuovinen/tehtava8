import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, save } from 'react-native';
import Constants from 'expo-constants'
import { convertFirebaseTimeStampToJS } from './helpers/Functions'
import { firestore, collection,addDoc, serverTimestamp, MESSAGES, query, onSnapshot, orderBy} from './firebase/Config';
import Login from './components/Login';

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [logged,setLogged] = useState(false)

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))
    setNewMessage('')
    console.log('Message saved.')
  }

useEffect(() => {
  const q = query(collection(firestore,MESSAGES),orderBy('created','desc'))

  const unsubscribe = onSnapshot(q,(querySnapshot) => {
    const tempMessages =[]

    querySnapshot.forEach((doc) => {
      const messageObject = {
        id: doc.id,
        text: doc.data().text,
        created: convertFirebaseTimeStampToJS(doc.data().created)
      }
      tempMessages.push(messageObject)
    })
    setMessages(tempMessages)
  })

  return () => {
    unsubscribe()
  }
}, [])

if (logged){
  return (
    <View style={styles.container}>
      <ScrollView>
        {
          messages.map((message) =>
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          )
        }      
        <View style={styles.container}>
          <TextInput placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)}/>
          <Button title='Send' type="button" onPress={save}/>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
} else {
  return <Login setLogin={setLogged} />
}
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.StatusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo: {
    fontSize: 12
  }
});
