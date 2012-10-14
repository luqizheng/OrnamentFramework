using Ornament.EasySqlExecuter.Tables;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Ornament.Tester.Test
{
    
    
    /// <summary>
    ///This is a test class for ColumnListTest and is intended
    ///to contain all ColumnListTest Unit Tests
    ///</summary>
    [TestClass()]
    public class ColumnListTest
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


        /// <summary>
        ///A test for ColumnList Constructor
        ///</summary>
        [TestMethod()]
        public void AddSort_add_column_first()
        {
            ColumnList target = new ColumnList();
            target.Add(new Column(){Name="name1"});
            target.Add(new PrimaryKey("PK1"));
            target.Add(new Column() { Name = "name2" });
            target.Add(new PrimaryKey("PK2"));
            
            Assert.AreEqual("name1",target[0].Name);
            Assert.AreEqual("name2", target[1].Name);
            Assert.AreEqual("PK1", target[2].Name);
            Assert.AreEqual("PK2", target[3].Name);
        }

        /// <summary>
        ///A test for ColumnList Constructor
        ///</summary>
        [TestMethod()]
        public void AddSort_add_FK_first()
        {
            ColumnList target = new ColumnList();
            target.Add(new PrimaryKey("PK1"));
            target.Add(new Column() { Name = "name1" });
            target.Add(new PrimaryKey("PK2"));
            target.Add(new Column() { Name = "name2" });

            Assert.AreEqual("name1", target[0].Name);
            Assert.AreEqual("name2", target[1].Name);
            Assert.AreEqual("PK1", target[2].Name);
            Assert.AreEqual("PK2", target[3].Name);
        }

        /// <summary>
        ///A test for ColumnList Constructor
        ///</summary>
        [TestMethod()]
        public void AddSort_add_Column_first_part()
        {
            ColumnList target = new ColumnList();
            target.Add(new Column() { Name = "name1" }); 
            target.Add(new Column() { Name = "name2" });
            target.Add(new PrimaryKey("PK1"));
            target.Add(new PrimaryKey("PK2"));
            Assert.AreEqual("name1", target[0].Name);
            Assert.AreEqual("name2", target[1].Name);
            Assert.AreEqual("PK1", target[2].Name);
            Assert.AreEqual("PK2", target[3].Name);
        }


    
    }
}
