﻿using System.Collections.Generic;
using System.Web;
using MvcSiteMapProvider;

namespace Ornament.Web
{
    /// <summary>
    /// 
    /// </summary>
    public class MainMenu
    {
        public MainMenu()
        {
            this.Actived = false;
        }
        private IList<MainMenu> _subMenus;

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
                return this.Current.Url;

            }
        }
        /// <summary>
        /// 
        /// </summary>
        public IList<MainMenu> SubMenus
        {
            get { return _subMenus ?? (_subMenus = new List<MainMenu>()); }
        }
    }
}