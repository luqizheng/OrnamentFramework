using System.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.NHibernates;

namespace Ornament.Core.NHibernateTest.TimeTypeTests
{
    /// <summary>
    /// Summary description for TimeType
    /// </summary>
    [TestClass]
    public class TimeTypeTest
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
                .Delete("CoreTest_Tips").Execute();
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
        public void SaveAndUpdate()
        {

            var session = SessionManager.Instance.CurrentSession;
            var driver = new DBDriver(session.Connection);
            try
            {
                var t = new Tips
                            {
                                PerformTime = new Time(13, 0, 0),
                                PopupTime = new Time(12, 12, 12)
                            };
                session.SaveOrUpdate(t);
                session.Flush();
                DataTable table;

                DataHelper.CreateInstance().Initailze(driver)
                    .Select("CoreTest_Tips").Into(out table).Execute();

                Assert.AreEqual(table.Rows[0]["PerformTime"].ToString(), t.PerformTime.Ticks.ToString());
                Assert.AreEqual(table.Rows[0]["PopupTime"].ToString(), t.PopupTime.ToString());
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