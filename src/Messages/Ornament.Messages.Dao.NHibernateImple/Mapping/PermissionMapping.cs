﻿using FluentNHibernate.Mapping;
using Ornament.MemberShip.Permissions;

namespace Ornament.Messages.Dao.NHibernateImple.Mapping
{
    public class PermissionMapping : SubclassMap<GenericPermission<MessageType>>
    {
        public PermissionMapping()
        {
            this.Table("Msgs_Permission");
            this.DiscriminatorValue("Info");
            this.References(x => x.Resource)
                .Column("InfoTypeId");
        }
    }
}