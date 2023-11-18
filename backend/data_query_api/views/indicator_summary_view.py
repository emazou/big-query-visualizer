from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.response import format_response as response
from ..services.bigquery_client import BigQueryClient
from ..serializers.indicator_summary_serializer import IndicatorSummarySerializer

class IndicatorSummaryAPIView(APIView):
    """
    API endpoint that allows users to get indicator summary.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = IndicatorSummarySerializer(data=request.query_params)
        if serializer.is_valid():
            data = serializer.data
            bigquery_client = BigQueryClient()
            data = bigquery_client.get_indicator_summary(data['limit'], data['indicator_name'], data['indicator_code'])
            return response(data, 'Indicator summary', status_code=status.HTTP_200_OK)
        else:
            return response(None, serializer.errors, False, status_code=status.HTTP_400_BAD_REQUEST)
