using System;
using Iesi.Collections.Generic;

namespace Ornament.MemberShip
{
    public interface IOrgCollection : ISet<Org>
    {
        Org Self { get; set; }
        void ResetOrderId();
    }

    public class OrgCollection : HashedSet<Org>, IOrgCollection
    {
        public OrgCollection(Org self)
        {
            Self = self;
        }

        public OrgCollection()
        {
        }


        public override void Clear()
        {
            foreach (Org i in this)
            {
                i.Parent = null;
            }
            base.Clear();
        }

        public Org Self { get; set; }

        public override bool Add(Org o)
        {
            if (o == null)
                throw new ArgumentNullException("o");

            if (Self != null && o.Id == Self.Id)
                throw new ArgumentException("Org can not add self");

            if (String.IsNullOrEmpty(o.Id))
                throw new ArgumentNullException("o", "org's Id must have value before being added");
            if (Self != null)
            {
                o.Parent = Self;
                SetOrderId(Self, o);
            }
            return base.Add(o);
        }

        public override bool Remove(Org o)
        {
            o.Parent = null;
            o.OrderId = null;
            return base.Remove(o);
        }


        public void ResetOrderId()
        {
            foreach (Org c in this)
            {
                SetOrderId(Self, c);
            }
        }

        private void SetOrderId(Org self, Org newChild)
        {
            if (String.IsNullOrEmpty(self.OrderId))
            {
                newChild.OrderId = self.Id;
            }
            else
            {
                newChild.OrderId = self.OrderId + "." + self.Id;
            }
        }
    }
}