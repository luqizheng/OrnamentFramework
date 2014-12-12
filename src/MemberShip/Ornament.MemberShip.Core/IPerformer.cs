using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Properties;

namespace Ornament.MemberShip
{
    /// <summary>
    ///     Performer
    /// </summary>
    public interface IPerformer
    {
        /// <summary>
        /// </summary>
        string Id { get; set; }

        /// <summary>
        ///     Get's the name of the Performer
        /// </summary>
          [Display(Name = "Name", ResourceType = typeof(Resources)),
         Required(ErrorMessageResourceName = "RequireName", ErrorMessageResourceType = typeof(Resources)),
         RegularExpression(".{1,30}", ErrorMessageResourceName = "NameOverMaxLength",
             ErrorMessageResourceType = typeof(Resources))]
        string Name { get; set; }

        /// <summary>
        /// </summary>
        [Display(Name = "Remark", ResourceType = typeof(Resources))]
        [UIHint("Textarea"), StringLength(200, ErrorMessageResourceName = "RemarkOverMaxLength",
            ErrorMessageResourceType = typeof(Resources))]
        string Remarks { get; set; }

        ISet<Role> Roles { get; set; }

        DateTime? UpdateTime { get; set; }

        /// <summary>
        /// </summary>
        string Type { get; }

        /// <summary>
        ///     Gets all users in this Perforomers.
        /// </summary>
        /// <param name="memberShipDaoFactory"></param>
        /// <returns></returns>
        IList<User> GetUsers(IMemberShipDaoFactory memberShipDaoFactory);
    }
}