using System;

namespace Ornament.MemberShip.Permissions
{
    public interface IResourceOperatorManager<T>
    {
        Type GetOperatorType(T res);
        IResourceOperatorManager<T> Add(T resourceInstance, Type enumType);
    }
}