namespace Ornament.EasySqlExecuter
{
    public enum LogicJoin
    {
        And,
        Or,
    }

    public class Field
    {
        public Field(string name)
        {
            Name = name;
        }

        public string Name { get; set; }

        public LogicJoin Join { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}