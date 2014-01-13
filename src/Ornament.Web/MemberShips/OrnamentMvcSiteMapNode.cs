using System;
using MvcSiteMapProvider;

namespace Ornament.Web.MemberShips
{
    public class OrnamentMvcSiteMapNodeAttribute : MvcSiteMapNodeAttribute
    {
        private object _operator;
        private string _resource;

        public OrnamentMvcSiteMapNodeAttribute(string resource,object @operator)
        {
            this.Resource = resource;
            this.Operator = @operator;
        }
        public OrnamentMvcSiteMapNodeAttribute()
        {
            Attributes.Add("permission", "");
        }

        public string Resource
        {
            get { return _resource; }
            set
            {
                _resource = value;
                SetPermissionAttr();
            }
        }

        public object Operator
        {
            get { return _operator; }
            set
            {
                _operator = value;
                SetPermissionAttr();
            }
        }

        private void SetPermissionAttr()
        {
            if (_resource != null && _operator != null)
            {
                Attributes["permission"] = String.Format("{0}:{1}", Resource, Operator);
            }
        }
    }
}