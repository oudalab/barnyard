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
db = SQLAlchemy(app)


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
	uid = db.Column(db.Integer,primary_key = True)
	firstname = db.Column(db.Text)
	lastname = db.Column(db.Text)
	email = db.Column(db.Text, unique = True)
	pwdhash = db.Column(db.Text)

	def is_authenticated(self):
		return self.is_authenticated

	def set_password(self,password):
		self.pwdhash = bcrypt.generate_password_hash(password)

	def check_password(self,password):
		return bcrypt.check_password_hash(self.pwdhash, password)

	def is_active(self):
		#true, as all users are active
		return True

	def get_id(self):
		return self.email

	def __init__(self, firstname, lastname, email, password):
		self.firstname = firstname
		self.lastname = lastname
		self.email = email
		self.set_password(password)


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
	eartag = db.Column(db.Text)
	eid = db.Column(db.Text)
	sex = db.Column(db.Text)
	pasturenumber = db.Column(db.Text)
	breed = db.Column(db.Text)
	status = db.Column(db.Text)
	trial = db.Column(db.Text)
	herd = db.Column(db.Text)
	animaltype = db.Column(db.Text)
	
	def __init__(self, cownumber, height, weight, eartag, eid, sex, pasturenumber, breed, status, trial, herd, animaltype):
		self.cownumber = cownumber
		self.height = height
		self.weight = weight
		self.eartag = eartag
		self.eid = eid
		self.sex = sex
		self.pasturenumber = pasturenumber
		self.breed = breed
		self.status = status
		self.trial = trial
		self.herd = herd
		self.animaltype = animaltype

class Master_animal_Schema(Schema):
	not_blank = validate.Length(min=1, error ='Field cannot be blank')
	id = fields.Integer(dump_only=True) #WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.String(validate = not_blank)
	height = fields.Float(validate = not_blank)
	weight = fields.Float(validate = not_blank)
	eartag = fields.String(validate = not_blank)
	eid = fields.String(validate = not_blank)
	sex = fields.String(validate = not_blank)
	pasturenumber = fields.String(validate = not_blank)
	breed = fields.String(validate = not_blank)
	status = fields.String(validate = not_blank)
	trial = fields.String(validate = not_blank)
	herd = fields.String(validate = not_blank)
	animaltype = fields.String(validate = not_blank)
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


class Medical_Inventory(db.Model, CRUD):
	__tablename__ = 'medical_inventory'
	uid = db.Column(db.Integer, primary_key=True)
	medication = db.Column(db.Text)
	quantity = db.Column(db.Float)
	cost= db.Column(db.Float)
	purchasedate = db.Column(db.Text)
	expirydate = db.Column(db.Text)

	def __init__(self, medication, quantity, cost, purchasedate, expirydate):
		self.medication = medication
		self.quantity = quantity
		self.cost = cost
		self.purchasedate = purchasedate
		self.expirydate = expirydate


class Medical_Inventory_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)
	medication = fields.String(validate=not_blank)
	quantity = fields.Float(validate=not_blank)
	cost = fields.Float(validate=not_blank)
	purchasedate = fields.String(validate=not_blank)
	expirydate  = fields.String(validate=not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/medical_inventory/"
		else:
			self_link = "/medical_inventory/{}".format(data['uid'])
		return {'self': self_link}

	class Meta:
		type_ = 'medical_inventory'

