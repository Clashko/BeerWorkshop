namespace BeerWorkshop.Application.Dto.Requests.Users;

public record RegisterUserRequestDto(string Login, string Password, string FirstName, string LastName, string SurName);