using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MvcSiteMapProvider;

namespace Ornament.Web.MemberShips
{
    public class OrnamentMvcSiteMapNodeAttribute : MvcSiteMapNodeAttribute
    {
        private string _resource;
        private object _operator;
        


        public OrnamentMvcSiteMapNodeAttribute()
        {
            this.Attributes.Add("permission","");
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
                this.Attributes["permission"]= String.Format("{0}:{1}", Resource, Operator);
            }
        }
    }
}
