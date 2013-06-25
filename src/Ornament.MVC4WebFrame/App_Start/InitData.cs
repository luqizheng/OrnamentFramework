using Ornament.MVCWebFrame.Models.DataInit;
using Ornament.Web;
using Ornament.Web.Models;

namespace Ornament.MVCWebFrame.App_Start
{
    public class InitData
    {
        public static void Initialize()
        {
            var init = new IDataInitializer[]
                {
                    new MessageInit(),
                    new MembershipInit
                        {
                            AdminPassword = "123456"
                        }
                };
            foreach (IDataInitializer initializer in init)
            {
                if (initializer.IsNeedInitialize)
                {
                    initializer.CreateData();
                }
            }
        }
    }
}