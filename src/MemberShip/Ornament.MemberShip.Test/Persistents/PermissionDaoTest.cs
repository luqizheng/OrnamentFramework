using System;
using System.Collections.Generic;
using MemberShip.Test.helper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.MemberShip.Permissions;
using Ornament.NHibernates;

namespace MemberShip.Test
{
    /// <summary>
    ///This is a test class for PermissionDaoTest and is intended
    ///to contain all PermissionDaoTest Unit Tests
    ///</summary>
    [TestClass]
    public class PermissionDaoTest
    {
        private const string Columns =
            @"name,comment,loginId,Email,passwordAnswer,PasswordQuestion,
Password,CreateTime,UpdateTime,IsLockout,LastLockoutDate,LastActivityDate,LastLoginDate";

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }

        #region Additional test attributes

        // 
        //You can use the following additional attributes as you write your tests:
        //
        //Use ClassInitialize to run code before running the first test in the class
        [ClassInitialize]
        public static void MyClassInitialize(TestContext testContext)
        {
            UnitTestHelper.Init();
            Guid userId1 = Guid.NewGuid();
            Guid userId2 = Guid.NewGuid();
            Guid roleId1 = Guid.NewGuid();
            Guid roleId2 = Guid.NewGuid();
            Guid permissionId = Guid.NewGuid();
            Guid normalId = Guid.NewGuid();
            Guid resourceInfoId = Guid.NewGuid();
            DataHelper.CreateInstance().Initailze(UnitTestHelper.EasyDriver())
                .Insert(UnitTestHelper.RoleTable)
                .Columns("Id", "Name", "Comment")
                .Values(
                    new object[] { roleId1, "permissionDao_role1", "comment1" },
                    new object[] { roleId2, "permissionDao_role2", "comment2" }
                )
                .NewCommand()
                .Insert(UnitTestHelper.UserTable)
                .Columns(new[] { "id", "loginid", "UpdateTime", "LastActivityDate", "Email" })
                .Values
                (
                    new object[] { userId1, "permissionDao_loginid1", DateTime.Now, DateTime.Now, "Email1@123.com" },
                    new object[] { userId2, "permissionDao_loginid2", DateTime.Now, DateTime.Now, "Email2@123.com" }
                ).NewCommand()
                .Insert(UnitTestHelper.UserRoleRelation)
                .Columns(new[] { "roleId", "userid" })
                .Values(
                    new object[] { roleId1, userId1 },
                    new object[] { roleId2, userId1 },
                    new object[] { roleId1, userId2 }
                )
                .NewCommand()
                .Insert(UnitTestHelper.ResourceTable)
                .Values(
                    new object[] { resourceInfoId, "kind", "角色", typeof(RoleOperator).FullName, "Role" }
                ).NewCommand()
                .Insert(UnitTestHelper.Permission)
                .Values(
                    new object[]
                        {
                            permissionId, "管理员", "角色管理员", Convert.ToInt32(RoleOperator.Modify | RoleOperator.Assign),
                            resourceInfoId
                        },
                    new object[]
                        {
                            normalId, "普通", "角色观察者", Convert.ToInt32(RoleOperator.Read), resourceInfoId,
                        }
                ).NewCommand()
                .Insert(UnitTestHelper.PermissionRoleRelation)
                .Values(
                    new object[] { roleId1, permissionId },
                    new object[] { roleId2, normalId }
                )
                .Execute();
        }

        [ClassCleanup]
        public static
            void MyTestCleanup()
        {
           
            SessionManager.Instance.CleanUp();
          
            ;


        }

        [TestCleanup]
        public void End()
        {
            SessionManager.Instance.CleanUp();
            DataHelper.CreateInstance().Initailze(new DBDriver(SessionManager.Instance.CurrentSession.Connection))
               .Delete(UnitTestHelper.PermissionRoleRelation).NewCommand()
               .Delete(UnitTestHelper.UserRoleRelation).NewCommand()
               .Delete(UnitTestHelper.UserTable).NewCommand()
               .Delete(UnitTestHelper.RoleTable).NewCommand()
               .Delete(UnitTestHelper.Permission).NewCommand()
               .Delete(UnitTestHelper.ResourceTable)
               .Execute();
            SessionManager.Instance.CleanUp();
        }

        #endregion

        /// <summary>
        ///A test for GetAllPermissions
        ///</summary>
        [TestMethod]
        public void GetAllPermissionsTest()
        {
            var target = new PermissionDao();
            string loginid = "permissionDao_loginid1";
            string resourceInfoId = "Role";

            IList<Permission> actual = target.GetAllPermissions(loginid, resourceInfoId);
            Assert.AreEqual(2, actual.Count);
        }
    }
}