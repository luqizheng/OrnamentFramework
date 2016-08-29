using System.Collections.Generic;
using Ornament.Domain.Stores;

namespace Ornament.Identity.Enterprise.Stores
{
    public interface IOrgStore : IStore<Org, int>
    {
        IEnumerable<Org> GetOrgs(Org parentOrg);
    }
}