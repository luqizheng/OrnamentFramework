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
        private readonly IMemberShipDaoFactory _daoFactory;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="daoFactory"></param>
        public SecurityController(IMemberShipDaoFactory daoFactory)
        {
            if (daoFactory == null)
                throw new ArgumentNullException("daoFactory");
            _daoFactory = daoFactory;
        }

        // Post: /Secrity/
        /// <summary>
        ///     重新獲取密碼
        /// </summary>
        /// <returns></returns>
        public object RetrievePassword([FromBody] ForgetPasswordModel forgetPasswordModel)
        {
            forgetPasswordModel.Retrieve(_daoFactory);
            return new { success = true };
        }

        [HttpGet]
        public bool VerifyEmail(VerifyEmailModel model)
        {
            model.Send(_daoFactory);
            return true;
        }


    }
}