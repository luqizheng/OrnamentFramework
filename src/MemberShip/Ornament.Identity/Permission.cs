using System;

namespace Ornament.Identity
{
    public interface IPermission
    {
        string Name { get; set; }
        IdentityRole Role { get; set; }
        object Resource { get; set; }
        int Operator { get; set; }
    }
    public class Permission<T, TP> : IPermission
    {
        public string Name { get; set; }
        public IdentityRole Role { get; set; }
        public T Resource { get; set; }
        public TP Operator { get; set; }

        object IPermission.Resource { get { return Resource; } set { Resource = (T)value; } }
        int IPermission.Operator
        {
            get { return Convert.ToInt32(Operator); }
            set { Operator = (TP)Enum.ToObject(typeof(TP), value); }
        }
    }

    public class PermissionStore
    {
        
    }

}