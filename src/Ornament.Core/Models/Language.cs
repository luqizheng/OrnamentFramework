using System.Globalization;

namespace Ornament.Models
{
    public class Language
    {
        public Language(string name, string key)
        {
            Name = name;
            Key = key;
            CultureInfo = CultureInfo.GetCultureInfo(key);
        }

        /// <summary>
        ///     Language on UI
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///     CultureInfo.GetCultureInfo(Key);
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        ///     是不是默认语言。
        /// </summary>
        public bool IsDefault { get; set; }

        public CultureInfo CultureInfo { get; private set; }
    }
}