using System.Collections.Generic;
using Qi.Attendance;
using Qi.Web.Mvc.Founders;

namespace Ornament.MVCWebFrame.Areas.Attendance.Models
{
    public class CardsModel
    {
        public IList<Card> Cards { get; set; }

        [IdFounder]
        public virtual Employee Employee { get; set; }
    }
}