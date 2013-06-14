using System;
using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.MemberShip
{
    /// <summary>
    /// Prifile value 
    /// </summary>
    public class ProfileValue : DomainObject<ProfileValue,string>
    {
        private Dictionary<string, object> _properities;

        /// <summary>
        /// Gets or sets the User's loginid
        /// </summary>
        public virtual string LoginId { get; set; }

        /// <summary>
        /// Gets or sets value indecaite it's anonymous profile
        /// </summary>
        public virtual bool IsAnonymous { get; set; }

        /// <summary>
        /// last active date time
        /// </summary>
        public virtual DateTime? LastActivityDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual Dictionary<string, object> Properities
        {
            get { return _properities ?? (_properities = new Dictionary<string, object>()); }
        }
    }
}