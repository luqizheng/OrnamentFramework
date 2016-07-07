using System;
using System.Collections.Generic;
using System.Linq;

namespace Ornament.Template
{
    public class TemplateContent
    {
        public TemplateContent()
        {
            Replacement = new NamedFormatterHelper();
        }

        public NamedFormatterHelper Replacement { get; }

        public string Name { get; set; }

        public string Content { get; set; } = "";

        public IDictionary<string, string> GetContentVariable()
        {
            var r = Replacement.CollectVariable(Content);
            return r.ToDictionary(s => s, null);
        }

        public string Build(IDictionary<string, string> parameters)
        {
            if (parameters == null)
                throw new ArgumentNullException(nameof(parameters));
            return Replacement.Replace(Content, parameters);
        }
    }
}