from rest_framework.response import Response
from rest_framework import status

def format_response(data, message='OK', success=True, status_code=status.HTTP_200_OK):
    return Response({
        'success': success,
        'message': message,
        'data': data,
        'status': status_code
    }, status=status_code)