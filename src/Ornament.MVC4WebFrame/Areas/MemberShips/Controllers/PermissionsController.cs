using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Areas.MemberShips.Models;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.Web;
using Qi;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
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

        public ActionResult Index()
        {
            IQueryable<Permission> model = from permission in _memberShipFactory.Permissions
                                           select permission;
            return View(model);
        }



        public ActionResult Edit(string id)
        {
            //1st step of wizard.
            Permission permission = _memberShipFactory.CreatePermissionDao().Get(id);
            return View("Permission", permission);
        }
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult Create()
        {
            var wizard = new PermissionWizard();
            return View(wizard.Next(), wizard);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Edit()
        {
            return View("Permission");
        }



        /// <summary>
        /// </summary>
        /// <param name="wizard"></param>
        /// <param name="forward"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create(PermissionWizard wizard, bool forward)
        {
            string viewName = forward ? wizard.Next() : wizard.Previous();
            if (wizard.IsLast)
            {
                Permission permission = wizard.GetPermission();
                _memberShipFactory.CreatePermissionDao().SaveOrUpdate(permission);
                return RedirectToAction("Index");
            }
            return View(viewName, wizard);
        }


        public ActionResult Delete(string id)
        {
            IPermissionDao dao = _memberShipFactory.CreatePermissionDao();
            Permission permission = dao.Get(id);
            dao.Delete(permission);
            return RedirectToAction("Index");
        }
        /// <summary>
        /// 根据ResourceDescript的设置，生成用于选择Resource 的View
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
            var model = new PermissionResourceSelectModel()
            {
                Description = resourceDescription,
                Permission = permission
            };
            return View(model.Description.Path, model);
        }

        /// <summary>
        /// 
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
            var res = _memberShipFactory.CreateResourceDao()
                .GetResourceByStringId(resourceDescription.ValueType, resourceId);
            Type type = OrnamentContext.ResourceManager.GetOperatorType(res);
            SortedDictionary<string, object> operatorKeyMaping = EnumHelper.GetDescriptionList(type);
            return Json(operatorKeyMaping,JsonRequestBehavior.AllowGet);
        }


    }
}