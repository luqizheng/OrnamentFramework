using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Session]
    public class MessageController : Controller
    {
        private readonly IMessageDaoFactory _daoFactory;
        private readonly IMemberShipFactory _memberShipFactory;
        private readonly IMessageDao _messageDao;

        public MessageController(IMessageDaoFactory daoFactory, IMemberShipFactory memberShipFactory)
        {
            _daoFactory = daoFactory;
            _memberShipFactory = memberShipFactory;
            _messageDao = daoFactory.MessageDao;
        }

        public ActionResult Index(MessageSearcher searcher, Pagination pagination)
        {
            ViewData["nav"] = (pagination ?? (pagination = new Pagination()));
            int totalNumber;
            IList<Message> result = _messageDao.FindMessage(pagination.PageSize, pagination.CurrentPage, null, false, out totalNumber);
            pagination.SetTotalPage(totalNumber);
            return View(result);
        }

        public ActionResult Edit(string id)
        {
            Message message = _messageDao.Get(id);
            ViewData["types"] = _daoFactory.MessageTypeDao.GetAll();
            return View("Edit", message);
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
                _messageDao.Delete(_messageDao.Get(id));
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                log4net.LogManager.GetLogger(this.GetType()).Error(ex.Message, ex);
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost, Session(true, Transaction = true), ValidateInput(false)]
        public ActionResult Save(Message message, IDictionary<string, string> newContents,
                                 IDictionary<string, string> newSubjects, string users, string userGroups, string roles,
                                 string orgs)
        {
            message.Contents.Clear();
            foreach (string key in newContents.Keys)
            {
                message.Contents.Add(key, new Content
                    {
                        Language = key,
                        Value = newContents[key],
                        Subject = newSubjects[key]
                    });
            }
            if (roles != null)
            {
                foreach (Role a in _memberShipFactory.CreateRoleDao().GetRolesByIds(roles.Split(',')))
                {
                    message.AddReaders(a);
                }
            }
            if (users != null)
            {
                foreach (User user in _memberShipFactory.CreateUserDao().GetUsersByIds(users.Split(',')))
                {
                    message.AddReaders(user);
                }
            }

            if (orgs != null)
            {
                foreach (Org org in _memberShipFactory.CreateOrgDao().GetOrgs(orgs.Split(',')))
                {
                    message.AddReaders(org);
                }
            }

            if (userGroups != null)
            {
                foreach (UserGroup ug in _memberShipFactory.CreateUserGroupDao().GetByIds(userGroups.Split(',')))
                {
                    message.AddReaders(ug);
                }
            }

            _daoFactory.MessageDao.SaveOrUpdate(message);
            return RedirectToAction("Index");
        }
    }
}