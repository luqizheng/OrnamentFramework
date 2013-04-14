using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Reflection;
using System.Web;
using MvcSiteMapProvider;
using Ornament.MemberShip;
using Ornament.MemberShip.Permissions;

namespace Ornament.Web.MemberShips
{
    public class SiteMapPermission
    {
        private readonly Context _context;
        private readonly OperatorResourceMapping _mapping;
        private readonly Dictionary<string, Type> _shotcut = new Dictionary<string, Type>();
        FieldInfo _fieldInfo = null;
        public SiteMapPermission(Context memberContext, OperatorResourceMapping mapping)
        {
            if (memberContext == null)
                throw new ArgumentNullException("memberContext");
            if (mapping == null) throw new ArgumentNullException("mapping");
            _context = memberContext;
            _mapping = mapping;
            InitOperatorShotcut();
        }

        private NameValueCollection FindAttributeSet(SiteMapNode node)
        {
            if (_fieldInfo == null)
            {
                var nodeType = node.GetType();
                while (_fieldInfo == null && nodeType != null)
                {
                    _fieldInfo = nodeType.GetField("_attributes", BindingFlags.NonPublic | BindingFlags.GetField |
                                                                  BindingFlags.Instance);
                    nodeType = nodeType.BaseType;

                }
                if (_fieldInfo == null)
                    throw new ArgumentException("Can't find filed _attributes in " + node.GetType().Name);
            }
            return (NameValueCollection)_fieldInfo.GetValue(node);
        }
        private void InitOperatorShotcut()
        {
            SiteMapNode node = SiteMap.RootNode;
            var attributes = FindAttributeSet(node);

            foreach (string key in attributes.AllKeys)
            {
                if (key.EndsWith("Operator"))
                {
                    Type opType = ValidateOperatorTypeString(attributes.Get(key));
                    _shotcut.Add("@" + key, opType);
                }
            }
        }

        private static Type ValidateOperatorTypeString(string opTypeString)
        {
            Type opType = Type.GetType(opTypeString);
            if (opType == null)
                throw new SiteMapException(opTypeString + " can't find this type in assemblis in sitemap");
            if (!opType.IsEnum)
                throw new SiteMapException(opTypeString + " isn't a enum type in sitemap");
            return opType;
        }

        public bool IsAccessibleToUser(SiteMapNode node)
        {
          
                string operatorExpress = node["operator"];
                if (operatorExpress == null)
                {
                    return node.IsAccessibleToUser(HttpContext.Current);
                }

                Enum operatorVal = GetOperatorType(operatorExpress);
                string typeResource = _mapping.getoperatorVal);
                if (typeResource != null)
                {
                    return _context.HasRight(typeResource, operatorVal);

                }
                try
                {
                    Type resourceType = _mapping.GetResource(operatorVal);
                    return _context.ExistPermission(resourceType, operatorVal);
                }
                catch (NotFindResourceDefinedException)
                {
                    throw new MemberShipPermissionException("can't defined resource relate to opeator which type is " +
                                                            operatorVal.GetType().FullName +
                                                            ", Please add it to Config\\WebCfg.config");
                }
           

        }

        private Enum GetOperatorType(string operatorExpress)
        {
            string[] aryExpress;
            if (operatorExpress.StartsWith("@"))
            {
                aryExpress = operatorExpress.Split('.');
            }
            else
            {
                aryExpress = operatorExpress.Split(':');
                Type opType = ValidateOperatorTypeString(aryExpress[0]);
                if (!_shotcut.ContainsKey(aryExpress[0]))
                {
                    _shotcut.Add(aryExpress[0], opType);
                }
            }
            Type operatorType = _shotcut[aryExpress[0]];
            return (Enum)Enum.Parse(operatorType, aryExpress[1]);
        }
    }

    public class SiteMapException : ApplicationException
    {
        public SiteMapException(string message)
            : base(message)
        {
        }
    }
}