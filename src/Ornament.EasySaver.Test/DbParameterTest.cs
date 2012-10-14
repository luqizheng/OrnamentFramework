﻿using Ornament.EasySqlExecuter.Drivers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Data;
using Ornament.EasySqlExecuter;

namespace Ornament.Tester.Test
{
    
    
    /// <summary>
    ///This is a test class for DbParameterTest and is intended
    ///to contain all DbParameterTest Unit Tests
    ///</summary>
    [TestClass()]
    public class DbParameterTest
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
        ///A test for DbParameter Constructor
        ///</summary>
        [TestMethod()]
        public void DbParameterConstructorTest()
        {
            string name = string.Empty; // TODO: Initialize to an appropriate value
            DbParameter target = new DbParameter(name);
            Assert.Inconclusive("TODO: Implement code to verify target");
        }

        /// <summary>
        ///A test for CreateParameter
        ///</summary>
        [TestMethod()]
        public void CreateParameterTest()
        {
            string name = string.Empty; // TODO: Initialize to an appropriate value
            DbParameter target = new DbParameter(name); // TODO: Initialize to an appropriate value
            IDbCommand command = null; // TODO: Initialize to an appropriate value
            DatabaseType databaseType = new DatabaseType(); // TODO: Initialize to an appropriate value
            IDbDataParameter expected = null; // TODO: Initialize to an appropriate value
            IDbDataParameter actual;
            actual = target.CreateParameter(command, databaseType);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for CreateParameterName
        ///</summary>
        [TestMethod()]
        public void SqlParameterNameTest()
        {
            string name = string.Empty; // TODO: Initialize to an appropriate value
            DbParameter target = new DbParameter(name); // TODO: Initialize to an appropriate value
            DatabaseType type = new DatabaseType(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.CreateParameterName(type);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for Name
        ///</summary>
        [TestMethod()]
        public void NameTest()
        {
            string name = string.Empty; // TODO: Initialize to an appropriate value
            DbParameter target = new DbParameter(name); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            target.Name = expected;
            actual = target.Name;
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
