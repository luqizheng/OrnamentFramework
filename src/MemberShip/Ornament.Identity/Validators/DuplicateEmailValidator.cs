using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace Ornament.Identity.Validators
{
    /// <summary>
    /// 检查是否有emial 重复
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class UniqueEmailValidator<T> : IUserValidator<T> where T : IdentityUser
    {
        public Task<IdentityResult> ValidateAsync(UserManager<T> manager, T user)
        {
            return Task.Run(() =>
            {
                var u = manager.Users.FirstOrDefault(dbUser => dbUser.Email == user.Email && dbUser.Id != user.Id);
                if (u == null)
                    return IdentityResult.Success;
                var error = new[] {new IdentityError {Description = "Email has been registed,please try another."}};
                return IdentityResult.Failed(error);
            });
        }
    }
}