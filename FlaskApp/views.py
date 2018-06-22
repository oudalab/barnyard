from flask import Blueprint, request, jsonify, make_response
from models import Users, UsersSchema, db, Master_animal, Master_animal_Schema, Medical_Inventory, Medical_Inventory_Schema, \
    Animal_Inventory, Animal_Inventory_Schema, Experiment, Experiment_Schema, Reproduction, Reproduction_Schema, Medical, Medical_Schema, \
    Grazing, Grazing_Schema, Group, Group_Schema, Drug_Inventory_Dic, Drug_Inventory_Dic_Schema, Create_Report, \
    Create_Report_Schema, Herdchange, Herdchange_Schema
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
from sqlalchemy import desc, and_, create_engine
from sqlalchemy.orm import sessionmaker
from secrets import whole_string, short_string
import sys
import json
import sqlite3
import mysql
from mysql.connector import (connection)
from mysql.connector import errorcode, errors, Error

import pdb
from datetime import datetime

master_animal = Blueprint('master_animal', __name__) # Seems to only change the format of returned json data
schemaMaster = Master_animal_Schema()
schemaAnimal = Animal_Inventory_Schema()
schemaExperiment = Experiment_Schema()
schemaReproduction = Reproduction_Schema()
schemaAnimalMedical = Medical_Schema()
schemaGrazing = Grazing_Schema()
schemaGroup = Group_Schema()
schemaUsers = UsersSchema()
schemaDrugDic = Drug_Inventory_Dic_Schema()
schemaReport = Create_Report_Schema()
schemaHerdchange = Herdchange_Schema()
#Medicine page
schemaMedical = Medical_Inventory_Schema()

class table_users_a(Resource):
# "a" for all (All users)
# this api is specifically used to pull all of the users to populate the list on the left on user_management.html
    def get(self):
        users_query = Users.query.all()
        #users_query = Users.query.with_entities(Users.lastname, Users.email, Users.firstname, Users.roles, Users.uid)
        result = schemaUsers.dump(users_query, many= True).data
        print >> sys.stderr, "This is query for user roles{}".format(result)
        return result

class table_users_s(Resource):
# "s" for specific (specific user)
    def get(self,userid):
        users_query = Users.query.filter_by(userid=userid).first()
        result = schemaUsers.dump(users_query, many=False).data
        return result
    def post(self):
        raw_dict = request.form
        try:
            # Validate the data or raise a Validation error if
            schemaUsers.validate(raw_dict)
            # Create a master object with the API data recieved
            users = Users(firstname=raw_dict['firstname'], lastname=raw_dict['lastname'], email = raw_dict['email'], password=raw_dict['password'], roles = "UNASSIGNED",userid = None, registered_at=None, ts=None)
            users.add(users)
            query = Users.query.all()
            results = schemaUsers.dump(query, many=True).data
            return jsonify(results)
            # return results, 201

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp

    def patch(self, userid):
        users_query = Users.query.get_or_404(userid)
        raw_dict = request.form
        try:
            schemaUsers.validate(raw_dict)
            for key, value in raw_dict.items():
                setattr(users_query, key, value)

            users_query.update()
            return self.get(userid)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp

class table_users_s_email(Resource):
# "s" for specific (specific user)
    def get(self,email):
        users_query = Users.query.filter_by(email=email).first()
        result = schemaUsers.dump(users_query, many=False).data
        return result

class table_eid(Resource):

    def get(self, eid):
        master_animal_query = Master_animal.query.filter_by(eid = eid).order_by(Master_animal.ts.desc()).first_or_404()
        result = schemaMaster.dump(master_animal_query, many=False).data
        return result

class table_animalname(Resource):
    def get(self, animalname):
        master_animal_query = Master_animal.query.filter_by(animalname=animalname).order_by(Master_animal.ts.desc()).first_or_404()
        result = schemaMaster.dump(master_animal_query, many=False).data
        return result

class table_eartag(Resource):
    def get(self, eartag):
        master_animal_query = Master_animal.query.filter_by(eartag=eartag).order_by(Master_animal.ts.desc()).first_or_404()
        result = schemaMaster.dump(master_animal_query, many=False).data
        return result


