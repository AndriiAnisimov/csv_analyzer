import pandas as pd

def process_csv(file):
    try:
        df = pd.read_csv(file)

        df.columns = df.columns.str.strip()

        if df.empty:
            return {"error": "CSV file is empty"}

        if "result" not in df.columns:
            return {"error": "Missing 'result' column"}

        if "test_id" not in df.columns:
            return {"error": "Missing 'test_id' column"}

        if df["test_id"].duplicated().any():
            return {"error": "Duplicate test_id values"}

        df["result"] = pd.to_numeric(df["result"], errors="coerce")

        if df["result"].isnull().any():
            return {"error": "Column 'result' contains non-numeric values"}

        datasetOverview = {
            "mean": float(df["result"].mean()),
            "median": float(df["result"].median()),
            "min": float(df["result"].min()),
            "max": float(df["result"].max()),
        }

        data = df[["test_id", "result"]].to_dict(orient="records")

        return {"datasetOverview": datasetOverview, "data": data}

    except Exception as e:
        return {"error": str(e)}
