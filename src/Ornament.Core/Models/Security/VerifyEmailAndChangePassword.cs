using Ornament.MemberShip.Security;

namespace Ornament.Models.Security
{
    public enum VerifyResutl
    {
        NotFoundTokenId,
        Success,
        Failed,
        Expire
    }

    public class VerifyEmailAndChangePasswordResutl
    {
        public UserSecretToken UserSecretToken { get; set; }
        public VerifyResutl Type { get; set; }
    }
}