# master_animal table
class table_basics(Resource):

    def get(self, cownumber):
        master_animal_query = Master_animal.query.filter_by(cownumber = cownumber).order_by(Master_animal.ts.desc()).first_or_404()
        #Serialize the query results in the JSON API format
        result = schemaMaster.dump(master_animal_query, many = False).data
        print >> sys.stderr, "This is proof that the call has been made{}".format(result)
        return result

    def post(self):

        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaMaster.validate(raw_dict)
                #Create a master object with the API data recieved
                master = Master_animal(cownumber= None,
                                       ts = None,
                                       user = raw_dict['user'],
                                       animalname = raw_dict['animalname'],
                                       breeder=raw_dict['breeder'],
                                       currentframescore=raw_dict['currentframescore'],
                                       damframescore=raw_dict['damframescore'],
                                       comments=raw_dict['comments'],
                                       species=raw_dict['species'],
                                       weight=raw_dict['weight'],
                                       height=raw_dict['height'],
                                       eartag=raw_dict['eartag'],
                                       eid=raw_dict['eid'],
                                       sex=raw_dict['sex'],
                                       pasturenumber=raw_dict['pasturenumber'],
                                       breed=raw_dict['breed'],
                                       status=raw_dict['status'],
                                       trial=raw_dict['trial'],
                                       herd= raw_dict['herd'],
                                       animaltype=raw_dict['animaltype'])
                master.add(master)
                #print >> sys.stderr, "data for basic post {}".format(master)
                query = Master_animal.query.order_by(-Master_animal.cownumber).limit(1)
                results = schemaMaster.dump(query, many = True).data
                return jsonify(results)
                #return results, 201


        except ValidationError as err:
                resp = jsonify({"error": err.messages})
                resp.status_code = 403
                return resp

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 403
                return resp

    def patch(self):
        #Not a real patch by definition. Used to store duplicate cownumber entries to keep track of changes over time
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaMaster.validate(raw_dict)
                #Create a master object with the API data recieved
                master = Master_animal(cownumber= raw_dict['cownumber'],
                                       ts = None,
                                       user = raw_dict['user'],
                                       animalname=raw_dict['animalname'],
                                       breeder=raw_dict['breeder'],
                                       currentframescore=raw_dict['currentframescore'],
                                       damframescore=raw_dict['damframescore'],
                                       comments=raw_dict['comments'],
                                       species=raw_dict['species'],
                                       weight=raw_dict['weight'],
                                       height=raw_dict['height'],
                                       eartag=raw_dict['eartag'],
                                       eid=raw_dict['eid'],
                                       sex=raw_dict['sex'],
                                       pasturenumber=raw_dict['pasturenumber'],
                                       breed=raw_dict['breed'],
                                       status=raw_dict['status'],
                                       trial=raw_dict['trial'],
                                       herd= raw_dict['herd'],
                                       animaltype=raw_dict['animaltype'])
                master.add(master)
                query = Master_animal.query.order_by(-Master_animal.cownumber).limit(1)
                results = schemaMaster.dump(query, many = True).data
                return jsonify(results)
                #return results, 201


        except ValidationError as err:
                resp = jsonify({"error": err.messages})
                resp.status_code = 403
                return resp

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 403
                return resp


class table_animal_inventory(Resource):

    def get(self, cownumber):
        animal_inventory_query = Animal_Inventory.query.filter_by(cownumber = cownumber).order_by(Animal_Inventory.ts.desc())
        #Serialize the query results in the JSON API format
        result = schemaAnimal.dump(animal_inventory_query,many = True).data
        #print >> sys.stderr, "This is the results of the get request from Animal Inventory {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaAnimal.validate(raw_dict)
                #Create a master object with the API data recieved
                animal = Animal_Inventory(cownumber= raw_dict['cownumber'],
                                          ts=None,
                                          brand=raw_dict['brand'],
                                          brandlocation=raw_dict['brandlocation'],
                                          tattooleft=raw_dict['tattooleft'],
                                          tattooright=raw_dict['tattooright'],
                                          alternativeid=raw_dict['alternativeid'],
                                          registration=raw_dict['registration'],
                                          color=raw_dict['color'],
                                          hornstatus=raw_dict['hornstatus'],
                                          dam=raw_dict['dam'],
                                          sire=raw_dict['sire'],
                                          dob=raw_dict['dob'],
                                          howacquired=raw_dict['howacquired'],
                                          dateacquired=raw_dict['dateacquired'],
                                          howdisposed=raw_dict['howdisposed'],
                                          datedisposed=raw_dict['datedisposed'],
                                          disposalreason=raw_dict['disposalreason'],
                                          herdnumberlocation=raw_dict['herdnumberlocation'],
                                          herdstatus=raw_dict['herdstatus'],
                                          howconceived=raw_dict['howconceived'],
                                          managementcode=raw_dict['managementcode'],
                                          ownerID=raw_dict['ownerID'],
                                          user=raw_dict['user'],
                                          springfall=raw_dict['springfall'],
                                          includeinlookups=raw_dict['includeinlookups'])
                animal.add(animal)
                query = Animal_Inventory.query.all()
                results = schemaAnimal.dump(query, many = True).data
                return 201


        except ValidationError as err:
                resp = jsonify({"error": err.messages})
                resp.status_code = 403
                return resp

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 403
                return resp

    def patch(self, cownumber):
        animal_inventory_query = Animal_Inventory.query.get_or_404(cownumber)
        raw_dict = request.form
        try:
            schemaAnimal.validate(raw_dict)
            for key, value in raw_dict.items():
                setattr(animal_inventory_query, key, value)

            animal_inventory_query.update()
            return self.get(cownumber)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp

