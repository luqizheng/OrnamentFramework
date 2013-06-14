using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using MemberShip.Test.helper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHibernate.Context;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.NHibernates;

namespace MemberShip.Test.NHibernateDaoTest
{
    /// <summary>
    ///This is a test class for RoleDaoTest and is intended
    ///to contain all RoleDaoTest Unit Tests
    ///</summary>
    [TestClass]
    public class RoleDaoTest
    {
        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }

        #region Additional test attributes

        [ClassInitialize]
        public static void MyClassInitialize(TestContext testContext)
        {
            UnitTestHelper.Init();
            var driver = UnitTestHelper.EasyDriver();

            Guid role1 = Guid.NewGuid();
            Guid role2 = Guid.NewGuid();
            Guid userId = Guid.NewGuid();


            DataHelper.CreateInstance().Initailze(driver)
                .Insert(UnitTestHelper.RoleTable)
                .Columns("Id", "Name", "Comment")
                .Values(new object[] { role1, "role1", "role1Comment" },
                        new object[] { role2, "role2", "role2Comment" })
                .Execute();

            DataHelper.CreateInstance().Initailze(driver)
                .Insert(UnitTestHelper.UserTable)
                .Columns(new[] { "id", "loginid", "UpdateTime" })
                .Values(new object[] { userId, "loginid", DateTime.Now })
                .NewCommand()
                .Insert(UnitTestHelper.UserRoleRelation)
                .Columns(new[] { "userid", "roleid" })
                .Values(new object[] { userId, role1 }).Execute();
            //SessionManager.Instance.CleanUp();
        }

        [ClassCleanup]
        public static void MyClassCleanup()
        {
            var driver = new DBDriver(SessionManager.Instance.CurrentSession.Connection);
            DataHelper.CreateInstance().Initailze(driver)
                .Delete(UnitTestHelper.UserRoleRelation)
                .NewCommand()
                .Delete(UnitTestHelper.UserTable).NewCommand()
                .Delete(UnitTestHelper.RoleTable).Execute();


        }
        [TestCleanup]
        public void End()
        {
            CurrentSessionContext.Unbind(SessionManager.Instance.GetSessionFactory());
        }

        #endregion

        /// <summary>
        ///A test for IsUsesInRole
        ///</summary>
        [TestMethod]
        public void IsUsersInRoleTest()
        {
            var target = new RoleDao();
            string roleName = "role1";
            bool expected = true;
            bool actual;
            actual = target.IsUsesInRole(roleName);
            Assert.AreEqual(expected, actual);


            roleName = "no_exist_role";
            expected = false;
            actual = target.IsUsesInRole(roleName);
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for GetRoles
        ///</summary>
        [TestMethod]
        public void GetRolesTest()
        {
            var target = new RoleDao();
            var roleId = new[] { "role1", "role2" };
            ReadOnlyCollection<Role> actual;
            actual = target.GetRoles(roleId);
            Assert.AreEqual(2, actual.Count);
        }

        /// <summary>
        ///A test for GetAll
        ///</summary>
        [TestMethod]
        public void GetAllTest()
        {
            var target = new RoleDao();
            ReadOnlyCollection<Role> actual;
            actual = target.GetAll();
            Assert.AreEqual(2, actual.Count);
        }

        /// <summary>
        ///A test for Get
        ///</summary>
        [TestMethod]
        public void GeByNametTest()
        {
            var target = new RoleDao();
            string id = "role1";
            Role actual;
            actual = target.GetByName(id);
            Assert.AreEqual(id, actual.Name);
        }

        /// <summary>
        ///A test for FindAll
        ///</summary>
        [TestMethod]
        public void FindAllTest()
        {
            var target = new RoleDao();
            int startRow = 0;
            int pageSize = 1;
            IList<Role> actual;
            actual = target.FindAll(startRow, pageSize);
            Assert.AreEqual(1, actual.Count);
        }
    }
}