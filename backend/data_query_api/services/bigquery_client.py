from typing import List, Optional
from google.cloud import bigquery
from google.cloud.exceptions import GoogleCloudError
from django.core.cache import cache
from django.conf import settings

class BigQueryClient:
    """
    Client for interacting with Google BigQuery.
    """
    INTERNATIONAL_EDUCATION_TABLE = 'bigquery-public-data.world_bank_intl_education.international_education'
    COUNTRY_SUMMARY =  'bigquery-public-data.world_bank_intl_education.country_summary'
    def __init__(self):
        # Initialize the BigQuery client.
        self.client = bigquery.Client()

    def query(self, query_string: str, parameters: Optional[List[bigquery.query._AbstractQueryParameter]] = None) -> List:
        """
        Execute a BigQuery query and return the result.

        Args:
            query_string (str): SQL query string.
            parameters (List, optional): List of query parameters.

        Returns:
            List[dict]: A list of query results.
        """
        try:
            if parameters:
                job_config = bigquery.QueryJobConfig(query_parameters=parameters)
                query_job = self.client.query(query_string, job_config=job_config)
            else:
                query_job = self.client.query(query_string)

            return [dict(row) for row in query_job.result()]
        except GoogleCloudError as e:
            # Log the error and handle it as appropriate
            print(f"Error executing query: {e}")
            return []

    def get_country_summary(self) -> List:
        """
        Retrieve a list of country summaries.

        Returns:
            List[dist]: A list of country summaries.
        """
        query_string = f"""
                SELECT DISTINCT country_code, short_name
                FROM `{self.COUNTRY_SUMMARY}`
                ORDER BY short_name ASC
        """
        return self.query(query_string)

    def get_education_data(self, indicator_code: str, start_year: int, end_year: int, country_code: str) -> List:
        """
        Retrieve filtered education data.

        Args:
            indicator_code str: Indicator code for filtering.
            start_year (int): Start year for filtering.
            end_year (int): End year for filtering.
            country_code (str): Country code for filtering.

        Returns:
            List: A list of filtered education data.
        """

        # Check if the result is cached and return it if it is.
        cache_key = f"{country_code}_{start_year}_{end_year}_{indicator_code}"
        cached_result = cache.get(cache_key)

        if cached_result:
            return cached_result

        query_string = f"""
            SELECT indicator_code, indicator_name, country_name, country_code, value, year
            FROM `{self.INTERNATIONAL_EDUCATION_TABLE}`
            WHERE year BETWEEN @start_year AND @end_year
            AND country_code = @country_code
            AND indicator_code = @indicator_code
            ORDER BY year ASC;
        """

        # Set query parameters and execute the query.
        parameters = [
            bigquery.ScalarQueryParameter("start_year", "INT64", start_year),
            bigquery.ScalarQueryParameter("end_year", "INT64", end_year),
            bigquery.ScalarQueryParameter("country_code", "STRING", country_code),
            bigquery.ScalarQueryParameter("indicator_code", "STRING", indicator_code)
        ]   

        results = self.query(query_string, parameters)
        cache.set(cache_key, results, timeout=settings.CACHE_TIMEOUT)
        return results
    
    def get_indicator_summary(self, limit: int, indicator_name: str, indicator_code: str) -> List:
        """
        Retrieve a list of indicator summaries.

        Args:
            limit (int): Limit for pagination.
            indicator_name (str): Indicator name for filtering. 
            indicator_code (str): Indicator code for filtering.

        Returns:
            List[dist]: A list of indicator summaries.
        """
        query_string = f"""
                SELECT DISTINCT indicator_code, indicator_name
                FROM `{self.INTERNATIONAL_EDUCATION_TABLE}`
                WHERE indicator_name LIKE @indicator_name AND indicator_code LIKE @indicator_code
                ORDER BY indicator_name ASC
                LIMIT @limit
        """
        parameters = [
            bigquery.ScalarQueryParameter("limit", "INT64", limit),
            bigquery.ScalarQueryParameter("indicator_name", "STRING", f'%{indicator_name}%' ),
            bigquery.ScalarQueryParameter("indicator_code", "STRING", f'%{indicator_code}' )
        ]   
        return self.query(query_string, parameters)
