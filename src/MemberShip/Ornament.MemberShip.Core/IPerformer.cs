using System.Collections.Generic;
using Ornament.MemberShip.Dao;

namespace Ornament.MemberShip
{
    public class testPerformer
    {
        /// <summary>
        /// 
        /// </summary>
        public virtual string Id { get; set; }
        /// <summary>
        /// Get's the name of the Performer
        /// </summary>
        public virtual string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual string Remarks { get; set; }
    }
    /// <summary>
    /// Performer
    /// </summary>
    public interface IPerformer
    {
        /// <summary>
        /// 
        /// </summary>
        string Id { get; set; }
        /// <summary>
        /// Get's the name of the Performer
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string Remarks { get; set; }

        Iesi.Collections.Generic.ISet<Role> Roles { get; set; }
        /// <summary>
        /// Gets all users in this Perforomers.
        /// </summary>
        /// <param name="memberShipFactory"></param>
        /// <returns></returns>
        IList<User> GetUsers(IMemberShipFactory memberShipFactory);

        PerformerType Type { get; }
    }
}