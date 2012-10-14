using System;
using System.Linq;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Areas.MemberShips.Models;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.Web;
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
            var wizard = new PermissionWizard(permission);
            return View(wizard.Next(), wizard);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="wizard"></param>
        /// <param name="forward"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Edit(PermissionWizard wizard, bool forward)
        {
            return Create(wizard, forward);
        }
        /// <summary>
        /// </summary>
        /// <param name="id">Permission's id</param>
        /// <returns></returns>
        public ActionResult Create()
        {
            var wizard = new PermissionWizard();
            return View(wizard.Next(), wizard);
        }

        /// <summary>
        /// 
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
    }
}