using Ornament.MemberShip.Secret;

namespace Ornament.Models.Security
{
    public enum VerifyEmailAndChangePasswordResutlType
    {
        NotFoundTokenId,
        Success,
        Failed
    }

    public class VerifyEmailAndChangePasswordResutl
    {
        public UserSecretToken UserSecretToken { get; set; }
        public VerifyEmailAndChangePasswordResutlType Type { get; set; }
    }
}