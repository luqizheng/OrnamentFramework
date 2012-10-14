using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Ornament.Domain.Test
{
    /// <summary>
    ///This is a test class for DomainObjectWithoutIdTest and is intended
    ///to contain all DomainObjectWithoutIdTest Unit Tests
    ///</summary>
    [TestClass]
    public class DomainObjectWithoutIdTest
    {
        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
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

        [TestMethod]
        public void GetHashCodeTest()
        {
            var a = new Domain1();
            var b = new Domain1();
            Assert.AreNotEqual(a, b);

            int aHashcode = a.GetHashCode();
            a.DomaionBizId = "a";
            Assert.AreEqual(aHashcode, a.GetHashCode());
        }



        [TestMethod()]
        public void IsTransientTest()
        {
            Domain1 a = new Domain1();
            Assert.IsTrue(a.IsTransient());
            a.DomaionBizId = "a";
            Assert.IsFalse(a.IsTransient());
        }

        #region Nested type: Domain1

        public class Domain1 : DomainObjectWithoutId<string>
        {
            public Domain1()
            {
            }

            public Domain1(string bizId)
            {
                DomaionBizId = bizId;
            }

            public string DomaionBizId { get; set; }

            protected override string PKID
            {
                get { return DomaionBizId; }
            }

            protected override int CreateHashCode()
            {
                return DomaionBizId.GetHashCode() * 10;
            }
        }

        #endregion
    }
}