namespace Ornament.MemberShip.MemberShipProviders
{
    /// <summary>
    /// </summary>
    public interface IMemberShipProvider
    {
        /// <summary>
        ///     加密
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>
        string Encrypt(string content);

        /// <summary>
        ///     解密
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>
        string Decrypt(string content);
    }
}