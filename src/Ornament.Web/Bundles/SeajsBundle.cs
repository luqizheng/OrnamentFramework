using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Optimization;
using Microsoft.Ajax.Utilities;

namespace Ornament.Web.Bundles
{
    public class SeajsBundle : ScriptBundle
    {
        public SeajsBundle(string virtualPath)
            : base(virtualPath)
        {
            this.Transforms.Clear();
            this.Transforms.Add(new SeajsMinify());
        }

        public SeajsBundle(string virtualPath, string cdnPath)
            : base(virtualPath, cdnPath)
        {
            this.Transforms.Clear();
            this.Transforms.Add(new SeajsMinify());
        }

    }

    public class SeajsMinify : IBundleTransform
    {

        // Fields
        internal static readonly JsMinify Instance = new JsMinify();
        internal static string JsContentType = "text/javascript";

        // Methods
        internal static void GenerateErrorResponse(BundleResponse bundle, IEnumerable<object> errors)
        {
            StringBuilder builder = new StringBuilder();
            builder.Append("/* ");
            builder.Append("Error").Append("\r\n");
            foreach (object obj2 in errors)
            {
                builder.Append(obj2.ToString()).Append("\r\n");
            }
            builder.Append(" */\r\n");
            builder.Append(bundle.Content);
            bundle.Content = builder.ToString();
        }

        public virtual void Process(BundleContext context, BundleResponse response)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }
            if (response == null)
            {
                throw new ArgumentNullException("response");
            }
            if (!context.EnableInstrumentation)
            {
                Minifier minifier = new Minifier();
                var codeSettings = new CodeSettings
                {
                    EvalTreatment = EvalTreatment.MakeImmediateSafe,
                    PreserveImportantComments = false,
                };
                codeSettings.AddNoAutoRename("require");
                codeSettings.AddNoAutoRename("exports");
                codeSettings.AddNoAutoRename("module");
                string str = minifier.MinifyJavaScript(response.Content, codeSettings);
                if (minifier.ErrorList.Count > 0)
                {
                    GenerateErrorResponse(response, minifier.ErrorList);
                }
                else
                {
                    response.Content = str;
                }
            }
            response.ContentType = JsContentType;
        }
    }


}
