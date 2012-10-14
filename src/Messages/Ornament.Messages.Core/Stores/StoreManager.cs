using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ornament.Messages.Stores
{
    public class StoreManager
    {
        private readonly Dictionary<string, Store> _stores;

        public StoreManager(Dictionary<string, Store> stores)
        {
            _stores = stores;
        }

        public Store Get(string store)
        {
            return _stores[store];
        }
    }
}
