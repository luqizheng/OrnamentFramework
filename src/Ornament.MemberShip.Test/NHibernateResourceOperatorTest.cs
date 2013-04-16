using Ornament.MemberShip;
using Ornament.MemberShip.Permissions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace MemberShip.Test
{


    /// <summary>
    ///This is a test class for NHibernateResourceOperatorTest and is intended
    ///to contain all NHibernateResourceOperatorTest Unit Tests
    ///</summary>
    [TestClass()]
    public class NHibernateResourceOperatorTest
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
        enum aOperator
        {
            Create, Delete, Update,
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
        ///A test for NHibernateResourceOperator Constructor
        ///</summary>
        [TestMethod()]
        public void NHibernateResourceOperatorConstructorTest()
        {
            NHibernateResourceManager target = new NHibernateResourceManager();
        }

        /// <summary>
        ///A test for Add
        ///</summary>
        [TestMethod()]
        public void NormalSetAndGet()
        {
            NHibernateResourceManager target = new NHibernateResourceManager();
            Type resourceInstance = typeof(User);
            Type enumType = typeof(aOperator);

            var actual = target.Add(resourceInstance, enumType);
            Assert.AreEqual(target, actual);
            var operatType = actual.GetOperatorType(resourceInstance);
            Assert.AreEqual(enumType, operatType);
            var res = actual.GetResource(enumType);
            Assert.AreEqual(res, resourceInstance);

            var resources = target.Resources;
            Assert.AreEqual(1, resources.Length);
        }
        [TestMethod(), ExpectedException(typeof(ArgumentNullException))]
        public void Add_Test_Resources_IsNull()
        {
            NHibernateResourceManager target = new NHibernateResourceManager();
            target.Add(null, typeof(aOperator));
            Assert.Fail("it shoudl throw a eception.");
        }
        [TestMethod(), ExpectedException(typeof(ArgumentNullException))]
        public void Add_Test_Operator_IsNull()
        {
            NHibernateResourceManager target = new NHibernateResourceManager();
            target.Add(typeof(User), null);
            Assert.Fail("it shoudl throw a eception.");
        }
        /// <summary>
        ///A test for GetOperatorType
        ///</summary>
        [TestMethod(), ExpectedException(typeof(ArgumentNullException))]
        public void GetOperatorTypeTest()
        {
            NHibernateResourceManager target = new NHibernateResourceManager();
            var actual = target.GetOperatorType(null);
            Assert.Fail("it shoudl throw a eception.");

        }
        [TestMethod, ExpectedException(typeof(NotFoundOperatorTypeException))]
        public void GetOperatorType_Cannot_find_exception()
        {
            NHibernateResourceManager target = new NHibernateResourceManager();
            var actual = target.GetOperatorType(typeof(User));

        }
        /// <summary>
        ///A test for GetResourceByType
        ///</summary>
        [TestMethod(), ExpectedException(typeof(ArgumentNullException))]
        public void GetResourceTest()
        {
            NHibernateResourceManager target = new NHibernateResourceManager();
            var actual = target.GetResource(null);
            Assert.Fail("it shoudl throw a eception.");
        }
    }
}
