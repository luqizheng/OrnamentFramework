using System;
using System.Collections.Generic;
using MemberShip.Test.helper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHibernate.Context;
using Ornament;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.NHibernates;

namespace MemberShip.Test.Persistents
{
    /// <summary>
    /// Summary description for UserDaoTest
    /// </summary>
    [TestClass]
    public class UserDaoTest
    {
        private const string Columns =
            @"Id,name,comment,loginId,Email,passwordAnswer,PasswordQuestion,
Password,CreateTime,UpdateTime,IsLockout,LastLockoutDate,LastActivityDate,LastLoginDate";

        private const string EmailHostName = "@test.net";

        private static readonly DateTime LastActivityDate = new DateTime(2099, 1, 1);

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
                .Columns(new[] {"Id", "Name", "Comment"})
                .Values(new object[] {roleId, "role1", "comment"})
                .NewCommand()
                .Insert(UnitTestHelper.UserTable)
                .Columns(new[] {"Id", "loginid", "UpdateTime", "LastActivityDate", "Email"})
                .Values
                (
                    new object[] {userId1, "UserDaoTest1", DateTime.Now, LastActivityDate, "Email1" + EmailHostName},
                    new object[] {userId2, "UserDaoTest2", DateTime.Now, LastActivityDate, "Email2" + EmailHostName}
                )
                .NewCommand()
                .Insert(UnitTestHelper.UserRoleRelation)
                .Columns("RoleId", "UserId")
                .Values(new object[] {roleId, userId1}, new object[] {roleId, userId2})
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
                .Delete(UnitTestHelper.UserRoleRelation).Execute().Delete("Ornament_MemberShip_User").Execute()
                .Delete("Ornament_MemberShip_Role").Execute();
            CurrentSessionContext.Unbind(SessionManager.Instance.GetSessionFactory()).Close();
        }

        #endregion

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }


        [TestMethod]
        public void SaveOrUpdate()
        {
            var user = new User("UserDaoTest")
                           {
                               Email = "abC@abc.com",
                           };
            user.Information.Name = "userName";
            user.Comment = "comment";
            var t = new UserDao();
            t.SaveOrUpdate(user);
            SessionManager.Instance.CurrentSession.Flush();

            t.Delete(user);
        }

        [TestMethod]
        public void LoadAndSave()
        {
            User user = (new UserDao()).Get("UserDaoTest1");
            user.Email = "ac@ac.com";
            (new UserDao()).SaveOrUpdate(user);
        }

        /// <summary>
        ///A test for Load
        ///</summary>
        [TestMethod]
        public void LoadTest()
        {
            var createTime = new DateTime(1980, 1, 1);
            var updateTime = new DateTime(1981, 1, 1);
            var lastLockoutDate = new DateTime(1982, 1, 1);
            var lastActivityDate = new DateTime(1983, 1, 1);
            var lastLoginDate = new DateTime(1984, 1, 1);
            string name = "name1";
            const string loginid1 = "login";

            const string email = "emial@email.com";
            string comment = "comment1";
            DataHelper.CreateInstance().Initailze(new DBDriver(SessionManager.Instance.CurrentSession.Connection))
                .Insert("Ornament_Membership_user")
                .Columns(Columns, ',')
                .Values(
                    new object[]
                        {
                            Guid.NewGuid(), name, comment, loginid1, email, "answer1".Md5Encrypt32(),
                            "passwordQuestion",
                            "123456", createTime, updateTime, 1, lastLockoutDate, lastActivityDate, lastLoginDate
                        })
                .Execute();
            SessionManager.Instance.CleanUp();
            var target = new UserDao();
            string loginId = loginid1;
            User actual = target.Get(loginId);
            Assert.AreEqual(loginid1, actual.LoginId);
            Assert.AreEqual(email, actual.Email);
            Assert.AreEqual(name, actual.Information.Name);
            Assert.AreEqual(comment, actual.Comment);
            
            target.Delete(actual);
            SessionManager.Instance.CurrentSession.Flush();
            
        }

        /// <summary>
        ///A test for GetUsersInRole
        ///</summary>
        [TestMethod]
        public void GetUsersInRoleTest()
        {
            var target = new UserDao();
            string roleId = "role1";
            IList<User> actual = target.GetUsersInRole(roleId);
            Assert.AreEqual(2, actual.Count);
            User actualuser = actual[0];
            Assert.AreEqual("UserDaoTest1", actualuser.LoginId);
            actualuser = actual[1];
            Assert.AreEqual("UserDaoTest2", actualuser.LoginId);
        }

        /// <summary>
        ///A test for GetUsers
        ///</summary>
        [TestMethod]
        public void GetUsersTest()
        {
            var target = new UserDao();
            var loginIds = new[] {"UserDaoTest1", "UserDaoTest2"};
            IList<User> actual;
            actual = target.GetUsers(loginIds);
            Assert.AreEqual("UserDaoTest1", actual[0].LoginId);
            Assert.AreEqual("UserDaoTest2", actual[1].LoginId);
        }

        /// <summary>
        ///A test for GetUserByEmail
        ///</summary>
        [TestMethod]
        public void GetUserByEmailTest()
        {
            var target = new UserDao();

            User expected = target.Get("UserDaoTest1");
            User actual = target.GetUserByEmail("Email1" + EmailHostName);
            Assert.IsNotNull(actual);
            Assert.AreEqual(expected.Email, actual.Email);
        }

        /// <summary>
        ///A test for GetActivityDateNumber
        ///</summary>
        [TestMethod]
        public void GetActivityDateNumberTest()
        {
            var target = new UserDao();

            int expected = 2;
            int actual;
            actual = target.GetActivityDateNumber(LastActivityDate);

            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///A test for Get
        ///</summary>
        [TestMethod]
        public void GetTest()
        {
            var target = new UserDao();
            string id = "UserDaoTest1";
            var expected = new User("UserDaoTest1");
            User actual;
            actual = target.Get(id);
            Assert.AreEqual(expected.LoginId, actual.LoginId);
        }

        /// <summary>
        ///A test for FindUsersInRole
        ///</summary>
        [TestMethod]
        public void FindUsersInRoleTest()
        {
            var target = new UserDao();
            string roleId = "role1";
            string loginMatch = "UserDaoTest%";

            IList<User> actual;
            actual = target.FindUsersInRole(roleId, loginMatch);
            Assert.AreEqual(2, actual.Count);
        }

        /// <summary>
        ///A test for FindUsersByName
        ///</summary>
        [TestMethod]
        public void FindUsersByNameTest()
        {
            var target = new UserDao();
            string matchLoginId = "UserDaoTest%";
            int pageIndex = 0;
            int pageSize = 1;
            IList<User> actual;
            actual = target.FindUsersByName(matchLoginId, pageIndex, pageSize);
            Assert.AreEqual(1, actual.Count);
        }

        /// <summary>
        ///A test for FindUsersByEmail
        ///</summary>
        [TestMethod]
        public void FindUsersByEmailTest()
        {
            var target = new UserDao();
            string emailToMatch = EmailHostName;
            int pageIndex = 0;
            int pageSize = 1;

            IList<User> actual;
            actual = target.FindUsersByEmail("%" + emailToMatch, pageIndex, pageSize);
            Assert.AreEqual(1, actual.Count);
        }

        /// <summary>
        ///A test for FindAll
        ///</summary>
        [TestMethod]
        public void FindAllTest()
        {
            var target = new UserDao();
            int pageIndex = 0;
            int pageSize = 1;
            IList<User> actual;
            actual = target.FindAll(pageIndex, pageSize);
            Assert.AreEqual(1, actual.Count);
        }
    }
}