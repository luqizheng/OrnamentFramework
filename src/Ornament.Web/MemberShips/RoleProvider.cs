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
            s.InitSession();
            try
            {
                User u = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao()
                    .GetByLoginId(username);
                IQueryable<Role> result = from role in OrnamentContext.DaoFactory.MemberShipFactory.Roles
                    where role.Name == roleName
                    select role;
                if (!result.Any())
                    return false;
                return u.InRole(result.First());
            }
            finally
            {
                s.Close(true);
            }
        }

        public override string[] GetRolesForUser(string username)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();
            bool openTrue = s.InitSession();
            try
            {
                IEnumerable<Role> roless;

                if (username != "admin")
                {
                    User userInfo =
                        OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().GetByLoginId(username);
                    roless = userInfo.GetAllRoles();
                }
                else
                {
                    roless = OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao().GetAll();
                }

                return (from a in roless select a.Name).ToArray();
            }
            finally
            {
                if (openTrue)
                    s.Close(true);
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        /// <exception cref="ProviderException"></exception>
        public override void CreateRole(string roleName)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();
            bool openSessionCurrentThread = s.InitSession();
            try
            {
                var role = new Role(roleName);
                OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao().Save(role);
            }
            catch (MemberShipException ex)
            {
                throw new ProviderException(ex.Message, ex);
            }
            finally
            {
                if (openSessionCurrentThread)
                {
                    s.Close(true);
                }
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
            bool openSessionCurrentThread = s.InitSession();
            try
            {
                IRoleDao roleDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao();
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
                if (openSessionCurrentThread)
                {
                    s.Close(true);
                }
            }
        }

        public override bool RoleExists(string roleName)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();
            bool opened = s.InitSession();
            try
            {
                IQueryable<Role> reuslt = from role in OrnamentContext.DaoFactory.MemberShipFactory.Roles
                    where role.Name == roleName
                    select role;
                return reuslt.Count() != 0;
            }
            finally
            {
                if (opened)
                    s.Close(true);
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
            bool openSessionCurrentThread = s.InitSession();
            try
            {
                ReadOnlyCollection<Role> roles =
                    OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao().GetRolesByName(roleNames);

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
                        OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().GetUsers(usernames))
                {
                    foreach (string roleName in roleNames)
                    {
                        user.Roles.Add(new Role(roleName));
                    }
                }
            }
            finally
            {
                if (openSessionCurrentThread)
                {
                    s.Close(true);
                }
            }
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();
            bool openSessionCurrentThread = s.InitSession();
            try
            {
                IUserDao userDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao();
                ReadOnlyCollection<Role> roles =
                    OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao().GetRolesByName(roleNames);
                IList<User> users = userDao.GetUsers(usernames);
                foreach (User u in users)
                {
                    u.Roles.Clear();
                    userDao.Save(u);
                }
            }
            finally
            {
                if (openSessionCurrentThread)
                {
                    s.Close(true);
                }
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public override string[] GetUsersInRole(string roleName)
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();
            bool openSessionCurrentThread = s.InitSession();
            try
            {
                IList<User> users =
                    OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().GetUsersInRole(roleName);
                return UserssToString(users);
            }
            finally
            {
                if (openSessionCurrentThread)
                {
                    s.Close(true);
                }
            }
        }

        public override string[] GetAllRoles()
        {
            SessionWrapper s = SessionManager.GetSessionWrapper();
            bool init = s.InitSession();
            try
            {
                IList<Role> roles =
                    OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao().GetAll();
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
                if (init)
                {
                    s.Close(true);
                }
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
            SessionWrapper s = SessionManager.GetSessionWrapper();
            bool init = s.InitSession();
            try
            {
                IList<User> uses =
                    OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao().FindUsersInRole(
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
                if (init)
                {
                    s.Close(true);
                }
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="users"></param>
        /// <returns></returns>
        private static string[] UserssToString(IList<User> users)
        {
            SessionWrapper sessionSegment = SessionManager.GetSessionWrapper();
            bool init = sessionSegment.InitSession();
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
                if (init)
                {
                    sessionSegment.Close(true);
                }
            }
        }
    }
}