using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Ornament.EasySqlExecuter.Drivers;
using Ornament.EasySqlExecuter.ExecuteItems;

namespace Ornament.EasySqlExecuter
{
    /// <summary>
    /// data helper.
    /// </summary>
    public sealed class DataHelper : IExecuteItem
    {
        /// <summary>
        /// ready execute items.
        /// </summary>
        private readonly List<IExecuteItem> _readyExecuteItems = new List<IExecuteItem>();

        /// <summary>
        /// Prevents a default instance of the <see cref="DataHelper"/> class from being created.
        /// </summary>
        private DataHelper()
        {
        }

        public IDriver Driver { get; set; }

        #region IExecuteItem Members

        public int Count
        {
            get { return _readyExecuteItems.Count; }
        }

        IExecuteItem IExecuteItem.Parent
        {
            get { return null; }
        }

        public void Add(IExecuteItem childItem)
        {
            _readyExecuteItems.Add(childItem);
        }

        ReadOnlyCollection<IExecuteItem> IExecuteItem.GetAllChilds()
        {
            return new ReadOnlyCollection<IExecuteItem>(_readyExecuteItems);
        }

        int IExecuteItem.ExecuteOrder
        {
            get { return 1; }
            set { }
        }

        IExecuteItem IExecuteItem.End()
        {
            return this;
        }

        /// <summary>
        /// Ö´ÐÐËùÓÐ
        /// </summary>
        public IExecuteItem Execute()
        {
            var executeItems = new List<IExecuteItem>(_readyExecuteItems.Count);
            BuildTheExecuteList(_readyExecuteItems, this, executeItems);

            executeItems.Sort((x, y) => x.ExecuteOrder.CompareTo(y.ExecuteOrder));
            bool hasError = false;
            Driver.Open();
            try
            {
                foreach (SqlExecuteItem item in executeItems)
                {
                    item.Execute();
                }
                _readyExecuteItems.Clear();
                return this;
            }
            catch (Exception ex)
            {
                hasError = true;
                throw ex;
            }
            finally
            {
                Driver.Close(hasError);
            }
        }

        public ExecuteBuilder Begin()
        {
            return new ExecuteBuilder(this, Driver);
        }

        #endregion

        private static void BuildTheExecuteList(IEnumerable<IExecuteItem> childNodes, IExecuteItem parent,
                                         List<IExecuteItem> items)
        {
            foreach (IExecuteItem childNode in childNodes)
            {
                childNode.ExecuteOrder = childNode.ExecuteOrder * parent.ExecuteOrder * 10;
                items.Add(childNode);
                if (childNode.Count != 0)
                {
                    BuildTheExecuteList(childNode.GetAllChilds(), childNode, items);
                }
            }
        }

        /// <summary>
        /// instance.
        /// </summary>
        /// <returns>
        /// </returns>
        public static DataHelper CreateInstance()
        {
            return new DataHelper();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="driver"></param>
        /// <returns></returns>
        public static DataHelper CreateInstance(IDriver driver)
        {
            return CreateInstance().Initailze(driver);
        }

        /// <summary>
        /// initailze.
        /// </summary>
        /// <param name="driver">
        /// The driver.
        /// </param>
        /// <returns>
        /// </returns>
        public DataHelper Initailze(IDriver driver)
        {
            if (driver == null) throw new ArgumentNullException("driver");
            Driver = driver;
            return this;
        }
    }
}