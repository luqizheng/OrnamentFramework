using Ornament.MemberShip.Plugin.Models.SampleData;
using Ornament.Web;
using Ornament.Web.DataInitializers;
using Ornament.Web.Models;

namespace Ornament.MVCWebFrame
{
    public class InitData
    {
        public static void Initialize()
        {
            var init = new IDataInitializer[]
                {
                    new MessageInit(),
                    new MemberShipData
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