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

        public T GetResourceByType(Type operatorType)
        {
            foreach (T resName in Resources)
            {
                Type enumType = GetOperatorType(resName);
                if (enumType == operatorType)
                {
                    return resName;
                }
            }

            throw new NotFindResourceDefinedException(operatorType);
        }
    }
}