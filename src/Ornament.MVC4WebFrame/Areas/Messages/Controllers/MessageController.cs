using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.MemberShip;
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
        private readonly IMessageDao _messageDao;

        public MessageController(IMessageDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
            _messageDao = daoFactory.MessageDao;
        }

        public ActionResult Index(MessageSearcher searcher)
        {
            IList<Message> result = _messageDao.FindMessage(40, 0, null, false);
            return View(result);
        }

        public ActionResult Edit(string id)
        {
            Message message = _messageDao.Get(id);
            ViewData["types"] = _daoFactory.MessageTypeDao.GetAll();


            //foreach (string a in message.Contents.Keys)
            //{
            //    Content c = message.Contents[a];
            //}
            return View("Edit", message);
        }


        public ActionResult Create()
        {
            ViewData["types"] = _daoFactory.MessageTypeDao.GetAll();

            return View("Edit");
        }

        [HttpPost, Session(true, Transaction = true), ValidateInput(false)]
        public ActionResult Save(Message message, IDictionary<string, string> newContents,
                                 IDictionary<string, string> newSubjects, IList<Role> roles, IList<User> users, IList<Org> orgs, IList<UserGroup> userGroups)
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
                foreach (var a in roles)
                {
                    if (a != null)
                        message.AddReaders(a);
                }
            }
            if (users != null)
            {
                foreach (var user in users)
                {
                    if (user != null)
                        message.AddReaders(user);
                }
            }

            if (orgs != null)
            {
                foreach (var org in orgs)
                {
                    if (org != null)
                        message.AddReaders(org);
                }
            }

            if (userGroups != null)
            {
                foreach (var ug in userGroups)
                {
                    if (ug != null)
                        message.AddReaders(ug);
                }
            }

            _daoFactory.MessageDao.SaveOrUpdate(message);
            return RedirectToAction("Index");
        }
    }
}