class table_medical_inventory(Resource):

    def get(self):
        medical_inventory_query = Medical_Inventory.query.all()
        #Serialize the query results in the JSON API format
        result = schemaMedical.dump(medical_inventory_query, many = True).data
        return result

    def post(self):
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaMedical.validate(raw_dict)
                #Create a master object with the API data recieved
                medical = Medical_Inventory(medication = raw_dict['medication'],
                                            quantity = raw_dict['quantity'],
                                            cost = raw_dict['cost'],
                                            user=raw_dict['user'],
                                            purchasedate = raw_dict['purchasedate'],
                                            expirydate = raw_dict['expirydate'])
                medical.add(medical)
                query = Medical_Inventory.query.all()
                results = schemaMaster.dump(query, many = True).data
                return results, 201


        except ValidationError as err:
                resp = jsonify({"error": err.messages})
                resp.status_code = 403
                return resp

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 403
                return resp


class table_experiment(Resource):

    def get(self, cownumber):
        experiment_query = Experiment.query.filter_by(cownumber = cownumber).order_by(Experiment.ts.desc())
        result = schemaExperiment.dump(experiment_query,many = True).data
        #print >> sys.stderr, "This is the results of the get request from experiment {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        try:
            # Validate the data or raise a Validation error if
            schemaExperiment.validate(raw_dict)
            # Create a master object with the API data recieved
            experiment = Experiment(cownumber=raw_dict['cownumber'],
                                    ts = None,
                                    birthweight=raw_dict['birthweight'],
                                    animaltype=raw_dict['animaltype'],
                                    birthweightadj=raw_dict['birthweightadj'],
                                    bcsrecent=raw_dict['bcsrecent'],
                                    bcsprevious=raw_dict['bcsprevious'],
                                    bcsdifference=raw_dict['bcsdifference'],
                                    damwtatwean=raw_dict['damwtatwean'],
                                    weangpd=raw_dict['weangpd'],
                                    weanhipht=raw_dict['weanhipht'],
                                    weanwda=raw_dict['weanwda'],
                                    weanweightdate=raw_dict['weanweightdate'],
                                    sireframescore=raw_dict['sireframescore'],
                                    weanheight=raw_dict['weanheight'],
                                    weanweight=raw_dict['weanweight'],
                                    adj205w=raw_dict['adj205w'],
                                    weandate=raw_dict['weandate'],
                                    adj205h=raw_dict['adj205h'],
                                    weanframescore=raw_dict['weanframescore'],
                                    ageatwean=raw_dict['ageatwean'],
                                    yearlingweight=raw_dict['yearlingweight'],
                                    yearlingheight=raw_dict['yearlingheight'],
                                    yearlingdate=raw_dict['yearlingdate'],
                                    adjyearlingw=raw_dict['adjyearlingw'],
                                    adjyearlingh=raw_dict['adjyearlingh'],
                                    yearlingframescore=raw_dict['yearlingframescore'],
                                    ageatyearling=raw_dict['ageatyearling'],
                                    currentwtcow=raw_dict['currentwtcow'],
                                    currentwtheifer=raw_dict['currentwtheifer'],
                                    adj365dht=raw_dict['adj365dht'],
                                    customweight=raw_dict['customweight'],
                                    customweightdate=raw_dict['customweightdate'],
                                    customheight=raw_dict['customheight'],
                                    customheightdate=raw_dict['customheightdate'],
                                    backfat=raw_dict['backfat'],
                                    treatment=raw_dict['treatment'],
                                    blockpen=raw_dict['blockpen'],
                                    user=raw_dict['user'],
                                    replicate=raw_dict['replicate'])
            experiment.add(experiment)
            query = Experiment.query.all()
            results = schemaExperiment.dump(query, many=True).data
            print >> sys.stderr, "This is result of experiment {}".format(results)
            return 201
            #return results, 201

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp


    def patch(self, cownumber):
        experiment_query = Experiment.query.get_or_404(cownumber)
        raw_dict = request.form
        try:
            schemaExperiment.validate(raw_dict)
            for key, value in raw_dict.items():
                setattr(experiment_query, key, value)

            experiment_query.update()
            return self.get(cownumber)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp

