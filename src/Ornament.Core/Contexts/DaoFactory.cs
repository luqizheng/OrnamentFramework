using System;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.Contexts
{
    public class DaoFactory
    {
        private readonly IWindsorContainer _container;

        public DaoFactory(IWindsorContainer container)
        {
            if (container == null)
                throw new ArgumentNullException("container");
            _container = container;
        }

        /// <summary>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T GetDaoFactory<T>()
        {
            return _container.Resolve<T>();
        }

        public void Regist(Type interfaceType,Type daoType)
        {
            _container.Register(Component.For(interfaceType).ImplementedBy(daoType).LifestyleSingleton());
        }

        public IMemberShipFactory MemberShipFactory
        {
            get { return GetDaoFactory<IMemberShipFactory>(); }

        }

        public IMessageDaoFactory MessageDaoFactory
        {
            get { return GetDaoFactory<IMessageDaoFactory>(); }
        }
    }
}