using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Ornament.Template
{
    /// <summary>
    /// </summary>
    public class NamedFormatterHelper
    {
        private string _startPlaceholder;
        private string _endPlaceHolder;
        private const string PatternTemplate = @"{0}([^{0}{1}])*{1}";

        /// <summary>
        /// </summary>
        public NamedFormatterHelper()
        {
            StartPlaceholder = "\\[";
            EndPlaceHolder = "\\]";
        }

        private string Pattern => string.Format(PatternTemplate, StartPlaceholder, EndPlaceHolder);

        /// <summary>
        ///     Start Placholder default is "["
        /// </summary>
        public string StartPlaceholder
        {
            get { return _startPlaceholder; }
            set
            {
                if (value == null)
                    throw new ArgumentNullException(nameof(value));
                _startPlaceholder = value;
            }
        }

        /// <summary>
        ///     End Placeholder default is "]"
        /// </summary>
        public string EndPlaceHolder
        {
            get { return _endPlaceHolder; }
            set
            {
                if(value==null)
                    throw new ArgumentNullException(nameof(value));
                _endPlaceHolder = value;
            }
        }

        /// <summary>
        ///     use replacePatten to replace Variables those in ormatString,
        ///     Variable need to defined in  square brackets, such as like that "[var]"
        /// </summary>
        /// <param name="formatString"></param>
        /// <param name="replacePattern">a dictionary with key and value,the key without "["</param>
        /// <returns></returns>
        public string Replace(string formatString, IDictionary<string, string> replacePattern)
        {
            if (formatString == null) throw new ArgumentNullException(nameof(formatString));
            if (replacePattern == null)
                throw new ArgumentNullException(nameof(replacePattern));
            var rex = new Regex(Pattern, RegexOptions.IgnoreCase);
            //rex = new Regex(pattern, RegexOptions.IgnoreCase);

            return rex.Replace(formatString, match =>
            {
                var key = match.Value.Substring(1, match.Value.Length - 2);
                return replacePattern.ContainsKey(key) ? replacePattern[key] : match.Value;
            });
        }

        /// <summary>
        ///     Collect variable express in content, such as "I am a [varName]"
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>
        public string[] CollectVariable(string content)
        {
            if (content == null)
                throw new ArgumentNullException(nameof(content));


            var rex = new Regex(Pattern, RegexOptions.Multiline | RegexOptions.IgnoreCase);

            var groups = rex.Matches(content);


            var result = new List<string>();

            for (var i = 0; i < groups.Count; i++)
            {
                var s = groups[i].Value;
                s = s.Substring(1, s.Length - 2);
                if (!result.Contains(s))
                {
                    result.Add(s);
                }
            }
            return result.ToArray();
        }
    }
}