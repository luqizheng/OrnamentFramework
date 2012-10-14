using Ornament.EasySqlExecuter.ExecuteItems;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.Test;

namespace Ornament.Tester.Test
{


    /// <summary>
    ///This is a test class for SqlExecuteItemTest and is intended
    ///to contain all SqlExecuteItemTest Unit Tests
    ///</summary>
    [TestClass()]
    public class SqlExecuteItemTest
    {


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
        //You can use the following additional attributes as you write your tests:
        //
        //Use ClassInitialize to run code before running the first test in the class
        //[ClassInitialize()]
        //public static void MyClassInitialize(TestContext testContext)
        //{
        //}
        //
        //Use ClassCleanup to run code after all tests in a class have run
        //[ClassCleanup()]
        //public static void MyClassCleanup()
        //{
        //}
        //
        //Use TestInitialize to run code before running each test
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{
        //}
        //
        //Use TestCleanup to run code after each test has run
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{
        //}
        //
        #endregion


        internal virtual SqlExecuteItem CreateSqlExecuteItem()
        {
            SqlExecuteItem target = new InsertSqlExecuteItem(new ExecuteBuilder(DataHelper.CreateInstance(),new SqlConsole()), "tableName");
            return target;
        }

        /// <summary>
        ///A test for Values
        ///</summary>
        [TestMethod()]
        public void ValuesTest()
        {
            SqlExecuteItem target = CreateSqlExecuteItem();
            Value[][] values = new Value[][]
                                   {
                                       new Value[] {"col1_1", "col1_2"},
                                       new Value[] {"col2_1", "col2_2"},

                                   };


            var actual = target.Values(values);
            Assert.AreEqual(2, actual.Table.Columns[0].Values.Count);
            Assert.AreEqual(2, actual.Table.Columns[1].Values.Count);

            Assert.AreEqual("col1_1", actual.Table[0][0].ToString());
            Assert.AreEqual("col1_2", actual.Table[0][1].ToString());

            Assert.AreEqual("col2_1", actual.Table[1][0].ToString());
            Assert.AreEqual("col2_2", actual.Table[1][1].ToString());




        }

        /// <summary>
        ///A test for Values
        ///</summary>
        [TestMethod()]
        public void ValuesTest1()
        {
            SqlExecuteItem target = CreateSqlExecuteItem(); // TODO: Initialize to an appropriate value
            Value[][] values = null; // TODO: Initialize to an appropriate value
            SqlExecuteItem expected = null; // TODO: Initialize to an appropriate value
            SqlExecuteItem actual;
            actual = target.Values(values);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
