using System.Security.Cryptography;

namespace WebApplication1.Services
{
    public sealed class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 100_000;
        private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA256;

        public (byte[] Hash, byte[] Salt) HashPassword(string password)
        {
            var salt = new byte[SaltSize]; //создаётся массив байтов (пустое место в памяти) размером 16 байт
            RandomNumberGenerator.Fill(salt); //этот массив заполняется криптографически случайными числами
            var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);
            return (hash, salt);
        }

        public bool VerifyPassword(string password, byte[] hash, byte[] salt)
        {
            if (hash.Length == 0 || salt.Length == 0)
                return false;

            var computed = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, hash.Length);

            return CryptographicOperations.FixedTimeEquals(computed, hash);
        }
    }
}
