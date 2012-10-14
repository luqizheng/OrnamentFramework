using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ornament.EasySqlExecuter;
using Ornament.EasySqlExecuter.ExecuteItems;
using Ornament.EasySqlExecuter.Tables;
using Ornament.EasySqlExecuter.Test;

namespace Ornament.Tester.Test
{
    /// <summary>
    /// Summary description for InsertTest
    /// </summary>
    [TestClass]
    public class InsertTest
    {
        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext { get; set; }

        [TestCleanup]
        public void MyTestCleanup()
        {
        }


        [TestMethod]
        public void Insert_1_Row_with_filed_and_table_is_Int_identity()
        {
            var console = new SqlConsole();
            SqlExecuteItem item = DataHelper.CreateInstance().Initailze(console)
                .Begin()
                .Insert("IntTable")
                .Columns(new[] { "name1", "name2" })
                .Values(new Value[] { "leo", "lu" })
                .End();
            item.Execute();
            Assert.AreEqual("INSERT INTO IntTable (name1,name2) VALUES (@name1,@name2)", console.Sqls[0]);
        }


        [TestMethod]
        public void Insert_1_row_not_set_columns()
        {
            var console = new SqlConsole();
            var guid = new[] { Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid() };
            SqlExecuteItem item = DataHelper.CreateInstance().Initailze(console)
                .Begin()
                .Insert("GuidTable")
                .Values(
                    new Value[] { guid[0], 1, "leo0" },
                    new Value[] { guid[1], 1, "leo1" },
                    new Value[] { guid[2], 1, "leo2" },
                    new Value[] { guid[3], 1, "leo3" }
                ).End();
            item.Execute();
            Assert.AreEqual("INSERT INTO GuidTable  VALUES (@parameter0,@parameter1,@parameter2)", console.Sqls[0]);
            Table table = console.TableNameMapple["GuidTable"];

            Assert.AreEqual(guid[0], table[0, 0].Target);
            Assert.AreEqual(guid[1], table[1, 0].Target);
            Assert.AreEqual(guid[2], table[2, 0].Target);
            Assert.AreEqual(guid[3], table[3, 0].Target);

            Assert.AreEqual(1, table[0, 1].Target);
            Assert.AreEqual(1, table[1, 1].Target);
            Assert.AreEqual(1, table[2, 1].Target);
            Assert.AreEqual(1, table[3, 1].Target);


            Assert.AreEqual("leo0", table[0, 2].Target);
            Assert.AreEqual("leo1", table[1, 2].Target);
            Assert.AreEqual("leo2", table[2, 2].Target);
            Assert.AreEqual("leo3", table[3, 2].Target);
        }

        [TestMethod]
        public void Insert_1_row_not_set_columns_hasPrimaryKeys()
        {
            var console = new SqlConsole();
            var guid = new[] { Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid() };
            SqlExecuteItem item = DataHelper.CreateInstance()
                .Initailze(console)
                .Begin()
                .Insert("GuidTable")
                .Values(
                    new Value[] { guid[0], 1, "leo0" },
                    new Value[] { guid[1], 1, "leo1" },
                    new Value[] { guid[2], 1, "leo2" },
                    new Value[] { guid[3], 1, "leo3" }
                );
            item.Execute();
            Assert.AreEqual("INSERT INTO GuidTable  VALUES (@parameter0,@parameter1,@parameter2)", console.Sqls[0]);
        }

        [TestMethod]
        public void Insert_1_firstSetting_value_secnodSetting_column()
        {
            var console = new SqlConsole();
            SqlExecuteItem item = DataHelper.CreateInstance().Initailze(console)
                .Begin()
                .Insert("IntTable")
                .Values(new Value[] { "leo1" }, new Value[] { "leo2" }, new Value[] { "leo3" })
                .Columns(new[] { "name" });
            item.Execute();
            Assert.AreEqual("parameter0", console.ParametersSet[0][0].Name);
        }


