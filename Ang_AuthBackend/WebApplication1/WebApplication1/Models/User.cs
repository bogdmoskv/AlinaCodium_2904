namespace WebApplication1.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set;} = Array.Empty<byte>();
        public DateTime CreatedAtUtc { get; set; }
    }
}
