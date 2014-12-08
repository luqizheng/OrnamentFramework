using System;
using Ornament.Contexts;
using Ornament.MemberShip.Dao;

namespace Ornament
{
    /// <summary>
    /// </summary>
    public static class ResourceContextExtender
    {
        /// <summary>
        /// </summary>
        /// <param name="ornamentContext"></param>
        /// <param name="resourceType"></param>
        /// <param name="resourceId"></param>
        /// <returns></returns>
        public static object GetResource(this MemberShipContext ornamentContext, Type resourceType, string resourceId)
        {
            return resourceType == typeof (string)
                       ? resourceId
                       : OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateResourceDao().Get(resourceType, resourceId);
        }

        /// <summary>
        /// </summary>
        /// <param name="ornamentContext"></param>
        /// <param name="resourceType"></param>
        /// <param name="resourceId"></param>
        /// <returns></returns>
        public static object GetResource(this MemberShipContext ornamentContext, Type resourceType, object resourceId)
        {
            if (resourceType == typeof (string))
                return resourceId;
            return OrnamentContext.DaoFactory.GetDaoFactory<IMemberShipDaoFactory>().CreateResourceDao().Get(resourceType, resourceId);
        }
    }
}