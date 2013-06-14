using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.MemberShip;

namespace MemberShip.Test
{
    /// <summary>
    ///This is a test class for OrgTest and is intended
    ///to contain all OrgTest Unit Tests
    ///</summary>
    [TestClass]
    public class OrgTest
    {
        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }


        [TestMethod]
        public void TestAddChild()
        {
            var parent = new Org(Guid.NewGuid()) {Name = "parentName"};
            var child1 = new Org(Guid.NewGuid()) {Name = "child1"};
            var child1Child = new Org(Guid.NewGuid()) {Name = "child1child"};

            child1.Add(child1Child);
            Assert.AreEqual(child1.Id.ToString(), child1Child.OrderId);
            Assert.AreEqual(child1, child1Child.Parent);
            Assert.IsTrue(child1.Contains(child1Child));

            parent.Add(child1);
            Assert.AreEqual(parent.Id.ToString(), child1.OrderId);
            Assert.AreEqual(parent.Id + "." + child1.Id, child1Child.OrderId);
            Assert.AreEqual(parent, child1.Parent);
        }


        [TestMethod, ExpectedException(typeof (ArgumentException), "org can't add it's parent org")]
        public void TestChildAddParentFaile()
        {
            var parent = new Org(Guid.NewGuid()) {Name = "parentName"};
            var child1 = new Org(Guid.NewGuid()) {Name = "child1"};
            var child1Child = new Org(Guid.NewGuid()) {Name = "child1child"};
            var child1Child_Chidl = new Org(Guid.NewGuid()) {Name = "child1child"};

            parent.Add(child1);
            child1.Add(child1Child);
            child1Child.Add(child1Child_Chidl);

            child1Child_Chidl.Add(parent);
        }

        [TestMethod]
        public void TestLevelUp()
        {
            var parent = new Org(Guid.NewGuid()) {Name = "parentName"};
            var child1 = new Org(Guid.NewGuid()) {Name = "child1"};

            parent.Add(child1);


            Assert.IsFalse(parent.LevelUp());

            Assert.IsTrue(child1.LevelUp());
            Assert.IsNull(child1.Parent);
            Assert.IsNull(child1.OrderId);
            Assert.IsFalse(parent.Contains(child1));
        }

        [TestMethod]
        public void TestLevelDownItsChildFaile()
        {
            var parent = new Org(Guid.NewGuid()) {Name = "parentName"};
            var child1 = new Org(Guid.NewGuid()) {Name = "child1"};

            parent.Add(child1);

            Assert.IsTrue(parent.LevelDown(child1));
        }

        [TestMethod]
        public void TestLevelDown()
        {
            var parent = new Org(Guid.NewGuid()) {Name = "parentName"};
            var child1 = new Org(Guid.NewGuid()) {Name = "child1"};
            var child2 = new Org(Guid.NewGuid()) {Name = "child2"};
            var child3 = new Org(Guid.NewGuid()) {Name = "child2"};

            parent.Add(child1);
            parent.Add(child2);
            parent.Add(child3);

            Assert.IsTrue(child2.LevelDown(child3));

            Assert.AreEqual(child3, child2.Parent);
        }
        [TestMethod]
        public void Constructor()
        {
            Org n = new Org("name");
            Assert.AreEqual("name", n.Name);
        }

        
    }
}