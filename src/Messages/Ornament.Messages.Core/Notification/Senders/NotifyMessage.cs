using System;
using Qi;
using Qi.Secret;

namespace Ornament.Messages.Notification.Senders
{
    public class NotifyMessage
    {
        private readonly string _org;
        private readonly string _privateCode;
        private DateTime _createTime;

        public NotifyMessage(string privateCode, string org)
        {
            _privateCode = privateCode;
            _org = org;
            _createTime = DateTime.Now;
        }
        public string Subject { get; set; }
        public string Content { get; set; }
        public bool IsTemplate { get; set; }

        public string Org
        {
            get { return _org; }
        }

        public string[] LoginIds { get; set; }

        public string Token
        {
            get
            {
                string apiKey = _privateCode.Md5Utf8().ToStringEx();
                string data = string.Format("{0};{1};{2}", _org, CreateDate, apiKey);
                string orgCreateDate = EncryptHelper.Sha1Utf8(data).ToStringEx();
                return orgCreateDate;
            }
        }

        public string CreateDate
        {
            get { return _createTime.ToString("yyyy-MM-dd HH:mm:ss"); }
        }
    }
}