using System.Linq;
using Ornament.MemberShip.Security;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IUserSecurityTokenDao : IDao<string, UserSecretToken>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="action">Token中要实现的动作，如更改密码、验证email等</param>
        /// <returns></returns>
        UserSecretToken Get(User user, string action);
        IQueryable<UserSecretToken> Tokens { get; }
    }
}