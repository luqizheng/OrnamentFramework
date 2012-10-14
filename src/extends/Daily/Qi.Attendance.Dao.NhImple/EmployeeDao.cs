using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Qi.Attendance.Dao.NhImple
{
    public class EmployeeDao : DaoBase<Guid, Employee>, IEmployeeDao
    {
        private readonly ObjectInitialization _initialization = new ObjectInitialization();

        private IProjection CardNumberProperty
        {
            get { return _initialization.Once(() => Projections.Property<Employee>(s => s.CardNo)); }
        }

        private IProjection TerminationId
        {
            get { return _initialization.Once(() => Projections.Property<Equipment>(s => s.TerminalId)); }
        }

        #region IEmployeeDao Members

        public Employee GetEmployee(string terminalId, string cardNumber)
        {
            var equipmentListCri = DetachedCriteria.For<Equipment>().Add(Restrictions.Eq(TerminationId, terminalId))
                .SetProjection(Projections.Id());

            var groupCri = DetachedCriteria.For<EmployeeGroup>().SetProjection(Projections.Id())
                .CreateCriteria("Equipments", "eqList")
                .Add(Property.ForName("eqList.Id").In(equipmentListCri));

            var cri = CreateDetachedCriteria()
                .Add(Restrictions.Eq(CardNumberProperty, cardNumber))
                .Add(Property.ForName("EquipmentGroup").In(groupCri))
                .GetExecutableCriteria(this.CurrentSession);
            return cri.UniqueResult<Employee>();

        }

        public IList<Employee> FindByExample(int pageIndex, int pageSize, Employee example)
        {
            return CreateDetachedCriteria().Add(Example.Create(example)).SetFirstResult(pageIndex*pageSize)
                .SetMaxResults(pageSize).GetExecutableCriteria(this.CurrentSession)
                .List<Employee>();
        }

        #endregion
    }
}