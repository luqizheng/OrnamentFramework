using Badminton.Dao;

namespace Badminton.Consumableses
{
    /// <summary>
    ///     实物消耗品，如羽毛球等
    /// </summary>
    public interface IPhysicalConsumables : IConsumables
    {
       
        /// <summary>
        ///     把东西分配给会员,并且要记录历史记录
        /// </summary>
        /// <param name="number"></param>
        /// <param name="member"></param>
        /// <param name="daoFactory"></param>
        void AssignToMember(decimal number, Member member, IBadmintonDaoFactory daoFactory);
    }
}