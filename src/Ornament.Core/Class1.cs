using System;
using Iesi.Collections.Generic;

namespace Ornament
{
    //Following code form http://www.google.com.hk/search?q=%E8%80%81%E8%B5%B5+nhibernate+%E5%8F%8C%E5%90%91%E5%85%B3%E8%81%94&aq=f&oq=%E8%80%81%E8%B5%B5+nhibernate+%E5%8F%8C%E5%90%91%E5%85%B3%E8%81%94&sourceid=chrome&ie=UTF-8;
    public enum ItemChangedType
    {
        Added,
        Removed
    }

    public class ItemChangedEventArgs<T> : EventArgs
    {
        public ItemChangedEventArgs(ItemChangedType type, T item)
        {
            this.Type = type;
            this.Item = item;
        }

        public ItemChangedType Type { get; private set; }

        public T Item { get; private set; }
    }

    public interface IObservableSet<T> : ISet<T>
    {
        event EventHandler<ItemChangedEventArgs<T>> ItemChanged;
    }

    public class ObservableSet<T> : HashedSet<T>, IObservableSet<T>
    {
        public override bool Add(T o)
        {
            if (base.Add(o))
            {
                var e = new ItemChangedEventArgs<T>(ItemChangedType.Added, o);
                this.OnItemChanged(e);
                return true;
            }

            return false;
        }

        public override bool Remove(T o)
        {
            if (base.Remove(o))
            {
                var e = new ItemChangedEventArgs<T>(ItemChangedType.Removed, o);
                this.OnItemChanged(e);
                return true;
            }

            return false;
        }

        public event EventHandler<ItemChangedEventArgs<T>> ItemChanged;

        protected void OnItemChanged(ItemChangedEventArgs<T> e)
        {
            var itemChanged = this.ItemChanged;
            if (itemChanged != null) itemChanged(this, e);
        }
    }
}
