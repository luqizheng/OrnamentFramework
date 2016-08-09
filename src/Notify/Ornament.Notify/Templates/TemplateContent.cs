using System;
using System.Collections.Generic;
using System.Linq;

namespace Ornament.Template
{
    /// <summary>
    /// Class TemplateContent.
    /// </summary>
    public class TemplateContent
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TemplateContent"/> class.
        /// </summary>
        public TemplateContent()
        {
            Replacement = new NamedFormatterHelper();
        }

        /// <summary>
        /// Gets the replacement.
        /// </summary>
        /// <value>The replacement.</value>
        public NamedFormatterHelper Replacement { get; }


        /// <summary>
        /// Gets or sets the content.
        /// </summary>
        /// <value>The content.</value>
        public string Content { get; set; } = "";

        /// <summary>
        /// Gets the content variable.
        /// </summary>
        /// <returns>IDictionary&lt;System.String, System.String&gt;.</returns>
        public IDictionary<string, string> GetContentVariable()
        {
            var r = Replacement.CollectVariable(Content);
            return r.ToDictionary(s => s, null);
        }

        /// <summary>
        /// Builds the specified parameters.
        /// </summary>
        /// <param name="parameters">The parameters.</param>
        /// <returns>System.String.</returns>
        /// <exception cref="ArgumentNullException"></exception>
        public string Build(IDictionary<string, string> parameters)
        {
            if (parameters == null)
                throw new ArgumentNullException(nameof(parameters));
            return Replacement.Replace(Content, parameters);
        }
    }
}