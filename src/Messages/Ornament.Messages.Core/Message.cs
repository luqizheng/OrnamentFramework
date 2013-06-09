using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip;
using Ornament.Messages.Contents;
using Qi.Domain;

namespace Ornament.Messages
{
    public class Message : DomainObject<Message, string>
    {
        private IDictionary<string, Content> _contents;
        private List<IPerformer> _orgs;
        private Iesi.Collections.Generic.ISet<IPerformer> _readers;
        private List<IPerformer> _roles;
        private MessageType _type;
        private List<IPerformer> _userGroups;
        private List<IPerformer> _users;
        private bool loopAllPerformer;


        /// <summary>
        /// </summary>
        /// <param name="publisher"></param>
        /// <param name="type"></param>
        public Message(User publisher, MessageType type)
            : this()
        {
            if (publisher == null)
                throw new ArgumentNullException("publisher");

            if (type == null)
                throw new ArgumentNullException("type");

            Publisher = publisher;
            Type = type;
        }

        protected Message()
        {
            CreateTime = DateTime.Now;
            EffectTime = null;
            State = MessageState.Draft;
        }


        /// <summary>
        /// </summary>
        public virtual Priority Priority { set; get; }


        /// <summary>
        ///     Gets or sets the Message State.
        /// </summary>
        public virtual MessageState State { get; set; }

        /// <summary>
        ///     Gets or sets the type
        /// </summary>
        public virtual MessageType Type
        {
            get { return _type; }
            set
            {
                if (value == null)
                    throw new ArgumentNullException("value", "Type can't be null");
                _type = value;
            }
        }


        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }

        /// <summary>
        ///     发布人
        /// </summary>
        public virtual User Publisher { get; protected set; }

        /// <summary>
        ///     获取或设定信息发生时间
        /// </summary>
        public virtual DateTime? EffectTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual DateTime? PublishTime { get; set; }

        /// <summary>
        /// </summary>
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
        }

        /// <summary>
        ///     Gets the the MessageReader.
        /// </summary>
        public virtual Iesi.Collections.Generic.ISet<IPerformer> Readers
        {
            get { return _readers ?? (_readers = new HashedSet<IPerformer>()); }
        }

        private List<IPerformer> Roles
        {
            get { return _roles ?? (_roles = new List<IPerformer>()); }
        }

        private List<IPerformer> Users
        {
            get { return _users ?? (_users = new List<IPerformer>()); }
        }

        private List<IPerformer> UserGroups
        {
            get { return _userGroups ?? (_userGroups = new List<IPerformer>()); }
        }

        private List<IPerformer> Orgs
        {
            get { return _orgs ?? (_orgs = new List<IPerformer>()); }
        }

        /// <summary>
        /// </summary>
        /// <param name="addReaders"></param>
        public virtual void AddReaders(params IPerformer[] addReaders)
        {
            if (addReaders == null || addReaders.Length == 0)
                throw new ArgumentException("could not set reader to null or emtpy", "addReaders");
            foreach (IPerformer member in addReaders)
            {
                Readers.Add(member);
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="language"></param>
        /// <returns></returns>
        public virtual Content Show(string language)
        {
            if (!Contents.ContainsKey(language))
                throw new ArgumentOutOfRangeException("language", "can't find language(" + language + ") defined.");
            Content content = Contents[language];
            return content;
        }

        /// <summary>
        /// </summary>
        /// <para name="manager"></para>
        /// <returns></returns>
        public virtual Content Show()
        {
            if (Contents.Count == 0)
                throw new ArgumentOutOfRangeException("Message do not have any content");
            string lang = CultureInfo.CurrentUICulture.Name;
            if (Contents.ContainsKey(lang))
                return Show(lang);
            if (lang.IndexOf("-", StringComparison.Ordinal) != -1)
            {
                lang = lang.Substring(2);
                if (Contents.ContainsKey(lang))
                    return Show(lang);
            }
            return Contents.Values.First();
        }


        public virtual IPerformer[] GetUsers()
        {
            if (!loopAllPerformer)
            {
                Assing();
                loopAllPerformer = true;
            }
            return Users.ToArray();
        }

        public virtual IPerformer[] GetUserGroups()
        {
            if (!loopAllPerformer)
            {
                Assing();
                loopAllPerformer = true;
            }
            return UserGroups.ToArray();
        }
        public virtual IPerformer[] GetOrgs()
        {
            if (!loopAllPerformer)
            {
                Assing();
                loopAllPerformer = true;
            }
            return Orgs.ToArray();
        }

        public virtual IPerformer[] GetRoles()
        {
            if (!loopAllPerformer)
            {
                Assing();
                loopAllPerformer = true;
            }
            return Roles.ToArray();
        }

        private void Assing()
        {
            foreach (var reader in Readers)
            {
                
                if (reader.Type == PerformerType.Role)
                    Roles.Add(reader);

                if (reader.Type == PerformerType.UserGroup)
                    UserGroups.Add(reader);

                if (reader.Type == PerformerType.User)
                    Users.Add(reader);

                if (reader.Type == PerformerType.Org)
                    Orgs.Add(reader);
            }
        }
    }
}