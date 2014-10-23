using System;
using System.Collections;
using System.Collections.Generic;

namespace Ornament.MemberShip
{
    public interface IOrgCollection : ISet<Org>
    {
        Org Self { get; set; }
        void ResetOrderId();
    }

    public class OrgCollection : IOrgCollection
    {
        private readonly HashSet<Org> _orgs = new HashSet<Org>();

        public OrgCollection(Org self)
        {
            Self = self;
        }

        public OrgCollection()
        {
        }


        public void UnionWith(IEnumerable<Org> other)
        {
            _orgs.UnionWith(other);
        }

        public void IntersectWith(IEnumerable<Org> other)
        {
            _orgs.IntersectWith(other);
        }

        public void ExceptWith(IEnumerable<Org> other)
        {
            _orgs.ExceptWith(other);
        }

        public void SymmetricExceptWith(IEnumerable<Org> other)
        {
            _orgs.SymmetricExceptWith(other);
        }

        public bool IsSubsetOf(IEnumerable<Org> other)
        {
            return _orgs.IsSubsetOf(other);
        }

        public bool IsSupersetOf(IEnumerable<Org> other)
        {
            return _orgs.IsSupersetOf(other);
        }

        public bool IsProperSupersetOf(IEnumerable<Org> other)
        {
            return _orgs.IsProperSupersetOf(other);
        }

        public bool IsProperSubsetOf(IEnumerable<Org> other)
        {
            return _orgs.IsProperSubsetOf(other);
        }

        public bool Overlaps(IEnumerable<Org> other)
        {
            return _orgs.Overlaps(other);
        }

        public bool SetEquals(IEnumerable<Org> other)
        {
            return _orgs.SetEquals(other);
        }

        void ICollection<Org>.Add(Org item)
        {
            _orgs.Add(item);
        }

        public void Clear()
        {
            foreach (Org i in this)
            {
                i.Parent = null;
            }
            _orgs.Clear();
        }

        public bool Contains(Org item)
        {
            return _orgs.Contains(item);
        }

        public void CopyTo(Org[] array, int arrayIndex)
        {
            _orgs.CopyTo(array, arrayIndex);
        }

        public Org Self { get; set; }

        public bool Add(Org o)
        {
            if (o == null)
                throw new ArgumentNullException("o");

            if (Self != null && o.Id == Self.Id)
                throw new ArgumentException("Org can not add self");

            if (String.IsNullOrEmpty(o.Id))
                throw new ArgumentNullException("o", "org's Id must have value before being added");
            if (Self == null)
            {
                throw new ArgumentNullException();
            }
            o.Parent = Self;
            SetOrderId(Self, o);

            return _orgs.Add(o);
        }

        public bool Remove(Org o)
        {
            o.Parent = null;
            o.OrderId = null;
            return _orgs.Remove(o);
        }

        public int Count { get; private set; }
        public bool IsReadOnly { get; private set; }


        public void ResetOrderId()
        {
            foreach (Org c in this)
            {
                SetOrderId(Self, c);
            }
        }

        public IEnumerator<Org> GetEnumerator()
        {
            return _orgs.GetEnumerator();
        }


        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        private void SetOrderId(Org self, Org newChild)
        {
            if (String.IsNullOrEmpty(self.OrderId))
            {
                newChild.OrderId = self.Id;
            }
            else
            {
                newChild.OrderId = self.OrderId + "." + newChild.Id;
            }
        }
    }
}