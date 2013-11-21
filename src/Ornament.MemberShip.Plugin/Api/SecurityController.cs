using System;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Qi.Web.Http;

namespace Ornament.MemberShip.Plugin.Api
{
    /// <summary>
    ///     不需要login 的所有關於安全的信息。
    /// </summary>
    [ApiSession]
    public class SecurityController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="factory"></param>
        public SecurityController(IMemberShipFactory factory)
        {
            if (factory == null)
                throw new ArgumentNullException("factory");
            _factory = factory;
        }

        // Post: /Secrity/
        /// <summary>
        ///     重新獲取密碼
        /// </summary>
        /// <returns></returns>
        public object Post([FromBody] ForgetPassword forgetPassword)
        {
            forgetPassword.Retrieve(_factory);
            return new { success = true };
        }
    }
}