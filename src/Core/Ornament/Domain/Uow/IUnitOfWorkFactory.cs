namespace Ornament.Domain.Uow
{
    public interface IUnitOfWorkFactory
    {
        string Name { get; set; }
        IUnitOfWork Create();
    }
}