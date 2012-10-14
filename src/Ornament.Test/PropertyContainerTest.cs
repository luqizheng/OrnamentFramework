using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.NHibernateHelper;
using Ornament.NHibernates.Configurations;

namespace Ornament.Domain.Test
{
    /// <summary>
    ///This is a test class for PropertyContainerTest and is intended
    ///to contain all PropertyContainerTest Unit Tests
    ///</summary>
    [TestClass]
    public class PropertyContainerTest
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

        private PrivateObject CreateIniElement()
        {
            XNamespace name = "urn:nhibernate-configuration-2.2";
            var element =
                new XElement(name + "sessionFactory",
                             new XElement(name + "property",
                                          new XAttribute("name", "name"), new XText("values"))
                    );
            var po = new PrivateObject(new InnerTestProeprtyContainer(element));
            return po;
        }

        /// <summary>
        ///A test for SetPropertyValue
        ///</summary>
        [TestMethod]
        [DeploymentItem("Ornament.Util.dll")]
        public void SetPropertyValueTest()
        {
            XNamespace xNamespace = "urn:nhibernate-configuration-2.2";
            PrivateObject param0 = CreateIniElement();
            var target = new PropertyContainer_Accessor(param0);
            string key = "newName";
            string value = "newValue";
            target.SetPropertyValue(key, value);

            IEnumerable<XElement> property = from prop in target.settingElement.Elements(xNamespace + "property")
                                             where prop.Attribute("name").Value == key
                                             select prop;

            XElement ne = property.SingleOrDefault();
            Assert.AreEqual(value, ne.Value);
        }

        internal virtual PropertyContainer_Accessor CreatePropertyContainer_Accessor()
        {
            // TODO: Instantiate an appropriate concrete class.
            PropertyContainer_Accessor target = null;
            return target;
        }

        /// <summary>
        ///A test for GetPropertyValue
        ///</summary>
        [TestMethod]
        [DeploymentItem("Ornament.Util.dll")]
        public void GetPropertyValueTest()
        {
            PrivateObject param0 = CreateIniElement();
            var target = new PropertyContainer_Accessor(param0);
            string key = "name";
            string expected = "values";
            string actual;
            actual = target.GetPropertyValue(key);
            Assert.AreEqual(expected, actual);1111
        }

        #region Nested type: InnerTestProeprtyContainer

        public class InnerTestProeprtyContainer : PropertyContainer
        {
            private XElement settingElement;

            public InnerTestProeprtyContainer(XElement element)
                : base(element)
            {
                settingElement = element;
            }
        }

        #endregion
    }
}