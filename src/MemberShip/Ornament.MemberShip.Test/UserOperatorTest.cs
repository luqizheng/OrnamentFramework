using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.MemberShip.Permissions;

namespace MemberShip.Test
{
    /// <summary>
    /// Summary description for UserOperatorTest
    /// </summary>
    [TestClass]
    public class UserOperatorTest
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

        //[TestMethod]
        //public void TestLock()
        //{
        //    UserOperator target = UserOperator.Lock;
        //    Assert.AreEqual(UserOperator.Read, target & UserOperator.Read);
        //    Assert.AreEqual(UserOperator.Modify, target & UserOperator.Modify);
        //    Assert.AreEqual(UserOperator.Lock, target & UserOperator.Lock);
        //}

        //[TestMethod]
        //public void TestRead()
        //{
        //    const UserOperator target = UserOperator.Read;
        //    UserOperator beCheckOperator = UserOperator.Read;
        //    Assert.IsTrue((beCheckOperator & target) == beCheckOperator);
        //    beCheckOperator = UserOperator.Modify;
        //    Assert.IsTrue((beCheckOperator & target) != beCheckOperator);
        //    beCheckOperator = UserOperator.Lock;
        //    Assert.IsTrue((beCheckOperator & target) != beCheckOperator);
        //}

        //[TestMethod]
        //public void TestModify()
        //{
        //    UserOperator target = UserOperator.Modify;

        //    UserOperator beCheckOperator = UserOperator.Read;
        //    Assert.IsTrue((beCheckOperator & target) == beCheckOperator);
        //    beCheckOperator = UserOperator.Modify;
        //    Assert.IsTrue((beCheckOperator & target) == beCheckOperator);
        //    beCheckOperator = UserOperator.Lock;
        //    Assert.IsTrue((beCheckOperator & target) != beCheckOperator);
        //}
    }
}