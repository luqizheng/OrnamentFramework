using System;
using Ornament.MemberShip.Permissions;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Models
{
    public class PermissionWizard
    {
        private readonly string[] _wizardDirect = new[]
            {
                "ChoiceResourceType", //选择资源的类型
                "ChoiceResource", //选择资源
                "EditPermission", //编辑许可证的内容
                "Typography",
            };

        private string _descriptionResourceName;

        public PermissionWizard(Permission permission)
            : this()
        {
            if (permission == null) throw new ArgumentNullException("permission");
            Type operatorType = Context.GetOperatorType(permission.Resource);
            Name = permission.Name;
            Remark = permission.Remark;
            Operator = Permission.FindValues(permission.Operator, operatorType);
            DescriptionResourceName =
                OrnamentContext.Configuration.GetResourceSettingByType(permission.Resource.GetType()).Name;
        }

        public PermissionWizard()
        {
            CurrentStep = -1;
        }

        /// <summary>
        ///     当前Wizard的位置
        /// </summary>
        public int CurrentStep { get; set; }

        /// <summary>
        ///     Gets or sets the resource's id
        /// </summary>
        public string ResourceId { get; set; }

        /// <summary>
        /// </summary>
        public Type ResourceType
        {
            get { return OrnamentContext.Configuration.Get(_descriptionResourceName).ValueType; }
        }

        /// <summary>
        ///     资源描述的名称，定义在配置文件中，一般是在Config/WebCfg.config中的
        /// </summary>
        public string DescriptionResourceName
        {
            get { return _descriptionResourceName; }
            set { _descriptionResourceName = value; }
        }

        public string Id { get; set; }

        /// <summary>
        ///     Gets or sets the PermissionId
        /// </summary>
        public string Remark { get; set; }

        public string Name { get; set; }

        public int[] Operator { get; set; }

        /// <summary>
        ///     表示现在是否在选择资源
        /// </summary>
        public bool IsChoiceResource
        {
            get { return CurrentStep == 1; }
        }

        public bool IsEditPermission
        {
            get { return CurrentStep == 2; }
        }

        public bool IsChoiceResourceType
        {
            get { return CurrentStep == 0; }
        }

        /// <summary>
        ///     Indecate is last step or not
        /// </summary>
        public bool IsLast
        {
            get { return CurrentStep == _wizardDirect.Length - 1; }
        }

        /// <summary>
        ///     上一步
        /// </summary>
        /// <returns></returns>
        public string Previous()
        {
            CurrentStep -= 1;
            return _wizardDirect[CurrentStep];
        }

        /// <summary>
        ///     下一步
        /// </summary>
        /// <returns></returns>
        public string Next()
        {
            CurrentStep += 1;
            return _wizardDirect[CurrentStep];
        }

        public Permission GetPermission()
        {
            Permission result = Id != null
                                    ? OrnamentContext.Current.MemberShipFactory().CreatePermissionDao().Load(Id)
                                    : Permission.CreatePermission(ResourceType);
            if (result.Resource == null && ResourceId != null)
            {
                result.Resource = OrnamentContext.Current.GetResource(ResourceType, ResourceId);
            }
            if (Operator != null)
            {
                int opValue = 0;
                foreach (int op in Operator)
                {
                    if (op == 0)
                    {
                        opValue = 0;
                        break;
                    }
                    opValue |= op;
                }
                result.Operator = opValue;
            }
            result.Name = Name;
            result.Remark = Remark;
            return result;
        }
    }
}