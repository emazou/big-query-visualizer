# views.py
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from core.response import format_response
from ..models import SavedQuery
from ..serializers.query_serializer import SavedQuerySerializer

class SavedQueryViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing saved queries.
    """
    queryset = SavedQuery.objects.all()
    serializer_class = SavedQuerySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        """
        Optionally restricts the returned queries to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = super().get_queryset()  # Get the base queryset
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(username=username)
        return queryset

    def create(self, request, *args, **kwargs):
        '''
            Create a new saved query
        '''
        response = super().create(request, *args, **kwargs)
        return format_response(response.data, 'SavedQuery created successfully', status_code=status.HTTP_201_CREATED)
    
    def list(self, request, *args, **kwargs):
        '''
            List all saved queries
        '''
        response = super().list(request, *args, **kwargs)
        return format_response(response.data, 'SavedQueries retrieved successfully')
        

    def retrieve(self, request, *args, **kwargs):
        '''
            Retrieve a saved query
        '''
        response = super().retrieve(request, *args, **kwargs)
        return format_response(response.data, 'SavedQuery retrieved successfully')
    
    def destroy(self, request, *args, **kwargs):
        '''
            Delete a saved query
        '''
        saved_query = self.get_object()
        if saved_query.username != request.user.username:
            return format_response(None, 'You do not have permission to delete this query', False, status_code=status.HTTP_403_FORBIDDEN)
        super().destroy(request, *args, **kwargs)
        return format_response(None, 'SavedQuery deleted successfully', status_code=status.HTTP_204_NO_CONTENT)