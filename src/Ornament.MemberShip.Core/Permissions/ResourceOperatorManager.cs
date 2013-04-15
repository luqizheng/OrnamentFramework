using System;
using System.Collections.Generic;
using System.Linq;

namespace Ornament.MemberShip.Permissions
{
    public class ResourceOperatorManager<T> : IResourceOperatorManager<T>
    {
        /// <summary>
        ///     Key is the resource, value is operatorType;
        /// </summary>
        private readonly Dictionary<T, Type> _resOperatorMapping = new Dictionary<T, Type>();

        public T[] Resources
        {
            get
            {
                return _resOperatorMapping.Keys
                                          .ToArray();
            }
        }

        /// <summary>
        /// Gets the OperatorType from Resources
        /// </summary>
        /// <param name="res"></param>
        /// <returns></returns>
        /// <exception cref="NotFoundOperatorTypeException">Can not find OperatorType base on resource</exception>
        public virtual Type GetOperatorType(T res)
        {
            if (_resOperatorMapping.ContainsKey(res))
            {
                return _resOperatorMapping[res];
            }
            var s = res as string;
            if (s != null)
                throw new NotFoundOperatorTypeException(s);
            else
                throw new NotFoundOperatorTypeException(typeof(T));

        }

        public virtual IResourceOperatorManager<T> Add(T resourceInstance, Type enumType)
        {
            if (Equals(resourceInstance, default(T)))
                throw new ArgumentNullException("resourceInstance");

            if (enumType == null)
                throw new ArgumentNullException("enumType");
            if (!enumType.IsEnum)
            {
                throw new ArgumentException("enumType should be a enum");
            }
            _resOperatorMapping.Add(resourceInstance, enumType);
            return this;
        }

        //public T[] GetResourceByType(Type operatorType)
        //{
        //    var result = new List<T>();
        //    foreach (T resName in _resOperatorMapping.Keys)
        //    {
        //        Type enumType = _typeResourceTypeOperator[resName];
        //        if (enumType == operatorType.GetType())
        //        {
        //            result.Add(resName);
        //        }
        //    }
        //    if (result.Count == 0)
        //        throw new NotFindResourceDefinedException(operatorType.GetType());

        //    return result.ToArray();
        //}
    }
}