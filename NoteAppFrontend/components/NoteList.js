import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import CreateNote from './CreateNote';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

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
    // Add a "Delete" button for each note
    <TouchableOpacity
      onPress={() => handleDeleteNote(note.id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>,
  ]);

  const handleCreateNote = () => {
    setIsCreating(!isCreating);
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
      <Button title="Create" onPress={handleCreateNote} />
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row
          data={['ID', 'Content', 'Actions']}
          style={{ height: 40, width: 250, backgroundColor: '#f1f8ff' }}
          textStyle={{ margin: 6, fontWeight: 'bold' }}
        />
        <Rows data={tableData} textStyle={{ margin: 6 }} />
      </Table>
      {isCreating && <CreateNote onNoteCreated={refreshNotes} />}
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
});

export default NotesList;
