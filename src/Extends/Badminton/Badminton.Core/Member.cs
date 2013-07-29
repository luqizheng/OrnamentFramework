using System;
using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Badminton
{
    public class Member : Performer<Member>, IOwner
    {
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
        ///     所对应的User对象
        /// </summary>
        public virtual User User { get; protected set; }

        /// <summary>
        ///     余额
        /// </summary>
        public virtual decimal Balance { get; set; }

        /// <summary>
        /// </summary>
        public virtual Gender Gender { get; set; }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        protected override string GetPerformerType()
        {
            return "Member";
        }

        /// <summary>
        /// </summary>
        /// <param name="memberShipFactory"></param>
        /// <returns></returns>
        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            return new List<User>
                {
                    User
                };
        }

        public override IEnumerable<Role> GetAllRoles()
        {
            return User.GetRoles();
        }
    }
}