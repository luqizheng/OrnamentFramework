using System;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    public abstract class SaveExecuteItem : ExecuteItem
    {
        protected SaveExecuteItem(DataHelper helper, string tableName) : base(helper, tableName)
        {
        }

        /// <summary>
        /// Gets a value indicating whether HasSetColumn.
        /// </summary>
        public bool HasSetColumn
        {
            get { return PlanAffectRow != -1; }
        }


        /// <summary>
        /// 产生主键集合一一对应由<see cref="childExecuteItem"/>所产生的ExecuteItem的Values集合的数目。
        /// </summary>
        /// <param name="childForeignKeym">
        /// </param>
        /// <returns>
        /// </returns>
        /// <remarks>
        /// 主键和外键关系有以下2种：
        /// 1）一个主键对应多个外键。
        /// 2）相同数量的主键对应相同数量的外键。
        /// 因此其余的情况需要报错。
        /// 只有在主键数量已经确定，并且不为一会发生错误，如下：
        /// 1）外键数量未知。不符合1，报错             
        /// 2）外键数量确定，但是与主键数量不一致。不符合2，报错。
        /// 当主键数量为-1的情况下，推迟检查。
        /// </remarks>
        public ExecuteItem PrimaryKeyFor(CreateForeignKey childForeignKey)
        {
            ForeignKey foreignKey = childForeignKey(helper);
            ExecuteItem fkExecuteItem = foreignKey.ExecuteItem;

            if (PrimaryKey == null)
            {
                throw new Exception(TableName + "需要设定 TableIdentity");
            }

            string errorMessage1 = String.Format(
                "{0}数据表的所产生主键值的数量(count:{1})不足以填充{2}所需要的外键数量(count:{3})",
                TableName,
                ValueSetList.Count,
                fkExecuteItem.TableName,
                fkExecuteItem.PlanAffectRow);

            if (ValueSetList.Count != 1 && HasSetColumn)
            {
                // 报错1)
                if (fkExecuteItem.PlanAffectRow == -1)
                {
                    throw new Exception(errorMessage1);
                }

                // 报错2）
                if (fkExecuteItem.PlanAffectRow != ValueSetList.Count)
                {
                    throw new Exception(errorMessage1);
                }
            }
            PrimaryKey.RelationForeignKey.Add(foreignKey);


            return this;
        }

        /// <summary>
        /// 设定外键的数据来自于那个ExecuteItem
        /// </summary>
        /// <param name="fkColumnName"></param>
        /// <param name="builder">
        /// </param>
        /// <returns>
        /// </returns>
        public virtual ExecuteItem ForeignKeyFrom(string fkColumnName, CreatePrimaryKey builder)
        {
            PrimaryKey dataSroucePrimaryKey = builder(helper);

            var primaryExecuteItem = (SaveExecuteItem) dataSroucePrimaryKey.ExecuteItem;

            if (primaryExecuteItem.PrimaryKey == null)
            {
                throw new ArgumentException(String.Format("表{0}必须设定PrimaryKey", primaryExecuteItem.TableName));
            }

            if (primaryExecuteItem.PlanAffectRow == -1)
            {
                throw new ArgumentException(
                    String.Format(
                        "表{0}至少有一个数据产生,PlanAffectRow={1}",
                        primaryExecuteItem.TableName,
                        primaryExecuteItem.PlanAffectRow));
            }

            ////如果之前已经设定了数据
            if (ValueSetList.Count == 0 && PlanAffectRow == -1)
            {
                PlanAffectRow = primaryExecuteItem.PlanAffectRow;
            }

            if (primaryExecuteItem.PlanAffectRow != PlanAffectRow)
            {
                throw new ArgumentException(
                    String.Format(
                        "{0}所产生的主键值数目(count={1})和和{2}的数据(count={3})不一致)",
                        primaryExecuteItem.TableName,
                        primaryExecuteItem.PlanAffectRow,
                        TableName,
                        ValueSetList.Count));
            }

            ForeignKey foreignKey = null;
            if (!ForeignKeys.Contains(fkColumnName))
            {
                foreignKey = new ForeignKey(fkColumnName);
                ForeignKeys.Add(foreignKey);
            }
            else
            {
                foreignKey = ForeignKeys[fkColumnName];
            }

            dataSroucePrimaryKey.RelationForeignKey.Add(foreignKey);

            primaryExecuteItem.ExecuteOrder = ExecuteOrder - ForeignKeys.IndexOf(foreignKey) - 1;
            return this;
        }
    }
}