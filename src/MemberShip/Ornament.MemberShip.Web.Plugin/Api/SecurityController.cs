using System;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Security;
using Ornament.MemberShip.Web.Plugin.Models.Security;
using Qi.Web.Http;

namespace Ornament.MemberShip.Web.Plugin.Api
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
        public object RetrievePassword([FromBody] ForgetPasswordModel forgetPasswordModel)
        {
            forgetPasswordModel.Retrieve(_factory);
            return new { success = true };
        }

        [HttpGet]
        public bool VerifyEmail(VerifyEmailModel model)
        {
            model.Send(_factory);
            return true;
        }


    }
}