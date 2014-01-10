using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Plugin.Models;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Qi;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers
{
    [Authorize]
    [Session]
    public class PermissionsController : Controller
    {
        private readonly IMemberShipFactory _memberShipFactory;

        public PermissionsController(IMemberShipFactory factory)
        {
            _memberShipFactory = factory;
        }

        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,permissionListTitle",
            ParentKey = "MemberShips", Key = "Permission",
            Resource = "Permission", Operator = PermissionOperator.Read),
         ResourceAuthorize(PermissionOperator.Read, "Permission")]
        public ActionResult Index()
        {
            IQueryable<Permission> model = from permission in _memberShipFactory.Permissions
                select permission;
            return View(model);
        }

        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,permissionEditTitle",
            ParentKey = "Permission",
            Resource = "Permission", Operator = PermissionOperator.Edit),
         ResourceAuthorize(PermissionOperator.Edit, "Permission")]
        public ActionResult Edit(string id)
        {
            //1st step of wizard.
            Permission permission = _memberShipFactory.CreatePermissionDao().Get(id);
            return View("Permission", permission);
        }

        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,permissionCreateTitle",
            ParentKey = "Permission",
            Resource = "Permission", Operator = PermissionOperator.Edit),
         ResourceAuthorize(PermissionOperator.Edit, "Permission")]
        public ActionResult Create()
        {
            return View("Permission");
        }

        /// <summary>
        /// </summary>
        /// <param name="id">permission id</param>
        /// <param name="descriptionResourceName"></param>
        /// <param name="name"></param>
        /// <param name="remark"></param>
        /// <param name="resourceId"></param>
        /// <param name="operators"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post), ResourceAuthorize(PermissionOperator.Edit, "Permission")]
        public ActionResult Save(string id, string descriptionResourceName, string name, string remark,
            string resourceId, int operators)
        {
            ResourceDescription resourceDescription = OrnamentContext.ResourceManager.Configuration()
                .Get(descriptionResourceName);

            Permission permission;

            if (!string.IsNullOrEmpty(id))
                permission = _memberShipFactory.CreatePermissionDao().Get(id);
            else
                permission = Permission.CreatePermission(resourceDescription.ValueType);
            IResourceDao dao = _memberShipFactory.CreateResourceDao();
            permission.Name = name;
            permission.Remark = remark;
            permission.Resource = dao.GetResourceByStringId(resourceDescription.ValueType, resourceId);
            permission.Operator = operators;

            _memberShipFactory.CreatePermissionDao().SaveOrUpdate(permission);
            return RedirectToAction("Index");
        }

        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,permissionDeleteTitle",
            ParentKey = "Permission",
            Resource = "Permission", Operator = PermissionOperator.Edit),
         ResourceAuthorize(PermissionOperator.Delete, "Permission")]
        public ActionResult Delete(string id)
        {
            IPermissionDao dao = _memberShipFactory.CreatePermissionDao();
            Permission permission = dao.Get(id);
            dao.Delete(permission);
            return RedirectToAction("Index");
        }

        /// <summary>
        ///     根据ResourceDescript的设置，生成用于选择Resource 的View
        /// </summary>
        /// <param name="id">res description's name</param>
        /// <param name="permissionId">permissionId</param>
        /// <returns></returns>
        public ActionResult ChoiceResourceView(string id, string permissionId)
        {
            ResourceDescription resourceDescription = OrnamentContext.ResourceManager.Configuration()
                .Get(id);

            Permission permission = null;
            if (!string.IsNullOrEmpty(permissionId))
                permission = _memberShipFactory.CreatePermissionDao().Get(permissionId);
            else
                permission = Permission.CreatePermission(resourceDescription.ValueType);
            var model = new PermissionResourceSelectModel
            {
                Description = resourceDescription,
                Permission = permission
            };
            return View(model.Description.Path, model);
        }

        /// <summary>
        /// </summary>
        /// <param name="id">res description's name</param>
        /// <param name="permissionId">permission's id, if any, it's null</param>
        /// <param name="resourceId">resource Id</param>
        /// <returns></returns>
        public ActionResult Operators(string id,
            string permissionId,
            string resourceId)
        {
            ResourceDescription resourceDescription = OrnamentContext.ResourceManager.Configuration()
                .Get(id);
            object res = _memberShipFactory.CreateResourceDao()
                .GetResourceByStringId(resourceDescription.ValueType, resourceId);
            Type type = OrnamentContext.ResourceManager.GetOperatorType(res);
            SortedDictionary<string, object> operatorKeyMaping = EnumHelper.GetDescriptionList(type);
            return Json(operatorKeyMaping, JsonRequestBehavior.AllowGet);
        }
    }
}