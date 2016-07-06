using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Ornament.Notify.Templates;

namespace Ornament.Notify
{
    public class NotifyContent
    {
        private IDictionary<string, Template> _contents;

        public NotifyContent(string key)
        {
            if (key == null)
                throw new ArgumentNullException(nameof(key));
            Key = key;
        }

        public virtual string Key { get; private set; }

        public virtual IDictionary<string, Template> Contents => _contents ?? (_contents = new ConcurrentDictionary<string, Template>());
    }
}