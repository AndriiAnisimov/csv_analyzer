import pandas as pd

def clean_dataframe(df):
    # Drop empty rows
    df = df.dropna(subset=["result", "test_id"])

    # Trim strings
    df["test_id"] = df["test_id"].astype(str).str.strip()

    # Convert result to numeric
    df["result"] = pd.to_numeric(df["result"], errors="coerce")

    # Remove invalid numeric rows
    df = df.dropna(subset=["result"])

    return df
