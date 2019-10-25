using CustomersProject.Models;
using System.Linq;
using System.Web.Mvc;

namespace CustomersProject.Controllers
{
    [Authorize]
    public class CategoriesController : Controller
    {
        private readonly ApplicationDbContext db;
        public CategoriesController()
        {
            db = new ApplicationDbContext();
        }
        // GET: Categories
        public ActionResult New()
        {
            string userEmail = User.Identity.Name;
            var user = db.Users.SingleOrDefault(x => x.Email == userEmail);

            UserStateVM model = new UserStateVM { State = user.State, Department = user.Department };
            return View(model);
        }

        public ActionResult Pending()
        {
            string userEmail = User.Identity.Name;
            var user = db.Users.SingleOrDefault(x => x.Email == userEmail);

            UserStateVM model = new UserStateVM { State = user.State, Department = user.Department };
            return View(model);
        }

        public ActionResult Registered()
        {
            string userEmail = User.Identity.Name;
            var user = db.Users.SingleOrDefault(x => x.Email == userEmail);

            UserStateVM model = new UserStateVM { State = user.State, Department = user.Department };
            return View(model);
        }

        public ActionResult Unresolved()
        {
            string userEmail = User.Identity.Name;
            var user = db.Users.SingleOrDefault(x => x.Email == userEmail);

            UserStateVM model = new UserStateVM { State = user.State, Department = user.Department };
            return View(model);
        }
    }
}