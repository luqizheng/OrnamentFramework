using System.Collections.Generic;
using Qi.Domain;
using QiProject.Defects;

namespace QiProject.Dao
{
    public class DefectSearch
    {
        public DefectSearch(Project[] prject)
        {
            this.Projects = prject;
        }
        public Project[] Projects { get; set; }

        public DefectStatus[] Status { get; set; }

    }
    public interface IDefectDao : IDao<string, Defect>
    {
        int Count(Project project);
        IList<Defect> GetDefects(Project project, DefectStatus[] status);
        IList<Defect> GetDefects(DefectSearch searcher);
    }
}