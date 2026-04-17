from rest_framework.views import APIView
from rest_framework.response import Response
from .services.csv_processor import process_csv

class UploadCSVView(APIView):
    def post(self, request):
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "No file provided"}, status=400)

        result = process_csv(file)

        if "error" in result:
            return Response(result, status=400)

        return Response(result)
