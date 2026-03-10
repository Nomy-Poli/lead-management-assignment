using System.ComponentModel.DataAnnotations;

namespace LeadManagement.Api.Models
{
    public class CreateLeadRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone is required")]
        [RegularExpression(@"^\d+$", ErrorMessage = "Phone must contain digits only")]
        public string Phone { get; set; } = string.Empty;
    }
}