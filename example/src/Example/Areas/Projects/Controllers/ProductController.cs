using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;
using QiProject;
using QiProject.Dao;
using QiProject.Operators;

namespace Ornament.MVCWebFrame.Areas.Projects.Controllers
{
    [ResourceAuthorize(ProductOperator.Read, "Product")]
    public class ProductController : Controller
    {
        private readonly IProjectDaoFactory _dao;
        //
        // GET: /Projects/Product/
        public ProductController(IProjectDaoFactory dao)
        {
            _dao = dao;
        }

        [Session]
        public ActionResult Index()
        {
            IList<Product> item = _dao.ProductDao.GetAll();
            return View(item);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost, Session(Transaction = true)]
        public ActionResult Save([ModelBinder(typeof(NHModelBinder))] Product product, int[] componentsId,
                                 string[] componentsName)
        {
            if (componentsId == null || componentsId.Length == 0)
            {
                ModelState.AddModelError("componentsId", "Require component.");
            }
            bool isEdit = product.Id == 0;
            if (ModelState.IsValid)
            {
                product.Components.Clear();
                _dao.ProductDao.SaveOrUpdate(product);
                IComponentDao componentDao = _dao.ComponentDao;

                for (int index = 0; index < componentsId.Length; index++)
                {
                    int id = componentsId[index];
                    Component component = id == -1 ? (new Component()) : componentDao.Get(id);
                    component.Name = componentsName[index];
                    componentDao.SaveOrUpdate(component);
                    product.Components.Add(component);
                }

                return RedirectToAction("Index");
            }
            return View(isEdit ? "Edit" : "Create", product);
        }

        public ActionResult Edit(int id)
        {
            Product item = _dao.ProductDao.Get(id);
            return View(item);
        }
    }
}