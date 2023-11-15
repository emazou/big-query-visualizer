from rest_framework import serializers
from ..models import SavedQuery
from .comment_serializer import CommentSerializer

class SavedQuerySerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    name = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    comment = serializers.CharField(required=True)
    country_code = serializers.CharField(required=True)
    indicator_code = serializers.CharField(required=True)
    start_year = serializers.IntegerField(required=True)
    end_year = serializers.IntegerField(required=True)
    
    class Meta:
        model = SavedQuery
        fields = [
            'id',
            'name', 
            'username',
            'comment',
            'created_at',
            'country_code',
            'indicator_code',
            'start_year',
            'end_year',
            'comments'
            ]
    
