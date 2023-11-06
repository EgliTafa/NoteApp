using NoteAppAPI.Dto;
using NoteAppAPI.Models;

namespace NoteAppAPI.Data.Interfaces
{
    public interface INotesRepository
    {
        Task<NoteDto> GetNoteAsync(int id);
        Task<IEnumerable<NoteDto>> GetNotesAsync();
        Task<NoteDto> CreateNoteAsync(CreateNoteDto createNoteDto);
        Task<NoteDto> UpdateNoteAsync(NoteDto noteDto);
        Task<bool> DeleteNoteAsync(int id);
    }
}
