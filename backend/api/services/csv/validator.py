from .exceptions import CSVValidationError

REQUIRED_COLUMNS = {"test_id", "result"}

def validate_columns(df):
    missing = REQUIRED_COLUMNS - set(df.columns)

    if missing:
        raise CSVValidationError(
            f"Missing required columns: {', '.join(missing)}"
        )

def validate_result_column(df):
    if df["result"].isnull().all():
        raise CSVValidationError("Column 'result' is empty")

def validate_dataframe(df):
    validate_columns(df)
    validate_result_column(df)
