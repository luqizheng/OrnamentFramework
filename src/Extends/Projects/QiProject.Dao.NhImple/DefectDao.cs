using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;
using QiProject.Defects;

namespace QiProject.Dao.NhImple
{
    public class DefectDao : DaoBase<string, Defect>, IDefectDao
    {
        #region IDefectDao Members

        public int Count(Project project)
        {
            return CreateDetachedCriteria().Add(Restrictions.Eq(Projections.Property<Defect>(d => d.Owener), project))
                .SetProjection(Projections.Count(Projections.Property<Defect>(d => d.Id)))
                .GetExecutableCriteria(CurrentSession)
                .UniqueResult<int>();
        }

        public IList<Defect> GetDefects(Project project, DefectStatus[] status)
        {
            Disjunction statusCondition = Restrictions.Disjunction();
            foreach (DefectStatus s in status)
            {
                statusCondition.Add(Restrictions.Eq(Projections.Property<Defect>(defect => defect.Status), s));
            }
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<Defect>(d => d.Owener), project))
                .Add(statusCondition)
                .GetExecutableCriteria(CurrentSession)
                .List<Defect>();
        }

        public IList<Defect> GetDefects(DefectSearch searcher)
        {
            Disjunction statusCondition = Restrictions.Disjunction();
            foreach (DefectStatus s in searcher.Status)
            {
                statusCondition.Add(Restrictions.Eq(Projections.Property<Defect>(defect => defect.Status), s));
            }
            Disjunction projectCodtion = Restrictions.Disjunction();
            foreach (var project in searcher.Projects)
            {
                projectCodtion.Add(Restrictions.Eq(Projections.Property<Defect>(defect => defect.Owener), project));
            }
            return CreateDetachedCriteria()
                .Add(projectCodtion)
                .Add(statusCondition)
                .AddOrder(Order.Desc(Projections.Property<Defect>(d => d.UpdateTime)))
                .GetExecutableCriteria(CurrentSession)
                .List<Defect>();
        }

        #endregion
    }
}