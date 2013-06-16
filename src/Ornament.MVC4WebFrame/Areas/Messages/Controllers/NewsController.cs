using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.Messages.Dao;
using Ornament.Messages.Newses;
using Ornament.Web;

namespace Ornament.MVCWebFrame.Areas.Messages.Controllers
{
    public class NewsController : Controller
    {
        private readonly IMessageDaoFactory _factory;

        public NewsController(IMessageDaoFactory factory)
        {
            _factory = factory;
        }

        //
        // GET: /Messages/News/

        public ActionResult Index(Pagination pagination)
        {
            if (pagination == null)
                pagination = new Pagination(40, 0);
            NewsType type = _factory.NewsTypeDao.GetAll().First();
            int total = 0;
            IList<News> news = _factory.NewsDao.GetNews(pagination.CurrentPage, pagination.PageSize, type, out total);
            return View(news);
        }
    }
}