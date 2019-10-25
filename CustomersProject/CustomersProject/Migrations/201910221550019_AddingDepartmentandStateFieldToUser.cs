namespace CustomersProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingDepartmentandStateFieldToUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Department", c => c.String());
            AddColumn("dbo.AspNetUsers", "State", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "State");
            DropColumn("dbo.AspNetUsers", "Department");
        }
    }
}
