using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHibernate;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.NHibernates;

namespace MemberShip.Test.NHibernateDaoTest
{
    /// <summary>
    /// Summary description for UserGroupDaoTest
    /// </summary>
    [TestClass]
    public class UserGroupDaoTest
    {
        private static User user1;
        private static User user2;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }

        [ClassInitialize]
        public static void MyClassInitialize(TestContext testContext)
        {
            SessionManager.Instance.UpdateSchema();
            ISession session = SessionManager.Instance.CurrentSession;

            user1 = new User("userGroupTest1", "123457");
            user2 = new User("userGroupTest2", "123457");
            session.Save(user1);
            session.Save(user2);
            SessionManager.Instance.CleanUp();
        }

        [ClassCleanup]
        public static void MyClassCleanup()
        {
        }

        

        [TestMethod]
        public void TestMappingSetting()
        {
            var userGroup = new UserGroup("Name");
            userGroup.Comment = "Comment";

            user1.AddTo(userGroup);
            user2.AddTo(userGroup);


            var userGroupDao = new UserGroupDao();
            userGroupDao.SaveOrUpdate(userGroup);


            Assert.AreNotEqual(Guid.Empty, userGroup.Id);
            UserGroup ug1 = userGroupDao.Get(userGroup.Id);
            Assert.AreEqual(userGroup.Name, ug1.Name);
            Assert.AreEqual(userGroup.Comment, ug1.Comment);
        }
    }
}