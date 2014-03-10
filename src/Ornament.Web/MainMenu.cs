using System.Collections.Generic;
using MvcSiteMapProvider;

namespace Ornament.Web
{
    /// <summary>
    /// </summary>
    public class MainMenu
    {
        private IList<MainMenu> _subMenus;

        public MainMenu()
        {
            Actived = false;
        }

        /// <summary>
        /// </summary>
        public ISiteMapNode Current { get; set; }

        /// <summary>
        /// </summary>
        public bool Actived { get; set; }

        /// <summary>
        /// </summary>
        public string Url
        {
            get
            {
                if (!Current.Clickable)
                {
                    return "#";
                }
                return Current.Url;
            }
        }

        /// <summary>
        /// </summary>
        public IList<MainMenu> SubMenus
        {
            get { return _subMenus ?? (_subMenus = new List<MainMenu>()); }
        }
    }
}