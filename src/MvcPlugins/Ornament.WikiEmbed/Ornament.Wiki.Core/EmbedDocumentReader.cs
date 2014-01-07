using System;
using System.IO;
using System.Reflection;
using WikiPlex;

namespace Ornament.Wiki.Core
{
    public class EmbedDocumentReader
    {
        public static string Reader(string path, Assembly assembly)
        {
            Stream stream = assembly.GetManifestResourceStream(path);
            if (stream == null)
            {
                throw new Exception();
            }
            var engine = new WikiEngine();
            using (var text = new StreamReader(stream))
            {
                return engine.Render(text.ReadToEnd());
            }
        }
    }
}