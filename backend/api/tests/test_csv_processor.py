import io
import pytest

from api.services.csv.processor import process_csv
from api.services.csv.exceptions import CSVValidationError

def create_csv(content: str):
    return io.StringIO(content)

def test_process_csv_success():
    csv_data = create_csv(
        "test_id,result\n1,10\n2,20\n3,30"
    )

    result = process_csv(csv_data)

    assert "stats" in result
    assert "data" in result

    assert result["stats"]["mean"] == 20
    assert result["stats"]["min"] == 10
    assert result["stats"]["max"] == 30

    assert len(result["data"]) == 3

def test_missing_result_column():
    csv_data = create_csv(
        "test_id,value\n1,10\n2,20"
    )

    with pytest.raises(CSVValidationError):
        process_csv(csv_data)

def test_non_numeric_result():
    csv_data = create_csv(
        "test_id,result\n1,10\n2,abc"
    )

    result = process_csv(csv_data)

    assert len(result["data"]) == 1

def test_empty_csv():
    csv_data = create_csv(
        "test_id,result\n"
    )

    with pytest.raises(Exception):
        process_csv(csv_data)

def test_cleaning_trims_and_drops_invalid():
    csv_data = create_csv(
        "test_id,result\n 1 ,10\n2, \n3,30"
    )

    result = process_csv(csv_data)

    assert len(result["data"]) == 2
