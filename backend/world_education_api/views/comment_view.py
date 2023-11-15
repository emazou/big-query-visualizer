from rest_framework import viewsets, status
from core.response import format_response
from rest_framework.permissions import IsAuthenticated
from ..models import Comment
from ..serializers.comment_serializer import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): 
        '''
            Optionally restricts the returned comments to a given user, by filtering against a `username` query parameter in the URL.
        '''
        queryset = super().get_queryset()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(username=username)
        return queryset

    def list(self, request, *args, **kwargs):
        '''
            List all comments
        '''
        response = super().list(request, *args, **kwargs)
        return format_response(response.data, 'Comments retrieved successfully')

    def create(self, request, *args, **kwargs):
        '''
            Create a new comment
        '''
        response =  super().create(request, *args, **kwargs)
        return format_response(response.data, 'Comment created successfully', status_code=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        '''
            Retrieve a comment
        '''
        response = super().retrieve(request, *args, **kwargs)
        return format_response(response.data, 'Comment retrieved successfully')

    def update(self, request, *args, **kwargs):
        '''
            Update a comment
        '''
        comment = self.get_object()
        if comment.username != request.user.username:
            return format_response(None, 'You do not have permission to edit this comment', False, status_code=status.HTTP_403_FORBIDDEN)
        response = super().update(request, *args, **kwargs)
        return format_response(response.data, 'Comment updated successfully')

    def partial_update(self, request, *args, **kwargs):
        '''
            Update a comment
        '''
        comment = self.get_object()
        if comment.username != request.user.username:
            return format_response(None, 'You do not have permission to edit this comment', False, status_code=status.HTTP_403_FORBIDDEN)
        response = super().partial_update(request, *args, **kwargs)
        return response

    def destroy(self, request, *args, **kwargs):
        '''
            Delete a comment
        '''
        comment = self.get_object()
        if comment.username != request.user.username:
            return format_response(None, 'You do not have permission to delete this comment', False, status_code=status.HTTP_403_FORBIDDEN)
        super().destroy(request, *args, **kwargs)
        return format_response(None, 'Comment deleted successfully', status_code=status.HTTP_204_NO_CONTENT)
