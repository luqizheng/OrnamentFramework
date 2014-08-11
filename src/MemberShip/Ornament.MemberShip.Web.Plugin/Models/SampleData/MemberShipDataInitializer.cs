using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using NHibernate.Hql.Ast.ANTLR;
using NHibernate.Mapping.ByCode;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.Web.DataInitializers;

namespace Ornament.MemberShip.Plugin.Models.SampleData
{
    public abstract class MemberShipDataInitializer : IDataInitializer
    {

        public abstract Permission[] Permissions { get; }

        public static T GetAll<T>()
        {
            var enumType = typeof(T);
            if (enumType.IsEnum)
            {
                throw new ArgumentOutOfRangeException("enumType", "Please input enum type");
            }
            int r = 0;
            foreach (var obj in Enum.GetValues(enumType))
            {
                r |= Convert.ToInt32(obj);
            }
            return (T)Enum.ToObject(typeof(Enum), r);
        }

        public static Permission CreatePermission<T>(T resObj, string permisionName, string remark, Enum eEnum)
        {
            IPermissionDao dao = OrnamentContext.DaoFactory.MemberShipFactory.CreatePermissionDao();

            Permission permission = dao.GetPermission(permisionName) ?? new GenericPermission<T>(resObj)
            {
                Name = permisionName,
                Remark = remark,
                Operator = Convert.ToInt32(eEnum)
            };
            dao.SaveOrUpdate(permission);
            return permission;
        }

        public static User CreateUser(string username, string password, string email
           , string question, string answord)
        {
            IUserDao userDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserDao();
            User user = userDao.GetByLoginId(username);
            if (user == null)
            {
                MembershipCreateStatus status;
                MembershipUser u = Membership.CreateUser(username, password, email, question,
                    answord, true, out status);
            }
            return userDao.GetByLoginId(username);
        }

        public static UserGroup CreateUserGroup(string name)
        {
            IUserGroupDao dao = OrnamentContext.DaoFactory.MemberShipFactory.CreateUserGroupDao();
            UserGroup ug = dao.GetByName(name);
            if (ug != null)
            {
                return ug;
            }
            return new UserGroup(name);
        }

        public static Role CreateRole(string name, string remark)
        {
            IRoleDao roleDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao();

            Role role = roleDao.GetByName(name) ?? new Role(name) { Remarks = remark };
            roleDao.SaveOrUpdate(role);

            return role;
        }

        public static Org CreateOrg(string name, string remark, Org parent)
        {
            IOrgDao orgDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateOrgDao();
            Org org = orgDao.GetByName(name, parent) ?? new Org(name) { Remarks = remark };
            parent.Childs.Add(org);
            orgDao.SaveOrUpdate(org);
            return org;
        }

        public static Org CreateRootOrg(string name, string remark)
        {
            IOrgDao orgDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateOrgDao();
            Org org = orgDao.GetRootOrgBy(name) ?? new Org(name) { Remarks = remark };
            orgDao.SaveOrUpdate(org);
            return org;
        }

        public abstract string Name { get; }
        public abstract bool IsNeedInitialize { get; }
        
        public virtual void CreateData()
        {
            
        }
    }
}