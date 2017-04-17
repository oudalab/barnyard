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
app.config['SQLALCHEMY_TRACK_MODOFICATIONS'] = True
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
	cownumber = db.Column(db.Integer, primary_key = True)
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
	cownumber = fields.Integer(validate = not_blank)
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


class Animal_Inventory(db.Model, CRUD):
	__tablename__ = 'animal_inventory'
	cownumber = db.Column(db.Integer, primary_key=True)
	brand = db.Column(db.Text)
	brandlocation = db.Column(db.Text)
	tattooleft = db.Column(db.Text)
	tattooright = db.Column(db.Text)
	alternativeid = db.Column(db.Text)
	registration = db.Column(db.Text)
	color = db.Column(db.Text)
	dam = db.Column(db.Text)
	hornstatus = db.Column(db.Text)
	sire = db.Column(db.Text)
	dob = db.Column(db.Text)
	howacquired = db.Column(db.Text)
	dateacquired = db.Column(db.Text)
	howdisposed = db.Column(db.Text)
	datedisposed = db.Column(db.Text)
	disposalreason = db.Column(db.Text)

	def __init__(self, cownumber, brand, brandlocation, tattooleft, tattooright, alternativeid, registration, color, dam, hornstatus, sire, dob,
				 howacquired, dateacquired,howdisposed, datedisposed, disposalreason):
		self.cownumber = cownumber
		self.brand = brand
		self.brandlocation = brandlocation
		self.tattooleft = tattooleft
		self.tattooright = tattooright
		self.alternativeid = alternativeid
		self.registration = registration
		self.color = color
		self.dam = dam
		self.hornstatus = hornstatus
		self.sire = sire
		self.dob = dob
		self.howacquired = howacquired
		self.dateacquired = dateacquired
		self.howdisposed = howdisposed
		self.datedisposed = datedisposed
		self.disposalreason = disposalreason


