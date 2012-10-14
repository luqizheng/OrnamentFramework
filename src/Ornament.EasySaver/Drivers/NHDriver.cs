using System.Data;
using NHibernate;

namespace Ornament.EasySqlExecuter.Drivers
{
    public class NHDriver : DbDriver
    {
        private readonly ISessionFactory _factory;
        private ISession session;

        public NHDriver(ISessionFactory factory)
        {
            _factory = factory;
        }

        public override IDbConnection Connection
        {
            get
            {
                return session.Connection;
            }
        }

        public override void Close(bool hasError)
        {
            session.Close();

        }

        public override IDbConnection Open()
        {
            session = _factory.OpenSession();
            return this.Connection;

        }
    }
}