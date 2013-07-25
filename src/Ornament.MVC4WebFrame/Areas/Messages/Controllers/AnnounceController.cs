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
using Qi.Web.Mvc;
using log4net;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Session]
    public class AnnounceController : Controller
    {
        private readonly IAnnouncementDao _announcementDao;
        private readonly IMessageDaoFactory _daoFactory;
        private readonly IMemberShipFactory _memberShipFactory;

        public AnnounceController(IMessageDaoFactory daoFactory, IMemberShipFactory memberShipFactory)
        {
            _daoFactory = daoFactory;
            _memberShipFactory = memberShipFactory;
            _announcementDao = daoFactory.AnnouncementDao;
        }

        public ActionResult Index()
        {
            var pagination = new Pagination();
            ViewData["nav"] = pagination;

            int total = 0;
            IList<Announcement> result = _announcementDao.GetAll(pagination.PageSize, pagination.CurrentPage,
                                                                 out total);
            pagination.TotalRows = total;

            return View(result);
        }

        [HttpPost]
        public ActionResult Index(Pagination pagination)
        {
            int total;
            IList<Announcement> result = _announcementDao.GetAll(pagination.PageSize, pagination.CurrentPage,
                                                                 out total);
            pagination.TotalRows = total;
            ViewData["nav"] = pagination;
            return View(result);
        }

        public ActionResult Edit(string id)
        {
            if (id == null)
                throw new HttpException(404, "Can't find resources.");
            Announcement announcement = _announcementDao.Get(id);
            ViewData["types"] = _daoFactory.NewsTypeDao.GetAll();
            return View("Edit", announcement);
        }


        public ActionResult Create()
        {
            ViewData["types"] = _daoFactory.NewsTypeDao.GetAll();
            return View("Edit");
        }

        //[ResourceAuthorize(MessageOperator.Delete, "Message")]
        public ActionResult Delete(string id)
        {
            if (id == null)
                throw new HttpException(404, "cant' delete empty notify message.");
            try
            {
                _announcementDao.Delete(_announcementDao.Get(id));
                return Json(new {success = true}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(GetType()).Error(ex.Message, ex);
                return Json(new {success = false, message = ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost, Session(true, Transaction = true), ValidateInput(false)]
        public ActionResult Save(Announcement announcement, IDictionary<string, string> newContents,
                                 IDictionary<string, string> newSubjects, string users, string userGroups, string roles,
                                 string orgs)
        {
            announcement.Contents.Clear();

            foreach (string key in newContents.Keys)
            {
                announcement.Contents.Add(key, new Content
                    {
                        Language = key,
                        Value = newContents[key],
                        Subject = newSubjects[key]
                    });
            }
            if (roles != null)
            {
                foreach (Role role in _memberShipFactory.CreateRoleDao().GetRolesByIds(roles.Split(',')))
                {
                    announcement.Roles.Add(role);
                }
            }
            if (users != null)
            {
                foreach (User user in _memberShipFactory.CreateUserDao().GetUsersByIds(users.Split(',')))
                {
                    announcement.Users.Add(user);
                }
            }

            if (orgs != null)
            {
                foreach (Org org in _memberShipFactory.CreateOrgDao().GetOrgs(orgs.Split(',')))
                {
                    announcement.Orgs.Add(org);
                }
            }

            if (userGroups != null)
            {
                foreach (UserGroup ug in _memberShipFactory.CreateUserGroupDao().GetByIds(userGroups.Split(',')))
                {
                    announcement.UserGroups.Add(ug);
                }
            }

            _daoFactory.AnnouncementDao.SaveOrUpdate(announcement);
            return RedirectToAction("Index");
        }
    }
}