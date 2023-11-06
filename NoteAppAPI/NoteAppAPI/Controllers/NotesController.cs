using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteAppAPI.Data.Interfaces;
using NoteAppAPI.Dto;

namespace NoteAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesRepository _notesRepository;

        public NotesController(INotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes()
        {
            var notes = await _notesRepository.GetNotesAsync();
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NoteDto>> GetNote(int id)
        {
            var note = await _notesRepository.GetNoteAsync(id);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }

        [HttpPost]
        public async Task<ActionResult<NoteDto>> CreateNote([FromBody] CreateNoteDto createNoteDto)
        {
            var createdNote = await _notesRepository.CreateNoteAsync(createNoteDto);
            return CreatedAtAction(nameof(GetNote), new { id = createdNote.Id }, createdNote);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<NoteDto>> UpdateNote(int id, [FromBody] NoteDto noteDto)
        {
            if (id != noteDto.Id)
            {
                return BadRequest();
            }

            var updatedNote = await _notesRepository.UpdateNoteAsync(noteDto);
            if (updatedNote == null)
            {
                return NotFound();
            }
            return Ok(updatedNote);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNote(int id)
        {
            var result = await _notesRepository.DeleteNoteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
