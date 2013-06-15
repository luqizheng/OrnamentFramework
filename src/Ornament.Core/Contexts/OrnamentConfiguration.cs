using System.Collections.Generic;
using Ornament.Models;

namespace Ornament.Contexts
{
    public class OrnamentConfiguration
    {
        private readonly LanguageCollection _languages = new LanguageCollection();
        private MessagesConfig _messagesConfig;

        private ApplicationSetting _setting;


        public ApplicationSetting ApplicationSetting
        {
            get { return _setting ?? (_setting = new ApplicationSetting()); }
        }

        public MessagesConfig MessagesConfig
        {
            get { return _messagesConfig ?? (_messagesConfig = new MessagesConfig()); }
        }


        public LanguageCollection Languages
        {
            get { return _languages; }
        }
    }
}