using System;

namespace Ornament.EasySqlExecuter
{
    public delegate void DataValueHandler(Value sender);

    /// <summary>
    /// executer中一个数据的实体
    /// </summary>
    public class Value
    {
        private object _value;

        public Value()
        {
        }

        public Value(object value)
        {
            Target = value;
        }

        public object Target
        {
            get
            {
                if (ValueChanged != null)
                    ValueChanged(this);
                return _value;
            }
            set { _value = value; }
        }

        /// <summary>
        /// 当其他对象需要这个DataValue的数据的时候,就发生这个事件。
        /// </summary>
        public event DataValueHandler ValueChanged;

        public override string ToString()
        {
            if (Target != null)
                return Target.ToString();
            return "";
        }

        public override bool Equals(object obj)
        {
            bool result = ReferenceEquals(obj, this);
            if (result)
                return true;
            var insObj = obj as Value;
            if (insObj == null)
            {
                if (obj != null)
                    return obj.Equals(Target);
                else if (Target != null)
                    return Target.Equals(obj);
                else
                    return true;
            }
            return Target.Equals(insObj.Target);
        }

        public bool Equals(Value other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Equals(other._value, _value);
        }

        public override int GetHashCode()
        {
            return (_value != null ? _value.GetHashCode() : 0);
        }

        #region implicit convert

        public static implicit operator Value(string obj)
        {
            return new Value(obj);
        }

        public static implicit operator Value(int obj)
        {
            return new Value(obj);
        }

        public static implicit operator Value(float obj)
        {
            return new Value(obj);
        }

        public static implicit operator Value(bool obj)
        {
            return new Value(Convert.ToInt32(obj));
        }

        public static implicit operator Value(Int64 obj)
        {
            return new Value(obj);
        }

        public static implicit operator Value(Double obj)
        {
            return new Value(obj);
        }

        public static implicit operator Value(char obj)
        {
            return new Value(obj);
        }

        public static implicit operator Value(Enum obj)
        {
            return new Value(Convert.ToInt32(obj));
        }

        public static implicit operator Value(Guid obj)
        {
            return new Value(obj);
        }

        public static implicit operator Value(DateTime obj)
        {
            return new Value(obj);
        }

        public static implicit operator Value(decimal obj)
        {
            return new Value(obj);
        }

        #endregion
    }
}