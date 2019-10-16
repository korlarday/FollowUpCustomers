using CustomersProject.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomersProject.Controllers
{
    [Authorize(Roles = "CanManageUsers")]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext db;
        public UsersController()
        {
            db = new ApplicationDbContext();
        }

        // GET: Users
        public ActionResult Index()
        {
            var users = db.Users.Where(x => x.Email != "admin@ieianchorpensions.com").ToList();
            return View(users);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            if (!model.Password.Equals(model.ConfirmPassword))
            {
                ModelState.AddModelError("", "Password did not match!");
                return View(model);
            }

            var userStore = new UserStore<ApplicationUser>(db);
            var userManager = new UserManager<ApplicationUser>(userStore);

            
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name
            };
            userManager.Create(user, model.Password);

            return RedirectToAction("Index", "Users");
        }

        [HttpPost]
        public string deleteuser(string id)
        {
            var user = db.Users.Find(id);

            db.Users.Remove(user);
            db.SaveChanges();
            return "success";
        }
    }
}