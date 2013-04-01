using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Qi.Attendance;
using Qi.Attendance.Dao;

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
            Card card = (Id == Guid.Empty.ToString()) ? new Card() : dao.Get(Id);
            card.Number = Number;
            card.State = State;
            card.Employee = employee;
            return card;
        }

        public static IList<CardModel> Paser(IEnumerable<Card> cards)
        {
            var result = new List<CardModel>();
            foreach (var card in cards)
            {
                result.Add(new CardModel()
                    {
                        Id = card.Id,
                        Number = card.Number,
                        State = card.State
                    });
            }
            return result;
        }
    }
}