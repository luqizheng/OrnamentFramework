using Ornament.NHibernateHelper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Linq;
using System;
using Ornament.NHibernates.Configurations;

namespace Ornament.Domain.Test
{


    /// <summary>
    ///This is a test class for MappingCollectionTest and is intended
    ///to contain all MappingCollectionTest Unit Tests
    ///</summary>
    [TestClass()]
    public class MappingCollectionTest
    {
        private readonly XNamespace xNamespace = "urn:nhibernate-configuration-2.2";

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
        private PrivateObject CreateIniElement()
        {
            
            var element =
                new XElement(xNamespace + "sessionFactory",
                             new XElement(xNamespace + "property", new XAttribute("name", "name"), new XText("values")),
                             new XElement(xNamespace + "mapping", new XAttribute("assembly", "name"), new XText("orname.core.dll"))
                    );
            var po = new PrivateObject(new MappingCollection(element));
            return po;
        }


        /// <summary>
        ///A test for SetItem
        ///</summary>
        [TestMethod()]
        [DeploymentItem("Ornament.Core.dll")]
        public void SetItemTest()
        {
            PrivateObject param0 = CreateIniElement();
            MappingCollection_Accessor target = new MappingCollection_Accessor(param0); // TODO: Initialize to an appropriate value
            int index = 0;
            Mapping item = target.CreateMapping();
            item.Assembly = "or.dll";
            target.SetItem(index, item);

            MappingCollection tar = (MappingCollection)target.Target;
            Assert.AreEqual("or.dll", tar[index].Assembly);
        }

        /// <summary>
        ///A test for RemoveItem
        ///</summary>
        [TestMethod()]
        [DeploymentItem("Ornament.Core.dll")]
        public void RemoveItemTest()
        {
            PrivateObject param0 = CreateIniElement();
            MappingCollection_Accessor target = new MappingCollection_Accessor(param0); // TODO: Initialize to an appropriate value
            int index = 0;
            target.RemoveItem(index);


            IEnumerable<XElement> elements = from mappingNode in target.sessionFactoryEelement.Elements(xNamespace + "mapping")
                                             select mappingNode;
            XElement[] mappings = elements.ToArray<XElement>();
            Assert.AreEqual(0, mappings.Length);
            MappingCollection tar = (MappingCollection)target.Target;
            Assert.AreEqual(0, tar.Count);
        }

        /// <summary>
        ///A test for InsertItem
        ///</summary>
        [TestMethod()]
        [DeploymentItem("Ornament.Core.dll")]
        public void InsertItemTest_index0()
        {
            PrivateObject param0 = CreateIniElement();
            MappingCollection_Accessor target = new MappingCollection_Accessor(param0);

            //Insert 第一位            
            int index = 0;
            Mapping item = target.CreateMapping();
            item.Assembly = "ol.dll";
            target.InsertItem(index, item);

            MappingCollection tar = (MappingCollection)target.Target;
            Assert.AreEqual<Int32>(2, tar.Count);


            Assert.AreEqual("ol.dll", tar[0].Assembly);


            //Insert 最后一位
            item = target.CreateMapping();
            item.Assembly = "ol1.dll";
            index = tar.Count;
            target.InsertItem(index, item);

            Assert.AreEqual("ol1.dll", tar[2].Assembly);

            //insert 中间位置
            index = 1;
            item = target.CreateMapping();
            item.Assembly = "middle.dll";
            target.InsertItem(index, item);

            Assert.AreEqual("middle.dll", tar[index].Assembly);


        }

        /// <summary>
        ///A test for CreateMapping
        ///</summary>
        [TestMethod()]
        public void CreateMappingTest()
        {
            XNamespace name = "urn:nhibernate-configuration-2.2";
            XElement sessionFactoryEelement =
               new XElement(name + "sessionFactory",
                            new XElement(name + "property", new XAttribute("name", "name"), new XText("values")),
                            new XElement(name + "mapping", new XAttribute("assembly", "name"), new XText("orname.core.dll"))
                   );

            MappingCollection target = new MappingCollection(sessionFactoryEelement);
            var actual = target.CreateMapping();

            Assert.AreEqual(name, actual.Element.Name.Namespace);

        }

        /// <summary>
        ///A test for ClearItems
        ///</summary>
        [TestMethod()]
        [DeploymentItem("Ornament.Core.dll")]
        public void ClearItemsTest()
        {
            PrivateObject param0 = CreateIniElement();
            MappingCollection_Accessor target = new MappingCollection_Accessor(param0);

            MappingCollection tar = (MappingCollection)target.Target;
            tar.Clear();

            IEnumerable<XElement> elements = from mappingNode in target.sessionFactoryEelement.Elements(xNamespace + "mapping")
                                             select mappingNode;
            XElement[] mappings = elements.ToArray<XElement>();
            Assert.AreEqual(0, mappings.Length);
            Assert.AreEqual(0, tar.Count);
        }

        [TestMethod]
        [DeploymentItem("Ornament.Core.dll")]
        public void CheckAllLogic()
        {
            var c = @"<?xml version=""1.0"" encoding=""utf-8""?>
<hibernate-configuration xmlns=""urn:nhibernate-configuration-2.2"">
  <session-factory name=""NHibernate.Test"">
    <!-- properties -->
    <property name=""connection.provider"">NHibernate.Connection.DriverConnectionProvider</property>
    <property name=""connection.driver_class"">NHibernate.Driver.SqlClientDriver</property>    
    <property name=""connection.connection_string"">server=.\SQLEXPRESS;database=nhibernateDemo;uid=sa;pwd=sa</property>
    <property name=""show_sql"">false</property>
    <property name=""dialect"">NHibernate.Dialect.MsSql2005Dialect</property>
    <property name=""use_outer_join"">true</property>
    <property name=""proxyfactory.factory_class"">NHibernate.ByteCode.LinFu.ProxyFactoryFactory,NHibernate.ByteCode.LinFu</property>
    <!-- 
			these are different than the values in app.config so I can verify these 
			are being picked up
		-->
    <property name=""command_timeout"">500</property>
    <property name=""query.substitutions"">true 1, false 0, yes 1, no 0</property>
    <!-- mapping files -->
    <mapping assembly=""Ornament.MemberShip.Core"" />
    <mapping assembly=""Ornament.MemberShip.2"" />
    <mapping assembly=""Ornament.3MemberShip.2"" />
  </session-factory>
</hibernate-configuration>";
            XDocument doc = XDocument.Parse(c);

            var element = doc.Root.Element(this.xNamespace + "session-factory");
            MappingCollection_Accessor target = new MappingCollection_Accessor(element);
            var collection = (MappingCollection)target.Target;
            
            Assert.AreEqual(3, collection.Count);

            var mapping=collection.CreateMapping();
            mapping.Assembly = "assembly.dll";
            collection.Clear();
            collection.Add(mapping);
            Assert.AreEqual(1, collection.Count);

        }
    }
}