class table_reproduction(Resource):

    def get(self, cownumber):
        reproduction_query = Reproduction.query.filter_by(cownumber = cownumber).order_by(Reproduction.ts.desc())
        result = schemaReproduction.dump(reproduction_query,many = True).data
        #print >> sys.stderr, "This is the results of the get request from reproduction {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        try:
            # Validate the data or raise a Validation error if
            schemaReproduction.validate(raw_dict)
            # Create a master object with the API data recieved
            reproduction = Reproduction(cownumber=raw_dict['cownumber'],ts = None,
                                        breeding=raw_dict['breeding'],
                                        pregnancy=raw_dict['pregnancy'],
                                        siblingcode=raw_dict['siblingcode'],
                                        calfatside=raw_dict['calfatside'],
                                        totalcalves=raw_dict['totalcalves'],
                                        previouscalf=raw_dict['previouscalf'],
                                        currentcalf=raw_dict['currentcalf'],
                                        damageatbirth=raw_dict['damageatbirth'],
                                        calfbirthweight=raw_dict['calfbirthweight'],
                                        calfsex=raw_dict['calfsex'],
                                        pasturenumberreproduction=raw_dict['pasturenumberreproduction'],
                                        calfdob=raw_dict['calfdob'],
                                        damcalvingdisposition=raw_dict['damcalvingdisposition'],
                                        calvingease=raw_dict['calvingease'],
                                        udderscore=raw_dict['udderscore'],
                                        conditionscorecalving = raw_dict['conditionscorecalving'],
                                        hiphtweaning2015=raw_dict['hiphtweaning2015'],
                                        hiphtweaning2016=raw_dict['hiphtweaning2016'],
                                        hiphtbreeding2016=raw_dict['hiphtbreeding2016'],
                                        damdisposition=raw_dict['damdisposition'],
                                        cowframescore=raw_dict['cowframescore'],
                                        cowwtbreeding=raw_dict['cowwtbreeding'],
                                        cowhtbreeding=raw_dict['cowhtbreeding'],
                                        cowwtweaning=raw_dict['cowwtweaning'],
                                        cowhtweaning=raw_dict['cowhtweaning'],
                                        cowwtcalving=raw_dict['cowwtcalving'],
                                        cowhtcalving=raw_dict['cowhtcalving'],
                                        bcsweaning=raw_dict['bcsweaning'],
                                        bcscalving=raw_dict['bcscalving'],
                                        bcsbreeding=raw_dict['bcsbreeding'],
                                        customcowwt=raw_dict['customcowwt'],
                                        customcowht=raw_dict['customcowht'],
                                        bulldisposition=raw_dict['bulldisposition'],
                                        bullframescore=raw_dict['bullframescore'],
                                        bullwtprebreeding=raw_dict['bullwtprebreeding'],
                                        bullhtprebreeding=raw_dict['bullhtprebreeding'],
                                        fertility=raw_dict['fertility'],
                                        mobility =raw_dict['mobility'],
                                        conc=raw_dict['conc'],
                                        user=raw_dict['user'],
                                        deadabnormal =raw_dict['deadabnormal'])
            reproduction.add(reproduction)
            query = Reproduction.query.all()
            results = schemaReproduction.dump(query, many=True).data
            print >> sys.stderr, "This is reproduction {}".format(results)
            return 201

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp


    def patch(self, cownumber):
        reproduction_query = Reproduction.query.get_or_404(cownumber)
        raw_dict = request.form
        try:
            schemaReproduction.validate(raw_dict)
            for key, value in raw_dict.items():
                setattr(reproduction_query, key, value)

            reproduction_query.update()
            return self.get(cownumber)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp

