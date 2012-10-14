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
        /// ������������һһ��Ӧ��<see cref="childExecuteItem"/>��������ExecuteItem��Values���ϵ���Ŀ��
        /// </summary>
        /// <param name="childForeignKeym">
        /// </param>
        /// <returns>
        /// </returns>
        /// <remarks>
        /// �����������ϵ������2�֣�
        /// 1��һ��������Ӧ��������
        /// 2����ͬ������������Ӧ��ͬ�����������
        /// �������������Ҫ����
        /// ֻ�������������Ѿ�ȷ�������Ҳ�Ϊһ�ᷢ���������£�
        /// 1���������δ֪��������1������             
        /// 2���������ȷ��������������������һ�¡�������2������
        /// ����������Ϊ-1������£��Ƴټ�顣
        /// </remarks>
        public ExecuteItem PrimaryKeyFor(CreateForeignKey childForeignKey)
        {
            ForeignKey foreignKey = childForeignKey(helper);
            ExecuteItem fkExecuteItem = foreignKey.ExecuteItem;

            if (PrimaryKey == null)
            {
                throw new Exception(TableName + "��Ҫ�趨 TableIdentity");
            }

            string errorMessage1 = String.Format(
                "{0}���ݱ������������ֵ������(count:{1})���������{2}����Ҫ���������(count:{3})",
                TableName,
                ValueSetList.Count,
                fkExecuteItem.TableName,
                fkExecuteItem.PlanAffectRow);

            if (ValueSetList.Count != 1 && HasSetColumn)
            {
                // ����1)
                if (fkExecuteItem.PlanAffectRow == -1)
                {
                    throw new Exception(errorMessage1);
                }

                // ����2��
                if (fkExecuteItem.PlanAffectRow != ValueSetList.Count)
                {
                    throw new Exception(errorMessage1);
                }
            }
            PrimaryKey.RelationForeignKey.Add(foreignKey);


            return this;
        }

        /// <summary>
        /// �趨����������������Ǹ�ExecuteItem
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
                throw new ArgumentException(String.Format("��{0}�����趨PrimaryKey", primaryExecuteItem.TableName));
            }

            if (primaryExecuteItem.PlanAffectRow == -1)
            {
                throw new ArgumentException(
                    String.Format(
                        "��{0}������һ�����ݲ���,PlanAffectRow={1}",
                        primaryExecuteItem.TableName,
                        primaryExecuteItem.PlanAffectRow));
            }

            ////���֮ǰ�Ѿ��趨������
            if (ValueSetList.Count == 0 && PlanAffectRow == -1)
            {
                PlanAffectRow = primaryExecuteItem.PlanAffectRow;
            }

            if (primaryExecuteItem.PlanAffectRow != PlanAffectRow)
            {
                throw new ArgumentException(
                    String.Format(
                        "{0}������������ֵ��Ŀ(count={1})�ͺ�{2}������(count={3})��һ��)",
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