using System.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHibernate;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.NHibernates;

namespace Ornament.Core.NHibernateTest.KeyValueCollectionTests
{
    /// <summary>
    /// Summary description for EntityTest
    /// </summary>
    [TestClass]
    public class EntityTest
    {
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
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        [ClassCleanup]
        public static void MyClassCleanup()
        {
            var driver = new DBDriver(SessionManager.Instance.CurrentSession.Connection);
            DataHelper.CreateInstance().Initailze(driver)
                .Delete("CoreTest_Entity").Execute();
        }

        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //

        #endregion

        [TestMethod]
        public void SaveAdnGet()
        {
            ISession session = SessionManager.Instance.CurrentSession;
            var driver = new DBDriver(SessionManager.Instance.CurrentSession.Connection);
            try
            {
                var t = new Entity();
                t.Collection.Add("key1", "value1");
                t.Collection.Add("key2", "value2");
                session.SaveOrUpdate(t);
                session.Flush();

                DataTable table;
                DataHelper.CreateInstance().Initailze(driver)
                    .Select("CoreTest_Entity").Into(out table).Execute();
                string s =
                    "<?xml version=\"1.0\" encoding=\"utf-8\"?><keyValue><i k=\"key1\">value1</i><i k=\"key2\">value2</i></keyValue>";
                Assert.AreEqual(s, table.Rows[0]["Collection"].ToString());

                t = session.Get<Entity>(t.Id);
                Assert.AreEqual("value1", t.Collection["key1"]);
                Assert.AreEqual("value2", t.Collection["key2"]);
            }
            finally
            {
               
                DataHelper.CreateInstance()
                    .Initailze(driver).Delete("CoreTest_Tips").
                    Execute();
            }
        }
    }
}