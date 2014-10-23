using System;
using Ornament.NotifyMessages.Validations;

namespace Ornament.NotifyMessages
{
    public class Header
    {
        protected readonly DateTime _requestDate;
        protected Encypter Enctypter;
        public Header(string org,string orgPrivateKey,DateTime requestDate)
        {
            _requestDate = requestDate;
            Enctypter = new Encypter(org,orgPrivateKey);
            orgName = org;
        }

        public  string orgName { get; set; }

        public string orgPubKey
        {
            get { return Enctypter.EncryptOrg(_requestDate); }
            
        }

        public string requestDate
        {
            get { return _requestDate.ToString("yyyyMMdd HH:mm:ss"); }
        }
    }
}