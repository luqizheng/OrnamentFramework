using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace Ornament.Web.PortableAreas
{
    public class PortableAreaMap
    {
        public const string MasterPageTemplate = @"MasterPageFile=""{0}""";
        public const string ContentPlaceHolderTemplate = @"ContentPlaceHolderID=""{0}""";
        public const string ContentPlaceHolderPattern = @"<asp:Content .*ContentPlaceHolderID=""{0}.*>";
        protected Dictionary<string, string> Mappings = new Dictionary<string, string>();

        public PortableAreaMap()
        {
            DefaultMasterPageLocation = "~/Views/Shared/Site.Master";
            DefaultTitleID = "TitleContent";
            DefaultBodyID = "MainContent";
        }

        public string DefaultMasterPageLocation { get; set; }
        public string DefaultTitleID { get; set; }
        public string DefaultBodyID { get; set; }

        public string MasterPageLocation { get; set; }

        public string Title
        {
            get
            {
                if (Mappings.ContainsKey(DefaultTitleID))
                    return Mappings[DefaultTitleID];

                return null;
            }
        }

        public string Body
        {
            get
            {
                if (Mappings.ContainsKey(DefaultBodyID))
                    return Mappings[DefaultBodyID];

                return null;
            }
        }

        public Stream Transform(Stream stream)
        {
            string result = string.Empty;

            using (var reader = new StreamReader(stream))
            {
                result = TransformMarkup(reader.ReadToEnd());
            }

            Stream newStream = new MemoryStream(result.Length);
            var writer = new StreamWriter(newStream);
            writer.Write(result, 0, result.Length);
            writer.Flush();
            newStream.Position = 0;

            return newStream;
        }

        protected string TransformMarkup(string input)
        {
            string result = ReplaceMasterPage(input);

            foreach (var pair in Mappings)
            {
                string pattern = string.Format(ContentPlaceHolderPattern, pair.Key);

                result = Regex.Replace(result, pattern, m =>
                {
                    string oldValue = string.Format(ContentPlaceHolderTemplate, pair.Key);
                    string newValue = string.Format(ContentPlaceHolderTemplate, pair.Value);
                    return m.Value.Replace(oldValue, newValue);
                });
            }

            return result;
        }

        private string ReplaceMasterPage(string input)
        {
            string oldLocation = string.Format(MasterPageTemplate, DefaultMasterPageLocation);
            string newLocation = string.Format(MasterPageTemplate, MasterPageLocation);

            if (string.IsNullOrEmpty(MasterPageLocation))
                return input;
            return input.Replace(oldLocation, newLocation);
        }

        public void Add(string defaultID, string newID)
        {
            if (Mappings.ContainsKey(defaultID))
                Mappings[defaultID] = newID;
            else
                Mappings.Add(defaultID, newID);
        }
    }
}