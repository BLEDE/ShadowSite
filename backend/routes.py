from flask import jsonify, request, current_app
from backend import db
from backend.models import CharacterSheet


@current_app.route("/characters", methods=["GET"])
def get_characters():
    characters = CharacterSheet.query.all()
    return jsonify([char.as_dict() for char in characters])


@current_app.route('/character/<int:id>', methods=['GET'])
def get_character(id):
    character = CharacterSheet.query.get(id)
    return jsonify([char.as_dict() for char in character])


@current_app.route("/character", methods=["POST"])
def add_character():
    data = request.json
    new_char = CharacterSheet(
        name=data["name"], quality=data["quality"], metatype=data["metatype"]
    )
    db.session.add(new_char)
    db.session.commit()
    return jsonify(new_char.as_dict()), 201


@current_app.route("/character/<int:id>", methods=["DELETE"])
def remove_characters(id):
    character_to_remove = CharacterSheet.query.get(id)
    if character_to_remove is None:
        return jsonify({"message": "There is no character with this id already!"}), 404

    db.session.delete(character_to_remove)
    db.session.commit()

    return jsonify({"message": "Character removed successfully!"}), 200
