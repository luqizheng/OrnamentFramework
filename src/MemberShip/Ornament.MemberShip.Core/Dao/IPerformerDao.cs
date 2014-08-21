using System;
using System.Collections.Generic;

namespace Ornament.MemberShip.Dao
{
    public class UsersStatus
    {
        public DateTime Date { get; set; }
        public int Count { get; set; }
    }
    public interface IPerformerDao
    {
        IList<IPerformer> Find(string roleId);
       
    }
}