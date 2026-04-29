using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.DTOs;
using WebApplication1.Models;
using WebApplication1.Options;

namespace WebApplication1.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly JwtOptions _options;
        public JwtTokenService(IOptions<JwtOptions> options)
        {
            _options = options.Value;
        }

        public AuthResponse CreateAuthResponse(User user)
        {
            var expiresAt = DateTime.UtcNow.AddMinutes(_options.ExpiresMinutes);

            string BuildSignedJwt()
            {
                //Это моя уникальная печать, которую не знаем
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));

                //Как именно ставить печать. Мы будем ставить печать вот таким способом 
                //(HmacSha256)
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                //Здесь мы фиксируем, каким ключом подписывать (key)
                //каким алгоритом (HmacSha256)
                //Используй этот секретный ключ и алгоритм, чтобы поставить подпись на токене

                //Сlaims - это данные о пользователе, которые мы кладём в токен
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                //Создание токена
                var jwt = new JwtSecurityToken(
                    issuer: _options.Issuer,
                    audience: _options.Audience,
                    claims: claims,
                    expires: expiresAt,
                    signingCredentials: creds);

                return new JwtSecurityTokenHandler().WriteToken(jwt);
            }

            return new AuthResponse
            {
                Token = BuildSignedJwt(),
                ExpiresAtUtc = expiresAt,
                User = new UserInfoDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name
                }
            };
        }
    }
}
