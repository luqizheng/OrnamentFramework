using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace Ornament.Identity.Validators
{
    /// <summary>
    /// 检查是否有emial 重复
    /// </summary>
    /// <typeparam name="TUserId"></typeparam>
    /// <typeparam name="TRole"></typeparam>
    /// <typeparam name="TRoleId"></typeparam>
    /// <typeparam name="TUser"></typeparam>
    public class UniqueEmailValidator<TUser,TUserId> : IUserValidator<TUser>
        where TUser : IdentityUser<TUserId>
       
    {
        public Task<IdentityResult> ValidateAsync(UserManager<TUser> manager, TUser user)
        {
            return Task.Run(() =>
            {
                var u = manager.Users.FirstOrDefault(dbUser => dbUser.Email == user.Email && !dbUser.Id.Equals(user.Id));
                if (u == null)
                    return IdentityResult.Success;
                var error = new[] { new IdentityError { Description = "Email has been registed,please try another." } };
                return IdentityResult.Failed(error);
            });
        }
    }
}