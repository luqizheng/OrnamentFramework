using System;
using Qi.Domain;

namespace Ornament.MemberShip
{
    public class ActiveUser : DomainObject<ActiveUser, string>
    {
        public ActiveUser()
        {
            CreateTime = DateTime.Now;
        }

        public virtual User User { get; set; }
        public virtual DateTime CreateTime { get; private set; }
        public string SignToken { get; set; }
    }
}