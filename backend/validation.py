from backend.models import CharacterSheet

def validate_character_data(data):
    errors = []

    # Check for required fields
    missing_fields = CharacterSheet.REQUIRED_FIELDS - data.keys()
    if missing_fields:
        errors.append(f"Missing required fields: {', '.join(missing_fields)}")

    # Filter out invalid fields
    valid_data = {
        key: value for key, value in data.items() if key in CharacterSheet.VALID_FIELDS
    }

    return valid_data, errors
