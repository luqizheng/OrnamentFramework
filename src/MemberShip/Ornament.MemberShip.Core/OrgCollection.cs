using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Ornament.MemberShip
{
    public interface IOrgCollection:Iesi.Collections.Generic.ISet<Org>
    {
        Org Parent { get; set; }
        void ResetOrderId();


    }
    public class OrgCollection : Iesi.Collections.Generic.HashedSet<Org>,IOrgCollection
    {
        public OrgCollection(Org parent)
        {
            Parent = parent;
        }

        public OrgCollection()
        {
            
        }

        public Org Parent { get; set; }

        public override bool Add(Org o)
        {
            if (o.Id == Parent.Id)
                throw new ArgumentException("Org can not add self");
            if (o == null)
                throw new ArgumentNullException("o");
            if (String.IsNullOrEmpty(o.Id))
                throw new ArgumentNullException("o", "org's Id must have value before being added");
            if (String.IsNullOrEmpty(Parent.Id))
                throw new ArgumentException("save it before add child org");
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
                SetOrderId(Parent, c);
            }
        }

        private void SetOrderId(Org parent, Org newChild)
        {
            if (String.IsNullOrEmpty(parent.OrderId))
                newChild.OrderId = parent.Id;
            else
                newChild.OrderId = parent.OrderId + "." + parent.Id;
        }
    }
}