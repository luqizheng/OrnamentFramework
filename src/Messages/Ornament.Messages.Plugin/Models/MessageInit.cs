using System;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.Messages.Notification;
using Ornament.Web.DataInitializers;

// ReSharper disable CheckNamespace

namespace Ornament.Web
// ReSharper restore CheckNamespace
{
    public class MessageInit : IDataInitializer
    {
        public string NotifyTemplatePermissionName = "Notify Template Manager";

        public string Name
        {
            get { return "Message init."; }
        }

        public bool IsNeedInitialize
        {
            get { return true; }
        }

        public void CreateData()
        {
            NotifyMessageTemplate a = OrnamentContext.Configuration.MessagesConfig.AccountChanged;
            NotifyMessageTemplate b = OrnamentContext.Configuration.MessagesConfig.VerifyEmailAddress;
            NotifyMessageTemplate c = OrnamentContext.Configuration.MessagesConfig.RegistAccount;
            NotifyMessageTemplate d = OrnamentContext.Configuration.MessagesConfig.RetrivePassword;


            Permission notifyTemplatePermission = CreatePermission("Template", "NotifyTemplate",
                "Notify Message Templage", NotifyTemplateOperator.Delete);
            Role role = GetRole(notifyTemplatePermission);
        }

        protected Role GetRole(params Permission[] permissions)
        {
            IRoleDao roleDao = OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao();
            Role role = roleDao.GetByName("NotifyTemplateManager") ?? new Role("NotifyTemplateManager");
            if (role.IsTransient())
            {
                foreach (Permission p in permissions)
                {
                    role.Permissions.Add(p);
                }
                roleDao.SaveOrUpdate(role);
            }
            return role;
        }

        private Permission CreatePermission<T>(T resObj, string permisionName, string remark, Enum eEnum)
        {
            IPermissionDao dao = OrnamentContext.DaoFactory.MemberShipFactory.CreatePermissionDao();

            Permission permission = dao.GetPermission(permisionName) ?? new GenericPermission<T>(resObj)
            {
                Name = permisionName,
                Remark = remark,
                Operator = Convert.ToInt32(eEnum)
            };
            if (permission.IsTransient())
            {
                dao.SaveOrUpdate(permission);
            }
            return permission;
        }
    }

}