using System;
using System.Collections.Generic;
using Ornament.MemberShip.Dao;

namespace Ornament
{
    /// <summary>
    /// </summary>
    public static class ResourceContextExtender
    {
        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="resourceType"></param>
        /// <param name="resourceId"></param>
        /// <returns></returns>
        public static object GetResource(this Context context, Type resourceType, string resourceId)
        {
            return resourceType == typeof (string)
                       ? resourceId
                       : context.GetDaoFactory<IMemberShipFactory>().CreateResourceDao().Get(resourceType, resourceId);
        }

        /// <summary>
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

    public static class MessageContextExtender
    {
        private static readonly Dictionary<string, string> _languages = new Dictionary<string, string>
            {
            };

        public static Dictionary<string, string> Languages(this Context context)
        {
            return _languages;
        }
    }
}