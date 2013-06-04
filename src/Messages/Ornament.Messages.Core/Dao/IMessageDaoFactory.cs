﻿using System;
using System.Linq;
using Microsoft.Win32;

namespace Ornament.Messages.Dao
{
    public interface IMessageDaoFactory
    {
        IQueryable<Message> Messages { get; }

        IQueryable<ReaderReadStatus> ReadStates { get; }

        IQueryable<MessageType> MessageTypes { get; }

        IInfoDao MessageDao { get; }

        IInfoTypeDao MessageTypeDao { get; }

        IInfoReaderDao MessageReaderDao { get; }

        IInfoReadStateDao MessageReadStateDao { get; }
    }
}