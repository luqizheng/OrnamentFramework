using Iesi.Collections.Generic;
using Ornament.MemberShip;

namespace Ornament.Messages.Notification
{
    public class Announcement : MessageHeaderBase<Announcement>
    {
        /// <summary>
        ///     only for nhibernate
        /// </summary>
        protected Announcement()
        {
        }

        public virtual EditState EditState { get; set; }

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

        private ISet<User> _users;
        private ISet<Role> _roles;
        private ISet<UserGroup> _userGroups;
        private ISet<Org> _orgs;

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

    }
}