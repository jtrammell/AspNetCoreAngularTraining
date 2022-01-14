using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreAngularTraining.Models
{
    [Table("com")]
    public class Company
    {
        [Column("com_key")]
        public int ID { get; set; }

        [Column("com_name")]
        public string CompanyName { get; set; }

        [Column("com_dt_created")]
        public DateTime DateCreated { get; set; }
    }
}