class table_medical(Resource):

    def get(self, cownumber):
        medical_query = Medical.query.filter_by(cownumber = cownumber).order_by(Medical.ts.desc())
        # Serialize the query results in the JSON API format
        result = schemaAnimalMedical.dump(medical_query,many = True).data
        return result

    def post(self):
        raw_dict = request.form
        # master_dict = raw_dict['data']['attributes']
        try:
            # Validate the data or raise a Validation error if
            schemaAnimalMedical.validate(raw_dict)
            # Create a master object with the API data recieved
            medical = Medical(cownumber=raw_dict['cownumber'],ts = None, reasonforprocedure=raw_dict['reasonforprocedure'],
                             notificationofvmo=raw_dict['notificationofvmo'],
                             recommendationofvmo=raw_dict['recommendationofvmo'],
                             treatmentprotocol=raw_dict['treatmentprotocol'],
                             animallocationpreresolution=raw_dict['animallocationpreresolution'],
                             followupexam=raw_dict['followupexam'], resolution=raw_dict['resolution'],
                             animallocation=raw_dict['animallocation'],
                             user=raw_dict['user'],
                             dateoffollowup=raw_dict['dateoffollowup'], dateofaction=raw_dict['dateofaction'])
            medical.add(medical)
            query = Medical.query.all()
            results = schemaAnimalMedical.dump(query, many=True).data
            return 201


        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp

    def patch(self, cownumber):
        medical_query = Medical.query.get_or_404(cownumber)
        raw_dict = request.form
        try:
            schemaAnimalMedical.validate(raw_dict)
            for key, value in raw_dict.items():
                setattr(medical_query, key, value)

            medical_query.update()
            return self.get(cownumber)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp

class table_grazing(Resource):

    def get(self, cownumber):
        grazing_query = Grazing.query.filter_by(cownumber = cownumber).order_by(Grazing.ts.desc())
        result = schemaGrazing.dump(grazing_query,many = True).data
        #print >> sys.stderr, "This is the results of the get request from grazing {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        # master_dict = raw_dict['data']['attributes']
        try:
            # Validate the data or raise a Validation error if
            schemaGrazing.validate(raw_dict)
            # Create a master object with the API data recieved
            grazing = Grazing(cownumber=raw_dict['cownumber'], ts = None,pastureacres=raw_dict['pastureacres'],
                             animalspresent=raw_dict['animalspresent'], datein=raw_dict['datein'],
                             dateout=raw_dict['dateout'], stockingrate=raw_dict['stockingrate'],
                             pasturenumbergrazing=raw_dict['pasturenumbergrazing'],
                              sample=raw_dict['sample'], biomass=raw_dict['biomass'],
                              DMavailable=raw_dict['DMavailable'],cp=raw_dict['cp'],
                              cp1=raw_dict['cp1'],cp2=raw_dict['cp2'],cp3=raw_dict['cp3'],cp4=raw_dict['cp4'],
                              pasturenumberburning=raw_dict['pasturenumberburning'],dateburned=raw_dict['dateburned'],
                              qualityofburn=raw_dict['qualityofburn'],pasturenumberpesticide=raw_dict['pasturenumberpesticide'],
                              user=raw_dict['user'],
                              chemicalname=raw_dict['chemicalname'],applicationrate=raw_dict['applicationrate'],applicationdate=raw_dict['applicationdate'])
            grazing.add(grazing)
            query = Grazing.query.all()
            results = schemaGrazing.dump(query, many=True).data
            return 201


        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp

    def patch(self, cownumber):
        grazing_query = Grazing.query.get_or_404(cownumber)
        raw_dict = request.form
        try:
            schemaGrazing.validate(raw_dict)
            for key, value in raw_dict.items():
                setattr(grazing_query, key, value)
            grazing_query.update()
            return self.get(cownumber)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp

# Used for all experiments page
class table_group_all(Resource):
    def get(self):
        group_query = Group.query.all()
        result = schemaGroup.dump(group_query, many=True).data
        # print >> sys.stderr, "This is the results of the get request from Group {}".format(result)
        return result

