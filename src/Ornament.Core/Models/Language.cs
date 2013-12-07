namespace Ornament.Models
{
    public class Language
    {
        public Language(string name, string key)
        {
            Name = name;
            Key = key;
        }

        public string Name { get; set; }
        public string Key { get; set; }
        public bool IsDefault { get; set; }
    }
}