using System;
using System.Text;
using Qi.Secret;

namespace Ornament.NotifyMessages.Validations
{
    public class Encypter
    {
        private readonly string _orgName;
        private readonly string _orgPrivateKey;

        public Encypter(string orgName, string orgPrivateKey)
        {
            _orgName = orgName;
            _orgPrivateKey = orgPrivateKey;
        }

        public string EncryptOrg(DateTime requestDate)
        {
            byte[] a = EncryptHelper.Md5Utf8(_orgPrivateKey);
            string privateKey = Convert.ToBase64String(a);

            string data = _orgName + requestDate.ToString("yyyyMMdd HH:mm:ss") + privateKey;
            byte[] lastData = EncryptHelper.Sha1Utf8(data);
            return Convert.ToBase64String(lastData);
        }


        public string EncryptUser(string loginId, string userPrivateKey, DateTime requestDate)
        {
            var privateKey=EncryptHelper.Md5Utf8(userPrivateKey);
            var data = loginId + ";" + privateKey + ";" + requestDate.ToString("yyyyMMdd HH:mm:ss");
            return Convert.ToBase64String(EncryptHelper.Sha1Utf8(data));
        }
    }
}