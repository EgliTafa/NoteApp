import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/Notes`);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
    fetchNotes();
  }, []);

  const tableData = notes.map((note) => [
    note.id.toString(),
    note.content,
    <TouchableOpacity
      onPress={() => handleDeleteNote(note.id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>,
  ]);

  const handleCreateNote = async () => {
    try {
      // Send a request to create a new note with the provided content
      const response = await axios.post(`${API_BASE_URL}/api/Notes`, { content: newNoteContent });
      // Handle the response (e.g., show a success message).
      console.log('Note created:', response.data);
      // After successful creation, refresh the notes list
      refreshNotes();
      // Reset the input.
      setNewNoteContent('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      // Send a request to delete the note based on the noteId
      await axios.delete(`${API_BASE_URL}/api/Notes/${noteId}`);
      // After successful deletion, refresh the notes list
      refreshNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const refreshNotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <View style={{ width: 'auto' }}>
      <View style={styles.createNoteContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter note content"
          value={newNoteContent}
          onChangeText={(text) => setNewNoteContent(text)}
        />
        <Button title="Create" onPress={handleCreateNote} />
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row
          data={['ID', 'Content', 'Actions']}
          style={{ height: 40, width: 250, backgroundColor: '#f1f8ff' }}
          textStyle={{ margin: 6, fontWeight: 'bold' }}
        />
        <Rows data={tableData} textStyle={{ margin: 6 }} />
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  createNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default NotesList;
