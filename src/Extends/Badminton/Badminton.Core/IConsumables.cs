using System.ComponentModel;
using Badminton.Dao;
using Ornament.MemberShip;

namespace Badminton
{
    /// <summary>
    ///     消耗品基本类别。需要新增的时候，请使用 Consumables
    /// </summary>
    public interface IConsumables
    {
        /// <summary>
        /// </summary>
        int Id { get; set; }
        /// <summary>
        ///     消耗品型号
        /// </summary>
        [DisplayName("型号")]
        Model Model { get; set; }

        /// <summary>
        ///     Gets or sets Balance
        /// </summary>
        decimal Balance { get; }

        /// <summary>
        ///     消耗品的管理者。可以是User UserGroup, 避免
        /// </summary>
        IPerformer Owner { get; }

        /// <summary>
        ///     把东西分配给会员
        /// </summary>
        /// <param name="number"></param>
        /// <param name="member"></param>
        /// <param name="daoFactory"></param>
        void AssignToMember(decimal number, Member member, IBadmintonDaoFactory daoFactory);
    }
}