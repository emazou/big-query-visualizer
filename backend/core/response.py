from rest_framework.response import Response
from rest_framework import status

def format_response(data, message='OK', success=True, status_code=status.HTTP_200_OK):
    """
    Formats the response in a consistent format
    args:
        data: Data to be sent in the response
        message: Message to be sent in the response
        success: Boolean indicating whether the request was successful or not
        status_code: HTTP status code
    
    """
    return Response({
        'success': success,
        'message': message,
        'data': data,
        'status': status_code
    }, status=status_code)