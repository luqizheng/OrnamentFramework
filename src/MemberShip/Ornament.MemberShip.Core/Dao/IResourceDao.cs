using System;
using System.Collections.Generic;

namespace Ornament.MemberShip.Dao
{
    ///// <summary>
    ///// 
    ///// </summary>
    public interface IResourceDao
    {
        /// <summary>
        /// 根据resourceType类型 和id，获取资源，如果resourceType是string，那么直接返回id
        /// </summary>
        /// <param name="resourceType"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        object Get(Type resourceType, string id);
        /// <summary>
        ///  根据resourceType类型 和id，获取资源，如果resourceType是string，那么直接返回id
        /// </summary>
        /// <param name="resourceType"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        object Get(Type resourceType, object id);
        /// <summary>
        ///  根据resourceType类型 和id，获取资源，如果resourceType是string，那么直接返回id
        /// </summary>
        /// <param name="type"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        object Load(Type type, string id);
        /// <summary>
        ///  根据resourceType类型 和id，获取资源，如果resourceType是string，那么直接返回id
        /// </summary>
        /// <param name="objRes"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        object Load(Type objRes, object id);

        IList<T> FindResources<T>(User user, Enum @operator);
    }
}