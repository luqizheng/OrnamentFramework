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

        public CardModel()
        {

        }

        public CardModel(Card card)
        {
            this.Id = card.Id;
            this.Number = card.Number;
            this.State = card.State;
        }
        [Display(Name = "卡号")]
        public string Number { get; set; }

        [Display(Name = "卡状态")]
        public CardState State { get; set; }

        public Card ToCard(ICardDao dao, Employee employee)
        {
            Card card = string.IsNullOrEmpty(Id) ? new Card() : dao.Get(Id);
            card.Number = Number;
            card.State = State;
            card.Employee = employee;
            return card;
        }
        public static IList<CardModel> ToCards(IList<Card> cards)
        {
            var result = new List<CardModel>();
            foreach (var card in cards)
            {
                result.Add(new CardModel(card));
            }
            return result;
        }
    }

    public class CardsModel
    {
        private Card[] _cards;

        public Card[] Cards
        {
            get;
            set;
        }

        [IdFounder]
        public virtual Employee Employee { get; set; }
    }
}