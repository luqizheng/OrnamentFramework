using System;
using System.Collections.Generic;

namespace Ornament.MemberShip.Dao
{
    public interface IMemberDao
    {
        IList<IMember> Find(string roleId);

    }
}