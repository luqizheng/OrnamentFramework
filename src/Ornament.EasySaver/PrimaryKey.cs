using System;
using System.Collections.Generic;

namespace Ornament.EasySqlExecuter
{
    public class PrimaryKey
    {
        private List<ForeignKey> relationForeignKey;
        public ExecuteItem ExecuteItem { get; internal set; }

        public static PrimaryKey IntType
        {
            get { return new PrimaryKey {IdType = typeof (int)}; }
        }

        public static PrimaryKey GuidType
        {
            get { return new PrimaryKey {IdType = typeof (Guid)}; }
        }

        public Type IdType { get; set; }
        public string TableName { get; set; }
        public string SequenceName { get; set; }
        public string FieldName { get; set; }

        internal List<ForeignKey> RelationForeignKey
        {
            get
            {
                if (relationForeignKey == null)
                    relationForeignKey = new List<ForeignKey>();
                return relationForeignKey;
            }
        }

        public static PrimaryKey AssignType(string primarykeyName)
        {
            return new PrimaryKey {FieldName = primarykeyName};
        }

        internal void NotificateForgineKey(object[] identity)
        {
            foreach (ForeignKey fk in RelationForeignKey)
            {
                fk.Values = new DataValue[identity.Length];
                for (int i = 0; i < identity.Length; i++)
                {
                    fk.Values[i] = new DataValue(identity[i]);
                }
            }
        }
    }
}