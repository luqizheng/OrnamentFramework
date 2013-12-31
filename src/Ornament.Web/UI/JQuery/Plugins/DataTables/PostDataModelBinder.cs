﻿using System;
using System.Web;
using System.Web.Mvc;

namespace Ornament.Web.Plugins.DataTables
{
    public class PostDataModelBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            //Count how many colun in this context.

            HttpRequestBase requestContext = controllerContext.RequestContext.HttpContext.Request;
            int iColumn = Convert.ToInt32(requestContext["iColumns"]);
            var result = new DataTablesPostData
                {
                    DisplayLength = Convert.ToInt32(requestContext["iDisplayLength"]),
                    DisplayStart = Convert.ToInt32(requestContext["iDisplayStart"]),
                    SearchContent = requestContext["sSearch"]
                };
            var sortedColunIndex = Convert.ToInt32(requestContext["iSortCol_0"]);
            var sortedIndex = 0;
            for (int i = 0; i < iColumn; i++)
            {
                string strSorTag = requestContext["sSortDir_" + sortedIndex];
                var column = new Column
                    {
                        SearchContent = requestContext["sSearch_" + i],
                        Sortable = Convert.ToBoolean(requestContext["bSortable_" + i])
                    };

                if (column.Sortable && sortedColunIndex == i)
                {
                    column.SortTag = strSorTag != "false"
                                         ? (SortTag)Enum.Parse(typeof(SortTag), strSorTag, true)
                                         : SortTag.asc;
                    
                }

                result.Columns.Add(column);
            }
            return result;
        }
    }
}