using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ornament.MVCWebFrame.Models.DataInit;
using Ornament.Web;
using Ornament.Web.Models;

namespace Ornament.MVCWebFrame.App_Start
{
    public class InitData
    {
        public static void Initialize()
        {
            IDataInitializer[] init = new IDataInitializer[]
            {
                    new MembershipInit()
                        {
                            AdminPassword = "123456"
                        },
                    new MessageInit()
                };
            foreach (var initializer in init)
            {
                if (initializer.IsNeedInitialize)
                {
                    initializer.CreateData();
                }
            }

        }
    }
}