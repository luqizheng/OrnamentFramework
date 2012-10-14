using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using QiProject.Dao;

namespace QiProject.Dao
{
    public interface IProjectDaoFactory
    {
        IProjectDao ProjectDao { get; }
        IProductDao ProductDao { get; }
        IComponentDao ComponentDao { get; }
        IDefectDao DefectDao { get; }
    }
}
