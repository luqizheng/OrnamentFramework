using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Qi.Attendance;
using Qi.Attendance.Dao;
using Qi.Web.Mvc.Founders;

namespace Ornament.MVCWebFrame.Areas.Attendance.Models
{
    public class CardModel
    {
        public string Id { get; set; }

        [Display(Name = "卡号")]
        public virtual string Number { get; set; }

        [Display(Name = "卡状态")]
        public virtual CardState State { get; set; }

        public Card ToCard(ICardDao dao, Employee employee)
        {
            Card card = string.IsNullOrEmpty(Id) ? new Card() : dao.Get(Id);
            card.Number = Number;
            card.State = State;
            card.Employee = employee;
            return card;
        }

        public static IList<CardModel> Paser(IList<Card> cards)
        {
            return cards.Select(card => new CardModel
                {
                    Id = card.Id, Number = card.Number, State = card.State
                }).ToList();
        }
    }

    public class CardsModel
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

        [IdFounder]
        public virtual Employee Employee { get; set; }
    }
}