using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Badminton.Consumableses
{
    public class Brand : DomainObject<Brand, int>
    {
        /// <summary>
        /// Gets or sets the name of Brand name
        /// </summary>
        [Required]
        public virtual string Name { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}