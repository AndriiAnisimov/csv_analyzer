from .parser import parse_csv
from .validator import validate_dataframe
from .cleaner import clean_dataframe
from .stats import calculate_stats
from .transformer import transform_to_chart_data

def process_csv(file):
    df = parse_csv(file)

    validate_dataframe(df)

    df = clean_dataframe(df)

    stats = calculate_stats(df)

    data = transform_to_chart_data(df)

    return {
        "stats": stats,
        "data": data,
    }
