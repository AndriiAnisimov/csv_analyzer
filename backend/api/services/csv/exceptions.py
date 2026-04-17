class CSVError(Exception):
    """Base CSV exception"""
    pass

class CSVValidationError(CSVError):
    """Raised when CSV structure is invalid"""
    pass
