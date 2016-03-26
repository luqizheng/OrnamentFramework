using System;
using System.Collections.Generic;
using Ornament.Domain.Entities;

namespace Ornament.Identity
{
    public abstract class Permission : EntityWithTypedId<int>
    {
        public virtual string Name { get; set; }


        public virtual int Operator { get; set; }


        public virtual IdentityRole Role { get; set; }


        public virtual bool Verify(int v)
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

    public class GenericPermission<TResourcce, TOperator> : Permission
    {
        public virtual TResourcce Resource { get; set; }

        public new TOperator Operator
        {
            get { return (TOperator) Enum.ToObject(typeof (TOperator), base.Operator); }
            set { base.Operator = Convert.ToInt32(value); }
        }
    }
}