using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Ornament.Identity.Validators
{
    /// <summary>
    /// 检查是否有emial 重复
    /// </summary>
    /// <typeparam name="TKey"></typeparam>
    /// <typeparam name="TUser"></typeparam>
    /// <typeparam name="TUserRole"></typeparam>
    /// <typeparam name="TUserClaim"></typeparam>
    /// <typeparam name="TUserLogin"></typeparam>
    public class UniqueEmailValidator<TUser, TKey, TUserClaim, TUserRole, TUserLogin> : IUserValidator<TUser>
        where TUser : IdentityUser<TKey, TUserClaim, TUserRole, TUserLogin>
        where TKey : IEquatable<TKey>

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