        [TestMethod]
        public void Insert_one_indentity_for_one_fk()
        {
            var console = new SqlConsole();
            DataHelper.CreateInstance().Initailze(console)
                .Begin()
                .Insert("IntTable", PrimaryKey.Identity("Identity"))
                .Columns(new[] { "name" })
                .Values(new Value[] { "leo" })
                .ColumnValueFor
                (
                    "Identity",
                    x => x.Insert("GuidTable")
                             .Columns(new[] { "name", "IntTableId" })
                             .Values(new Value[] { "michael" })
                             .End()
                             .Table.Columns["IntTableId"]
                ).End()
                .Begin().ExecuteAll();

            Assert.AreEqual(2, console.Sqls.Count);
            Assert.AreEqual("INSERT INTO IntTable (Identity,name) VALUES (@Identity,@name);SELECT IDENT_CURRENT ('IntTable')",
                console.Sqls[0]);
            Assert.AreEqual("INSERT INTO GuidTable (name,IntTableId) VALUES (@name,@IntTableId)", console.Sqls[1]);

            Table guidTable = console.TableNameMapple["GuidTable"];
            Table intTable = console.TableNameMapple["IntTable"];
            Assert.AreEqual(intTable.PrimaryKey.Values[0].Target.ToString(), guidTable[0, 1].ToString());
        }


        [TestMethod]
        public void foreignKeyTest()
        {
            var console = new SqlConsole();
            DataHelper.CreateInstance(console)
                .Begin()
                .Insert("User")
                .ColumnValueFrom("UserTypeId",
                                 x => x.Insert("UserType", PrimaryKey.Identity("id"))
                                          .End()
                                          .Table.Columns["id"]
                ).End()
                .Begin()
                .ExecuteAll();
            Assert.AreEqual("INSERT INTO UserType (id) VALUES (@id);SELECT IDENT_CURRENT ('UserType')", console.Sqls[0]);
        }

        [TestMethod]
        public void multi_foreginKey()
        {
            const string Parent_Name = "jack.smith";
            const string child_Name = "fank.smith";
            var console = new SqlConsole();
            ExecuteBuilder execute = DataHelper.CreateInstance().Initailze(console)
                .Begin()
                .Insert("child_parent_relation")
                .ColumnValueFrom("parent",
                                 x =>
                                 x.Insert("parents", PrimaryKey.Identity("Id"))
                                     .Values(new Value[] { Parent_Name })
                                     .End().Table.Columns["Id"]
                )
                .ColumnValueFrom("child",
                                 x => x.Insert("children", PrimaryKey.Identity("Id"))
                                          .Values(new Value[] { child_Name })
                                          .End().Table.Columns["Id"]
                )
                .End().Begin();
            execute.ExecuteAll();

            Assert.AreEqual("INSERT INTO children  VALUES (@parameter0,@parameter1);SELECT IDENT_CURRENT ('children')",
                            console.Sqls[0]);
            Assert.AreEqual("INSERT INTO parents (Id) VALUES (@Id);SELECT IDENT_CURRENT ('parents')", console.Sqls[1]);
            Assert.AreEqual("INSERT INTO child_parent_relation (parent,child) VALUES (@parent,@child)", console.Sqls[2]);
        }


        [TestMethod]
        public void multi_foreginKey_cascade_forgeing_key()
        {
            const string Parent_Name = "jack.smith";
            const string child_Name = "fank.smith";
            var console = new SqlConsole();
            ExecuteBuilder execute = DataHelper.CreateInstance().Initailze(console)
                .Begin()
                .Insert("child_parent_relation")
                .ColumnValueFrom("parent",
                                 x =>
                                 x.Insert("parents", PrimaryKey.Identity("Id"))
                                     .Values(new Value[] { Parent_Name, "anotherId" })
                                     .ColumnValueFrom("IdParent_child",
                                                      y => y.Insert("parents_child", PrimaryKey.Identity("id"))
                                                               .Values(new Value[] { "1" })
                                                               .End().Table.Columns["id"]
                                     )
                                     .End().Table.Columns["Id"]
                )
                .ColumnValueFrom("child",
                                 x => x.Insert("children", PrimaryKey.Identity("Id"))
                                          .Values(new Value[] { child_Name })
                                          .ColumnValueFrom("childRenChild",
                                                           y => y.Insert("childrenchild", PrimaryKey.Identity("id"))
                                                                    .Values(new Value[] { "2" })
                                                                    .End().Table.Columns["id"]
                                          )
                                          .End().Table.Columns["Id"]
                )
                .End().Begin();
            execute.ExecuteAll();

            Assert.AreEqual("INSERT INTO children (Id) VALUES (@Id);SELECT IDENT_CURRENT ('children')", console.Sqls[0]);
            Assert.AreEqual("INSERT INTO parents (Id) VALUES (@Id);SELECT IDENT_CURRENT ('parents')", console.Sqls[1]);
            Assert.AreEqual("INSERT INTO child_parent_relation (parent,child) VALUES (@parent,@child)", console.Sqls[2]);
        }
    }
}