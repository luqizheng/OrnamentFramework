using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ornament.Identity.Validators
{
    public class DuplicateEmailValidator<T, TUserId> : Microsoft.AspNet.Identity.IUserValidator<T> where T : IdentityUser<TUserId>
    {
        public Task<IdentityResult> ValidateAsync(UserManager<T> manager, T user)
        {
            return Task<IdentityResult>.Run(() =>
            {
                var u = manager.Users.FirstOrDefault(dbUser => dbUser.Email == user.Email && !dbUser.Id.Equals(user.Id));
                if (u == null)
                    return IdentityResult.Success;
                else
                {
                    var error = new[] { new IdentityError() { Description = "Email has been registed,please try another." } };
                    return IdentityResult.Failed(error);
                }
            });
        }
    }
}