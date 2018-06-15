#models.py
import sys
import json
from flask import Flask
from flask_bcrypt import Bcrypt
from secrets import whole_string
from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import Column, Integer, DateTime, event, DDL
from sqlalchemy.sql import func
from datetime import datetime, timedelta


app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_TRACK_MODOFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = whole_string
db = SQLAlchemy(app)

# triggers for database
trig_ddl_1 = DDL('''CREATE TRIGGER cownumber_trigger AFTER INSERT ON master_animal BEGIN update master_animal set cownumber = (select max(cownumber)+1 from master_animal) WHERE cownumber = -1; END;''')

trig_ddl_2 = DDL('''CREATE TRIGGER uid_trigger AFTER INSERT ON herdchange BEGIN update herdchange set uid = (select max(rowid)+1 from herdchange) WHERE uid = -1; END;''')

#creates 6 digit number for Users ids
trig_ddl_3 = DDL('''CREATE TRIGGER userid_trigger AFTER INSERT ON users BEGIN update users set userid = (select max(userid)+1 from users) WHERE userid = -1; END;''')

trig_ddl_4 = DDL('''CREATE TRIGGER uid_report_trigger AFTER INSERT ON reports BEGIN update reports set uid = (select max(rowid)+1 from reports) WHERE uid = -1; END;''')

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
	uid = db.Column(db.Integer)
	firstname = db.Column(db.Text)
	lastname = db.Column(db.Text)
	email = db.Column(db.Text, unique = True)
	pwdhash = db.Column(db.Text)
	roles = db.Column(db.Text, default = "UNASSIGNED")
	userid = db.Column(db.Integer, primary_key=True, default = -1)
	registered_at = db.Column(DateTime(timezone=True), onupdate=func.current_timestamp())
	ts = db.Column(DateTime(timezone=False),default = datetime.now())

	def is_authenticated(self):
		return self.authenticated

	def set_password(self,password):
		self.pwdhash = bcrypt.generate_password_hash(password)

	def check_password(self,password):
		return bcrypt.check_password_hash(self.pwdhash, password)

	def is_active(self):
		#true, as all users are active
		return True

	def is_anonymous(self):
		return False

	def get_id(self):
		return self.email

	def __init__(self, firstname, lastname, email, password, roles, userid, registered_at,ts):
		self.firstname = firstname
		self.lastname = lastname
		self.email = email
		self.set_password(password)
		self.roles = roles
		self.userid = userid
		self.registered_at = registered_at
		self.ts = ts


class UsersSchema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)
	email = fields.Email(validate=not_blank)
	password = fields.String(validate=not_blank)
	firstname = fields.String(validate=not_blank)
	lastname = fields.String(validate=not_blank)
	roles = fields.String(validate = not_blank)
	userid = fields.Integer(validate = not_blank)
	registered_at = fields.DateTime(validate=not_blank)
	ts = fields.DateTime(validate=not_blank)
	
    # self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/users/"
		else:
			self_link = "/users/{}".format(data['attributes']['userid'])
		return {'self': self_link}
		
	class Meta:
		type_ = 'users'


class Master_animal(db.Model, CRUD):
	__tablename__ = 'master_animal'
	cownumber = db.Column(db.Integer, primary_key = True, autoincrement=True, default = -1)
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
	animalname = db.Column(db.Text)
	breeder = db.Column(db.Text)
	currentframescore = db.Column(db.Integer)
	damframescore = db.Column(db.Integer)
	comments = db.Column(db.Text)
	species = db.Column(db.Text)
	user = db.Column(db.Text)
	ts = db.Column(DateTime(timezone=True), primary_key=True, default =func.current_timestamp())
	
	def __init__(self, cownumber,ts, height,animalname,user,comments,breeder,currentframescore,damframescore,species, weight, eartag, eid, sex, pasturenumber, breed, status, trial, herd, animaltype):
		self.cownumber = cownumber
		self.height = height
		self.weight = weight
		self.animalname = animalname
		self.breeder = breeder
		self.currentframescore = currentframescore
		self.damframescore = damframescore
		self.comments = comments
		self.species = species
		self.eartag = eartag
		self.eid = eid
		self.sex = sex
		self.pasturenumber = pasturenumber
		self.breed = breed
		self.status = status
		self.trial = trial
		self.herd = herd
		self.animaltype = animaltype
		self.ts= ts
		self.user = user


