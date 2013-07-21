using System;
using Badminton.Dao;
using Ornament.MemberShip;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     消耗品
    /// </summary>
    public abstract class Consumables<T> : DomainObject<T, int>, IConsumables
        where T : DomainObject<T, int>
    {
        /// <summary>
        ///     just for NHibernate;
        /// </summary>
        protected Consumables()
        {
        }

        protected Consumables(decimal number, IPerformer member)
        {
            if (member == null) throw new ArgumentNullException("member");
            Balance = number;
            Owner = member;
        }

        int IConsumables.Id
        {
            get { return base.Id; }
            set
            {
                //base.Id = value;
            }
        }

        /// <summary>
        /// </summary>
        public Model Model { get; set; }

        /// <summary>
        /// </summary>
        public decimal Balance { get; protected set; }

        /// <summary>
        /// </summary>
        public IPerformer Owner { get; protected set; }

        /// <summary>
        ///     把消耗品分给会员。
        ///     里面要完成
        ///     1）记录历史记录 ConsumablesHistory
        ///     2）创建 User拥有的 Consumables
        ///     3）
        /// </summary>
        /// <param name="number"></param>
        /// <param name="user"></param>
        /// <param name="daoFactory"></param>
        public void AssignToMember(decimal number, Member user, IBadmintonDaoFactory daoFactory)
        {
            throw new NotImplementedException();
            IConsumables result = CreateInstance(number, user);
        }

        protected abstract IConsumables CreateInstance(decimal number, IPerformer member);
    }
}