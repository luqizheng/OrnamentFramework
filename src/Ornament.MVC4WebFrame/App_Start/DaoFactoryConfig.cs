﻿using System;
using System.Collections.Generic;
using Badminton.Dao;
using Badminton.Dao.NhImpl;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.Messages.Dao;
using Ornament.Messages.Dao.NHibernateImple;
using Qi.CRM.Dao;
using Qi.CRM.Dao.NhImple;

namespace Ornament.MVCWebFrame.App_Start
{
    public class DaoFactoryConfig
    {
        public static void Config()
        {
            var dao = new Dictionary<Type, Type>
                {
                    {typeof (IMemberShipFactory), typeof (MemberShipFactory)},
                    {typeof (IMessageDaoFactory), typeof (MessageDaoFactory)},
                    {typeof (IBadmintonDaoFactory), typeof (BadmintonDaoFactory)},
                    {typeof(ICrmDaoFactory),typeof(CrmDaoFactory)}

                };
            foreach (Type key in dao.Keys)
            {
                OrnamentContext.DaoFactory.Regist(key, dao[key]);
            }
        }
    }
}