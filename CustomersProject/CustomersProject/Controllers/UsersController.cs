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
            List<ApplicationUser> users = db.Users.Where(x => x.Email != "admin@ieianchorpensions.com").ToList();
            return View(users);
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