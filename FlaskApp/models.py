#models.py
import sys

from flask import Flask
from flask_bcrypt import Bcrypt
from secrets import whole_string
from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError


app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = whole_string
db = SQLAlchemy()


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
class Users(db.Model, CRUD):
    __tablename__ = 'users'
    uid = db.Column(db.Integer, primary_key = True)
    firstname = db.Column(db.Text)
    lastname = db.Column(db.Text)
    email = db.Column(db.Text, unique=True)
    pwdhash = db.Column(db.Text)

    def __init__(self, firstname, lastname, email, password):
		self.firstname = firstname
		self.lastname = lastname
		self.email = email
		self.set_password(password)

    def set_password(self, password):
        self.pwdhash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(pwdhash, password)



class UsersSchema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)
	email = fields.Email(validate=not_blank)
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


class Master_animal(db.Model, CRUD):
    __tablename__ = 'master_animal'
    cownumber = db.Column(db.Text, primary_key = True)
    height = db.Column(db.Float)
    weight = db.Column(db.Float)

    def __init__(self, cownumber, height, weight):
        self.cownumber = cownumber
        self.height = height
        self.weight = weight

class Master_animal_Schema(Schema):
    not_blank = validate.Length(min=1, error ='Field cannot be blank')
    id = fields.Integer(dump_only=True) #WHY DOES THIS HAVE TO BE HERE???
    cownumber = fields.String(validate = not_blank)
    height = fields.Float(validate = not_blank)
    weight = fields.Float(validate = not_blank)

    # self links
    def get_top_level_links(self, data, many):
        print >> sys.stderr, "data {}".format(data) # print data to verify get request
        if many:
            self_link = "/master_animal/"
        else:
            self_link = "/master_animal/{}".format(data['attributes']['cownumber'])
        return {"self":self_link}
    class Meta:
        type_ = 'master_animal'