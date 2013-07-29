using System.Collections.Generic;
using Qi.Domain;

namespace Badminton.Dao
{
    public interface ICardDao : IDao<int, Card>
    {
        Card GetByCardNumber(string cardNumber);

        IList<Card> FindByCardNumber(string cardNumber);
    }
}