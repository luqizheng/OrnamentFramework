﻿using System.Collections.Generic;
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

        /// <summary>
        ///     根据名字获取第一层组织的
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        Org GetRootOrgBy(string name);

        /// <summary>
        ///     查找名字
        /// </summary>
        /// <param name="name"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        IEnumerable<Org> Find(string name, int pageIndex, int pageSize);

        IEnumerable<Org> Find(Org scope, string name, int pageIndex, int pageSize);
        IEnumerable<Org> GetOrgs(string[] ids);

        /// <summary>
        ///     查找下级组织单元
        /// </summary>
        /// <param name="org"></param>
        /// <returns></returns>
        IEnumerable<Org> GetSubOrgs(Org org);
    }
}