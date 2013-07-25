using System;
using Iesi.Collections.Generic;
using Ornament.MemberShip;

namespace Ornament.Messages.Notification
{
    public class Announcement : MessageHeaderBase<Announcement>
    {
        private ISet<Org> _orgs;
        private ISet<Role> _roles;
        private ISet<UserGroup> _userGroups;
        private ISet<User> _users;

        /// <summary>
        ///     only for nhibernate
        /// </summary>
        protected Announcement()
        {
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="nodifyType"></param>
        /// <exception cref="ArgumentNullException">NodifyType is null</exception>
        public Announcement(NotifyType nodifyType)
        {
            if (nodifyType == null)
                throw new ArgumentNullException("nodifyType");
            this.Type = nodifyType;
        }

        public virtual EditState EditState { get; set; }

        public virtual ISet<User> Users
        {
            get { return _users ?? (_users = new HashedSet<User>()); }
        }

        public virtual ISet<Role> Roles
        {
            get { return _roles ?? (_roles = new HashedSet<Role>()); }
        }

        public virtual ISet<UserGroup> UserGroups
        {
            get { return _userGroups ?? (_userGroups = new HashedSet<UserGroup>()); }
        }

        public virtual ISet<Org> Orgs
        {
            get { return _orgs ?? (_orgs = new HashedSet<Org>()); }
        }

        /// <summary>
        /// </summary>
        /// <param name="language"></param>
        /// <returns></returns>
        public virtual Content Show(string language)
        {
            return GetContent(language);
        }

        /// <summary>
        /// </summary>
        /// <para name="manager"></para>
        /// <returns></returns>
        public virtual Content Show(User user)
        {
            return GetContent(user);
        }
    }
}