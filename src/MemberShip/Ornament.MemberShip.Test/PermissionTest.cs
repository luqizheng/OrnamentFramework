using System;
using MemberShip.Test.helper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.MemberShip.Permissions;

namespace MemberShip.Test
{
    /// <summary>
    ///     This is a test class for PermissionTest and is intended
    ///     to contain all PermissionTest Unit Tests
    /// </summary>
    [TestClass]
    public class PermissionTest
    {
        /// <summary>
        ///     Gets or sets the test context which provides
        ///     information about and functionality for the current test run.
        /// </summary>
        public TestContext TestContext { get; set; }

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

        ///// <summary>
        /////A test for Operator
        /////</summary>
        //[TestMethod()]
        //public void OperatorTest()
        //{
        //    Permission target = new Permission(helper.ResourceHelper.Foo); 
        //    int expected = 20;
        //    int actual;
        //    target.Operator = expected;
        //    actual = target.Operator;
        //    Assert.AreEqual(expected, actual);            
        //}

        ///// <summary>
        /////A test for Name
        /////</summary>
        //[TestMethod()]
        //public void NameTest()
        //{
        //    Permission target = new Permission(helper.ResourceHelper.Foo);
        //    string expected = "theName";
        //    string actual;
        //    target.Name = expected;
        //    actual = target.Name;
        //    Assert.AreEqual(expected, actual);

        //}

        /// <summary>
        ///     A test for Comment
        /// </summary>
        [TestMethod]
        public void CommentTest()
        {
            Permission target = new GenericPermission<string>("ok");
            string expected = "Comment";
            string actual;
            target.Remark = expected;
            actual = target.Remark;
            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///     A test for HasOperator
        /// </summary>
        [TestMethod]
        public void HasOperatorTest()
        {
            Permission target = new GenericPermission<string>("ok");
            target.Operator = Convert.ToInt32(MockOperator.ABC);


            Assert.IsTrue(target.HasOperator(MockOperator.A));
            Assert.IsTrue(target.HasOperator(MockOperator.B));
            Assert.IsTrue(target.HasOperator(MockOperator.C));
            Assert.IsTrue(target.HasOperator(MockOperator.ABC));

            Assert.IsFalse(target.HasOperator(MockOperator.D));
            Assert.IsFalse(target.HasOperator(MockOperator.E));
            Assert.IsFalse(target.HasOperator(MockOperator.F));

            //two;
            target.Operator = Convert.ToInt32(MockOperator.ABC);
            Assert.IsTrue(target.HasOperator(MockOperator.A));
            Assert.IsTrue(target.HasOperator(MockOperator.B));
            Assert.IsTrue(target.HasOperator(MockOperator.C));
            Assert.IsTrue(target.HasOperator(MockOperator.None));
            Assert.IsFalse(target.HasOperator(MockOperator.All));
            Assert.IsFalse(target.HasOperator((MockOperator.ABC | MockOperator.E)));
        }
    }
}