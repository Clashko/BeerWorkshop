using BeerWorkshop.Application.Enums;

namespace BeerWorkshop.Application.Dto.Responses;

public class MediatrResponseDto<T>
{
    public ResponseStatus ResponseStatus { get; set; }
    public T? Result { get; set; }
    public string Message { get; set; } = string.Empty;

    public static MediatrResponseDto<T> Success(T data, string message) =>
        new() { ResponseStatus = ResponseStatus.Success, Result = data, Message = message };
    public static MediatrResponseDto<T> NotFound(string message) =>
        new() { ResponseStatus = ResponseStatus.NotFound, Message = message };
    public static MediatrResponseDto<T> Failure(string message) =>
        new() { ResponseStatus = ResponseStatus.BadRequest, Message = message };
}