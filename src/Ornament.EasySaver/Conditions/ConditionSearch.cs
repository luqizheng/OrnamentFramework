namespace Ornament.EasySqlExecuter.Conditions
{
    public static class ConditionSearch
    {
        public static ExecuteItem Where(this ExecuteItem item)
        {
            return item;
        }

        public static ExecuteItem Equal(this ExecuteItem item, string columnName, object values)
        {
            return item;
        }
    }
}