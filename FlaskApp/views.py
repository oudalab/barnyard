from flask import Blueprint, request, jsonify, make_response
from models import UsersSchema, db, Master_animal, Master_animal_Schema, Medical_Inventory, Medical_Inventory_Schema, \
    Animal_Inventory, Animal_Inventory_Schema, Experiment, Experiment_Schema, Reproduction, Reproduction_Schema
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
import sys

master_animal= Blueprint('master_animal', __name__) # Seems to only change the format of returned json data
schemaMaster = Master_animal_Schema()
schemaMedical = Medical_Inventory_Schema()
schemaAnimal = Animal_Inventory_Schema()
schemaExperiment = Experiment_Schema()
schemaReproduction = Reproduction_Schema()

# master_animal table
class table_basics(Resource):

    def get(self, cownumber):
        master_animal_query = Master_animal.query.get_or_404(cownumber)
        #Serialize the query results in the JSON API format
        result = schemaMaster.dump(master_animal_query).data
        print >> sys.stderr, "data {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaMaster.validate(raw_dict)
                #Create a master object with the API data recieved
                master = Master_animal(cownumber=raw_dict['cownumber'], weight=raw_dict['weight'],height=raw_dict['height'],eartag=raw_dict['eartag'],eid=raw_dict['eid'],sex=raw_dict['sex'],pasturenumber=raw_dict['pasturenumber'],breed=raw_dict['breed'],status=raw_dict['status'],trial=raw_dict['trial'],herd= raw_dict['herd'],animaltype=raw_dict['animaltype'])
                master.add(master)
                query = Master_animal.query.all()
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

    def patch(self, cownumber):
        print >> sys.stderr, "THIS IS RIGHT AT THE START OF THE PATCH {}".format(cownumber)
        master_animal_query = Master_animal.query.get_or_404(cownumber)
        print >> sys.stderr, "THIS IS THE QUERY REQUREST {}".format(master_animal_query)
        raw_dict = request.form
        print >> sys.stderr, "Request.form {}".format(raw_dict)
        try:
            schemaMaster.validate(raw_dict)
            for key, value in raw_dict.items():
                setattr(master_animal_query, key, value)

            master_animal_query.update()
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

class table_animal_inventory(Resource):

    def get(self, cownumber):
        animal_inventory_query = Animal_Inventory.query.get_or_404(cownumber)
        #Serialize the query results in the JSON API format
        result = schemaAnimal.dump(animal_inventory_query).data
        print >> sys.stderr, "data {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaAnimal.validate(raw_dict)
                #Create a master object with the API data recieved
                animal = Animal_Inventory(cownumber=raw_dict['cownumber'], brand=raw_dict['brand'], brandlocation=raw_dict['brandlocation'],tattooleft=raw_dict['tattooleft'],tattooright=raw_dict['tattooright'],alternativeid=raw_dict['alternativeid'],
                                       registration=raw_dict['registration'],color=raw_dict['color'],hornstatus=raw_dict['hornstatus'],dam=raw_dict['dam'],sire=raw_dict['sire'],dob= raw_dict['dob'],howacquired=raw_dict['howacquired'],
                                       dateacquired = raw_dict['dateacquired'], howdisposed = raw_dict['howdisposed'], datedisposed = raw_dict['datedisposed'], disposalreason = raw_dict['disposalreason'])
                animal.add(animal)
                query = Animal_Inventory.query.all()
                results = schemaAnimal.dump(query, many = True).data
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
        print >> sys.stderr, "data {}".format(medical_inventory_query)
        #Serialize the query results in the JSON API format
        result = schemaMedical.dump(medical_inventory_query, many = True).data
        print >> sys.stderr, "data {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaMedical.validate(raw_dict)
                #Create a master object with the API data recieved
                medical = Medical_Inventory(medication = raw_dict['medication'],quantity = raw_dict['quantity'],cost = raw_dict['cost'],purchasedate = raw_dict['purchasedate'], expirydate = raw_dict['expirydate'])
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

class UsersUpdate(Resource):

    def get(self, uid):
        user_query = Users.query.get_or_404(uid)
        result = schema.dump(user_query).data
        return result



    def patch(self, uid):
        user = Users.query.get_or_404(uid)
        raw_dict = request.get_json(force=True)

        try:
            schema.validate(raw_dict)
            user_dict = raw_dict['data']['attributes']
            for key, value in user_dict.items():

                setattr(user, key, value)

            user.update()
            return self.get(uid)

        except ValidationError as err:
                resp = jsonify({"error": err.messages})
                resp.status_code = 401
                return resp

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 401
                return resp

    #http://jsonapi.org/format/#crud-deleting
    #A server MUST return a 204 No Content status code if a deletion request is successful and no content is returned.
    def delete(self, uid):
        user = Users.query.get_or_404(uid)
        try:
            delete = user.delete(user)
            response = make_response()
            response.status_code = 204
            return response

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 401
                return resp

