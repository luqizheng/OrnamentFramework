using System.Collections.Generic;

namespace Ornament.MemberShip.Dao
{
    public interface IPerformerDao
    {
        IList<IPerformer> Find(string roleId);
    }
}