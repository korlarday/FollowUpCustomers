using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomersProject.Models
{
    public class Survey
    {
        public int Id { get; set; }
        public string name { get; set; }

        [Required]
        public int CustomerSatisfaction { get; set; }

        [Required]
        public int EmailResponse { get; set; }

        [Required]
        public int CustomerRetentionProg { get; set; }
        public string CustomerRetentionSuggestion { get; set; }
        public int PhoneCalls { get; set; }
        public string PhoneReason { get; set; }

        [Required]
        public int CompanyBrand { get; set; }

        [Required]
        public int CustomerEffort { get; set; }

        [Required]
        public int OfficeLocation { get; set; }

        [Required]
        public string AreaOfImprovement { get; set; }
    }
}