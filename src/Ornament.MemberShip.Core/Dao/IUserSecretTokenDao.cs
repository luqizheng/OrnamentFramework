using Ornament.MemberShip.Secret;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IUserSecretTokenDao:IDao<string,UserSecretToken>
    {
        UserSecretToken Get(User user, ActiveUserAction action);
    }
}