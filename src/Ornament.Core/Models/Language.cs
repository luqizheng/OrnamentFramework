namespace Ornament.Models
{
    public class Language
    {
        private string[] _matchKey;

        public Language(string name, string key)
        {
            Name = name;
            Key = key;
        }
        /// <summary>
        /// Language on UI
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        ///  CultureInfo.GetCultureInfo(Key);
        /// </summary>
        public string Key { get; set; }
        /// <summary>
        /// 是不是默认语言。
        /// </summary>
        public bool IsDefault { get; set; }

        /// <summary>
        /// 以下的Key都会被认为这个语言匹配一致
        /// </summary>
        public string[] MatchKey
        {
            get { return _matchKey??(new string[0]); }
            set { _matchKey = value; }
        }
    }
}