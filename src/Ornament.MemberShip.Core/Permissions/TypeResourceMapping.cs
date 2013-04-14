using System;

namespace Ornament.MemberShip.Permissions
{
    public class TypeResourceOperatorMapping : ResourceOperatorManager<string>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="operatorType"></param>
        /// <returns></returns>
        /// <exception cref="NotFindResourceDefinedException"></exception>
        public string GetResourceByType(Type operatorType)
        {
            foreach (string resName in base.Resources)
            {
                Type enumType = this[resName];
                if (enumType == operatorType)
                {
                    return resName;
                }
            }

            throw new NotFindResourceDefinedException(operatorType);
        }
    }
}