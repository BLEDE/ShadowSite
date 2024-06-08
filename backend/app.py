from flask import Flask, jsonify, request
from config import Config
from models import db, CharacterSheet

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

"""
Before the first request is handled, create the tables based on models
"""
@app.before_first_request
def create_tables():
    db.create_all()

"""
Retrieve all character sheets as JSON
"""
@app.route('/characters', methods=['GET'])
def get_characters():
    characters = CharacterSheet.query.all()
    return jsonify([char.as_dict() for char in characters])

"""
Create new character sheets
"""
@app.route('/character', methods=['POST'])
def add_character():
    data = request.json
    new_char = CharacterSheet(
        name=data['name'], 
        quality=data['quality'],
        metatype=data['metatype']
    )

    db.session.add(new_char)
    db.session.commit()

    # 201 status code for "Created"
    return jsonify(new_char.as_dict()), 201

"""
If script is executed directly and not imported, run the app in debug mode
"""
if __name__ == '__main__':
    app.run(debug=True)
