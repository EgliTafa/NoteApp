using Microsoft.EntityFrameworkCore;
using NoteAppAPI.Data.Interfaces;
using NoteAppAPI.Dto;
using NoteAppAPI.Models;

namespace NoteAppAPI.Data.Repositories
{
    public class NotesRepository : INotesRepository
    {
        private readonly ApplicationDbContext _context;

        public NotesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<NoteDto> GetNoteAsync(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return null;
            }

            return new NoteDto
            {
                Id = note.Id,
                Content = note.Content
            };
        }

        public async Task<IEnumerable<NoteDto>> GetNotesAsync()
        {
            var notes = await _context.Notes.ToListAsync();
            return notes.Select(note => new NoteDto
            {
                Id = note.Id,
                Content = note.Content
            });
        }

        public async Task<NoteDto> CreateNoteAsync(CreateNoteDto createNoteDto)
        {
            var note = new Note
            {
                Content = createNoteDto.Content
            };

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return new NoteDto
            {
                Id = note.Id,
                Content = note.Content
            };
        }

        public async Task<NoteDto> UpdateNoteAsync(NoteDto noteDto)
        {
            var existingNote = await _context.Notes.FindAsync(noteDto.Id);
            if (existingNote == null)
            {
                return null;
            }

            existingNote.Content = noteDto.Content;
            await _context.SaveChangesAsync();

            return noteDto;
        }

        public async Task<bool> DeleteNoteAsync(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return false;
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
