import axios from 'axios';
import { API_BASE_URL } from '../config';

const NoteListService = {
  fetchNotes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Notes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  createNote: async (content) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Notes`, { content });
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  deleteNote: async (noteId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/Notes/${noteId}`);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
};

export default NoteListService;
