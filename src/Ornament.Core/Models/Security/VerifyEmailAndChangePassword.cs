using Ornament.MemberShip.Security;

namespace Ornament.Models.Security
{
    public enum VerifyResult
    {
        NotFoundTokenId,
        Success,
        Failed,
        Expire
    }

  
}