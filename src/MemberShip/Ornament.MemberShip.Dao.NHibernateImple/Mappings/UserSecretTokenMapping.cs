﻿using FluentNHibernate.Mapping;
using Ornament.MemberShip.Security;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class UserSecretTokenMapping : ClassMap<UserSecretToken>
    {
        public UserSecretTokenMapping()
        {
            Table("MBS_UserSecretToken");
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32); ;
            this.References(s => s.Account).Cascade.SaveUpdate();
            Map(s => s.CreateTime).Insert();
            Map(s => s.PrivateKey);
            Map(s => s.ExpireTime);
            Map(s => s.VerifyTime);
            Map(s => s.Status);
            Map(s => s.Action).Length(64);


        }
    }
}