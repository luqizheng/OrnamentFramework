using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ornament.Web.DashBoard;
using Ornament.Domain;

namespace Ornament.Web.DashBorard.Dao
{
    public interface IShortcutDao:IDao<Shortcut,Guid>
    {
        IList<Shortcut> GetAll();
    }
}
