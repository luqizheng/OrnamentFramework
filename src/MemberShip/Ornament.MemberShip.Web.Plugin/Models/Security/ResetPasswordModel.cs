using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships.Partials;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Web.Plugin.Models.Security
{
    /// <summary>
    ///     这个model用于重新设定密码的时候是用
    /// </summary>
    public class ResetPasswordModel
    {
        public string TokenId { get; set; }
        public string Id { get; set; }
        public PasswordModel PasswordModel { get; set; }

        public VerifyResult Save(IMemberShipDaoFactory daoFactory)
        {
            EmailVerifier userToken = daoFactory.CreateEmailVerifierDao().Get(Id);

            if (userToken == null)
            {
                return VerifyResult.NotFoundTokenId;
            }
            if (userToken.Verify(TokenId, daoFactory) == VerifyResult.Success)
            {
                userToken.Account.Security.ChangePassword(PasswordModel.NewPassword);
                daoFactory.CreateUserDao().Update(userToken.Account);
                return VerifyResult.Success;
            }
            return VerifyResult.Failed;
        }
    }
}