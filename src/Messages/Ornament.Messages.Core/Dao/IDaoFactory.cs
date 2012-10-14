using System;
using System.Linq;
using Microsoft.Win32;

namespace Ornament.Messages.Dao
{
    public interface IDaoFactory
    {
        IQueryable<Message> Infos { get; }

        IQueryable<ReaderReadStatus> ReadStates { get; }

        IQueryable<MessageType> InfoTypes { get; }

        IInfoDao InfoDao { get; }

        IInfoTypeDao InfoTypeDao { get; }

        IInfoReaderDao InfoReaderDao { get; }

        IInfoReadStateDao InfoReadStateDao { get; }
    }
}