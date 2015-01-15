using System;
using System.Collections.Generic;
using Ornament.MemberShip;
using SocketIOClient;

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

        public virtual string ClientName { get; set; }

        public virtual string Server { get; set; }

        public virtual string PrivateCode { get; set; }

        public override void Send(NotifyMessageTemplate template, CreateVariablesHandler dynamicCreateVariablesHandler,
            User[] user)
        {
            IDictionary<string, LanguageUserSet> contents = LanguageUserSet.Analyzer(template, user);


            Client client = BuildClient();
            foreach (LanguageUserSet sentMsg in contents.Values)
            {
                client.Emit("send notify", new NotifyMessage(PrivateCode, ClientName)
                {
                    Content = sentMsg.Content,
                    Subject = sentMsg.Content
                });
            }
        }

        private Client BuildClient()
        {
            var result = new Client(Server);

            result.On("sent notify", fn => { Console.WriteLine(fn.MessageText); });
            return result;
        }

        private class LanguageUserSet
        {
            public string Content { get; set; }
            public string Subject { get; set; }
            public List<string> LoginIds { get; set; }

            public static IDictionary<string, LanguageUserSet> Analyzer(NotifyMessageTemplate template, User[] users)
            {
                var result = new Dictionary<string, LanguageUserSet>();
                foreach (User user in users)
                {
                    if (!result.ContainsKey(user.Language))
                    {
                        var s = new LanguageUserSet();
                        Content content = template.GetContent(user);
                        s.Content = content.Value;
                        s.Subject = content.Subject;
                        s.LoginIds = new List<string>();
                        result.Add(user.Language, s);
                    }
                    result[user.Language].LoginIds.Add(user.LoginId);
                }
                return result;
            }
        }
    }
}