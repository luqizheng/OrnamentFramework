using System;
using System.Collections.Generic;
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
        public IDictionary<string, string> GlobalVariable { get; set; }
        public IList<IDictionary<string, string>> UserDatas { get; set; }

        public string Org
        {
            get { return _org; }
        }

        public string[] LoginIds { get; set; }

        public string Token
        {
            get { return BuildToken(_createTime, Org, _privateCode); }
        }

        public string CreateDate
        {
            get { return _createTime.ToString("yyyy-MM-dd HH:mm:ss"); }
        }

        public static string BuildToken(DateTime date, string org, string privateCode)
        {
            string CreateDate = date.ToString("yyyy-MM-dd HH:mm:ss");
            string apiKey = Convert.ToBase64String(privateCode.Md5Utf8());
            string data = string.Format("{0};{1};{2}", org, CreateDate, apiKey);
            string orgCreateDate = Convert.ToBase64String(data.Sha1Utf8());
            return orgCreateDate;
        }
    }
}