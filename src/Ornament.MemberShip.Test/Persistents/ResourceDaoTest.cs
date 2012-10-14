using System;
using MemberShip.Test.helper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHibernate.Tool.hbm2ddl;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.MemberShip.Permissions;
using Ornament.NHibernates;

namespace MemberShip.Test.Persistents
{
    /// <summary>
    /// Summary description for Permission
    /// </summary>
    [TestClass]
    public class ResourceDaoTest
    {
        private const string Columns =
            @"Id,name,comment,loginId,Email,passwordAnswer,PasswordQuestion,
Password,CreateTime,UpdateTime,IsLockout,LastLockoutDate,LastActivityDate,LastLoginDate";

        private const string EmailHostName = "@test.net";

        private static readonly DateTime LastActivityDate = new DateTime(2099, 1, 1);

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }

        #region Additional test attributes

        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        [ClassInitialize]
        public static void MyClassInitialize(TestContext testContext)
        {
            SessionManager.Instance.UpdateSchema();

            var driver = new DBDriver(SessionManager.Instance.CurrentSession.Connection);

            Guid userId1 = Guid.NewGuid();
            Guid userId2 = Guid.NewGuid();
            Guid roleId = Guid.NewGuid();
            MyClassCleanup();
            DataHelper.CreateInstance().Initailze(driver)
                .Insert(UnitTestHelper.RoleTable)
                .Columns(new[] { "Id", "Name", "Comment" })
                .Values(new object[] { roleId, "role1", "comment" })
                .NewCommand()
                .Insert(UnitTestHelper.UserTable)
                .Columns(new[] { "Id", "loginid", "UpdateTime", "LastActivityDate", "Email" })
                .Values
                (
                    new object[] { userId1, "PermissionUserDaoTest1", DateTime.Now, LastActivityDate, "Email1" + EmailHostName },
                    new object[] { userId2, "PermissionUserDaoTest2", DateTime.Now, LastActivityDate, "Email2" + EmailHostName }
                )
                .NewCommand()
                .Insert(UnitTestHelper.UserRoleRelation)
                .Columns("RoleId", "UserId")
                .Values(new object[] { roleId, userId1 }, new object[] { roleId, userId2 })
                .Execute();
            SessionManager.Instance.CleanUp();
        }

        //
        // Use ClassCleanup to run code after all tests in a class have run
        [ClassCleanup]
        public static void MyClassCleanup()
        {
            var driver = new DBDriver(SessionManager.Instance.CurrentSession.Connection);
            DataHelper.CreateInstance().Initailze(driver)
                .Delete(UnitTestHelper.UserRoleRelation).Execute()
                .Delete("Ornament_MemberShip_User").Execute()
                .Delete("Ornament_MemberShip_Role").Execute();
        }



        #endregion

        [TestMethod]
        public void TestMethod1()
        {
            string value = "user";
            var s = new GenericResourceInfo<string>("user", typeof(UserOperator));

            var dao = new ResourceDao();
            dao.SaveOrUpdate(s);

        }
    }
}