class Master_animal_Schema(Schema):
	not_blank = validate.Length(min=1, error ='Field cannot be blank')
	id = fields.Integer(dump_only=True) #WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate = not_blank)
	height = fields.Float()
	weight = fields.Float()
	eartag = fields.String()
	eid = fields.String()
	sex = fields.String()
	pasturenumber = fields.String()
	breed = fields.String()
	status = fields.String()
	trial = fields.String()
	herd = fields.String()
	animaltype = fields.String()
	animalname = fields.String()
	breeder = fields.String()
	currentframescore = fields.String()
	damframescore = fields.String()
	comments = fields.String()
	species = fields.String()
	user = fields.String()
	ts = fields.DateTime(validate = not_blank)
	# self links
	def get_top_level_links(self, data, many):
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
	user = db.Column(db.Text)

	def __init__(self, medication, quantity, cost, purchasedate, expirydate,user):
		self.medication = medication
		self.quantity = quantity
		self.cost = cost
		self.purchasedate = purchasedate
		self.expirydate = expirydate
		self.user = user


class Medical_Inventory_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)
	medication = fields.String(validate=not_blank)
	quantity = fields.Float(validate=not_blank)
	cost = fields.Float(validate=not_blank)
	purchasedate = fields.String(validate=not_blank)
	expirydate  = fields.String(validate=not_blank)
	user = fields.String()

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
	hornstatus = db.Column(db.Text)
	dam = db.Column(db.Text)
	sire = db.Column(db.Text)
	dob = db.Column(db.Text)
	howacquired = db.Column(db.Text)
	dateacquired = db.Column(db.Text)
	howdisposed = db.Column(db.Text)
	datedisposed = db.Column(db.Text)
	disposalreason = db.Column(db.Text)
	herdnumberlocation = db.Column(db.Text)
	herdstatus = db.Column(db.Text)
	howconceived = db.Column(db.Text)
	managementcode = db.Column(db.Text)
	ownerID = db.Column(db.Text)
	springfall = db.Column(db.Text)
	includeinlookups = db.Column(db.Text)
	user = db.Column(db.Text)
	ts = db.Column(DateTime(timezone=True), primary_key=True, default =func.current_timestamp())

	def __init__(self, cownumber,ts,brand,brandlocation,tattooleft,tattooright,alternativeid,registration,color,
				 hornstatus,dam,sire,dob,howacquired,dateacquired,howdisposed,datedisposed,disposalreason,
				 herdnumberlocation,herdstatus,howconceived,managementcode,ownerID,springfall,includeinlookups,user):
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
		self.herdnumberlocation = herdnumberlocation
		self.herdstatus = herdstatus
		self.howconceived = howconceived
		self.managementcode = managementcode
		self.ownerID = ownerID
		self.springfall = springfall
		self.includeinlookups = includeinlookups
		self.user = user
		self.ts= ts


