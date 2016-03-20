using System;
using System.Collections.Generic;
using Ornament.Domain.Entities;

namespace Ornament.Identity
{
    public interface IPermission
    {
        bool Verify(int v);
    }

    public class Permission<TRole, TRoleId>
        : EntityWithTypedId<int>, IPermission
        where TRole : IdentityRole<TRoleId>

    {
        public string Name { get; set; }
        public TRole Role { get; set; }
        public object Resource { get; set; }
        public int Operator { get; set; }

        public bool Verify(int v)
        {
            return HasOperator(Operator, Convert.ToInt32(v));
        }

        public static bool HasOperator(int opVal, int operatorVal)
        {
            if (opVal < operatorVal)
                return false;
            return (opVal & operatorVal) == operatorVal;
        }

        /// <summary>
        /// </summary>
        /// <param name="opVal"></param>
        /// <param name="operator"></param>
        /// <returns></returns>
        public static bool HasOperator(int opVal, Enum @operator)
        {
            return HasOperator(opVal, @operator);
        }

        public static int[] FindValues(int @operator, Type operatorType)
        {
            var vals = Enum.GetValues(operatorType);
            var result = new List<int>();
            foreach (var val in vals)
            {
                if (HasOperator(@operator, (Enum) val))
                {
                    result.Add(Convert.ToInt32(val));
                }
            }
            return result.ToArray();
        }
    }
}