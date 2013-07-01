using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Security;
using Ornament.Models.Memberships.Partials;

namespace Ornament.Models.Security
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
            if (userToken.Status == SecretTokemStatus.Expire)
                return VerifyResult.Expire;
            if (userToken.Verify(TokenId))
            {
                userToken.Account.ChangePassword(PasswordModel.Password);
                factory.CreateUserDao().SaveOrUpdate(userToken.Account);
                return VerifyResult.Success;
            }
            else
            {
                return VerifyResult.Failed;
            }
        }
    }
}