class Animal_Inventory_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	brand = fields.String()
	brandlocation = fields.String()
	tattooleft = fields.String()
	tattooright = fields.String()
	alternativeid = fields.String()
	registration = fields.String()
	color = fields.String()
	hornstatus = fields.String()
	dam = fields.String()
	sire = fields.String()
	dob = fields.String()
	howacquired = fields.String()
	dateacquired = fields.String()
	howdisposed = fields.String()
	datedisposed = fields.String()
	disposalreason = fields.String()
	herdnumberlocation = fields.String()
	herdstatus = fields.String()
	howconceived = fields.String()
	managementcode = fields.String()
	ownerID = fields.String()
	springfall = fields.String()
	includeinlookups = fields.String()
	user = fields.String()
	ts = fields.DateTime(validate= not_blank)

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
	animaltype = db.Column(db.Text)
	birthweight = db.Column(db.Text)
	birthweightadj = db.Column(db.Text)
	sireframescore = db.Column(db.Float)
	bcsrecent = db.Column(db.Text)
	bcsprevious = db.Column(db.Text)
	bcsdifference = db.Column(db.Text)
	damwtatwean = db.Column(db.Integer)
	weanheight = db.Column(db.Float)
	weanweight = db.Column(db.Float)
	weandate = db.Column(db.Text)
	weangpd = db.Column(db.Text)
	weanhipht = db.Column(db.Text)
	weanwda = db.Column(db.Text)
	weanweightdate = db.Column(db.Text)
	adj205w = db.Column(db.Float)
	adj205h = db.Column(db.Float)
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
	currentwtcow = db.Column(db.Text)
	adj365dht = db.Column(db.Text)
	currentwtheifer = db.Column(db.Text)
	backfat = db.Column(db.Float)
	treatment = db.Column(db.Text)
	blockpen = db.Column(db.Text)
	replicate = db.Column(db.Text)
	user = db.Column(db.Text)
	ts = db.Column(DateTime(timezone=True), primary_key=True, default =func.current_timestamp())

	def __init__(self, cownumber,ts, birthweight,birthweightadj,animaltype,
				 sireframescore, weanheight, bcsrecent,bcsprevious,bcsdifference, weanweight, weandate,damwtatwean, adj205w,
				 adj205h,weanframescore,weangpd,weanhipht,weanwda,weanweightdate, ageatwean,
				 yearlingweight, yearlingheight, yearlingdate, adjyearlingw, adjyearlingh,
				 yearlingframescore, ageatyearling,customweight, customweightdate, customheight,
				 customheightdate,currentwtcow,adj365dht,currentwtheifer, backfat, treatment, blockpen, replicate,user):
		self.cownumber = cownumber
		self.animaltype = animaltype
		self.birthweight = birthweight
		self.birthweightadj = birthweightadj
		self.bcsrecent = bcsrecent
		self.bcsprevious = bcsprevious
		self.bcsdifference = bcsdifference
		self.damwtatwean = damwtatwean
		self.sireframescore = sireframescore
		self.weanheight = weanheight
		self.weanweight = weanweight
		self.weandate = weandate
		self.weangpd = weangpd
		self.weanhipht = weanhipht
		self.weanwda = weanwda
		self.weanweightdate = weanweightdate
		self.adj205w = adj205w
		self.adj205h = adj205h
		self.weanframescore = weanframescore
		self.ageatwean = ageatwean
		self.yearlingweight = yearlingweight
		self.yearlingheight = yearlingheight
		self.yearlingdate = yearlingdate
		self.adjyearlingw = adjyearlingw
		self.adjyearlingh = adjyearlingh
		self.yearlingframescore = yearlingframescore
		self.ageatyearling = ageatyearling
		self.currentwtcow = currentwtcow
		self.currentwtheifer = currentwtheifer
		self.adj365dht = adj365dht
		self.customweight = customweight
		self.customweightdate = customweightdate
		self.customheight = customheight
		self.customheightdate = customheightdate
		self.backfat = backfat
		self.treatment = treatment
		self.blockpen = blockpen
		self.replicate = replicate
		self.ts = ts
		self.user = user


