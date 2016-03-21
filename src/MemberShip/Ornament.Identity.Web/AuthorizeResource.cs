using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Filters;
using Ornament.Identity.Stores;

namespace Ornament.Identity.Web
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".

    public class AuthorizeResourceAttribute : ActionFilterAttribute, IAuthorizationFilter
    {

        private readonly object _resourceId;
        private readonly Enum _val;

        public AuthorizeResourceAttribute(object resourceId, Enum val)
        {
            _resourceId = resourceId;
            _val = val;
        }
        /// <summary>
        /// </summary>
        public Enum Operator { get; set; }
        public void OnAuthorization(AuthorizationContext context)
        {
            if (context.HttpContext.User == null || !context.HttpContext.User.Identity.IsAuthenticated)
                // auth failed, redirect to login page
                context.Result = new HttpUnauthorizedResult();

            IPermissionStore dao =(IPermissionStore)context.HttpContext.RequestServices.GetService(typeof(IPermissionStore));
            var userId = context.HttpContext.User.Identity.Name;
            IList<Permission> result = dao.Find(userId);
            //if (ResourceType != typeof(string))
            //{
            //    var res =
            //        OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateResourceDao().Load(
            //            ResourceType, ResourceId) as IDomainObject;
            //    if (res == null)
            //        throw new MemberShipException(ResourceType.FullName +
            //                                      " should be inherit from Ornament.MemberShip.IDomainObject.");
            //    result = dao.GetUserPermissions(context.User.Identity.Name, res);
            //}

            //else
            //{
            //    result = dao.GetUserPermissions(context.User.Identity.Name, ResourceId);
            //}

            var isVerify= result.Any(p => p.Verify(Convert.ToInt32(Operator)));
            if (isVerify)
            {
                //May be should be cache it, but I have no any idea for attribute cache.
            }
            else
            {
                context.Result = new HttpUnauthorizedResult(); ;
            }
           
        }

        //private void CacheValidateHandler(HttpContext context, object data, ref HttpValidationStatus validationStatus)
        //{
        //    validationStatus = OnCacheAuthorization(new HttpContextWrapper(context));
        //}

        //// This method must be thread-safe since it is called by the caching module.
        //protected virtual HttpValidationStatus OnCacheAuthorization(HttpContextBase httpContext)
        //{
        //    if (httpContext == null)
        //    {
        //        throw new ArgumentNullException("httpContext");
        //    }

        //    bool isAuthorized = AuthorizeCore(httpContext);
        //    return (isAuthorized) ? HttpValidationStatus.Valid : HttpValidationStatus.IgnoreThisRequest;
        //}
    }
}