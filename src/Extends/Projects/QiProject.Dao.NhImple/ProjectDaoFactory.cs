namespace QiProject.Dao.NhImple
{
    public class ProjectDaoFactory : IProjectDaoFactory
    {
        #region IProjectDaoFactory Members

        public IProjectDao ProjectDao
        {
            get { return new ProjectDao(); }
        }

        public IProductDao ProductDao
        {
            get { return new ProductDao(); }
        }

        public IComponentDao ComponentDao { get { return new ComponentDao(); } }

        public IDefectDao DefectDao { get { return new DefectDao(); } }

        #endregion
    }
}