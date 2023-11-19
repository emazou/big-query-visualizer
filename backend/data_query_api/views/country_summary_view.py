from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.response import format_response as response
from ..services.bigquery_client import BigQueryClient
class CountrySummaryAPIView(APIView):  
    """
    API view to get country summary data, country code and short name.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bigquery_client = BigQueryClient()
        data = bigquery_client.get_country_summary()
        return response(data, 'Country summary', status_code=status.HTTP_200_OK)
