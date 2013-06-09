using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Web.Mvc;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages;
using Ornament.Messages.Contents;
using Ornament.Messages.Dao;
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

        public ActionResult Index(MessageSearcher searcher)
        {
            IList<Message> result = _messageDao.FindMessage(40, 0, null, false);
            return View(result);
        }

        public ActionResult Edit(string id)
        {
            Message message = _messageDao.GetNoLazyMessage(id);
            ViewData["types"] = _daoFactory.MessageTypeDao.GetAll();
            return View("Edit", message);
        }


        public ActionResult Create()
        {
            ViewData["types"] = _daoFactory.MessageTypeDao.GetAll();
            return View("Edit");
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

                foreach (var org in _memberShipFactory.CreateOrgDao().GetOrgs(orgs.Split(',')))
                {
                    message.AddReaders(org);
                }
            }

            if (userGroups != null)
            {
                foreach (var ug in _memberShipFactory.CreateUserGroupDao().GetByIds(userGroups.Split(',')))
                {
                    message.AddReaders(ug);
                }
            }

            _daoFactory.MessageDao.SaveOrUpdate(message);
            return RedirectToAction("Index");
        }
    }
}