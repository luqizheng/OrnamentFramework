using Ornament.MemberShip.Dao;
using Ornament.Messages;
using Ornament.Messages.Dao;
using Ornament.Messages.Stores;
using QiProject.Dao;

// ReSharper disable CheckNamespace

namespace Ornament.Web //扩展类，减少生成DaoFactory的代码。把它反正和OrnamentContext同一个namespace下面，减少using namespace的麻烦
// ReSharper restore CheckNamespace
{
    public static class DaoFactory
    {
        public static IMemberShipFactory MemberShipFactory(this OrnamentContext ornament)
        {
            return ornament.GetDaoFactory<IMemberShipFactory>();
        }

        public static IDaoFactory MessageFactory(this OrnamentContext ornament)
        {
            return ornament.GetDaoFactory<IDaoFactory>();
        }

        public static OrnamentMessageManager GetMessageManager(this OrnamentContext ornament)
        {
            return new OrnamentMessageManager(ornament.MessageFactory(), ornament.MemberShipFactory());
        }

        public static StoreManager GetStoreManager(this OrnamentContext context)
        {
            return context.GetDaoFactory<StoreManager>();
        }

        public static IProjectDaoFactory GetProjectDao(this OrnamentContext context)
        {
            return context.GetDaoFactory<IProjectDaoFactory>();
        }
    }
}