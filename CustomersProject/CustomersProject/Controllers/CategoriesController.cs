using System.Web.Mvc;

namespace CustomersProject.Controllers
{
    [Authorize]
    public class CategoriesController : Controller
    {
        // GET: Categories
        public ActionResult New()
        {
            return View();
        }

        public ActionResult Pending()
        {
            return View();
        }

        public ActionResult Registered()
        {
            return View();
        }
    }
}