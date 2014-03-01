using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IOrgDao : IDao<string, Org>
    {
        IList<Org> GetRootOrgs();

        /// <summary>
        ///     检查当前的组织是否正在被<see cref="User" />使用
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
        bool InUse(string orgId);

        Org GetByName(string name, Org parent);
        Org GetRootOrgBy(string name);

        IEnumerable<Org> Find(string name, int pageIndex, int pageSize);
        IEnumerable<Org> GetOrgs(string[] ids);
    }
}