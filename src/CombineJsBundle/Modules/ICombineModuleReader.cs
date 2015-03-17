namespace CombineJs.Modules.Modules
{
    public interface ICombineModuleReader
    {
        bool Build(string scriptPath, ModuleFactory context, ScriptModule parent, out CombineModule module);
    }
}