using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
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

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.User == null || !context.HttpContext.User.Identity.IsAuthenticated)
                // auth failed, redirect to login page
                context.Result = new UnauthorizedResult();

            var dao = (IPermissionStore) context.HttpContext.RequestServices.GetService(typeof(IPermissionStore));
            var userId = context.HttpContext.User.Identity.Name;
            var result = dao.Find(userId);
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

            var isVerify = result.Any(p => p.Verify(Convert.ToInt32(Operator)));
            if (isVerify)
            {
                //May be should be cache it, but I have no any idea for attribute cache.
            }
            else
            {
                context.Result = new UnauthorizedResult();
            }
        }

        //// This method must be thread-safe since it is called by the caching module.
        //}
        //    validationStatus = OnCacheAuthorization(new HttpContextWrapper(context));
        //{

        //private void CacheValidateHandler(HttpContext context, object data, ref HttpValidationStatus validationStatus)
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