﻿using System;
using System.Reflection;
using MvcContrib.PortableAreas;

namespace Ornament.Web.Cfg
{
    /// <summary>
    ///     注册NHibernate的Dao，如果Dao和mapping文件放在一起，那么会自动进行Mapping
    /// </summary>
    public class DaoFactoryRegister : IEventMessage
    {
        public DaoFactoryRegister(Type daoFactoryInterface, Type impleDaoFactory)
        {
            if (daoFactoryInterface == null)
                throw new ArgumentNullException("daoFactoryInterface");
            if (impleDaoFactory == null)
                throw new ArgumentNullException("impleDaoFactory");

            DaoFactoryInterface = daoFactoryInterface;
            ImpleDaoFactory = impleDaoFactory;
            FluentNhibernate = true;
        }

        public DaoFactoryRegister(Type daoFactoryInterface, Type impleDaoFactory,
            Assembly hbmFileEmbed)
            : this(daoFactoryInterface, impleDaoFactory)
        {
            HbmFileEmbed = hbmFileEmbed;
            FluentNhibernate = false;
        }

        public Assembly HbmFileEmbed { get; set; }

        public bool FluentNhibernate { get; set; }
        public Type DaoFactoryInterface { get; set; }
        public Type ImpleDaoFactory { get; set; }
    }
}