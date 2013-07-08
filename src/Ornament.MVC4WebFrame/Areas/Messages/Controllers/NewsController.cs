using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;
using Ornament.Web;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    [Authorize(Roles="admin",Users="admin")]
    public class NewsController : Controller
    {
        private readonly IMessageDaoFactory _factory;

        public NewsController(IMessageDaoFactory factory)
        {
            _factory = factory;
        }

        //
        // GET: /Messages/News/
        [Session]
        public ActionResult Index(Pagination pagination)
        {
            if (pagination == null)
                pagination = new Pagination(40, 0);
            NewsType type = _factory.NewsTypeDao.GetAll().FirstOrDefault();
            IList<News> news;
            if (type != null)
            {
                int total;
                news = _factory.NewsDao.GetNews(pagination.CurrentPage, pagination.PageSize, type, out total);
                pagination.TotalNumber = total;
            }
            else
            {
                news = new List<News>();
            }


            ViewData["nav"] = pagination;
            ViewData["newsType"] = type;
            ViewData["types"] = _factory.NewsTypeDao.GetAll();
            return View(news);
        }

        [Session]
        public ActionResult Delete(string id)
        {
            INewsDao dao = _factory.NewsDao;
            dao.Delete(dao.Get(id));
            return Json(new {success = true});
        }

        [Session]
        public ActionResult Create()
        {
            ViewData["types"] = _factory.NewsTypeDao.GetAll();
            var news = new News();
            news.Contents.Add(OrnamentContext.Configuration.DefaultLanguage.Key,
                              new Content(OrnamentContext.Configuration.DefaultLanguage.Key));

            return View("Edit", news);
        }


        [Session]
        public ActionResult Edit(string id)
        {
            News newws = _factory.NewsDao.Get(id);
            if (newws == null)
                throw new HttpException(404, "can't not find the news with id=" + id);
            ViewData["types"] = _factory.NewsTypeDao.GetAll();
            return View(newws);
        }

        [HttpPost, Session(true, Transaction = true), ValidateInput(false)]
        public ActionResult Save(News news, IDictionary<string, string> NewContents,
                                 IDictionary<string, string> NewSubjects)
        {
            if (NewContents.Count == 0)
            {
                ModelState.AddModelError("_form", "Cotnent is empty");
            }
            if (ModelState.IsValid)
            {
                foreach (string key in NewContents.Keys)
                {
                    if (string.IsNullOrEmpty(NewSubjects[key]) && string.IsNullOrEmpty(NewContents[key]))
                    {
                        if (news.Contents.ContainsKey(key))
                        {
                            news.Contents.Remove(key);
                        }
                        continue;
                    }
                    if (!news.Contents.ContainsKey(key))
                    {
                        news.Contents.Add(key, new Content(key)
                            {
                                Subject = NewSubjects[key],
                                Value = NewContents[key]
                            });
                    }
                    else
                    {
                        news.Contents[key].Value = NewContents[key];
                        news.Contents[key].Subject = NewSubjects[key];
                    }
                }
                _factory.NewsDao.SaveOrUpdate(news);
                return RedirectToAction("Index");
            }
            return View("Edit", news);
        }
    }
}