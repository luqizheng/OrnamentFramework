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
        /// <exception cref="NotFindResourceDefinedException">Can't find the resources</exception>
        public string GetResourceByType(Type operatorType)
        {
            foreach (string resName in base.Resources)
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