class table_experiment(Resource):

    def get(self, cownumber):
        experiment_query = Experiment.query.get_or_404(cownumber)
        result = schemaExperiment.dump(experiment_query).data
        print >> sys.stderr, "data {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        try:
            print >> sys.stderr, "THIS IS at the start of the post {}".format(raw_dict)
            # Validate the data or raise a Validation error if
            schemaExperiment.validate(raw_dict)
            print >> sys.stderr, "THIS IS has pass validation {}".format(raw_dict)
            # Create a master object with the API data recieved
            experiment = Experiment(cownumber=raw_dict['cownumber'], dam=raw_dict['dam'], sire=raw_dict['sire'],
                                    birthweight=raw_dict['birthweight'],
                                    damframescore=raw_dict['damframescore'],
                                    sireframescore=raw_dict['sireframescore'],
                                    weanheight=raw_dict['weanheight'], weanweight=raw_dict['weanweight'],
                                    adj205w=raw_dict['adj205w'], weandate=raw_dict['weandate'],
                                    adj205h=raw_dict['adj205h'], dob=raw_dict['dob'],
                                    weanframescore=raw_dict['weanframescore'],
                                    ageatwean=raw_dict['ageatwean'], yearlingweight=raw_dict['yearlingweight'],
                                    yearlingheight=raw_dict['yearlingheight'],
                                    yearlingdate=raw_dict['yearlingdate'],
                                    adjyearlingw=raw_dict['adjyearlingw'],
                                    adjyearlingh=raw_dict['adjyearlingh'],
                                    yearlingframescore=raw_dict['yearlingframescore'],
                                    ageatyearling=raw_dict['ageatyearling'],
                                    customweight=raw_dict['customweight'],
                                    customweightdate=raw_dict['customweightdate'],
                                    customheight=raw_dict['customheight'],
                                    customheightdate=raw_dict['customheightdate'], backfat=raw_dict['backfat'],
                                    treatment=raw_dict['treatment'], blockpen=raw_dict['blockpen'],
                                    replicate=raw_dict['replicate'])
            print >> sys.stderr, "THIS IS after all the data has been submited {}".format(experiment)
            experiment.add(experiment)
            query = Experiment.query.all()
            results = schemaExperiment.dump(query, many=True).data
            print >> sys.stderr, "Last query {}".format(results)
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
        reproduction_query = Reproduction.query.get_or_404(cownumber)
        result = schemaReproduction.dump(reproduction_query).data
        print >> sys.stderr, "data {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        try:
            # Validate the data or raise a Validation error if
            schemaReproduction.validate(raw_dict)
            # Create a master object with the API data recieved
            reproduction = Reproduction(cownumber=raw_dict['cownumber'], breeding=raw_dict['breeding'],
                                        pregnancy=raw_dict['pregnancy'], calfatside=raw_dict['calfatside'],
                                        totalcalves=raw_dict['totalcalves'],
                                        previouscalf=raw_dict['previouscalf'],
                                        currentcalf=raw_dict['currentcalf'],
                                        damageatbirth=raw_dict['damageatbirth'],
                                        calfbirthweight=raw_dict['calfbirthweight'],
                                        calfsex=raw_dict['calfsex'], pasturenumberreproduction=raw_dict['pasturenumberreproduction'],
                                        calfdob=raw_dict['calfdob'],
                                        damcalvingdisposition=raw_dict['damcalvingdisposition'],
                                        calvingease=raw_dict['calvingease'], udderscore=raw_dict['udderscore'],
                                        comments=raw_dict['comments'], damdispostion=raw_dict['damdispostion'],
                                        cowframescore=raw_dict['cowframescore'],
                                        cowwtbreeding=raw_dict['cowwtbreeding'],
                                        cowhtbreeding=raw_dict['cowhtbreeding'],
                                        cowwtweaning=raw_dict['cowwtweaning'],
                                        cowhtweaning=raw_dict['cowhtweaning'],
                                        cowwtcalving=raw_dict['cowwtcalving'],
                                        cowhtcalving=raw_dict['cowhtcalving'],
                                        bcsweaning=raw_dict['bcsweaning'], bcscalving=raw_dict['bcscalving'],
                                        bcsbreeding=raw_dict['bcsbreeding'],
                                        customcowwt=raw_dict['customcowwt'],
                                        customcowht=raw_dict['customcowht'],
                                        bulldispostion=raw_dict['bulldispostion'],
                                        bullframescore=raw_dict['bullframescore'],
                                        bullwtprebreeding=raw_dict['bullwtprebreeding'],
                                        bullhtprebreeding=raw_dict['bullhtprebreeding'],
                                        fertility=raw_dict['fertility'], mobility =raw_dict['mobility'],
                                        conc=raw_dict['conc'], deadabnormal =raw_dict['deadabnormal'])
            reproduction.add(reproduction)
            query = Reproduction.query.all()
            results = schemaReproduction.dump(query, many=True).data
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

#api.add_resource(Master_animalList11, '.json')
#api.add_resource(Master_animalList, '/api/master_animal/<int:cownumber>')