class table_group(Resource):

    def get(self, groupnumber):
        group_query = Group.query.filter_by(groupnumber = groupnumber)
        result = schemaGroup.dump(group_query,many = True).data
        return result

    def post(self):
        raw_dict = request.form
        # master_dict = raw_dict['data']['attributes']
        try:
            # Validate the data or raise a Validation error if
            schemaGroup.validate(raw_dict)
            group = Group(cownumber=raw_dict['cownumber'], groupnumber=raw_dict['groupnumber'],
                             groupname=raw_dict['groupname'], groupdescription=raw_dict['groupdescription'],
                                user=raw_dict['user'], attributes = raw_dict['attributes'])
            group.add(group)
            query = Group.query.all()
            results = schemaGroup.dump(query, many=True).data
            return results, 201


        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp

    def patch(self, groupnumber):
        group_query = Group.query.get_or_404(groupnumber)
        raw_dict = request.form
        try:
            schemaGroup.validate(raw_dict)
            for key, value in raw_dict.items():
                setattr(group_query, key, value)

            group_query.update()
            return self.get(groupnumber)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp

class table_herdchange(Resource):

    def get(self):
        herdchange_query = Herdchange.query.order_by(Herdchange.ts.desc()).limit(1)
        result = schemaHerdchange.dump(herdchange_query, many = True).data
        return result

    def post(self):
        raw_dict = request.form
        try:
                schemaHerdchange.validate(raw_dict)
                #Create a master object with the API data recieved
                herdchange = Herdchange(uid = None, ts = None, cownumber=raw_dict['cownumber'],
                                     attributes = raw_dict['attributes'],
                                     identifier = raw_dict['identifier'],
                                     user = raw_dict['user'])
                herdchange.add(herdchange)
                query = Herdchange.query.all()
                results = schemaHerdchange.dump(query, many = True).data
                return results, 201


        except ValidationError as err:
                resp = jsonify({"error": err.messages})
                resp.status_code = 403
                return resp

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 403
                return resp

class table_drug_inventory_dic_a(Resource):
# "a" for all (All drugs)
    def get(self):
        drug_dic_query = Drug_Inventory_Dic.query.all()
        result = schemaDrugDic.dump(drug_dic_query, many= True).data
        return result

class table_drug_inventory_dic_s(Resource):
# "s" for specific (specific user)
    def get(self,drug):
        drug_dic_query = Drug_Inventory_Dic.query.filter_by(drug=drug).first()
        result = schemaDrugDic.dump(drug_dic_query, many=False).data
        return result
    def post(self):
        raw_dict = request.form
        try:
            schemaDrugDic.validate(raw_dict)
            drug_dic = Drug_Inventory_Dic(user = raw_dict['user'],drug=raw_dict['drug'], location=raw_dict['location'], roa = raw_dict['roa'], vialsize=raw_dict['vialsize'], units = raw_dict['units'])
            drug_dic.add(drug_dic)
            query = Drug_Inventory_Dic.query.all()
            results = schemaDrugDic.dump(query, many=True).data
            return jsonify(results)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp

class table_reporting(Resource):

    def get(self,reportnumber):
        report_query = Create_Report.query.filter_by(reportnumber=reportnumber)
        result = schemaReport.dump(report_query, many=True).data
        return result

    def post(self):
        raw_dict = request.form
        try:
            # Validate the data or raise a Validation error if
            schemaReport.validate(raw_dict)
            # Create a master object with the API data received
            report = Create_Report(uid = None, ts = None, reportnumber = raw_dict['reportnumber'],cownumber=raw_dict['cownumber'],attributes = raw_dict['attributes'], start_date = raw_dict['start_date'], end_date = raw_dict['end_date'], user = raw_dict['user'])
            report.add(report)
            query = Create_Report.query.all()
            results = schemaReport.dump(query, many=True).data
            return results, 201


        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 403
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 403
            return resp

# Tables below will be used for reporting only
# Due to struggles with creating views with SqlAlchemy, we decided to make pure SQL queries with a database connection
class table_report_view(Resource):
    def get(self, cownumber, start_date, end_date):
        def dict_factory(cursor, row):
            d = {}
            for idx, col in enumerate(cursor.description):
                d[col[0]] = row[idx]
            return d
        conn = sqlite3.connect(short_string)
        conn.row_factory = dict_factory
        cur = conn.cursor()
        cur.execute("Select * from alltables where cownumber = ? and ts between ? and ?",(cownumber,start_date,end_date))

        rows = cur.fetchall()
        # animal_inventory_query = Animal_Inventory.query.filter(and_(Animal_Inventory.cownumber == cownumber,
        # Animal_Inventory.ts >= start_date, Animal_Inventory.ts <= end_date)).order_by(Animal_Inventory.ts.desc())
        # result = schemaUsers.dump(rows,many = True).data
        columns = [i[0] for i in cur.description]
        result = [{columns[index][0]: column for index, column in enumerate(value)} for value in cur.fetchall()]
        print >> sys.stderr, "This is the output for results{}".format(rows)
        return rows