class Experiment_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	animaltype = fields.String()
	birthweight = fields.Float()
	birthweightadj = fields.String()
	bcsrecent = fields.String()
	bcsprevious = fields.String()
	bcsdifference = fields.String()
	damwtatwean = fields.Float()
	sireframescore = fields.Float()
	weanheight = fields.Float()
	weanweight = fields.Float()
	weandate = fields.String()
	weangpd = fields.String()
	weanhipht = fields.String()
	weanwda = fields.String()
	weanweightdate = fields.String()
	adj205w = fields.Float()
	adj205h = fields.Float()
	weanframescore = fields.Float()
	ageatwean = fields.Float()
	yearlingweight = fields.Float()
	yearlingheight = fields.Float()
	yearlingdate = fields.String()
	adjyearlingw = fields.Float()
	adjyearlingh = fields.Float()
	yearlingframescore = fields.Float()
	ageatyearling = fields.Float()
	customweight = fields.Float()
	customweightdate = fields.String()
	customheight = fields.Float()
	customheightdate = fields.String()
	currentwtcow = fields.String()
	currentwtheifer = fields.String()
	adj365dht = fields.String()
	backfat = fields.Float()
	treatment = fields.String()
	blockpen = fields.String()
	replicate = fields.String()
	user = fields.String()
	ts = fields.DateTime(validate= not_blank)

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
	siblingcode = db.Column(db.Text)
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
	conditionscorecalving = db.Column(db.Float)
	hiphtweaning2015 = db.Column(db.Float)
	hiphtweaning2016 = db.Column(db.Float)
	hiphtbreeding2016 = db.Column(db.Float)
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
	user = db.Column(db.Text)
	deadabnormal = db.Column(db.Float)
	ts = db.Column(DateTime(timezone=True), primary_key=True, default =func.current_timestamp())

	def __init__(self, cownumber,ts, breeding, pregnancy, calfatside,siblingcode, totalcalves, previouscalf, currentcalf, damageatbirth, calfsex, calfbirthweight, pasturenumberreproduction, calfdob,
				 damcalvingdisposition, calvingease,udderscore, conditionscorecalving, hiphtweaning2015, hiphtweaning2016, hiphtbreeding2016, damdisposition, cowframescore, cowwtbreeding, cowhtbreeding, cowwtweaning,
				 cowhtweaning, cowwtcalving, cowhtcalving, bcsweaning, bcscalving, bcsbreeding, customcowwt, customcowht, bulldisposition, bullframescore,
				 bullwtprebreeding, bullhtprebreeding, fertility, mobility, conc, deadabnormal,user):
		self.cownumber = cownumber
		self.breeding = breeding
		self.pregnancy = pregnancy
		self.siblingcode = siblingcode
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
		self.conditionscorecalving = conditionscorecalving
		self.hiphtbreeding2016 = hiphtbreeding2016
		self.hiphtweaning2015 = hiphtweaning2015
		self.hiphtweaning2016 = hiphtweaning2016
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
		self.user = user
		self.ts = ts


class Reproduction_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	breeding = fields.String()
	pregnancy = fields.String()
	siblingcode = fields.String()
	calfatside = fields.String()
	totalcalves = fields.Float()
	previouscalf = fields.String()
	currentcalf = fields.String()
	damageatbirth = fields.Float()
	calfsex = fields.String()
	calfbirthweight = fields.Float()
	pasturenumberreproduction = fields.String()
	calfdob = fields.String()
	damcalvingdisposition = fields.String()
	calvingease = fields.String()
	udderscore = fields.Float()
	conditionscorecalving = fields.Float()
	hiphtweaning2015 = fields.Float()
	hiphtweaning2016 = fields.Float()
	hiphtbreeding2016 = fields.Float()
	damdisposition = fields.String()
	cowframescore = fields.Float()
	cowwtbreeding = fields.Float()
	cowhtbreeding = fields.Float()
	cowwtweaning = fields.Float()
	cowhtweaning = fields.Float()
	cowwtcalving = fields.Float()
	cowhtcalving = fields.Float()
	bcsweaning = fields.Float()
	bcscalving = fields.Float()
	bcsbreeding = fields.Float()
	customcowwt = fields.Float()
	customcowht = fields.Float()
	bulldisposition = fields.String()
	bullframescore = fields.Float()
	bullwtprebreeding = fields.Float()
	bullhtprebreeding = fields.Float()
	fertility = fields.Float()
	mobility = fields.Float()
	conc = fields.Float()
	deadabnormal = fields.Float()
	user = fields.String()
	ts = fields.DateTime(validate = not_blank)

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
	user = db.Column(db.Text)
	ts = db.Column(DateTime(timezone=True), primary_key=True, default =func.current_timestamp())

	def __init__(self, cownumber, ts,reasonforprocedure, user,notificationofvmo, recommendationofvmo, treatmentprotocol, animallocationpreresolution, followupexam, resolution, dateoffollowup, animallocation, dateofaction):
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
		self.ts = ts
		self.user = user


