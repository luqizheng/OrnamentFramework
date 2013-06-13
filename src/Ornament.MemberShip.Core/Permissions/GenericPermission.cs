namespace Ornament.MemberShip.Permissions
{
    public class GenericPermission<T> : Permission
    {
        public GenericPermission() { }
        public GenericPermission(T res)
            : base(res)
        {
        }

        public virtual new T Resource { get { return (T)base.Resource; } set { base.Resource = value; } }
    }
}