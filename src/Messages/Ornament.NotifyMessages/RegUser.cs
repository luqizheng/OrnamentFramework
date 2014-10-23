using System;

namespace Ornament.NotifyMessages
{
    public class RegUser:Header
    {
        public RegUser(string org, string orgPrivateKey, DateTime requestDate) 
            : base(org, orgPrivateKey, requestDate)
        {
        }

        public string loginId { get; set; }
        public string privateKey { get; set; }
    }
}