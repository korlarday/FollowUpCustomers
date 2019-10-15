using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CustomersProject.Startup))]
namespace CustomersProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
