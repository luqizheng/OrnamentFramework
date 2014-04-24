using System.Linq;
using Ornament.MemberShip.Security;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IUserSecurityTokenDao : IDao<string, EmailVerifier>
    {
        IQueryable<EmailVerifier> Tokens { get; }

        /// <summary>
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        EmailVerifier Get(User user, VerifyType type);
    }
}