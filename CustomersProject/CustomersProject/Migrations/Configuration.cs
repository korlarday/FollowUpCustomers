namespace CustomersProject.Migrations
{
    using CustomersProject.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CustomersProject.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CustomersProject.Models.ApplicationDbContext context)
        {
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);



            if (!context.Users.Any(x => x.UserName == "admin@ieianchorpensions.com"))
            {
                var user = new ApplicationUser
                {
                    UserName = "admin@ieianchorpensions.com",
                    Email = "admin@ieianchorpensions.com",
                    Name = "Admin Admin",
                    Department = "CS",
                    State = "FCT"
                };
                userManager.Create(user, "Abcde1234*");

                context.Roles.AddOrUpdate(x => x.Name, new IdentityRole
                {
                    Name = "CanManageUsers"
                });
                context.SaveChanges();

                userManager.AddToRole(user.Id, "CanManageUsers");
            }
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
        }
    }
}
