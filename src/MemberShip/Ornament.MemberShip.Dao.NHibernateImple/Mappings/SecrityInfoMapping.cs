﻿using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class SecrityInfoMapping : ClassMap<User.SecurityInfo>
    {
        public SecrityInfoMapping()
        {
            Table(("MBS_UserSecrityInfo"));
            Id(s => s.Id).GeneratedBy.UuidHex("N").Length(32);
            Map(s => s.LastPasswordChangedDate);
            Map(s => s.Password)
                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore).Length(64); ;

            Map(s => s.PasswordAnswer).Length(100).LazyLoad()
                                      .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore); ;
            Map(s => s.PasswordQuestion).Length(100).LazyLoad()
                                        .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore);
            References(s => s.User);
            Map(s => s.LastLoginDate);
        }
    }
}