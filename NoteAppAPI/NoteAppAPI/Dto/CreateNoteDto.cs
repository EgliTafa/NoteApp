using System.ComponentModel.DataAnnotations;

namespace NoteAppAPI.Dto
{
    public class CreateNoteDto
    {
      [Required]
      public string Content { get; set; }
    }
}
