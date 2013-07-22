using System;
using System.Collections.Generic;
using Badminton.Dao;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.Domain;

namespace Badminton
{
    public class MemberGroup : Performer<Member>, IOwner
    {
        /// <summary>
        ///     for NHibernate
        /// </summary>
        protected MemberGroup()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="gp"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public MemberGroup(UserGroup gp)
        {
            if (gp == null) throw new ArgumentNullException("gp");
            UserGroup = gp;
        }

        public virtual UserGroup UserGroup { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual decimal Balance { get; protected set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="number"></param>
        /// <param name="member"></param>
        /// <param name="daoFactory"></param>
        public virtual void AssignTo(decimal number, Member member, IBadmintonDaoFactory daoFactory)
        {
            this.Balance = this.Balance - number;

        }

        protected override string GetPerformerType()
        {
            return "MemberGroup";
        }

        protected override IList<User> GetInsideUsers(IMemberShipFactory memberShipFactory)
        {
            return memberShipFactory.CreateUserDao().GetUsers(this.UserGroup);
        }

        public override IEnumerable<Role> GetAllRoles()
        {
            return this.UserGroup.GetAllRoles();
        }
    }
}