using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Reflection;
using Ornament.Messages.Contents;
using Qi;
using Qi.Text;

namespace Ornament.Messages
{
    public class Template
    {
        private string[] _namedFormatter;
        private string _path;
        private string _templateContent;

        protected Template()
        {
        }

        public Template(MessageType messageType)
        {
            MessageType = messageType;
        }

        /// <summary>
        /// Key of this Template Config. may is "edit", "List" or somthing you want to use page
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// Gets or Sets the path of template file;
        /// </summary> 
        public virtual string Path
        {
            get
            {
                if (_path != null)
                {
                    return _path;
                }
                
                var stack = new Stack<string>();
                stack.Push(this.MessageType.Name);
                var parent = MessageType.Parent;
                while (parent != null)
                {
                    stack.Push(parent.Name);
                    parent = parent.Parent;
                }
                string path = "";
                while (stack.Count != 0)
                {
                    path = System.IO.Path.Combine(path, stack.Pop());
                }
                var root = ConfigurationManager.AppSettings["MessageTemplate"] ?? "Messages/Templates";
                path = System.IO.Path.Combine(root, path);
                return System.IO.Path.Combine(path, this.Name + ".htm");
            }
            set { _path = value; }
        }

        /// <summary>
        /// Gets or Sets the version of this instance.
        /// </summary>
        public virtual int Version { get; protected set; }

        /// <summary>
        /// Gets the Type of this template.
        /// </summary>
        public virtual MessageType MessageType { get; protected set; }

        /// <summary>
        /// 
        /// </summary>
        private string TemplateContent
        {
            get
            {
                if (_templateContent == null)
                {
                    string path = ApplicationHelper.MapPath(Path);
                    using (var w = new StreamReader(path))
                    {
                        _templateContent = w.ReadToEnd();
                    }
                }
                return _templateContent;
            }
        }


        /// <summary>
        /// Gets the the variables those defined in the template file,such as [named].
        /// </summary>
        private string[] NamedFormatters
        {
            get
            {
                if (_namedFormatter == null)
                {
                    _namedFormatter = NamedFormatterHelper.CollectVariable(TemplateContent);
                }
                return _namedFormatter;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="content"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public virtual string Fromat(Content content, Message message)
        {
            Dictionary<string, TemplateFormatter> templateValues = content.CreateVariableMaping(message);
            var mapping = new Dictionary<string, string>();
            foreach (string s in NamedFormatters)
            {
                //if couldn't find the Valibel in mapping, it will try to 
                //get value by reflact.
                if (!templateValues.ContainsKey(s))
                {
                    PropertyInfo propertyInfo = content.Value.GetType().GetProperty(s);
                    if (propertyInfo != null)
                    {
                        templateValues[s] = new TemplateFormatter { Value = propertyInfo.GetValue(content.Value, null) };
                    }
                }

                mapping.Add(s, templateValues[s].ToString());
            }

            return NamedFormatterHelper.Replace(TemplateContent, mapping);
        }

        public override bool Equals(object obj)
        {
            var template = obj as Template;
            if (template == null)
                return false;
            return template.Name == Name && template.MessageType.Id == MessageType.Id;
        }

        public override int GetHashCode()
        {
            return (Name + MessageType.Id).GetHashCode();
        }
    }
}