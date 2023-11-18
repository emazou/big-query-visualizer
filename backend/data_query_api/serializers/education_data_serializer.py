from rest_framework import serializers

class EducationDataSerializer(serializers.Serializer):
    indicator_code = serializers.CharField(required=True)
    start_year = serializers.IntegerField(required=True)
    end_year = serializers.IntegerField(required=True)
    country_code = serializers.CharField(max_length=10, required=True)

    def validate(self, data):
        """
        Check that the start year is before the end year and validate other custom logic.
        """
        if 'start_year' in data and 'end_year' in data:
            if data['start_year'] > data['end_year']:
                raise serializers.ValidationError("Start year must be before end year.")
        return data