class Animal_Inventory_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	brand = fields.String(validate=not_blank)
	brandlocation = fields.String(validate=not_blank)
	tattooleft = fields.String(validate=not_blank)
	tattooright = fields.String(validate=not_blank)
	alternativeid = fields.String(validate=not_blank)
	registration = fields.String(validate=not_blank)
	color = fields.String(validate=not_blank)
	dam = fields.String(validate=not_blank)
	hornstatus = fields.String(validate=not_blank)
	sire = fields.String(validate=not_blank)
	dob = fields.String(validate=not_blank)
	howacquired = fields.String(validate=not_blank)
	dateacquired = fields.String(validate=not_blank)
	howdisposed = fields.String(validate=not_blank)
	datedisposed = fields.String(validate=not_blank)
	disposalreason = fields.String(validate=not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/animal_inventory/"
		else:
			self_link = "/animal_inventory/{}".format(data['attributes']['cownumber'])
		return {"self": self_link}

	class Meta:
		type_ = 'animal_inventory'

class Experiment(db.Model, CRUD):
	__tablename__ = 'experiment'
	cownumber = db.Column(db.Integer, primary_key=True)
	dam = db.Column(db.Text)
	sire = db.Column(db.Text)
	birthweight = db.Column(db.Text)
	damframescore = db.Column(db.Float)
	sireframescore = db.Column(db.Float)
	weanheight = db.Column(db.Float)
	weanweight = db.Column(db.Float)
	weandate = db.Column(db.Text)
	adj205w = db.Column(db.Float)
	adj205h = db.Column(db.Float)
	dob = db.Column(db.Text)
	weanframescore = db.Column(db.Float)
	ageatwean = db.Column(db.Float)
	yearlingweight = db.Column(db.Float)
	yearlingheight = db.Column(db.Float)
	yearlingdate = db.Column(db.Text)
	adjyearlingw = db.Column(db.Float)
	adjyearlingh = db.Column(db.Float)
	yearlingframescore = db.Column(db.Float)
	ageatyearling = db.Column(db.Float)
	customweight = db.Column(db.Float)
	customweightdate = db.Column(db.Text)
	customheight = db.Column(db.Float)
	customheightdate = db.Column(db.Text)
	backfat = db.Column(db.Float)
	treatment = db.Column(db.Text)
	blockpen = db.Column(db.Text)
	replicate = db.Column(db.Text)

	def __init__(self, cownumber, dam, sire, birthweight, damframescore, sireframescore, weanheight, weanweight, weandate, adj205w, adj205h, dob,
				 weanframescore, ageatwean,yearlingweight, yearlingheight, yearlingdate, adjyearlingw, adjyearlingh, yearlingframescore, ageatyearling,
				 customweight, customweightdate, customheight, customheightdate, backfat, treatment, blockpen, replicate):
		self.cownumber = cownumber
		self.dam = dam
		self.sire = sire
		self.birthweight = birthweight
		self.damframescore = damframescore
		self.sireframescore = sireframescore
		self.weanheight = weanheight
		self.weanweight = weanweight
		self.weandate = weandate
		self.adj205w = adj205w
		self.adj205h = adj205h
		self.dob = dob
		self.weanframescore = weanframescore
		self.ageatwean = ageatwean
		self.yearlingweight = yearlingweight
		self.yearlingheight = yearlingheight
		self.yearlingdate = yearlingdate
		self.adjyearlingw = adjyearlingw
		self.adjyearlingh = adjyearlingh
		self.yearlingframescore = yearlingframescore
		self.ageatyearling = ageatyearling
		self.customweight = customweight
		self.customweightdate = customweightdate
		self.customheight = customheight
		self.customheightdate = customheightdate
		self.backfat = backfat
		self.treatment = treatment
		self.blockpen = blockpen
		self.replicate = replicate


class Experiment_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	dam = fields.String(validate=not_blank)
	sire = fields.String(validate=not_blank)
	birthweight = fields.Float(validate=not_blank)
	damframescore = fields.Float(validate=not_blank)
	sireframescore = fields.Float(validate=not_blank)
	weanheight = fields.Float(validate=not_blank)
	weanweight = fields.Float(validate=not_blank)
	weandate = fields.String(validate=not_blank)
	adj205w = fields.Float(validate=not_blank)
	adj205h = fields.Float(validate=not_blank)
	dob = fields.String(validate=not_blank)
	weanframescore = fields.Float(validate=not_blank)
	ageatwean = fields.Float(validate=not_blank)
	yearlingweight = fields.Float(validate=not_blank)
	yearlingheight = fields.Float(validate=not_blank)
	yearlingdate = fields.String(validate=not_blank)
	adjyearlingw = fields.Float(validate=not_blank)
	adjyearlingh = fields.Float(validate=not_blank)
	yearlingframescore = fields.Float(validate=not_blank)
	ageatyearling = fields.Float(validate=not_blank)
	customweight = fields.Float(validate=not_blank)
	customweightdate = fields.String(validate=not_blank)
	customheight = fields.Float(validate=not_blank)
	customheightdate = fields.String(validate=not_blank)
	backfat = fields.Float(validate=not_blank)
	treatment = fields.String(validate=not_blank)
	blockpen = fields.String(validate=not_blank)
	replicate = fields.String(validate=not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/experiment/"
		else:
			self_link = "/experiment/{}".format(data['attributes']['cownumber'])
		return {"self": self_link}

	class Meta:
		type_ = 'experiment'

class Reproduction(db.Model, CRUD):
	__tablename__ = 'reproduction'
	cownumber = db.Column(db.Integer, primary_key=True)
	breeding = db.Column(db.Text)
	pregnancy = db.Column(db.Text)
	calfatside = db.Column(db.Text)
	totalcalves = db.Column(db.Float)
	previouscalf = db.Column(db.Text)
	currentcalf = db.Column(db.Text)
	damageatbirth = db.Column(db.Float)
	calfsex = db.Column(db.Text)
	calfbirthweight = db.Column(db.Float)
	pasturenumberreproduction = db.Column(db.Text)
	calfdob = db.Column(db.Text)
	damcalvingdisposition = db.Column(db.Text)
	calvingease = db.Column(db.Text)
	udderscore = db.Column(db.Float)
	comments = db.Column(db.Text)
	damdisposition = db.Column(db.Text)
	cowframescore = db.Column(db.Float)
	cowwtbreeding = db.Column(db.Float)
	cowhtbreeding = db.Column(db.Float)
	cowwtweaning = db.Column(db.Float)
	cowhtweaning = db.Column(db.Float)
	cowwtcalving = db.Column(db.Float)
	cowhtcalving = db.Column(db.Float)
	bcsweaning = db.Column(db.Float)
	bcscalving = db.Column(db.Float)
	bcsbreeding = db.Column(db.Float)
	customcowwt = db.Column(db.Float)
	customcowht = db.Column(db.Float)
	bulldisposition = db.Column(db.Float)
	bullframescore = db.Column(db.Float)
	bullwtprebreeding = db.Column(db.Float)
	bullhtprebreeding = db.Column(db.Float)
	fertility = db.Column(db.Float)
	mobility = db.Column(db.Float)
	conc = db.Column(db.Float)
	deadabnormal = db.Column(db.Float)

	def __init__(self, cownumber, breeding, pregnancy, calfatside, totalcalves, previouscalf, currentcalf, damageatbirth, calfsex, calfbirthweight, pasturenumberreproduction, calfdob,
				 damcalvingdisposition, calvingease,udderscore, comments, damdisposition, cowframescore, cowwtbreeding, cowhtbreeding, cowwtweaning,
				 cowhtweaning, cowwtcalving, cowhtcalving, bcsweaning, bcscalving, bcsbreeding, customcowwt, customcowht, bulldisposition, bullframescore,
				 bullwtprebreeding, bullhtprebreeding, fertility, mobility, conc, deadabnormal):
		self.cownumber = cownumber
		self.breeding = breeding
		self.pregnancy = pregnancy
		self.calfatside = calfatside
		self.totalcalves = totalcalves
		self.previouscalf = previouscalf
		self.currentcalf = currentcalf
		self.damageatbirth = damageatbirth
		self.calfsex = calfsex
		self.calfbirthweight = calfbirthweight
		self.pasturenumberreproduction = pasturenumberreproduction
		self.calfdob = calfdob
		self.damcalvingdisposition = damcalvingdisposition
		self.calvingease = calvingease
		self.udderscore = udderscore
		self.comments = comments
		self.damdisposition = damdisposition
		self.cowframescore = cowframescore
		self.cowwtbreeding = cowwtbreeding
		self.cowhtbreeding = cowhtbreeding
		self.cowwtweaning = cowwtweaning
		self.cowhtweaning = cowhtweaning
		self.cowwtcalving = cowwtcalving
		self.cowhtcalving = cowhtcalving
		self.bcsweaning = bcsweaning
		self.bcscalving = bcscalving
		self.bcsbreeding = bcsbreeding
		self.customcowwt = customcowwt
		self.customcowht = customcowht
		self.bulldisposition = bulldisposition
		self.bullframescore = bullframescore
		self.bullwtprebreeding = bullwtprebreeding
		self.bullhtprebreeding = bullhtprebreeding
		self.fertility = fertility
		self.mobility = mobility
		self.conc = conc
		self.deadabnormal = deadabnormal


class Reproduction_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	breeding = fields.String(validate=not_blank)
	pregnancy = fields.String(validate=not_blank)
	calfatside = fields.String(validate=not_blank)
	totalcalves = fields.Float(validate=not_blank)
	previouscalf = fields.String(validate=not_blank)
	currentcalf = fields.String(validate=not_blank)
	damageatbirth = fields.Float(validate=not_blank)
	calfsex = fields.String(validate=not_blank)
	calfbirthweight = fields.Float(validate=not_blank)
	pasturenumberreproduction = fields.String(validate=not_blank)
	calfdob = fields.String(validate=not_blank)
	damcalvingdisposition = fields.String(validate=not_blank)
	calvingease = fields.String(validate=not_blank)
	udderscore = fields.Float(validate=not_blank)
	comments = fields.String(validate=not_blank)
	damdisposition = fields.String(validate=not_blank)
	cowframescore = fields.Float(validate=not_blank)
	cowwtbreeding = fields.Float(validate=not_blank)
	cowhtbreeding = fields.Float(validate=not_blank)
	cowwtweaning = fields.Float(validate=not_blank)
	cowhtweaning = fields.Float(validate=not_blank)
	cowwtcalving = fields.Float(validate=not_blank)
	cowhtcalving = fields.Float(validate=not_blank)
	bcsweaning = fields.Float(validate=not_blank)
	bcscalving = fields.Float(validate=not_blank)
	bcsbreeding = fields.Float(validate=not_blank)
	customcowwt = fields.Float(validate=not_blank)
	customcowht = fields.Float(validate=not_blank)
	bulldisposition = fields.String(validate=not_blank)
	bullframescore = fields.Float(validate=not_blank)
	bullwtprebreeding = fields.Float(validate=not_blank)
	bullhtprebreeding = fields.Float(validate=not_blank)
	fertility = fields.Float(validate=not_blank)
	mobility = fields.Float(validate=not_blank)
	conc = fields.Float(validate=not_blank)
	deadabnormal = fields.Float(validate=not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/reproduction/"
		else:
			self_link = "/reproduction/{}".format(data['attributes']['cownumber'])
		return {"self": self_link}

	class Meta:
		type_ = 'reproduction'


class Medical(db.Model, CRUD):
	__tablename__ = 'medical'
	cownumber = db.Column(db.Integer, primary_key=True)
	reasonforprocedure = db.Column(db.Text)
	notificationofvmo = db.Column(db.Text)
	recommendationofvmo = db.Column(db.Text)
	treatmentprotocol = db.Column(db.Text)
	animallocationpreresolution = db.Column(db.Text)
	followupexam = db.Column(db.Text)
	resolution = db.Column(db.Text)
	dateoffollowup = db.Column(db.Text)
	animallocation = db.Column(db.Text)
	dateofaction = db.Column(db.Text)

	def __init__(self, cownumber, reasonforprocedure, notificationofvmo, recommendationofvmo, treatmentprotocol, animallocationpreresolution, followupexam, resolution, dateoffollowup, animallocation, dateofaction):
		self.cownumber = cownumber
		self.reasonforprocedure = reasonforprocedure
		self.notificationofvmo = notificationofvmo
		self.recommendationofvmo = recommendationofvmo
		self.treatmentprotocol = treatmentprotocol
		self.animallocationpreresolution = animallocationpreresolution
		self.followupexam = followupexam
		self.resolution = resolution
		self.dateoffollowup = dateoffollowup
		self.animallocation = animallocation
		self.dateofaction = dateofaction


class Medical_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	reasonforprocedure = fields.String(validate=not_blank)
	notificationofvmo = fields.String(validate=not_blank)
	recommendationofvmo = fields.String(validate=not_blank)
	treatmentprotocol = fields.String(validate=not_blank)
	animallocationpreresolution = fields.String(validate=not_blank)
	followupexam = fields.String(validate=not_blank)
	resolution = fields.String(validate=not_blank)
	dateoffollowup = fields.String(validate=not_blank)
	animallocation = fields.String(validate=not_blank)
	dateofaction = fields.String(validate=not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/medical/"
		else:
			self_link = "/medical/{}".format(data['attributes']['cownumber'])
		return {"self": self_link}

	class Meta:
		type_ = 'medical'

class Grazing(db.Model, CRUD):
	__tablename__ = 'grazing'
	cownumber = db.Column(db.Integer, primary_key=True)
	pastureacres = db.Column(db.Text)
	animalspresent = db.Column(db.Text)
	datein = db.Column(db.Text)
	dateout = db.Column(db.Text)
	stockingrate = db.Column(db.Text)

	def __init__(self, cownumber, pastureacres, animalspresent, datein, dateout, stockingrate):
		self.cownumber = cownumber
		self.pastureacres = pastureacres
		self.animalspresent = animalspresent
		self.datein = datein
		self.dateout = dateout
		self.stockingrate = stockingrate


class Grazing_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	pastureacres = fields.String(validate=not_blank)
	animalspresent = fields.String(validate=not_blank)
	datein = fields.String(validate=not_blank)
	dateout = fields.String(validate=not_blank)
	stockingrate = fields.String(validate=not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/grazing/"
		else:
			self_link = "/grazing/{}".format(data['attributes']['cownumber'])
		return {"self": self_link}

	class Meta:
		type_ = 'grazing'
