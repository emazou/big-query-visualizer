from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    """
    Custom exception handler for the API
    """
    response = exception_handler(exc, context)

    if response is not None:
        response = Response({
            'success': False,
            'message': 'Something went wrong',
            'data': None,
            'status': response.status_code
        }, status=response.status_code)
    
    return response
