using System;
using System.Collections.Generic;
using System.IO;
using Qi.Domain;
using Qi.IO.Serialization;

namespace Ornament.MemberShip
{
    /// <summary>
    ///     Prifile value
    /// </summary>
    public class ProfileValue : DomainObject<ProfileValue, string>
    {
        private Dictionary<string, object> _properities;

        /// <summary>
        ///     Gets or sets the User's loginid
        /// </summary>
        public virtual string LoginId { get; set; }

        /// <summary>
        ///     Gets or sets value indecaite it's anonymous profile
        /// </summary>
        public virtual bool IsAnonymous { get; set; }

        /// <summary>
        ///     last active date time
        /// </summary>
        public virtual DateTime? LastActivityDate { get; set; }

        /// <summary>
        /// </summary>
        public virtual Dictionary<string, object> Properities
        {
            get
            {
                if (_properities == null)
                {
                    lock (this)
                    {
                        _properities = new Dictionary<string, object>();
                    }
                }

                return _properities;
            }
        }


        protected virtual byte[] StreamValues
        {
            get
            {
                var memory = new MemoryStream();
                _properities.SerializeBinary(memory);
                return memory.ToArray();
            }
            set
            {
                var stream = new MemoryStream(value);
                _properities = SerializationHelper.DeserializeBinary<Dictionary<string, object>>(stream);
            }
        }
    }
}