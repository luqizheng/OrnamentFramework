using System;
using System.Linq.Expressions;
using System.Reflection;
using System.Web.Mvc;
using Ornament.Web.PortableAreas.InputBuilder.Conventions.Property;
using Ornament.Web.PortableAreas.InputBuilder.Conventions.PropertyName;
using Ornament.Web.PortableAreas.InputBuilder.Conventions.Type;
using Ornament.Web.PortableAreas.InputBuilder.Helpers;
using Ornament.Web.PortableAreas.InputBuilder.Views;

namespace Ornament.Web.PortableAreas.InputBuilder.InputSpecification
{
    public interface IViewModelFactory
    {
        TypeViewModel Create(Type type);

        PropertyViewModel Create(PropertyInfo propertyInfo, string name, bool indexed, Type type, object model);
    }

    public class ViewModelFactory<T> : IViewModelFactory where T : class
    {
        private readonly HtmlHelper<T> _htmlHelper;
        private readonly IPropertyViewModelNameConvention _nameConventions;
        private readonly IPropertyViewModelFactory[] _propertyFactories;
        private readonly ITypeViewModelFactory[] _typeFactories;

        public ViewModelFactory(HtmlHelper<T> htmlHelper, IPropertyViewModelFactory[] propertyFactories,
            IPropertyViewModelNameConvention nameConvention, ITypeViewModelFactory[] typeFactories)
        {
            _htmlHelper = htmlHelper;
            _typeFactories = typeFactories;
            _propertyFactories = propertyFactories;
            _nameConventions = nameConvention;
        }

        public virtual PropertyViewModel Create(PropertyInfo propertyInfo, string name, bool indexed, Type type,
            object model)
        {
            foreach (IPropertyViewModelFactory factory in _propertyFactories)
            {
                if (factory.CanHandle(propertyInfo))
                {
                    if (factory is IRequireViewModelFactory)
                        ((IRequireViewModelFactory) factory).Set(this);

                    return factory.Create(propertyInfo, model, name, type);
                }
            }
            throw new InvalidOperationException(
                "Could not find an Input Builder convention(IPropertyViewModelFactory) for type:" +
                propertyInfo.PropertyType + " and Name:" + name);
        }

        public TypeViewModel Create(Type type)
        {
            foreach (ITypeViewModelFactory factory in _typeFactories)
            {
                if (factory.CanHandle(type))
                {
                    return factory.Create(type);
                }
            }
            throw new InvalidOperationException(
                "Could not find an Input Builder Type Convention(ITypeViewModelFactory) for type:" + type.Name);
        }

        public PropertyViewModel Create(Expression<Func<T, object>> expression)
        {
            PropertyInfo propertyInfo = ReflectionHelper.FindPropertyFromExpression(expression);
            string name = ReflectionHelper.BuildNameFrom(expression);
            bool indexed = ReflectionHelper.IsIndexed(expression);
            return Create(propertyInfo, name, indexed, expression.Body.Type);
        }

        public PropertyViewModel Create(PropertyInfo propertyInfo, string parentName)
        {
            string name = parentName + _nameConventions.PropertyName(propertyInfo);
            return Create(propertyInfo, name, false, propertyInfo.PropertyType);
        }

        public virtual object ValueFromModelPropertyConvention(PropertyInfo propertyInfo, object model)
        {
            if (model != null)
            {
                object value = propertyInfo.GetValue(model, new object[0]);
                if (value != null)
                {
                    return value;
                }
            }
            return string.Empty;
        }

        public virtual PropertyViewModel Create(PropertyInfo propertyInfo, string name, bool indexed, Type type)
        {
            return Create(propertyInfo, name, indexed, type, _htmlHelper.ViewData.Model);
        }

        public TypeViewModel Create()
        {
            return Create(typeof (T));
        }
    }
}