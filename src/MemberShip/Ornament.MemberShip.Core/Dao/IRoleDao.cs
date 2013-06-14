using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IRoleDao : IDao<string, Role>
    {
        IQueryable<Role> Roles { get; }
        /// <summary>
        /// ���ݽ�ɫId��ȡ��ɫ
        /// </summary>
        /// <param name="roleIds">��ɫid����</param>
        /// <returns>��ɫ���󼯺�</returns>
        /// <remarks>
        /// ���û��ƥ��ļ��ϣ�����CountΪ0�ļ���
        /// </remarks>
        ReadOnlyCollection<Role> GetRolesByName(string[] roleIds);

        IEnumerable<Role> GetRolesByIds(string[] ids);
        /// <summary>
        /// ��<see cref="roleIds"/>���ҵ�û��ʹ�õ�role,��ʹ�õ�role������inUseRole��
        /// </summary>
        /// <param name="roleIds"></param>
        /// <param name="unuseRoles"></param>
        /// <returns></returns>
        IList<Role> GetInUseRoles(string[] roleIds, out string[] unuseRoles);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        bool IsUsesInRole(string roleName);



        /// <summary>
        /// 
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        ReadOnlyCollection<Role> GetRolesByName(string loginId);



        Role GetByName(string roleName);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="currentPage">start 0</param>
        /// <returns></returns>
        IList<Role> Find(int pageSize, int currentPage);

        IList<Role> Find(string roleName, int pageIndex, int pageSize);
    }
}