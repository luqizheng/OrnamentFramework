namespace Ornament.MVCWebFrame.Models
{
    public class Editor
    {
        public Editor()
        {
            this.Height = "580px";
            this.PlaceHolderText = "Enter your text ...";
        }

        public string UploadFileUrl { get; set; }
        /// <summary>
        /// Name of texarea for submit.
        /// </summary>
        public string EditorName { get; set; }
        /// <summary>
        /// Gets or sets the content
        /// </summary>
        public string Content { get; set; }
       
        /// <summary>
        /// Gets or sets Height of Editor 
        /// </summary>

        public string Height { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string PlaceHolderText { get; set; }

        public int FileSizeKB { get; set; }
    }
}