class Medical_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	reasonforprocedure = fields.String()
	notificationofvmo = fields.String()
	recommendationofvmo = fields.String()
	treatmentprotocol = fields.String()
	animallocationpreresolution = fields.String()
	followupexam = fields.String()
	resolution = fields.String()
	dateoffollowup = fields.String()
	animallocation = fields.String()
	dateofaction = fields.String()
	user = fields.String()
	ts = fields.DateTime(validate = not_blank)

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
	pasturenumbergrazing = db.Column(db.Text)
	sample = db.Column(db.Text)
	biomass = db.Column(db.Text)
	DMavailable = db.Column(db.Text)
	cp = db.Column(db.Text)
	cp1 = db.Column(db.Text)
	cp2 = db.Column(db.Text)
	cp3 = db.Column(db.Text)
	cp4 = db.Column(db.Text)
	pasturenumberburning = db.Column(db.Text)
	dateburned = db.Column(db.Text)
	qualityofburn = db.Column(db.Text)
	pasturenumberpesticide = db.Column(db.Text)
	chemicalname = db.Column(db.Text)
	applicationrate = db.Column(db.Text)
	applicationdate = db.Column(db.Text)
	user = db.Column(db.Text)
	ts = db.Column(DateTime(timezone=True), primary_key=True, default =func.current_timestamp())

	def __init__(self, cownumber,ts, pastureacres, animalspresent, datein, dateout, stockingrate,
				 pasturenumbergrazing,sample,biomass,DMavailable,cp,cp1,cp2,cp3,cp4,
				 pasturenumberburning,dateburned,qualityofburn,
				 pasturenumberpesticide,chemicalname,applicationrate, applicationdate, user):
		self.cownumber = cownumber
		self.pastureacres = pastureacres
		self.animalspresent = animalspresent
		self.datein = datein
		self.dateout = dateout
		self.stockingrate = stockingrate
		self.pasturenumbergrazing = pasturenumbergrazing
		self.sample = sample
		self.biomass = biomass
		self.DMavailable = DMavailable
		self.cp = cp
		self.pasturenumberburning = pasturenumberburning
		self.pasturenumberpesticide = pasturenumberpesticide
		self.dateburned = dateburned
		self.qualityofburn = qualityofburn
		self.chemicalname = chemicalname
		self.applicationrate = applicationrate
		self.applicationdate = applicationdate
		self.cp1 = cp1
		self.cp2 = cp2
		self.cp3 = cp3
		self.cp4 = cp4
		self.ts = ts
		self.user = user


class Grazing_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.Integer(validate=not_blank)
	pastureacres = fields.String()
	animalspresent = fields.String()
	datein = fields.String()
	dateout = fields.String()
	stockingrate = fields.String()
	pasturenumbergrazing = fields.String()
	sample = fields.String()
	biomass = fields.String()
	DMavailable = fields.String()
	cp = fields.String()
	cp1 = fields.String()
	cp2 = fields.String()
	cp3 = fields.String()
	cp4 = fields.String()
	pasturenumberburning = fields.String()
	dateburned = fields.String()
	qualityofburn = fields.String()
	pasturenumberpesticide = fields.String()
	chemicalname = fields.String()
	applicationrate = fields.String()
	applicationdate = fields.String()
	user = fields.String()
	ts = fields.DateTime(validate = not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/grazing/"
		else:
			self_link = "/grazing/{}".format(data['attributes']['cownumber'])
		return {"self": self_link}

	class Meta:
		type_ = 'grazing'

#Linked to cowgroup table and group all api call
class Group(db.Model, CRUD):
	__tablename__ = 'cowgroup'
	cownumber = db.Column(db.Text)
	groupnumber = db.Column(db.Integer, primary_key=True)
	groupname = db.Column(db.Text)
	groupdescription = db.Column(db.Text)
	attributes = db.Column(db.Text)
	user = db.Column(db.Text)

	def __init__(self, cownumber, groupnumber, groupname, groupdescription, attributes,user):
		self.cownumber = cownumber
		self.groupnumber = groupnumber
		self.groupname = groupname
		self.groupdescription = groupdescription
		self.attributes = str(attributes)
		self.user = user


class Group_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.String(validate=not_blank)
	groupnumber = fields.Integer(validate=not_blank)
	groupname = fields.String()
	groupdescription = fields.String()
	attributes = fields.String()
	user = fields.String()

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/group/"
		else:
			self_link = "/group/{}".format(data['attributes']['groupnumber'])
		return {"self": self_link}

	class Meta:
		type_ = 'group'


class Drug_Inventory_Dic(db.Model, CRUD):
	__tablename__ = 'drug_inventory_dic'
	drug = db.Column(db.Text, primary_key=True)
	location = db.Column(db.Text)
	roa= db.Column(db.Text)
	vialsize = db.Column(db.Float)
	units = db.Column(db.Text)
	user = db.Column(db.Text)

	def __init__(self, drug, location, roa, vialsize, units,user):
		self.drug = drug
		self.location = location
		self.roa = roa
		self.vialsize = vialsize
		self.units = units
		self.user = user


class Drug_Inventory_Dic_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)
	drug = fields.String(validate=not_blank)
	location = fields.String(validate=not_blank)
	roa = fields.String(validate=not_blank)
	vialsize = fields.Float(validate=not_blank)
	units  = fields.String(validate=not_blank)
	user = fields.String()


	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/drug_inventory_dic/"
		else:
			self_link = "/drug_inventory_dic/{}".format(data['attributes']['drug'])
		return {'self': self_link}

	class Meta:
		type_ = 'drug_inventory_dic'

