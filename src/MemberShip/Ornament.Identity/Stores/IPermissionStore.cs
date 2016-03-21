using System.Collections.Generic;

namespace Ornament.Identity.Stores
{
    public interface IPermissionStore
    {
        IList<Permission> Find(object userId);
    }

}