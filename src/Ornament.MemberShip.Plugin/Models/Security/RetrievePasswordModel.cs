using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships.Partials;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Plugin.Models.Security
{
    public class RetrievePasswordModel
    {
        public string TokenId { get; set; }
        public string Id { get; set; }
        public PasswordModel PasswordModel { get; set; }

        public VerifyResult Save(IMemberShipFactory factory)
        {
            UserSecretToken userToken = factory.CreateUserSecurityTokenDao().Get(Id);

            if (userToken == null)
            {
                return VerifyResult.NotFoundTokenId;
            }

            if (userToken.Status == SecretTokenStatus.Expire)
            {
                return VerifyResult.Expire;
            }
            if (userToken.Verify(TokenId))
            {
                userToken.Account.Security.ChangePassword(PasswordModel.Password);
                factory.CreateUserDao().SaveOrUpdate(userToken.Account);
                factory.CreateUserSecurityTokenDao().SaveOrUpdate(userToken);
                return VerifyResult.Success;
            }
            return VerifyResult.Failed;
        }
    }
}