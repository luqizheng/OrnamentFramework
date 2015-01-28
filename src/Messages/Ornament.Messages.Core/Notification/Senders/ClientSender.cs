using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization.Formatters;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Ornament.MemberShip;
using Ornament.Messages.Config;
using Qi.Web;
using Quobject.SocketIoClientDotNet.Client;

namespace Ornament.Messages.Notification.Senders
{
    public class ClientSender : Sender
    {
        protected ClientSender()
        {
        }

        public ClientSender(string server)
        {
            Server = server;
        }

        /// <summary>
        ///     客户端名称，对应chat nodejs的orn
        /// </summary>
        public virtual string ClientName { get; set; }

        public virtual string Server { get; set; }

        public virtual string PrivateCode { get; set; }

        public override void Send(NotifyMessageTemplate template, Queue<IDictionary<string, string>> userDatas,
            User[] users)
        {
            IDictionary<string, LanguageUserSet> contents = LanguageUserSet.Analyzer(template, users, userDatas);


            var r = new TaskFactory();
            System.Threading.Tasks.Task task = r.StartNew(() =>
            {
                Socket client = Send(contents);
                client.Disconnect();
            });

            TaskAwaiter d = task.GetAwaiter();
            d.GetResult();
        }

        private Socket Send(IDictionary<string, LanguageUserSet> contents)
        {
            var at = new AutoResetEvent(false);
            int sentIndex = 0;
            Socket result = IO.Socket(Server, new IO.Options
            {
                AutoConnect = false
            });

            result.On("valid", fn =>
            {
                DateTime date = DateTime.Now;
                string token = NotifyMessage.BuildToken(date, ClientName, PrivateCode);
                var data = new
                {
                    Org = ClientName,
                    CreateDate = date.ToString("yyyy-MM-dd HH:mm:ss"),
                    PublicKey = token
                };
                result.Emit("valid", JsonHelper.ToJson(data));
            });
            result.On("send notify", sentResult =>
            {
                sentIndex++;
                if (sentIndex >= contents.Count) //发送计数器，如果发完的话，就开始计算
                {
                    at.Set();
                }
            });
            result.On("valid-result", fn =>
            {
                var validateResult = (bool) fn;
                if (!validateResult)
                {
                    at.Set(); //如果验证失败，马上跳出。
                }

                foreach (LanguageUserSet sentMsg in contents.Values)
                {
                    if (sentMsg.LoginIds.Count == 0)
                        continue;
                    string serobj = JsonConvert.SerializeObject(new NotifyMessage(PrivateCode, ClientName)
                    {
                        Content = sentMsg.Content,
                        Subject = sentMsg.Subject,
                        LoginIds = sentMsg.LoginIds.ToArray(),
                        GlobalVariable = NotifySenderManager.Instance.Variables,
                        UserDatas = sentMsg.UserDatas,
                    }, new JsonSerializerSettings
                    {
                        TypeNameHandling = TypeNameHandling.None,
                        TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple,
                    });
                    result.Emit("send notify", serobj);
                }
            });
            result.Open();
            at.WaitOne();

            return result;
        }


        private class LanguageUserSet
        {
            public LanguageUserSet()
            {
                GlobalVariable = new Dictionary<string, string>();
                UserDatas = new List<IDictionary<string, string>>();
                LoginIds = new List<string>();
            }

            public string Content { get; set; }
            public string Subject { get; set; }
            public IList<string> LoginIds { get; set; }
            public IDictionary<string, string> GlobalVariable { get; set; }
            public IList<IDictionary<string, string>> UserDatas { get; set; }

            public static IDictionary<string, LanguageUserSet> Analyzer(NotifyMessageTemplate template, User[] users,
                Queue<IDictionary<string, string>> userDatas)
            {
                var result = new Dictionary<string, LanguageUserSet>();
                foreach (User user in users)
                {
                    IDictionary<string, string> userData = userDatas.Dequeue();
                    if (!result.ContainsKey(user.Language))
                    {
                        Content content = template.GetContent(user);
                        var s = new LanguageUserSet
                        {
                            Content = content.Value,
                            Subject = content.Subject,
                        };

                        s.UserDatas.Add(userData);
                        s.LoginIds.Add(user.LoginId);
                        result.Add(user.Language, s);
                    }
                    result[user.Language].LoginIds.Add(user.LoginId);
                }
                return result;
            }
        }
    }
}