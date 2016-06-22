namespace Ornament.Domain.Uow
{
    public interface IUnitOfWorkProvider
    {
        /// <summary>
        /// Begin a UOW
        /// </summary>
        /// <param name="name"></param>
        void Begin(string name);
        void Begin();
        void Add(IUnitOfWorkFactory factory);
    }
}