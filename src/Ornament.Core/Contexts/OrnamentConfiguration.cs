using System.Collections.Generic;
using System.Configuration;
using Ornament.Models;

namespace Ornament.Contexts
{
    public class OrnamentConfiguration
    {
        private readonly LanguageCollection _languages = new LanguageCollection();
        private MessagesConfig _messagesConfig;

        private ApplicationSetting _setting;
        /// <summary>
        /// 
        /// </summary>

        public ApplicationSetting ApplicationSetting
        {
            get { return _setting ?? (_setting = new ApplicationSetting()); }
        }
        /// <summary>
        /// 
        /// </summary>
        public MessagesConfig MessagesConfig
        {
            get { return _messagesConfig ?? (_messagesConfig = new MessagesConfig()); }
        }

        
        /// <summary>
        /// 
        /// </summary>
        public LanguageCollection Languages
        {
            get { return _languages; }
        }

        private Language _language;
        /// <summary>
        /// 
        /// </summary>
        public Language DefaultLanguage
        {
            get
            {
                if (_language != null)
                    return _language;
                if (_languages.Count == 0)
                    throw new OrnamentException("Please set the language");
                _language = Languages[0];
                foreach (var lang in _languages)
                {
                    if (lang.IsDefault)
                    {
                        _language = lang;
                        break;
                    }

                }
                return _language;
            }
        }
    }
}