class Create_Report(db.Model, CRUD):
	__tablename__ = 'reports'
	uid = db.Column(db.Integer, primary_key=True, autoincrement=True, default = -1)
	cownumber = db.Column(db.Text)
	attributes = db.Column(db.Text)
	start_date = db.Column(db.Text)
	end_date = db.Column(db.Text)
	user = db.Column(db.Text)
	reportnumber = db.Column(db.Text)
	ts = db.Column(DateTime(timezone=True), primary_key=True, default=func.current_timestamp())

	def __init__(self, cownumber,ts, attributes,uid,start_date,end_date,user,reportnumber):
		self.cownumber = cownumber
		self.attributes = str(attributes)
		self.ts = ts
		self.uid = uid
		self.user = user
		self.start_date = start_date
		self.end_date = end_date
		self.reportnumber = reportnumber



class Create_Report_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.String(validate=not_blank)
	attributes = fields.String()
	user = fields.String()
	start_date = fields.String()
	end_date = fields.String()
	reportnumber = fields.String()
	ts = fields.DateTime(validate = not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/herd_change/"
		else:
			self_link = "/herd_change/{}".format(data['attributes'])
		return {"self": self_link}

	class Meta:
		type_ = 'reports'

class Herdchange(db.Model, CRUD):
	__tablename__ = 'herdchange'
	uid = db.Column(db.Integer, primary_key=True, autoincrement=True, default=-1)
	cownumber = db.Column(db.Text)
	attributes = db.Column(db.Text)
	identifier = db.Column(db.Text)
	user = db.Column(db.Text)
	ts = db.Column(DateTime(timezone=True), primary_key=True, default=func.current_timestamp())

	def __init__(self, cownumber,ts, attributes, identifier, user,uid):
		self.cownumber = cownumber
		self.attributes = attributes
		self.identifier = identifier
		self.user = user
		self.ts = ts
		self.uid = uid


class Herdchange_Schema(Schema):
	not_blank = validate.Length(min=1, error='Field cannot be blank')
	id = fields.Integer(dump_only=True)  # WHY DOES THIS HAVE TO BE HERE???
	cownumber = fields.String(validate=not_blank)
	attributes = fields.String()
	identifier = fields.String()
	user = fields.String()
	ts = fields.DateTime(validate = not_blank)

	# self links
	def get_top_level_links(self, data, many):
		if many:
			self_link = "/herdchange/"
		else:
			self_link = "/herdchange/{}".format(data['attributes']['cownumber'])
		return {"self": self_link}

	class Meta:
		type_ = 'herdchange'