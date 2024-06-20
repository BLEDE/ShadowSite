from backend import db

class CharacterSheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    quality = db.Column(db.String(80), nullable=False)
    metatype = db.Column(db.String(80), nullable=False)
    # Add other fields as needed

    VALID_FIELDS = {"name", "quality", "metatype"}
    REQUIRED_FIELDS = {"name", "metatype"}

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}
