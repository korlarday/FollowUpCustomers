using CustomersProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomersProject.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext db;
        public HomeController()
        {
            db = new ApplicationDbContext();
        }
        public ActionResult Index()
        {
            string userEmail= User.Identity.Name;
            var user = db.Users.SingleOrDefault(x => x.Email == userEmail);

            UserStateVM model = new UserStateVM { State = user.State, Department = user.Department };
            return View(model);
        }

        public ActionResult Search()
        {
            string userEmail = User.Identity.Name;
            var user = db.Users.SingleOrDefault(x => x.Email == userEmail);

            UserStateVM model = new UserStateVM { State = user.State, Department = user.Department };
            return View(model);
        }
    }
}