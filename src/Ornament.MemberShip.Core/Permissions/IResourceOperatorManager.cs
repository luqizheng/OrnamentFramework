using System;

namespace Ornament.MemberShip.Permissions
{
    public interface IResourceOperatorManager<T>
    {
        Type this[T res] { get; }
        IResourceOperatorManager<T> Add(T resourceInstance, Type enumType);
    }
}