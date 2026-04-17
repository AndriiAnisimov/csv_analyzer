def calculate_stats(df):
    result = df["result"]

    return {
        "mean": float(result.mean()),
        "median": float(result.median()),
        "min": float(result.min()),
        "max": float(result.max()),
    }
