﻿using System;
using System.Linq;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Ornament.Contexts;
using Ornament.MemberShip.Permissions;

namespace Ornament
{
	public sealed class OrnamentContext
	{
		static OrnamentContext()
		{
			Ioc.Instance.GetContainer()
               .Register(Component.For<ResourceManager>());			   
        }

        public static MemberShipContext MemberShip
        {
            get { return UserContextInner.Instance.MemberShipContext; }
        }

        /// <summary>
        /// </summary>
        public static OrnamentConfiguration Configuration
        {
            get { return Config.Instance.GetConfig(); }
        }


        /// <summary>
        /// </summary>
        public static DaoFactory DaoFactory
        {
            get { return InnerDaoFactory.Instance.DaoFactories; }
        }


        /// <summary>
        /// 最Top的容器
        /// </summary>
        public static IWindsorContainer IocContainer
        {
            get { return Ioc.Instance.GetContainer(); }
        }

        /// <summary>
        /// </summary>
        public static ResourceManager ResourceManager
        {
            get { return Ioc.Instance.GetContainer().Resolve<ResourceManager>(); }
        }

        #region Nested type: Inner

        private class Config
        {
            public static readonly Config Instance = new Config();
            private readonly OrnamentConfiguration _ins;

            private Config()
            {
                _ins = new OrnamentConfiguration();
            }

            public OrnamentConfiguration GetConfig()
            {
                return _ins;
            }
        }

        private class InnerDaoFactory
        {
            // ReSharper disable MemberHidesStaticFromOuterClass
            public static readonly InnerDaoFactory Instance = new InnerDaoFactory();
            // ReSharper restore MemberHidesStaticFromOuterClass
            private readonly DaoFactory _dao;

            private InnerDaoFactory()
            {
                _dao = new DaoFactory(Ioc.Instance.GetContainer());
            }

            public DaoFactory DaoFactories
            {
                get { return _dao; }
            }
        }

        /// <summary>
        /// </summary>
        private class Ioc
        {
            // ReSharper disable MemberHidesStaticFromOuterClass
            public static readonly Ioc Instance = new Ioc();
            // ReSharper restore MemberHidesStaticFromOuterClass
            private readonly WindsorContainer _container;

            private Ioc()
            {
                _container = new WindsorContainer();
            }

            public IWindsorContainer GetContainer()
            {
                return _container;
            }
        }

        private class UserContextInner
        {
            public static readonly UserContextInner Instance = new UserContextInner();
            private readonly MemberShipContext _memberShip;

            private UserContextInner()
            {
                _memberShip = new MemberShipContext(DaoFactory.MemberShipDaoFactory);
            }

            public MemberShipContext MemberShipContext
            {
                get { return _memberShip; }
            }
        }

        #endregion
        /// <summary>
        /// 计算出客户端和服务器之间的时间差
        /// </summary>
        /// <param name="clientUtcOffsetHour"></param>
        /// <returns></returns>
        public static int CorrectClientUtcTime(int clientUtcOffsetHour)
        {
            DateTime serverTime = DateTime.Now;
            return clientUtcOffsetHour - Convert.ToInt32(TimeZoneInfo.Local.GetUtcOffset(serverTime).Hours);
        }
        /// <summary>
        /// 通过计算客户端提交的时间差，大概地计算出TimeZone
        /// </summary>
        /// <param name="utcOffsetHout"></param>
        /// <returns></returns>
        public static TimeZoneInfo GetClientTimeZone(int utcOffsetHout)
        {
            if(utcOffsetHout>23||utcOffsetHout<0)
                throw new ArgumentOutOfRangeException("utcOffsetHout","utcOffsetHour should be bewteen 0 and 23.");
            return TimeZoneInfo.GetSystemTimeZones().FirstOrDefault(a => a.BaseUtcOffset.Hours == utcOffsetHout);
        }
    }
}