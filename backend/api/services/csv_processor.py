
import pandas as pd

def process_csv(file):
    try:
        df = pd.read_csv(file)

        if "result" not in df.columns:
            return {"error": "Missing 'result' column"}

        if "test_id" not in df.columns:
            return {"error": "Missing 'test_id' column"}

        df["result"] = pd.to_numeric(df["result"], errors="coerce")

        if df["result"].isnull().any():
            return {"error": "Column 'result' contains non-numeric values"}

        stats = {
            "mean": float(df["result"].mean()),
            "median": float(df["result"].median()),
            "min": float(df["result"].min()),
            "max": float(df["result"].max()),
        }

        data = df[["test_id", "result"]].to_dict(orient="records")

        return {"stats": stats, "data": data}

    except Exception as e:
        return {"error": str(e)}
