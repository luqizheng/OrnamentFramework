using System;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.MemberShip;

namespace MemberShip.Test
{
    /// <summary>
    ///     This is a test class for RoleTest and is intended
    ///     to contain all RoleTest Unit Tests
    /// </summary>
    [TestClass]
    public class RoleTest
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

        /// <summary>
        ///     A test for Name
        /// </summary>
        [TestMethod]
        public void NameTest()
        {
            var target = new Role();
            string expected = "ok";
            string actual;
            target.Name = expected;
            actual = target.Name;
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void Name_InnerLength()
        {
            var sb = new StringBuilder(20);
            for (int i = 0; i < 20; i++)
            {
                sb.Append("a");
            }
            var target = new Role();
            target.Name = sb.ToString();
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException), "Name's lenght over than 20")]
        public void Name_More_Than_Max_Length()
        {
            var sb = new StringBuilder(20);
            for (int i = 0; i < 21; i++)
            {
                sb.Append("a");
            }
            var target = new Role();
            target.Name = sb.ToString();
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException), "Name can't be empty")]
        public void Name_Null()
        {
            var target = new Role { Name = null };
        }

        [TestMethod, ExpectedException(typeof(ArgumentException))]
        public void NameOnlySetOnce_SetByConstructor()
        {
            var target = new Role("name");
            target.Name = "ok";
        }

        [TestMethod, ExpectedException(typeof(ArgumentException))]
        public void NameOnlySetOnce_SetByProperty()
        {
            var target = new Role();
            target.Name = "ok";
            target.Name = "ok2";
        }

        [TestMethod]
        public void NameSetTwiceSameValue()
        {
            var target = new Role();
            target.Name = "ok";
            target.Name = "ok";
        }


        /// <summary>
        ///     A test for Comment
        /// </summary>
        [TestMethod]
        public void CommentTest_SetEmptyString()
        {
            var target = new Role();
            string actual;
            target.Remarks = String.Empty;
            actual = target.Remarks;
            Assert.AreEqual(null, actual);
        }

        /// <summary>
        ///     A test for Comment
        /// </summary>
        [TestMethod]
        public void CommentTest()
        {
            var target = new Role();
            string except = "comment";
            string actual;
            target.Remarks = except;
            actual = target.Remarks;
            Assert.AreEqual(except, actual);
        }

        /// <summary>
        ///     A test for Comment
        /// </summary>
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void CommentTest_OverLength()
        {
            var target = new Role();

            var except = new StringBuilder(20);
            for (int i = 0; i < 101; i++)
            {
                except.Append("a");
            }

            target.Remarks = except.ToString();

            Assert.AreEqual(except.ToString(), target.Remarks);
        }


        /// <summary>
        ///     A test for Role Constructor
        /// </summary>
        [TestMethod]
        public void RoleConstructorTest1()
        {
            var target = new Role();
            Assert.AreEqual(null, target.Remarks);
            Assert.AreEqual(null, target.Name);
        }

        /// <summary>
        ///     A test for Role Constructor
        /// </summary>
        [TestMethod]
        public void RoleConstructorTest()
        {
            string roleName = "ok";
            var target = new Role(roleName);
            Assert.AreEqual(roleName, target.Name);
        }

        [TestMethod]
        public void Permforer_Role_NameTest()
        {
            string roleName = "ok";
            var role = new Role(roleName);
            var target = (IPerformer)role;
            target.Name = "aName";
            Assert.AreEqual("aName", role.Name);
        }
    }
}