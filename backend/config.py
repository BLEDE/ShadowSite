"""
 Configures a Flask application to connect to a SQLite database 
 and disabling the modification tracking feature of SQLAlchemy to improve performance.
"""

import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
