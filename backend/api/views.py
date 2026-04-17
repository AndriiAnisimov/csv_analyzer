from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services.csv.processor import process_csv
from .services.csv.exceptions import CSVError, CSVValidationError

class UploadCSVView(APIView):
    def post(self, request):
        file = request.FILES.get("file")

        if not file:
            return Response({"error": "No file provided"}, status=400)

        if not file.name.endswith(".csv"):
            return Response({"error": "Invalid file type"}, status=400)

        try:
            result = process_csv(file)
            return Response(result, status=200)

        except CSVValidationError as e:
            return Response({"error": str(e)}, status=422)

        except CSVError as e:
            return Response({"error": str(e)}, status=400)

        except Exception:
            return Response(
                {"error": "Internal server error"},
                status=500
            )
