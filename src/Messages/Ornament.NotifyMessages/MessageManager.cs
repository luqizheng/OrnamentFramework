using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.NotifyMessages
{
    public class MessageManager
    {
        private readonly string _loginid;
        private readonly string _privateKey;
        private readonly string _org;
        private readonly string _orgPrivateKey;

        public MessageManager(string loginid,string privateKey,string org,string orgPrivateKey)
        {
            _loginid = loginid;
            _privateKey = privateKey;
            _org = org;
            _orgPrivateKey = orgPrivateKey;
        }

        public RegUser GetRegUserToker()
        {
            var result = new RegUser(_org, _orgPrivateKey, DateTime.Now)
            {
                loginId = _loginid,
                privateKey = _privateKey
            };
            return result;
        }
    }
}
