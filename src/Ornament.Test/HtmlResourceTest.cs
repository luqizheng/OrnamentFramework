using Ornament.Web;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Ornament.Test
{


    /// <summary>
    ///This is a test class for HtmlResourceTest and is intended
    ///to contain all HtmlResourceTest Unit Tests
    ///</summary>
    [TestClass()]
    public class HtmlResourceTest
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
        ///A test for GetFileNameWithoutExtension
        ///</summary>
        [TestMethod()]
        [DeploymentItem("Ornament.Web.Core.dll")]
        public void GetFileNameWithoutExtensionTest()
        {
            string fullPath = "~/Views/a.aspx";
            string expected = "a";
            string actual;
            actual = HtmlResource_Accessor.GetFileNameWithoutExtension(fullPath);
            Assert.AreEqual(expected, actual);

            fullPath = "~/View/a/b/c.cshtml";
            expected = "c";
            actual = HtmlResource_Accessor.GetFileNameWithoutExtension(fullPath);
            Assert.AreEqual(expected, actual);


            fullPath = "~/View/a/b/c.b.c.cshtml";
            expected = "c.b.c";
            actual = HtmlResource_Accessor.GetFileNameWithoutExtension(fullPath);
            Assert.AreEqual(expected, actual);
        }
    }
}
