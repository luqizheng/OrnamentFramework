using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;
using Qi.Text;

namespace Ornament.Messages.Notification
{
    public delegate Dictionary<string, string> ReplaceVariabled(User reader);

    /// <summary>
    /// </summary>
    public class SimpleMessageFactory : MessageFactoryBase
    {
        /// <summary>
        /// </summary>
        /// <param name="daoFactory"></param>
        /// <param name="dao"></param>
        /// <param name="replaceVariabled"></param>
        /// <param name="performers"></param>
        public virtual void Publish(IMemberShipFactory daoFactory,
                                    IMessageDao dao, ReplaceVariabled replaceVariabled, params IPerformer[] performers)
        {
            var targetuser = new HashSet<User>();
            foreach (IPerformer performer in performers)
            {
                foreach (User user in performer.GetUsers(daoFactory))
                    targetuser.Add(user);
            }

            var helper = new NamedFormatterHelper();


            foreach (User u in targetuser)
            {
                Content content = GetContent(u);
                Dictionary<string, string> variable = replaceVariabled(u);

                var simpleMessage = new SimpleMessage
                    {
                        Content = new Content
                            {
                                Language = content.Language,
                                Subject = helper.Replace(content.Subject, variable),
                                Value = helper.Replace(content.Value, variable)
                            },
                        ReadStatus = ReadStatus.UnRead,
                        User = u
                    };
                dao.SaveOrUpdate(simpleMessage);
            }
        }
    }
}