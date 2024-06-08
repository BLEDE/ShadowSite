"""
Defines the schema for CharacterSheet, which will store the data
for each character sheet
"""

from flask_sqlalchemy import SQLAlchemy
from app import app

db = SQLAlchemy(app)

class CharacterSheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    quality = db.Column(db.String(80), nullable=False)
    metatype = db.Column(db.String(80), nullable=False)
    # Add other fields as needed

    def __repr__(self):
        return f'<CharacterSheet {self.name}>'
    
    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}
