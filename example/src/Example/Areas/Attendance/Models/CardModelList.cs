using System.Collections.Generic;
using Qi.Attendance;

namespace Ornament.MVCWebFrame.Areas.Attendance.Models
{
    public class CardModelList
    {
        private IList<CardModel> _cards;

        public IList<CardModel> Cards
        {
            get
            {
                if (_cards == null)
                    return new List<CardModel>();
                return _cards;
            }
            set { _cards = value; }
        }

        public virtual Employee Employee { get; set; }
    }
}