using System;
using System.IO;
using System.Xml.Serialization;

namespace Ornament.Templates
{
    public static class TemplateManager
    {
        public static T Get<T>(string path)
        {
            FileStream fs = null;
            fs = new FileStream(path, FileMode.Open, FileAccess.Read);
            try
            {
                var xs = new XmlSerializer(typeof(T));

                return (T)xs.Deserialize(fs);
            }
            finally
            {
                fs.Close();
            }
        }

        public static void Set<T>(string path, T tempalteObject) where T : class
        {
            if (tempalteObject == null)
                throw new ArgumentNullException("tempalteObject");

            var fs = new FileStream(path, FileMode.Create, FileAccess.Write);
            try
            {
                var xs = new XmlSerializer(typeof(T));
                xs.Serialize(fs, tempalteObject);
            }
            finally
            {
                fs.Close();
            }
        }

        public static EmailTemplate GetEmail(string path)
        {
            return Get<EmailTemplate>(path);
        }
    }
}