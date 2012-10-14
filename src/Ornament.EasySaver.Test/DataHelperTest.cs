using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.NHibernates;

namespace Ornament.Tester.Test
{
    using EasySqlExecuter;
    using EasySqlExecuter.Drivers;
    using EasySqlExecuter.ExecuteItems;

    /// <summary>
    /// Summary description for DataHelperTest
    /// </summary>
    [TestClass]
    public class DataHelperTest
    {
        public DataHelperTest()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region Additional test attributes
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
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
        public void CreateDeleteExecuteItem()
        {
            var driver = new DbDriver(SessionManager.Instance.CurrentSession.Connection);
            var item= DataHelper.CreateInstance().Initailze(driver).Delete("table");
            Assert.IsInstanceOfType(item, typeof(DeleteExecuteItem));
        }
        [TestMethod]
        public void CreateInsertItem()
        {
            var driver = new DbDriver(SessionManager.Instance.CurrentSession.Connection);
            var item = DataHelper.CreateInstance().Initailze(driver).Insert("table");
            Assert.IsInstanceOfType(item, typeof(InsertSqlExecuteItem));
        }
        [TestMethod]
        public void CreateUpdateExecuteItem()
        {
            var driver = new DbDriver(SessionManager.Instance.CurrentSession.Connection);
            var item = DataHelper.CreateInstance().Initailze(driver).Update("table");
            Assert.IsInstanceOfType(item, typeof(UpdateExecuteItem));
        }
        [TestMethod]
        public void CreateResetExecuteItem()
        {
            var driver = new DbDriver(SessionManager.Instance.CurrentSession.Connection);
            var item = DataHelper.CreateInstance().Initailze(driver).ResetIntIdentity("table",0);
            Assert.IsInstanceOfType(item, typeof(ResetIdentitySqlExecuteItem));
        }
    }
}
