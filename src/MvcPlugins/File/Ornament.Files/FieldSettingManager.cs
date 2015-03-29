using System;
using System.Collections.Generic;
using System.Linq;
using Ornament.Files.Dao;
using Ornament.Files.FieldSettings;

namespace Ornament.Files
{
    public static class FieldSettingManager
    {
        public static IList<FieldSetting> Create(Type fieldSettingTypeUseAttribute)
        {
            object[] attributes = fieldSettingTypeUseAttribute.GetCustomAttributes(typeof (FieldSettingAttribute), true);
            List<FieldSetting> settings =
                (from FieldSettingAttribute attr in attributes select attr.GetFieldSetting()).ToList();

            return settings;
        }
    }
}