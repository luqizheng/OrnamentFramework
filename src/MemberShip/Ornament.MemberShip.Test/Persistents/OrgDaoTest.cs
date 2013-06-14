using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHibernate.Tool.hbm2ddl;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.NHibernates;

namespace MemberShip.Test.Persistents
{
    /// <summary>
    ///This is a test class for OrgDaoTest and is intended
    ///to contain all OrgDaoTest Unit Tests
    ///</summary>
    [TestClass]
    public class OrgDaoTest
    {
        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }

        #region Additional test attributes

        private static readonly Guid org1Id = Guid.NewGuid();

        [ClassInitialize]
        public static void MyClassInitialize(TestContext testContext)
        {
            SessionManager.Instance.UpdateSchema();
        }

        [ClassCleanup]
        public static void MyClassCleanup()
        {
            var driver = new DBDriver(SessionManager.Instance.CurrentSession.Connection);
            DataHelper.CreateInstance().Initailze(driver).Delete("Ornament_MemberShip_Member").
                Execute();
        }

        #endregion

        [TestMethod]
        public void TestMappingSetting()
        {
            var parent = new Org("Name") {Comment = "comment"};

            var child = new Org("childName") {Comment = "childComment"};

            var dao = new OrgDao();
            dao.SaveOrUpdate(parent);
            dao.Save(child);
            parent.Add(child);
          

            Org dbParent = dao.Get(parent.Id);
            Assert.AreEqual(parent.Name, dbParent.Name);
            Assert.AreEqual(parent.Comment, dbParent.Comment);
            Assert.AreEqual(1, dbParent.OrgCount);

            Org dbChild = dao.Get(child.Id);
            Assert.AreEqual(parent, dbChild.Parent);


          
        }
    }
}