class table_test(Resource):
    def get(self):
        print >> sys.stderr, "Execution started"
        try:
            cnx = mysql.connector.connect(user='root', password='password', host='localhost', database='new_barn')

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("SELECT Animal_ID,eartag,eid,sex,pasture_ID,breed,status,current_expt_no,Herd,animaltype,animalname,breeder,currentframescore,damframescore,comments,species,height,weight,gender,email_id,brand,brandlocation,tattooleft,tattooright,alternativeid,registration,color,hornstatus,dam,sire,DOB,howacquired, DATE_FORMAT(dateacquired, '%%YYYY-%%mm-%%dd'),howdisposed,DATE_FORMAT(datedisposed, '%%YYYY-%%mm-%%dd'),disposalreason,herdnumberlocation,herdstatus,howconceived,managementcode,ownerID,springfall,includeinlookups FROM animal_table")
            rows = cursor.fetchall()
            print("Fetch Completed")

            print >> sys.stderr, "This is the output for Animal_get{}".format(rows)
            cursor.close()
            cnx.close()

        return rows

    def post(self):
        try:
            cnx = mysql.connector.connect(user='root', password='password', host='localhost', database='new_barn')

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            # New comment line
            cursor = cnx.cursor(dictionary=True)
            # insert_animaldata = "INSERT INTO animal_table (Animal_ID,animalname,animaltype,eartag,eid,pasturenumber," \
            #                     "weight,height,gender,sex,breed,status,current_expt_no,Herd,Breeder,currentframescore,"\
            #                     "damframescore,comments,species,email_id) VALUES (%(Animal_ID)s, %(animalname)s, " \
            #                     "%(animaltype)s, %(eartag)s, %(eid)s, %(pasturenumber)s, %(weight)s, %(height)s, " \
            #                     "%(gender)s, %(sex)s, %(breed)s, %(status)s, %(current_expt_no)s, %(Herd)s," \
            #                     " %(Breeder)s, %(currentframescore)s, %(damframescore)s, %(comments)s, " \
            #                     "%(species)s, %(email_id)s)"

            insert_users = ("INSERT INTO login (email_id, first_name, last_name, pswd_hash, roles, registered_at) VALUES (%(email_id)s,%(first_name)s,%(last_name)s,%(pswd_hash)s,%(roles )s,%(registered_at)s)")
            print >> sys.stderr, "Initialized"
            data = request.get_json(force=True)
            print >> sys.stderr, "Got the data"
            for k, v in data.iteritems():
                print >> sys.stderr, ("Code : {0} ==> Value : {1}".format(k, v))
            print>>sys.stderr, "Next is the execute command, Here it goes"
            try:
                cursor.execute(insert_users, data)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err))
                return None
            except TypeError, e:
                print(e)
                return None
            except ValueError, e:
                print(e)
                return None
            finally:
                cursor.close()
                cnx.close()
    def update(self):
        try:
            cnx = mysql.connector.connect(user='root', password='password', host='localhost', database='new_barn')

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            # New comment line
            cursor = cnx.cursor(dictionary=True)

            update_users = ("""UPDATE login SET first_name=%(first_name)s, last_name=%(last_name)s, 
                                pswd_hash=%(pswd_hash)s, email_id=%(email_id)s, roles=%(roles)s, registered_at=%(registered_at)s
                                WHERE Server=%s(email_id, first_name, last_name, pswd_hash, roles, registered_at)""")
            print >> sys.stderr, "Initialized"
            data = request.get_json(force=True)
            print >> sys.stderr, "Got the data"
            for k, v in data.iteritems():
                print >> sys.stderr, ("Code : {0} ==> Value : {1}".format(k, v))
            print>>sys.stderr, "Next is the execute command, Here it goes"
            try:
                cursor.execute(update_users, data)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err))
                return None
            except TypeError, e:
                print(e)
                return None
            except ValueError, e:
                print(e)
                return None
            finally:
                cursor.close()
                cnx.close()
