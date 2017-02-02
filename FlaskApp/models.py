#models.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash
from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from sqlalchemy.exc import SQLAlchemyError
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
app = Flask(__name__)
bcrypt = Bcrypt(app)

#Class to add, update and delete data via SQLALchemy sessions
class CRUD():   
 
    def add(self, resource):
        db.session.add(resource)
        return db.session.commit()   
 
    def update(self):
        return db.session.commit()
 
    def delete(self, resource):
        db.session.delete(resource)
        return db.session.commit()	
 

 
#Our Users Models, which will inherit Flask-SQLAlchemy Model class and the CRUD class defined above
class User(db.Model, CRUD):
    __tablename__ = 'users'
    uid = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    pwdhash = db.Column(db.String(54))

    def __init__(self, firstname, lastname, email, password):
        self.firstname = firstname.title()
        self.lastname = lastname.title()
        self.email = email.lower()
        self.set_password(password)

    def set_password(self, password):
        self.pwdhash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(pwdhash, password)
 
class UsersSchema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
    # add validate=not_blank in required fields
	uid = fields.Integer(dump_only=True)
	email = fields.String(validate=not_blank)
	password = fields.String(validate=not_blank)
	firstname = fields.String(validate=not_blank)
	lasttname = fields.String(validate=not_blank)

    # self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/users/"
		else:
			self_link = "/users/{}".format(data['uid'])
		return {'self': self_link}

class Meta:
        type_ = 'users'