﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShip;
using Ornament.Messages.PersonalMessages;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IPersonalMessageDao : IDao<string, PersonalMessage>
    {
        IList<PersonalMessage> GetNewMessage(User user, int pageIndex, int pageSize);
        int CountNewMessage(User user);
        IList<PersonalMessage> GetChat(User owner, User relative,int pageIndex,int pageSize);
    }
}