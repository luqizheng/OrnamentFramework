using System.Collections.Generic;

namespace Ornament.Identity.Stores
{
    public interface IPermissionStore<TRole>
    {
        IList<Permission<TRole>> Find(object userId);
    }

}