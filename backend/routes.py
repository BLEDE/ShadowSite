from flask import jsonify, request, current_app
from backend import db
from backend.models import CharacterSheet
from backend.validation import validate_character_data


@current_app.route("/characters", methods=["GET"])
def get_characters():
    characters = CharacterSheet.query.all()
    return jsonify([char.as_dict() for char in characters])


@current_app.route("/character/<int:id>", methods=["GET"])
def get_character(id):
    character = CharacterSheet.query.get(id)
    if character is None:
        return jsonify({"message": "Character not found"}), 404
    return jsonify([character.as_dict()])


@current_app.route("/character", methods=["POST"])
def add_character():
    data = request.get_json()
    valid_data, errors = validate_character_data(data)

    if not data:
        return jsonify({"message": "No input data provided"}), 400
    if errors:
        return jsonify({"message": "Validation error", "errors": errors}), 400

    try:
        new_char = CharacterSheet(
            **valid_data
        )  # use any set of fields that matches the model's cols
        db.session.add(new_char)
        db.session.commit()
        return jsonify(new_char.as_dict()), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": f"Failed to add character: {str(error)}"}), 500


@current_app.route("/character/<int:id>", methods=["DELETE"])
def remove_character(id):
    character_to_remove = CharacterSheet.query.get(id)
    if character_to_remove is None:
        return jsonify({"message": "Character not found"}), 404

    try:
        db.session.delete(character_to_remove)
        db.session.commit()
        return jsonify({"message": "Character removed successfully"}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": f"Failed to remove character: {str(error)}"}), 500


@current_app.route("/character/<int:id>", methods=["PUT"])
def change_character(id):
    data = request.get_json()
    valid_data, errors = validate_character_data(data)
    character_to_change = CharacterSheet.query.get(id)

    if not data:
        return jsonify({"message": "No input data provided"}), 400
    if errors:
        return jsonify({"message": "Validation error", "errors": errors}), 400
    if character_to_change is None:
        return jsonify({"message": "Character not found"}), 404

    try:
        for key, value in valid_data.items():
            if hasattr(character_to_change, key):
                setattr(character_to_change, key, value)

        db.session.commit()
        return jsonify({"message": "Character updated successfully"}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": f"Failed to update character: {str(error)}"}), 500
