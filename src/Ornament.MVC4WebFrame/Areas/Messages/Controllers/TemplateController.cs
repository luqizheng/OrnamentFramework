﻿using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Models.Messages;
using Ornament.Web;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Session]
    public class TemplateController : Controller
    {
        private readonly IMessageDaoFactory _daoFactory;

        public TemplateController(IMessageDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Messages/Template/

        public ActionResult Index()
        {
            var pagination = new Pagination();
            ViewData["Nav"] = pagination;
            int total;
            IList<MessageTemplate> result = _daoFactory.MessageTemplateDao.GetAll(pagination.CurrentPage,
                                                                                  pagination.PageSize, out total);
            pagination.TotalRows = total;
            return View(result);
        }

        [HttpPost]
        public ActionResult Index(Pagination pagination)
        {
            ViewData["Nav"] = pagination;
            int total;
            IList<MessageTemplate> result = _daoFactory.MessageTemplateDao.GetAll(pagination.CurrentPage,
                                                                                  pagination.PageSize, out total);
            pagination.TotalRows = total;
            return View(result);
        }

        //
        // GET: /Messages/Template/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Messages/Template/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Messages/Template/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Messages/Template/Edit/5

        public ActionResult Edit(string id)
        {
            if (id == null)
                throw new HttpException(404, "Template message not found.");
            var model = _daoFactory.MessageTemplateDao.Get(id);
            return View(new MessageTemplateModel(model));
        }

        //
        // POST: /Messages/Template/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Messages/Template/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Messages/Template/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}