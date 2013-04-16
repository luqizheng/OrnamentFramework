using System;
using System.Text;
using MemberShip.Test;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.MemberShip;

namespace MemberShip.Test
{
    public class ImpleMember : Member<ImpleMember>
    {
        public ImpleMember(string id)
            : base(id)
        {
        }

        public ImpleMember()
        {
        }

        
    }
}

/// <summary>
///This is a test class for MemberTest and is intended
///to contain all MemberTest Unit Tests
///</summary>
[TestClass]
public class MemberTest
{
    /// <summary>
    ///Gets or sets the test context which provides
    ///information about and functionality for the current test run.
    ///</summary>
    public TestContext TestContext { get; set; }


    internal virtual IMember CreateMember()
    {
        IMember target = new ImpleMember();
        return target;
    }

    /// <summary>
    ///A test for Name
    ///</summary>
    [TestMethod]
    public void NameTest()
    {
        var target = CreateMember();
        string expected = "123456789_123456789_123456789";
        string actual;
        target.Name = expected;
        actual = target.Name;
        Assert.AreEqual(expected, actual);

        target.Name = null;
        Assert.IsNull(target.Name);
    }

    [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException), "Name's length is more than 30")]
    public void Name_Length_More_Than_Max_Length()
    {
        var target = CreateMember();
        string expected = "123456789_123456789_123456789_1";
        target.Name = expected;
    }


    /// <summary>
    ///A test for Comment
    ///</summary>
    [TestMethod]
    public void CommentTest()
    {
        var target = CreateMember();
        string expected = "Comment";
        string actual;
        target.Remark = expected;
        actual = target.Remark;
        Assert.AreEqual(expected, actual);

        target.Remark = null;
        Assert.IsNull(target.Remark);
    }

    [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException), "Name's length is more than 30")]
    public void Comment_Length_More_Than_Max_Length()
    {
        var sb = new StringBuilder(201);
        for (int i = 0; i < 20; i++)
        {
            sb.Append("123456789_");
        }
        sb.Append("1");
        var target = CreateMember();
        string expected = sb.ToString();
        target.Remark = expected;
    }

    [TestMethod]
    public void TestAddRole()
    {
        var role1 = new Role("role1");
        var role2 = new Role("role2");

        var m = CreateMember();
        Assert.IsTrue(m.AddRole(role1));
        Assert.IsTrue(m.AddRole(role2));
        Assert.IsFalse(m.AddRole(role1));
        Assert.AreEqual(2, m.RoleCount);

        Assert.IsTrue(m.InRole(role1));
        Assert.IsTrue(m.InRole(role2));
    }

    [TestMethod, ExpectedException(typeof(ArgumentNullException))]
    public void AddRole_NullException()
    {
        var m = CreateMember();
        m.AddRole(null);
    }

    [TestMethod]
    public void TestRemoveRole()
    {
        var role1 = new Role("role1");
        var role2 = new Role("role2");

        var m = CreateMember();
        m.AddRole(role1);
        m.AddRole(role2);

        Assert.IsTrue(m.RemoveRole(role1));
        Assert.IsTrue(m.RemoveRole(role2));

        Assert.IsFalse(m.InRole(role1));
        Assert.IsFalse(m.InRole(role2));
    }
    
}