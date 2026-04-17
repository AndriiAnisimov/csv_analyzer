import pandas as pd
from .exceptions import CSVError

def parse_csv(file):
    try:
        df = pd.read_csv(file)
        return df
    except Exception as e:
        raise CSVError(f"Failed to parse CSV: {str(e)}")
