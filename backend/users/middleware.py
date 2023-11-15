from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth.models import User
import jwt

def jwt_middleware(get_response):
    """
    This middleware will check for a valid JWT token in the Authorization header
    and attach the user object to the request object if the token is valid.
    """
    def middleware(request):
        if request.path not in ['/users/login/', '/users/signup/']:
            try:
                auth_header = request.headers.get('Authorization', '')
                scheme, _, token = auth_header.partition(' ')

                if scheme != 'Bearer':
                    raise ValueError('Invalid token scheme, Bearer expected')

                decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user = User.objects.filter(pk=decoded['user_id']).first()
                request.user = user
            except jwt.ExpiredSignatureError:
                return JsonResponse({'success': False, 'message': 'Token has expired'}, status=401)
            except (jwt.DecodeError, User.DoesNotExist, ValueError) as e:
                return  JsonResponse({'success': False, 'message': 'Unauthorized'}, status=401)

        return get_response(request)
    return middleware
