import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NotesList from './components/NoteList';

export default function App() {
  return (
    <View>
      <h1 style={{textAlign:"center"}}>My Notes App</h1>
      <NotesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
