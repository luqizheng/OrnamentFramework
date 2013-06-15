using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Iesi.Collections.Generic;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages
{
    public class Message : DomainObject<Message, string>
    {
        private IDictionary<string, Content> _contents;
        private bool _loopAllPerformer;
        private List<IPerformer> _orgs;
        private Iesi.Collections.Generic.ISet<IPerformer> _readers;
        private List<IPerformer> _roles;
        private MessageType _type;
        private List<IPerformer> _userGroups;
        private List<IPerformer> _users;


        /// <summary>
        /// </summary>
        /// <param name="publisher"></param>
        /// <param name="type"></param>
        /// <exception cref="ArgumentNullException">type or publisher are null</exception>
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
        ///     ∑¢≤º»À
        /// </summary>
        public virtual User Publisher { get; protected set; }

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
            if (!_loopAllPerformer)
            {
                Assing();
                _loopAllPerformer = true;
            }
            return Users.ToArray();
        }

        public virtual IPerformer[] GetUserGroups()
        {
            if (!_loopAllPerformer)
            {
                Assing();
                _loopAllPerformer = true;
            }
            return UserGroups.ToArray();
        }

        public virtual IPerformer[] GetOrgs()
        {
            if (!_loopAllPerformer)
            {
                Assing();
                _loopAllPerformer = true;
            }
            return Orgs.ToArray();
        }

        public virtual IPerformer[] GetRoles()
        {
            if (!_loopAllPerformer)
            {
                Assing();
                _loopAllPerformer = true;
            }
            return Roles.ToArray();
        }

        private void Assing()
        {
            foreach (IPerformer reader in Readers)
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