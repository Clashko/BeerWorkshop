using FluentValidation;
using System.Net;
using System.Text.Json;

namespace BeerWorkshop.Api.Middlewares;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred.");
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var statusCode = HttpStatusCode.InternalServerError; // Default to 500
        var errorResponse = new ErrorResponse { Message = "An internal server error occurred." };

        switch (exception)
        {
            case ValidationException validationException:
                statusCode = HttpStatusCode.BadRequest; // 400
                errorResponse.Message = "Validation failed.";
                errorResponse.Errors = validationException.Errors.Select(e => new ErrorDetail { Field = e.PropertyName, Message = e.ErrorMessage }).ToList();
                break;
            case KeyNotFoundException keyNotFoundException:
                statusCode = HttpStatusCode.NotFound; // 404
                errorResponse.Message = keyNotFoundException.Message;
                break;
            case InvalidOperationException invalidOperationException:
                statusCode = HttpStatusCode.BadRequest; // 400
                errorResponse.Message = invalidOperationException.Message;
                break;
            // Add more specific exception types as needed
            default:
                // For unhandled exceptions, we might not want to expose internal details
                errorResponse.Message = "An unexpected error occurred.";
                break;
        }

        context.Response.StatusCode = (int)statusCode;
        return context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
    }
}

// Helper classes for consistent error response format
public class ErrorResponse
{
    public string Message { get; set; } = "An error occurred.";
    public List<ErrorDetail>? Errors { get; set; }
}

public class ErrorDetail
{
    public string Field { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}