using System;

namespace Ornament.NotifyMessages
{
    public class UserHeader:Header
    {
        private readonly string _userPrivateKey;

        public UserHeader(string org, string orgPrivateKey, DateTime requestDate,string userPrivateKey) : base(org, orgPrivateKey, requestDate)
        {
            _userPrivateKey = userPrivateKey;
        }

        public string loginId { get; set; }
        public string userPubKey
        {
            get { return Enctypter.EncryptUser(loginId, _userPrivateKey, _requestDate); }
        }

    }
}