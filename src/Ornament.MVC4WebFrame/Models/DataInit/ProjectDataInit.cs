using System;
using System.Web.Security;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.Web;
using Ornament.Web.Models;
using QiProject.Operators;

namespace Ornament.MVCWebFrame.Models.DataInit
{
    public class ProjectDataInit : IDataInitializer
    {
        public const string Resource = "Product";

        #region IDataInitializer Members

        public string Name
        {
            get { return "Project init-data"; }
        }

        public bool IsFirstApplicationStart
        {
            get
            {
                return
                    OrnamentContext.Current.GetDaoFactory<IMemberShipFactory>().CreatePermissionDao().GetPermission(
                        "Product View") != null;
            }
        }

        public void CreateData()
        {
            ProductViewerPermission();
            ProductManagerPermission();
            CreateProjectMemberShip();
        }

        #endregion

        private void ProductViewerPermission()
        {
            Permission permission = CreatePermission(Resource, "Product View", "View all product", ProductOperator.Read);
            var role = new Role
                {
                    Name = "ProductViewer"
                };
            role.Permissions.Add(permission);
        }

        private void ProductManagerPermission()
        {
            Permission permission = CreatePermission(Resource, "Product Manager", "Manage all product",
                                                     ProductOperator.Delete);
            var role = new Role
                {
                    Name = "Product Manager"
                };
            role.Permissions.Add(permission);
        }

        protected Permission CreatePermission<T>(T resObj, string permisionName, string remark, Enum eEnum)
        {
            IPermissionDao dao = OrnamentContext.Current.GetDaoFactory<IMemberShipFactory>().CreatePermissionDao();

            Permission permission = dao.GetPermission(permisionName) ?? new GenericPermission<T>(resObj)
                {
                    Name = permisionName,
                    Remark = remark,
                    Operator = Convert.ToInt32(eEnum)
                };
            dao.SaveOrUpdate(permission);
            return permission;
        }

        private void CreateProjectMemberShip()
        {

            var developer = new[] { "leo", "kevin" };
            var tester = new[] { "tammy", "rex", "sylvia" };

            var developers = CreateOrGetUserGroup("Developers");
            var testers = CreateOrGetUserGroup("tester");


            foreach (var loginId in developer)
            {
                var user = CreateUser(loginId, "123456", loginId + "@synrevoice.com.cn", "question", "answer");
                user.AddToUserGroup(developers);
            }

            foreach (var loginId in tester)
            {
                var user = CreateUser(loginId, "123456", loginId + "@synrevoice.com.cn", "question", "answer");
                user.AddToUserGroup(testers);
            }
        }

        protected UserGroup CreateOrGetUserGroup(string name)
        {
            IUserGroupDao dao = OrnamentContext.Current.GetDaoFactory<IMemberShipFactory>().CreateUserGroupDao();
            UserGroup ug = dao.GetByName(name);
            if (ug != null)
            {
                return ug;
            }
            ug = new UserGroup(name);
            dao.SaveOrUpdate(ug);
            return ug;
        }

        private User CreateUser(string username, string password, string email
                                , string question, string answer)
        {
            IUserDao userDao = OrnamentContext.Current.GetDaoFactory<IMemberShipFactory>().CreateUserDao();
            User user = userDao.GetByLoginId(username);
            if (user == null)
            {
                MembershipCreateStatus status;
                MembershipUser u = System.Web.Security.Membership.CreateUser(username, password, email, question,
                                                                             answer, true, out status);
            }
            return userDao.GetByLoginId(username);
        }
    }
}