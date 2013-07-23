using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;
using log4net;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Session]
    public class NotifyController : Controller
    {
        private readonly IMessageDaoFactory _daoFactory;
        private readonly IMemberShipFactory _memberShipFactory;
        private readonly IMessageDao _messageDao;

        public NotifyController(IMessageDaoFactory daoFactory, IMemberShipFactory memberShipFactory)
        {
            _daoFactory = daoFactory;
            _memberShipFactory = memberShipFactory;
            _messageDao = daoFactory.MessageDao;
        }

        public ActionResult Index()
        {
            var pagination = new Pagination();
            ViewData["nav"] = pagination;

            int total = 0;
            IList<NotifyMessage> result = _messageDao.GetAll(pagination.PageSize, pagination.CurrentPage,
                                                                   out total);
            pagination.TotalNumber = total;

            return View(result);
        }

        [HttpPost]
        public ActionResult Index(Pagination pagination)
        {
            int total;
            IList<NotifyMessage> result = _messageDao.GetAll(pagination.PageSize, pagination.CurrentPage,
                                                                   out total);
            pagination.TotalNumber = total;
            ViewData["nav"] = pagination;
            return View(result);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
                throw new HttpException(404, "Can't find resources.");
            NotifyMessage notifyMessage = _messageDao.Get(id.Value);
            ViewData["types"] = _daoFactory.NewsTypeDao.GetAll();
            return View("Edit", notifyMessage);
        }


        public ActionResult Create()
        {
            ViewData["types"] = _daoFactory.NewsTypeDao.GetAll();
            return View("Edit");
        }

        [ResourceAuthorize(MessageOperator.Delete, "Message")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
                throw new HttpException(404, "cant' delete empty notify message.");
            try
            {
                _messageDao.Delete(_messageDao.Get(id.Value));
                return Json(new {success = true}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(GetType()).Error(ex.Message, ex);
                return Json(new {success = false, message = ex.Message}, JsonRequestBehavior.AllowGet);
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

            IUserDao userDao = _memberShipFactory.CreateUserDao();
            if (roles != null)
            {
                foreach (string role in roles.Split(','))
                {
                    foreach (User a in userDao.GetUsersInRole(role))
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
                    foreach (User a in userDao.GetUsers(org))
                    {
                        notifyMessage.Readers.Add(new Reader(a, notifyMessage));
                    }
                }
            }

            if (userGroups != null)
            {
                foreach (UserGroup ug in _memberShipFactory.CreateUserGroupDao().GetByIds(userGroups.Split(',')))
                {
                    foreach (User a in userDao.GetUsers(ug))
                    {
                        notifyMessage.Readers.Add(new Reader(a, notifyMessage));
                    }
                }
            }

            _daoFactory.MessageDao.SaveOrUpdate(notifyMessage);
            return RedirectToAction("Index");
        }
    }
}