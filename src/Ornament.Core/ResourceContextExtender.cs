using System;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament
{
    public static class ResourceContextExtender
    {
        public static object GetResource(this Context context, Type resourceType, string resourceId)
        {
            return resourceType == typeof (string)
                       ? resourceId
                       : context.GetDaoFactory<IMemberShipFactory>().CreateResourceDao().Get(resourceType, resourceId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="resourceType"></param>
        /// <param name="resourceId"></param>
        /// <returns></returns>
        public static object GetResource(this Context context, Type resourceType, object resourceId)
        {
            if (resourceType == typeof (string))
                return resourceId;
            return context.GetDaoFactory<IMemberShipFactory>().CreateResourceDao().Get(resourceType, resourceId);
        }
    }
}