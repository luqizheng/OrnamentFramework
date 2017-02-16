#region Using

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

#endregion

namespace WebApplication.Helpers
{
    public class PanelOption
    {
        public PanelOption()
        {
            EditButton = false;
            Collapsed = true;
        }

        public string Id { get; set; }
        public bool EditButton { get; set; }
        public bool ColorButton { get; set; }
        public bool ToggleButton { get; set; }
        public bool DeleteButton { get; set; }
        public bool FullScreenButton { get; set; }
        public bool CustomButton { get; set; }
        public bool Collapsed { get; set; }
        public bool Sortable { get; set; }

        public Dictionary<string, object> HtmlAttributes { get; set; }


        public void InitPanle(TagBuilder div)
        {
            /*data-widget-editbutton="false">
					
					data-widget-colorbutton="false"	
					data-widget-editbutton="false"
					data-widget-togglebutton="false"
					data-widget-deletebutton="false"
					data-widget-fullscreenbutton="false"
					data-widget-custombutton="false"
					data-widget-collapsed="true" 
					data-widget-sortable="false"*/
            var direct = new Dictionary<string, object>();
            if (!EditButton)
            {
                direct.Add("data-widget-editbutton", EditButton.ToString().ToLower());
            }
            if (!ColorButton)
            {
                direct.Add("data-widget-colorbutton", ColorButton.ToString().ToLower());
            }
            if (!ToggleButton)
            {
                direct.Add("data-widget-togglebutton", ToggleButton.ToString().ToLower());
            }
            if (!DeleteButton)
            {
                direct.Add("data-widget-deletebutton", DeleteButton.ToString().ToLower());
            }
            if (!FullScreenButton)
            {
                direct.Add("data-widget-fullscreenbutton", FullScreenButton.ToString().ToLower());
            }
            if (!Collapsed)
            {
                direct.Add("data-widget-collapsed", Collapsed.ToString().ToLower());
            }

            if (Sortable)
            {
                direct.Add("data-widget-sortable", Sortable.ToString().ToLower());
            }


            div.MergeAttributes(direct);
        }
    }
}