using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    public abstract class ExecuteItem : IExecuteItem
    {
        protected readonly ExecuteBuilder Helper;
        private IList<IExecuteItem> _childs;

        protected ExecuteItem(ExecuteBuilder helper, IExecuteItem parent)
            : this(helper)
        {
            Parent = parent;
        }

        protected ExecuteItem(ExecuteBuilder helper)
        {
            Helper = helper;
            ExecuteOrder = 1;
        }

        private IList<IExecuteItem> Childs
        {
            get { return _childs ?? (_childs = new List<IExecuteItem>()); }
        }

        #region IExecuteItem Members

        public virtual IExecuteItem End()
        {
            Parent.Add(this);
            return this;
        }


        public ExecuteBuilder Begin()
        {
            return Helper;
        }

        public IExecuteItem Parent { get; private set; }

        public void Add(IExecuteItem childItem)
        {
            Childs.Add(childItem);
        }

        public int Count
        {
            get { return _childs == null ? 0 : _childs.Count; }
        }

        public ReadOnlyCollection<IExecuteItem> GetAllChilds()
        {
            return new ReadOnlyCollection<IExecuteItem>(Childs);
        }

        public int ExecuteOrder { get; set; }

        public abstract IExecuteItem Execute();

        #endregion
    }
}