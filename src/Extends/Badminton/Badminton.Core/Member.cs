using System;
using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.Domain;

namespace Badminton
{
    public interface IOwner
    {
        
    }


    public class Member : Performer<Member>, IOwner
    {
        /// <summary>
        /// 所对应的User对象
        /// </summary>
        public virtual User User { get; protected set; }

        public Member()
        {

        }

        public Member(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");
            User = user;
        }

        /// <summary>
        /// 余额
        /// </summary>
        public virtual decimal Balance { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual Gender Gender { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        protected override string GetPerformerType()
        {
            return "Member";
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="memberShipFactory"></param>
        /// <returns></returns>
        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            return new List<User>()
                {
                    this.User
                };
        }

        public override IEnumerable<Role> GetAllRoles()
        {
            return this.User.GetRoles();
        }
    }
}