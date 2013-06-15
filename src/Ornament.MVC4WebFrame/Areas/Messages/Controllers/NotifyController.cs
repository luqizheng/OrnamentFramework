using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Session]
    public class NotifyController : Controller
    {
        private readonly IMessageDaoFactory _daoFactory;
        private readonly IMemberShipFactory _memberShipFactory;
        private readonly INotifyMessageDao _notifyMessageDao;

        public NotifyController(IMessageDaoFactory daoFactory, IMemberShipFactory memberShipFactory)
        {
            _daoFactory = daoFactory;
            _memberShipFactory = memberShipFactory;
            _notifyMessageDao = daoFactory.NotifyMessageDao;
        }

        public ActionResult Index(MessageSearcher searcher, Pagination pagination)
        {
            ViewData["nav"] = (pagination ?? (pagination = new Pagination()));
            int totalNumber;
            IList<NotifyMessage> result = _notifyMessageDao.GetNewNotifyMessages(pagination.PageSize, pagination.CurrentPage,  out totalNumber);
            pagination.SetTotalPage(totalNumber);
            return View(result);
        }

        public ActionResult Edit(string id)
        {
            NotifyMessage notifyMessage = _notifyMessageDao.Get(id);
            ViewData["types"] = _daoFactory.MessageTypeDao.GetAll();
            return View("Edit", notifyMessage);
        }


        public ActionResult Create()
        {
            ViewData["types"] = _daoFactory.MessageTypeDao.GetAll();
            return View("Edit");
        }
        [ResourceAuthorize(MessageOperator.Delete, "Message")]
        public ActionResult Delete(string id)
        {
            try
            {
                _notifyMessageDao.Delete(_notifyMessageDao.Get(id));
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                log4net.LogManager.GetLogger(this.GetType()).Error(ex.Message, ex);
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost, Session(true, Transaction = true), ValidateInput(false)]
        public ActionResult Save(NotifyMessage notifyMessage, IDictionary<string, string> newContents,
                                 IDictionary<string, string> newSubjects, string users, string userGroups, string roles,
                                 string orgs)
        {
            notifyMessage.Contents.Clear();

            foreach (string key in newContents.Keys)
            {
                notifyMessage.Contents.Add(key, new Content
                    {
                        Language = key,
                        Value = newContents[key],
                        Subject = newSubjects[key]
                    });
            }
           
            var userDao = _memberShipFactory.CreateUserDao();
            if (roles != null)
            {

                foreach (var role in roles.Split(','))
                {
                    foreach (var a in userDao.GetUsersInRole(role))
                    {
                        notifyMessage.Readers.Add(new Reader(a, notifyMessage));
                    }
                }
            }
            if (users != null)
            {
                foreach (User user in _memberShipFactory.CreateUserDao().GetUsersByIds(users.Split(',')))
                {
                    notifyMessage.Readers.Add(new Reader(user, notifyMessage));
                }
            }

            if (orgs != null)
            {
                foreach (Org org in _memberShipFactory.CreateOrgDao().GetOrgs(orgs.Split(',')))
                {

                    foreach (var a in userDao.GetUsers(org))
                    {
                        notifyMessage.Readers.Add(new Reader(a, notifyMessage));
                    }

                }
            }

            if (userGroups != null)
            {
                foreach (UserGroup ug in _memberShipFactory.CreateUserGroupDao().GetByIds(userGroups.Split(',')))
                {
                    foreach (var a in userDao.GetUsers(ug))
                    {
                        notifyMessage.Readers.Add(new Reader(a, notifyMessage));
                    }
                }
            }

            _daoFactory.NotifyMessageDao.SaveOrUpdate(notifyMessage);
            return RedirectToAction("Index");
        }
    }
}