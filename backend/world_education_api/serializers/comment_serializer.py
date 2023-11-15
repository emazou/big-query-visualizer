# serializers.py
from rest_framework import serializers
from ..models import Comment, SavedQuery

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'saved_query', 'username', 'text', 'created_at']
    
    def validate_saved_query(self, value):
        if not SavedQuery.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("This saved query does not exist.")
        return value
