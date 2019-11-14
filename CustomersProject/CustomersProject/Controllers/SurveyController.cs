using CustomersProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomersProject.Controllers
{
    public class SurveyController : Controller
    {
        private readonly ApplicationDbContext Db;
        public SurveyController()
        {
            Db = new ApplicationDbContext();
        }
        // GET: Survey
        public ActionResult Index()
        {
            return View();
        }
    }
}