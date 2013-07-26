using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Qi.Domain;
using Qi.NHibernateExtender;

namespace Ornament.Web.MemberShips
{
    public class ApiResourceAuthorizeAttribute : FilterAttribute, IAuthorizationFilter
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="operator">the operator will be checked in resource</param>
        /// <param name="resourceId">Resource's Id</param>
        public ApiResourceAuthorizeAttribute(object @operator, string resourceId)
            : this(@operator, typeof(string), resourceId)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="operator"></param>
        /// <param name="resourceType"></param>
        /// <param name="resourceId"></param>
        /// <exception cref="ArgumentNullException">@operator resourceType or resourceId is null</exception>
        public ApiResourceAuthorizeAttribute(object @operator, Type resourceType, string resourceId)
        {
            if (@operator == null)
                throw new ArgumentNullException("operator");
            if (resourceType == null) throw new ArgumentNullException("resourceType");
            if (resourceId == null) throw new ArgumentNullException("resourceId");

            Operator = (Enum)@operator;
            ResourceType = resourceType;
            ResourceId = resourceId;
        }


        /// <summary>
        /// Gets or sets rolesInfo's id which id is string express, e.g guid.ToString()
        /// </summary>
        public string ResourceId { get; set; }

        /// <summary>
        /// Gets or sets Resource type, e.g. typeof(User)
        /// </summary>
        public Type ResourceType { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public Enum Operator { get; set; }

        #region IAuthorizationFilter Members

        public virtual void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext == null)
            {
                throw new ArgumentNullException("filterContext");
            }
            var sessionWrapper = SessionManager.GetSessionWrapper();
            var opened = sessionWrapper.InitSession();
            try
            {
                if (AuthorizeCore(filterContext.HttpContext))
                {
                    // ** IMPORTANT **
                    // Since we're performing authorization at the action level, the authorization code runs
                    // after the output caching module. In the worst case this could allow an authorized user
                    // to cause the page to be cached, then an unauthorized user would later be served the
                    // cached page. We work around this by telling proxies not to cache the sensitive page,
                    // then we hook our custom authorization code into the caching mechanism so that we have
                    // the final say on whether a page should be served from the cache.

                    HttpCachePolicyBase cachePolicy = filterContext.HttpContext.Response.Cache;
                    cachePolicy.SetProxyMaxAge(new TimeSpan(0));
                    cachePolicy.AddValidationCallback(CacheValidateHandler, null /* data */);
                }
                else
                {
                    // auth failed, redirect to login page
                    filterContext.Result = new HttpUnauthorizedResult();
                }
            }
            finally
            {
                if (opened)
                {
                    sessionWrapper.Close(true);
                }
            }
        }

        #endregion

        protected bool AuthorizeCore(HttpContextBase context)
        {
            if (context.User == null || !context.User.Identity.IsAuthenticated)
                return false;

            IUserDao userdao =  Ornament.OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao();

            User user = userdao.GetByLoginId(context.User.Identity.Name);

            if (user == null)
                return false;

            if (user.LoginId == User.AdminLoginId)
                return true;


            IPermissionDao dao =  Ornament.OrnamentContext.DaoFactory.MemberShipFactory.CreatePermissionDao();

            IList<Permission> result;
            if (ResourceType != typeof(string))
            {
                var res =
                     Ornament.OrnamentContext.DaoFactory.MemberShipFactory.CreateResourceDao().Load(
                        ResourceType, ResourceId) as IDomainObject;
                if (res == null)
                    throw new MemberShipException(ResourceType.FullName +
                                                  " should be inherit from Ornament.MemberShip.IDomainObject.");
                result = dao.GetUserPermissions(context.User.Identity.Name, res);
            }

            else
            {
                result = dao.GetUserPermissions(context.User.Identity.Name, ResourceId);
            }

            return result.Any(p => p.HasOperator(Operator));
        }

        private void CacheValidateHandler(HttpContext context, object data, ref HttpValidationStatus validationStatus)
        {
            validationStatus = OnCacheAuthorization(new HttpContextWrapper(context));
        }

        // This method must be thread-safe since it is called by the caching module.
        protected virtual HttpValidationStatus OnCacheAuthorization(HttpContextBase httpContext)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException("httpContext");
            }

            bool isAuthorized = AuthorizeCore(httpContext);
            return (isAuthorized) ? HttpValidationStatus.Valid : HttpValidationStatus.IgnoreThisRequest;
        }
    }
}