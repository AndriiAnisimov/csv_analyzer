def transform_to_chart_data(df):
    # Optional: sort by test_id
    df = df.sort_values(by="test_id")

    return df[["test_id", "result"]].to_dict(orient="records")
