using System;
using Qi;
using Qi.Domain;
using Qi.Secret;

namespace Ornament.MemberShips.SSO
{
    public class SystemInformation : DomainObject<SystemInformation, string>
    {
        public virtual string Name { get; set; }

        public virtual string PrivateKey { get; set; }

        

        public virtual bool ValidateSystemData(string validateData, DateTime requestDate, params string[] otherParamers)
        {
            return EncryptDate(requestDate, otherParamers) == validateData;
        }

        public virtual string EncryptDate(DateTime requestDate, params string[] otherParamers)
        {
            string encode = string.Format("{0};{1}", Id, requestDate.ToString("yyyyMMdd HH:mm:ss"));
            if (otherParamers != null && otherParamers.Length != 0)
            {
                encode += string.Format(";{0}", String.Join(",", otherParamers));
            }
            return encode.Sha1Utf8().ToStringEx();
        }
    }
}