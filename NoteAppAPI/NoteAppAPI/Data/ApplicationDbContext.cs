using Microsoft.EntityFrameworkCore;
using NoteAppAPI.Models;
using System.Threading.Tasks;

namespace NoteAppAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        // DbSet for the Notes table, which represents the notes in the system
        public DbSet<Note> Notes { get; set; }
    }
}
