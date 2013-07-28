using Badminton.Dao;

namespace Badminton.Consumableses
{
    /// <summary>
    ///     ʵ������Ʒ������ë���
    /// </summary>
    public interface IPhysicalConsumables : IConsumables
    {
        /// <summary>
        /// ����
        /// </summary>
        decimal UnitPrice { get; set; }
        /// <summary>
        ///     �Ѷ����������Ա,����Ҫ��¼��ʷ��¼
        /// </summary>
        /// <param name="number"></param>
        /// <param name="member"></param>
        /// <param name="daoFactory"></param>
        void AssignToMember(decimal number, Member member, IBadmintonDaoFactory daoFactory);
    }
}