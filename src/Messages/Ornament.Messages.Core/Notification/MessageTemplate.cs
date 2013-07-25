using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;
using Ornament.Messages.Notification.Contents;
using Qi.Text;

namespace Ornament.Messages.Notification
{
    public delegate Dictionary<string, string> CreateVariablesHandler(User reader);

    /// <summary>
    ///     Simple Message foactory create a template messagr for each IPerformer.
    /// </summary>
    public class MessageTemplate : MessageHeaderBase<MessageTemplate>
    {
        protected MessageTemplate()
        {

        }
        public MessageTemplate(NotifyType type)
            : base(type)
        {
        }

        /// <summary>
        ///     如果是内置message，那么Name是不允许修改的
        /// </summary>
        public virtual bool Inside { get; set; }

        /// <summary>
        ///     Gets or sets Name of  message template.
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        ///     Gets or sets remark
        /// </summary>
        public virtual string Remark { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="daoFactory"></param>
        /// <param name="dao"></param>
        /// <param name="replaceVariabled"></param>
        /// <param name="performers"></param>
        public virtual void Publish(
            IMemberShipFactory daoFactory,
            CreateVariablesHandler replaceVariabled,
            params IPerformer[] performers)
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

                var simpleMessage = new SimpleMessage(u)
                    {
                        Content = new Content
                            {
                                Language = content.Language,
                                Subject = helper.Replace(content.Subject, variable),
                                Value = helper.Replace(content.Value, variable)
                            }
                    };
                this.Type.Send(simpleMessage);
            }
        }
    }
}