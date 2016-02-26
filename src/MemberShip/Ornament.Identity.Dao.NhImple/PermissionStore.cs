using Ornament.Identity.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ornament.NHibernate;
using Ornament.Domain.Uow;

namespace Ornament.Identity.Dao
{
    public class PermissionStore<T, TUser, TUserId, TRole, TId>
        : Store<T, int>, IPermissionStore<T, TUser, TUserId, TRole, TId>
        where T : Permission<TRole, TId>
        where TRole : IdentityRole<TId>
        where TUser : IdentityUser<TUserId, TRole, TId>

    {
        public PermissionStore(IUnitOfWork context):base(context)
        {

        }
        public IList<T> GetByUser(TUser user)
        {
            throw new NotImplementedException();
        }
    }
}
