from rest_framework import serializers

class IndicatorSummarySerializer(serializers.Serializer):
    """
    Indicator summary serializer for validating request data.
    """
    indicator_name = serializers.CharField(required=True)
    limit = serializers.IntegerField(required=True)
    indicator_code = serializers.CharField(required=True)

    def validate(self, data):
        """
        Check that the limit is greater than 0 and validate other custom logic.
        """
        if 'limit' in data:
            if data['limit'] < 1:
                raise serializers.ValidationError("Limit must be greater than 0.")
        return data
    