import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function CreateNote() {
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleCreateNote = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Notes`, {
        content: newNoteContent,
      });
      // Handle the response (e.g., show a success message).
      console.log('Note created:', response.data);

      // Call the callback to refresh the notes
      onNoteCreated();

    } catch (error) {
      console.error('Error creating note:', error);
    }

    // Reset the input.
    setNewNoteContent('');
  };

  return (
    <View style={{ margin: 10, border: '2px solid black' }}>
      <TextInput
        placeholder="Enter note content"
        value={newNoteContent}
        onChangeText={(text) => setNewNoteContent(text)}
        style={{
          borderWidth: 2,
          borderColor: 'black',
          padding: 10,
          margin: 10,
        }}
      />
      <Button title="Save" onPress={handleCreateNote} />
    </View>
  );
}

export default CreateNote;
