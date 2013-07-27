using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.Models.Memberships;

namespace Ornament.MVCWebFrame.Api.Core
{
    /// <summary>
    ///     不需要login 的所有關於安全的信息。
    /// </summary>
    public class SecurityController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="factory"></param>
        public SecurityController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET: /Secrity/
        /// <summary>
        ///     重新獲取密碼
        /// </summary>
        /// <param name="forgetPassword"></param>
        /// <returns></returns>
        [HttpPost]
        public object RetrievePassword([FromBody] ForgetPassword forgetPassword)
        {
            forgetPassword.Retrieve(_factory);
            return new { success = true };
        }
    }
}