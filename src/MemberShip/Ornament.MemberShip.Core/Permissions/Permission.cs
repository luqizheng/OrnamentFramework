using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Ornament.MemberShip.Properties;
using Qi.Domain;

namespace Ornament.MemberShip.Permissions
{
    /// <summary>
    ///     许可对象。用于定义角色(<see cref="Role" />)是否有权对资源(通过ResourceId属性定义)进行某种操作(<see cref="Operator" />)
    /// </summary>
    public abstract class Permission : DomainObject<Permission, string>
    {
        private static readonly string _ornamentMembershipPermissionsGenericpermissionOrnamentMembershipCore;

        static Permission()
        {
            _ornamentMembershipPermissionsGenericpermissionOrnamentMembershipCore =
                "Ornament.MemberShip.Permissions.GenericPermission`1[[{0}]],Ornament.MemberShip.Core";
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="Permission" /> class.
        /// </summary>
        protected Permission()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="info">Resources's info</param>
        protected Permission(object info)
        {
            Resource = info;
        }

        /// <summary>
        ///     Gets or sets permission's name .
        /// </summary>
        /// <value>The name.</value>
        [Display(ResourceType = typeof(Resources), Name = "PermissionName")]
        [Required]
        public virtual string Name { get; set; }

        /// <summary>
        ///     Gets or sets the remark.
        /// </summary>
        /// <value>The comment.</value>
        [Display(ResourceType = typeof(Resources), Name = "Remark")]
        public virtual string Remark { get; set; }

        /// <summary>
        ///     Gets or sets Resource
        /// </summary>
        /// <value>Resource</value>
        public virtual object Resource { get; set; }

        /// <summary>
        ///     Gets or sets OperatorValues. 拥有操作的数值
        /// </summary>
        /// <value>
        ///     The operator values.
        /// </value>
        [Display(ResourceType = typeof(Resources), Name = "Operator")]
        public virtual int Operator { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="res"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">res is null</exception>
        /// <exception cref="ArgumentNullException">id is null</exception>
        /// <exception cref="ArgumentNullException">id is null</exception>
        public static Permission CreatePermission(object res)
        {
            if (res == null)
            {
                throw new ArgumentNullException("res");
            }
            Type t = CreatePermissionType(res.GetType());
            t.GetConstructor(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance,
                null, new Type[0], new ParameterModifier[0]);
            var a = (Permission)Activator.CreateInstance(t);
            a.Resource = res;
            return a;
        }

        public static Type CreatePermissionType(Type resType)
        {
            if (resType == null) throw new ArgumentNullException("resType");
            string typeString =
                String.Format(_ornamentMembershipPermissionsGenericpermissionOrnamentMembershipCore,
                    resType.AssemblyQualifiedName);
            Type t = Type.GetType(typeString);
            if (t == null)
                throw new MemberShipPermissionException("Can not find the type with " + typeString);
            return t;
        }

        /// <summary>
        /// </summary>
        /// <param name="res"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException">res is null</exception>
        public static Permission CreatePermission(Type res)
        {
            string typeString =
                String.Format(_ornamentMembershipPermissionsGenericpermissionOrnamentMembershipCore,
                    res.AssemblyQualifiedName);
            Type t = Type.GetType(typeString);
            if (t == null)
                throw new MemberShipPermissionException("Can not find the type with " + typeString);
            return (Permission)Activator.CreateInstance(t);
        }


        /// <summary>
        ///     Toes the operator.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public virtual T ToOperator<T>()
        {
            return (T)Enum.ToObject(typeof(T), Operator);
        }

        /// <summary>
        ///     Determines whether the specified operators has operator.
        /// </summary>
        /// <param name="operator">The operators.</param>
        /// <returns>
        ///     <c>true</c> if the specified operators has operator; otherwise, <c>false</c>.
        /// </returns>
        public virtual bool HasOperator(Enum @operator)
        {
            return HasOperator(Operator, @operator);
        }

        public override string ToString()
        {
            return Name;
        }
      
        public static bool HasOperator(int opVal, Enum @operator)
        {
            int intVal = Convert.ToInt32(@operator);
            if (opVal < intVal)
                return false;
            return (opVal & intVal) == intVal;
        }

        public static int[] FindValues(int @operator, Type operatorType)
        {
            Array vals = Enum.GetValues(operatorType);
            var result = new List<int>();
            foreach (object val in vals)
            {
                if (HasOperator(@operator, (Enum)val))
                {
                    result.Add(Convert.ToInt32(val));
                }
            }
            return result.ToArray();
        }
    }
}