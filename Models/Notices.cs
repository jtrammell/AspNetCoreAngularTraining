using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreAngularTraining.Models
{
    [Table("ntc")]
    public class Notice
    {
        [Column("ntc_key")]
        public int ID { get; set; }

        [Column("ntc_com_key")]
        public int NoticeCompanyKey { get; set; }

        [Column("ntc_hide")]
        public bool NoticeHide { get; set; }

        [Column("ntc_from_dt")]
        public DateTime NoticeFromDate { get; set; }

        [Column("ntc_to_date")]
        public DateTime NoticeToDate { get; set; }

        [Column("ntc_subject")]
        public string NoticeSubject { get; set; }

        [Column("ntc_notice")]
        public string Message { get; set; }

        [Column("ntc_link")]
        public string NoticeLink { get; set; }
    }
}
