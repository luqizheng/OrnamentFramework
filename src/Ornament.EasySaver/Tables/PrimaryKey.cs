namespace Ornament.EasySqlExecuter.Tables
{
    public class PrimaryKey : Column
    {
        public PrimaryKey()
        {
        }

        public PrimaryKey(string name)
        {
            Name = name;
        }

        public Table Table { get; set; }

        public string SequenceName { get; set; }

        public string FieldName { get; set; }

        public PrimaryKeyValueSource ValueSource { get; set; }

        public static PrimaryKey AssignedId(string name)
        {
            return new PrimaryKey(name)
                       {
                           ValueSource = PrimaryKeyValueSource.Assigned
                       };
        }

        public static PrimaryKey AssignedId(string name, params object[] values)
        {
            var result = new PrimaryKey(name)
                             {
                                 ValueSource = PrimaryKeyValueSource.Assigned,
                             };
            for (int i = 0; i < values.Length; i++)
                result.Values.Add(new Value(values[i]));
            return result;
        }


        public static PrimaryKey Identity(string name)
        {
            return new PrimaryKey(name)
                       {
                           ValueSource = PrimaryKeyValueSource.Identity
                       };
        }
    }

    public enum PrimaryKeyValueSource
    {
        Assigned,
        Identity,
    }
}