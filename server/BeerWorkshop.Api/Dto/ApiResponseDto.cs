namespace BeerWorkshop.Api.Dto;

public record ApiResponseDto<T>(T Data, string Message);