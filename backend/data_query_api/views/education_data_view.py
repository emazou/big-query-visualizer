from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated 
from core.response import format_response as response
from ..services.bigquery_client import BigQueryClient
from ..serializers.education_data_serializer import EducationDataSerializer

class EducationDataAPIView(APIView):
    """
    API view to get education data. 
    Contains a post method to get education data based on the indicator code, start year, end year and country code.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EducationDataSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            bigquery_client = BigQueryClient()
            try:
                results = bigquery_client.get_education_data(data['indicator_code'], data['start_year'], data['end_year'], data['country_code'])
                return response(results, 'Education data', status_code=status.HTTP_200_OK)
            except Exception as e:
                return response(None, str(e), False, status_code=status.HTTP_400_BAD_REQUEST)
        return response(None, serializer.errors, False, status_code=status.HTTP_400_BAD_REQUEST)
