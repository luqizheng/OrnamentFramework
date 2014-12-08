using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Configuration.Provider;
using System.Linq;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.NHibernateExtender;

namespace Ornament.Web.MemberShips
{
    public sealed class RoleProvider : System.Web.Security.RoleProvider
    {
        private string _applicationName;

        public override string ApplicationName
        {
            get { return _applicationName; }
            set { _applicationName = value; }
        }

        public override void Initialize(string name, NameValueCollection config)
        {
            if (name == null)
                throw new ArgumentException("name");
            _applicationName = name;
            base.Initialize(name, config);
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            if (username == "admin")
                return true;
            SessionWrapper s = SessionManager.GetSessionWrapper();

            try
            {
                User u = OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao()
                    .GetByLoginId(username);
                IQueryable<Role> result = from role in OrnamentContext.DaoFactory.MemberShipDaoFactory.Roles
                                          where role.Name == roleName
                                          select role;
                if (!result.Any())
                    return false;
                s.Commit();
                return u.InRole(result.First());
            }
            finally
            {
                s.Close();
            }
        }

        public override string[] GetRolesForUser(string username)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();

            try
            {
                IEnumerable<Role> roless;

                if (username != "admin")
                {
                    User userInfo =
                        OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao().GetByLoginId(username);
                    roless = userInfo.GetAllRoles();
                }
                else
                {
                    roless = OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateRoleDao().GetAll();
                }

                return (from a in roless select a.Name).ToArray();
            }
            finally
            {
                sessionWrapper.Close();
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        /// <exception cref="ProviderException"></exception>
        public override void CreateRole(string roleName)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();

            try
            {
                var role = new Role(roleName);
                OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateRoleDao().Save(role);
            }
            catch (MemberShipException ex)
            {
                throw new ProviderException(ex.Message, ex);
            }
            finally
            {
                sessionWrapper.Close();
            }
        }

        /// <summary>
        ///     ������Դ���Ƴ������õ� applicationName �Ľ�ɫ��
        /// </summary>
        /// <param name="roleName"></param>
        /// <param name="throwOnPopulatedRole">���Ϊ true������ roleName ����һ��������Աʱ�����쳣�����Ҳ�ɾ�� roleName��</param>
        /// <returns></returns>
        /// <exception cref="ProviderException">more than one user reference role named</exception>
        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();

            try
            {
                IRoleDao roleDao = OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateRoleDao();
                if (throwOnPopulatedRole)
                {
                    if (roleDao.IsUsesInRole(roleName))
                        throw new ProviderException("more than one user reference role named " + roleName);
                }
                roleDao.Delete(new Role(roleName));
                return true;
            }
            catch
            {
                return false;
            }
            finally
            {
                s.Close();

            }
        }

        public override bool RoleExists(string roleName)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();
            try
            {
                IQueryable<Role> reuslt = from role in OrnamentContext.DaoFactory.MemberShipDaoFactory.Roles
                                          where role.Name == roleName
                                          select role;
                return reuslt.Count() != 0;
            }
            finally
            {
                s.Close();
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="usernames"></param>
        /// <param name="roleNames"></param>
        /// <exception cref="ArgumentNullException">usernames or roleNames is null or length equal 0</exception>
        /// <exception cref="ProviderException">roleNames isn't exist</exception>
        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            if (usernames == null || usernames.Length == 0)
                throw new ArgumentNullException("usernames");
            if (roleNames == null || roleNames.Length == 0)
                throw new ArgumentNullException("roleNames");

            SessionWrapper s = SessionManager.GetSessionWrapper();

            try
            {
                ReadOnlyCollection<Role> roles =
                    OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateRoleDao().GetRolesByName(roleNames);

                if (roleNames.Length != roleNames.Length)
                {
                    var table = new Hashtable();
                    foreach (string roleName in roleNames)
                        table.Add(roleName, null);
                    var noExistRoles = new string[roleNames.Length - roles.Count];
                    int index = 0;
                    foreach (Role role in roles)
                    {
                        if (!table.ContainsKey(role.Name))
                        {
                            noExistRoles[index] = role.Name;
                            index++;
                        }
                    }
                    throw new ProviderException(string.Join(",", noExistRoles) + " not exist");
                }

                foreach (
                    User user in
                        OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao().GetUsers(usernames))
                {
                    foreach (string roleName in roleNames)
                    {
                        user.Roles.Add(new Role(roleName));
                    }
                }
            }
            finally
            {
                s.Close();
            }
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();

            try
            {
                IUserDao userDao = OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao();
                ReadOnlyCollection<Role> roles =
                    OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateRoleDao().GetRolesByName(roleNames);
                IList<User> users = userDao.GetUsers(usernames);
                foreach (User u in users)
                {
                    u.Roles.Clear();
                    userDao.Save(u);
                }
            }
            finally
            {
                s.Close();
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public override string[] GetUsersInRole(string roleName)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();

            try
            {
                IList<User> users =
                    OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao().GetUsersInRole(roleName);
                return UserssToString(users);
            }
            finally
            {
                s.Close();
            }
        }

        public override string[] GetAllRoles()
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();

            try
            {
                IList<Role> roles =
                    OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateRoleDao().GetAll();
                var result = new string[roles.Count];
                for (int i = 0; i < result.Length; i++)
                {
                    Role role = roles[i];
                    result[i] = role.Name;
                }
                return result;
            }
            finally
            {
                s.Close();
            }
        }

        /// <summary>
        ///     ��ȡ����ĳ����ɫ����ָ�����û�����ƥ����û��������顣
        /// </summary>
        /// <param name="roleName">��Ϊ������Χ�Ľ�ɫ��</param>
        /// <param name="usernameToMatch">Ҫ�������û���</param>
        /// <returns></returns>
        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            SessionWrapper sessionWrapper = SessionManager.GetSessionWrapper();
            try
            {
                IList<User> uses =
                    OrnamentContext.DaoFactory.MemberShipDaoFactory.CreateUserDao().FindUsersInRole(
                        roleName,
                        usernameToMatch);
                var result = new string[uses.Count];
                for (int i = 0; i < uses.Count; i++)
                {
                    result[i] = uses[i].LoginId;
                }
                return result;
            }
            finally
            {
                sessionWrapper.Close();
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="users"></param>
        /// <returns></returns>
        private static string[] UserssToString(IList<User> users)
        {
            SessionWrapper wrapper = SessionManager.GetSessionWrapper();

            try
            {
                //throw new NotImplementedException("UserssToString");
                var s = new string[users.Count];
                for (int i = 0; i < users.Count; i++)
                {
                    s[i] = users[i].LoginId;
                }
                return s;
            }
            finally
            {
                wrapper.Close();
            }
        }
    }
}