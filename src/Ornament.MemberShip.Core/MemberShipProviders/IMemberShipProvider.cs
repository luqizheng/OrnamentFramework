namespace Ornament.MemberShip.MemberShipProviders
{
    /// <summary>
    /// 
    /// </summary>
    public interface IMemberShipProvider
    {
        string Encrypt(string content);
        string Decrypt(string content);
    }
}