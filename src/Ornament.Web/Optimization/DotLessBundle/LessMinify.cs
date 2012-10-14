using System;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Optimization;
using dotless.Core;
using dotless.Core.Importers;
using dotless.Core.Input;
using dotless.Core.Loggers;
using dotless.Core.Parser;
using dotless.Core.Stylizers;
using log4net;

namespace Ornament.Web.Optimization.DotLessBundle
{
    /// <summary>
    /// code form https://gist.github.com/2002958
    /// </summary>
    public class LessMinify : IBundleTransform
    {
        private readonly CssMinify _cssMinify = new CssMinify();

        #region IBundleTransform Members

        /// <summary>
        /// Processes the specified bundle of LESS files.
        /// </summary>
        /// <param name="context">bundle contesxt </param>
        /// <param name="bundle">The LESS bundle.</param>
        public void Process(BundleContext context, BundleResponse bundle)
        {
            if (bundle == null)
            {
                throw new ArgumentNullException("bundle");
            }

            context.HttpContext.Response.Cache.SetLastModifiedFromFileDependencies();

            var lessParser = new Parser()
                {
                    Debug = true,
                };
            ILessEngine lessEngine = CreateLessEngine(lessParser);


            var content = new StringBuilder(bundle.Content.Length);

            foreach (FileInfo file in bundle.Files)
            {
                if (file.Extension.ToLower() == ".less")
                {
                    SetCurrentFilePath(lessParser, file.FullName);
                    string source = File.ReadAllText(file.FullName);
                    content.Append(lessEngine.TransformToCss(source, file.FullName));
                    content.AppendLine();
                    AddFileDependencies(lessParser);
                }
                else
                {
                    content.Append(File.ReadAllText(file.FullName));
                }
            }

            bundle.Content = content.ToString();
            bundle.ContentType = "text/css";
            //_cssMinify.Process(context, bundle);

        }

        #endregion

        /// <summary>
        /// Creates an instance of LESS engine.
        /// </summary>
        /// <param name="lessParser">The LESS parser.</param>
        private ILessEngine CreateLessEngine(Parser lessParser)
        {
            //var logger = new ConsoleLogger(LogLevel.Debug);
            var logger = log4net.LogManager.GetLogger(this.GetType());
            return new LessEngine(lessParser, new Log4netLogger(logger), true, true);
        }

        /// <summary>
        /// Adds imported files to the collection of files on which the current response is dependent.
        /// </summary>
        /// <param name="lessParser">The LESS parser.</param>
        private void AddFileDependencies(Parser lessParser)
        {
            IPathResolver pathResolver = GetPathResolver(lessParser);

            foreach (string importedFilePath in lessParser.Importer.Imports)
            {
                string fullPath = pathResolver.GetFullPath(importedFilePath);
                HttpContext.Current.Response.AddFileDependency(fullPath);
            }

            lessParser.Importer.Imports.Clear();
        }

        /// <summary>
        /// Returns an <see cref="IPathResolver"/> instance used by the specified LESS lessParser.
        /// </summary>
        /// <param name="lessParser">The LESS prser.</param>
        private IPathResolver GetPathResolver(Parser lessParser)
        {
            var importer = lessParser.Importer as Importer;
            if (importer != null)
            {
                var fileReader = importer.FileReader as FileReader;
                if (fileReader != null)
                {
                    return fileReader.PathResolver;
                }
            }

            return null;
        }

        /// <summary>
        /// Informs the LESS parser about the path to the currently processed file. 
        /// This is done by using custom <see cref="IPathResolver"/> implementation.
        /// </summary>
        /// <param name="lessParser">The LESS parser.</param>
        /// <param name="currentFilePath">The path to the currently processed file.</param>
        private void SetCurrentFilePath(Parser lessParser, string currentFilePath)
        {
            var importer = lessParser.Importer as Importer;
            if (importer != null)
            {
                var fileReader = importer.FileReader as FileReader;

                if (fileReader == null)
                {
                    importer.FileReader = fileReader = new FileReader();
                }

                var pathResolver = fileReader.PathResolver as ImportedFilePathResolver;

                if (pathResolver != null)
                {
                    pathResolver.CurrentFilePath = currentFilePath;
                }
                else
                {
                    fileReader.PathResolver = new ImportedFilePathResolver(currentFilePath);
                }
            }
            else
            {
                throw new InvalidOperationException("Unexpected importer type on dotless parser");
            }
        }

        private class Log4netLogger : dotless.Core.Loggers.ILogger
        {
            private readonly ILog _log;

            public Log4netLogger(log4net.ILog log)
            {
                _log = log;
            }

            public void Log(LogLevel level, string message)
            {
                _log.Debug(message);
            }

            public void Info(string message)
            {
                _log.Info(message);
            }

            public void Info(string message, params object[] args)
            {
                _log.Info(String.Format(message, args));
            }

            public void Debug(string message)
            {
                _log.Debug(message);
            }

            public void Debug(string message, params object[] args)
            {
                _log.Debug(String.Format(message, args));
            }

            public void Warn(string message)
            {
                _log.Warn(message);
            }

            public void Warn(string message, params object[] args)
            {
                _log.Warn(String.Format(message, args));
            }

            public void Error(string message)
            {
                _log.Error(message);
            }

            public void Error(string message, params object[] args)
            {
                _log.Error(String.Format(message, args));
            }
        }
    }
}