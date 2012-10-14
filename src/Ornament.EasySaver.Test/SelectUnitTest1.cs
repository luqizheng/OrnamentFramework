using System;
using System.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NHibernate.Driver;

//using Rhino.Mocks;

namespace Ornament.EasySqlExecuter.Test
{
    public class DataParameter : IDataParameter
    {
        #region IDataParameter Members

        public DbType DbType
        {
            get { throw new NotImplementedException(); }
            set { throw new NotImplementedException(); }
        }

        public ParameterDirection Direction
        {
            get { throw new NotImplementedException(); }
            set { throw new NotImplementedException(); }
        }

        public bool IsNullable
        {
            get { throw new NotImplementedException(); }
        }

        public string ParameterName { get; set; }

        public string SourceColumn
        {
            get { throw new NotImplementedException(); }
            set { throw new NotImplementedException(); }
        }

        public DataRowVersion SourceVersion
        {
            get { throw new NotImplementedException(); }
            set { throw new NotImplementedException(); }
        }

        public object Value { get; set; }

        #endregion
    }

    /// <summary>
    /// Summary description for SelectUnitTest1
    /// </summary>
    [TestClass]
    public class SelectUnitTest1 : RealConnectionTest
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
        [TestCleanup]
        public void MyTestCleanup()
        {
            DataHelper.CreateInstance().Initailze(RealConnection)
                .Delete("IntTable").NewCommand()
                .Delete("GuidTable").NewCommand()
                .Delete("Parents").NewCommand()
                .Delete("children").NewCommand()
                .ResetIntIdentity("parents", 0).NewCommand()
                .ResetIntIdentity("children", 0).NewCommand()
                .ResetIntIdentity("IntTable", 0)
                .Execute();
        }

        #endregion

        [TestMethod]
        public void ForTable()
        {
            const string sql =
                @"Insert into children (name)values('child1');
Insert into children (name)values('child2');
Insert into children (name)values('child3');
 ";
            var conn = RealConnection;
            IDbCommand command = conn.CreateCommand(sql);
            conn.Open();
            command.ExecuteNonQuery();
            conn.Close(false);

            DataTable table;
            DataHelper.CreateInstance().Initailze(RealConnection)
                .Select("Children")
                .Columns("name")
                .Where(new Field("name"))
                .Values(new[] {"child2"})
                .Into(out table).Execute();
            Assert.AreEqual("child2", table.Rows[0]["name"]);
        }
    }
}