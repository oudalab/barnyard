from flask import Blueprint, request, jsonify, make_response
from models import UsersSchema, db, Master_animal, Master_animal_Schema, Medical_Inventory, Medical_Inventory_Schema, \
    Animal_Inventory, Animal_Inventory_Schema, Experiment, Experiment_Schema, Reproduction, Reproduction_Schema, Medical, Medical_Schema, \
    Grazing, Grazing_Schema
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
from sqlalchemy import desc
import sys

master_animal= Blueprint('master_animal', __name__) # Seems to only change the format of returned json data
schemaMaster = Master_animal_Schema()
schemaMedical = Medical_Inventory_Schema()
schemaAnimal = Animal_Inventory_Schema()
schemaExperiment = Experiment_Schema()
schemaReproduction = Reproduction_Schema()
schemaAnimalMedical = Medical_Schema()
schemaGrazing = Grazing_Schema()

# master_animal table
class table_basics(Resource):

    def get(self, cownumber):
        master_animal_query = Master_animal.query.filter_by(cownumber = cownumber).order_by(Master_animal.ts.desc())
        #Serialize the query results in the JSON API format
        result = schemaMaster.dump(master_animal_query, many = True).data
        print >> sys.stderr, "This is the results of the get request from master animal {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaMaster.validate(raw_dict)
                #Create a master object with the API data recieved
                master = Master_animal(cownumber= None,ts = None,weight=raw_dict['weight'],height=raw_dict['height'],eartag=raw_dict['eartag'],eid=raw_dict['eid'],sex=raw_dict['sex'],pasturenumber=raw_dict['pasturenumber'],breed=raw_dict['breed'],status=raw_dict['status'],trial=raw_dict['trial'],herd= raw_dict['herd'],animaltype=raw_dict['animaltype'])
                master.add(master)
                print >> sys.stderr, "data for basic post {}".format(master)
                query = Master_animal.query.order_by(-Master_animal.cownumber).limit(1)
                results = schemaMaster.dump(query, many = True).data
                print >> sys.stderr, "This is print master {}".format(master)
                print >> sys.stderr, "This is query {}".format(results)
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
        #Not a real patch by definition. Used to store duplicate entries to keep track of changes over time
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaMaster.validate(raw_dict)
                #Create a master object with the API data recieved
                master = Master_animal(cownumber= raw_dict['cownumber'],ts = None,weight=raw_dict['weight'],height=raw_dict['height'],eartag=raw_dict['eartag'],eid=raw_dict['eid'],sex=raw_dict['sex'],pasturenumber=raw_dict['pasturenumber'],breed=raw_dict['breed'],status=raw_dict['status'],trial=raw_dict['trial'],herd= raw_dict['herd'],animaltype=raw_dict['animaltype'])
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

    # def patch(self, cownumber):
    #     master_animal_query = Master_animal.query.get_or_404(cownumber)
    #     raw_dict = request.form
    #     try:
    #         schemaMaster.validate(raw_dict)
    #         for key, value in raw_dict.items():
    #             setattr(master_animal_query, key, value)
    #
    #         master_animal_query.update()
    #         return self.get(cownumber)
    #
    #     except ValidationError as err:
    #         resp = jsonify({"error": err.messages})
    #         resp.status_code = 401
    #         return resp
    #
    #     except SQLAlchemyError as e:
    #         db.session.rollback()
    #         resp = jsonify({"error": str(e)})
    #         resp.status_code = 401
    #         return resp

class table_animal_inventory(Resource):

    def get(self, cownumber):
        animal_inventory_query = Animal_Inventory.query.filter_by(cownumber = cownumber).order_by(Animal_Inventory.ts.desc())
        #Serialize the query results in the JSON API format
        result = schemaAnimal.dump(animal_inventory_query,many = True).data
        print >> sys.stderr, "This is the results of the get request from Animal Inventory {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        #master_dict = raw_dict['data']['attributes']
        try:
                #Validate the data or raise a Validation error if
                schemaAnimal.validate(raw_dict)
                #Create a master object with the API data recieved
                animal = Animal_Inventory(cownumber= raw_dict['cownumber'],ts = None, brand=raw_dict['brand'], brandlocation=raw_dict['brandlocation'],tattooleft=raw_dict['tattooleft'],tattooright=raw_dict['tattooright'],alternativeid=raw_dict['alternativeid'],
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


class table_experiment(Resource):

    def get(self, cownumber):
        experiment_query = Experiment.query.filter_by(cownumber = cownumber).order_by(Experiment.ts.desc())
        result = schemaExperiment.dump(experiment_query,many = True).data
        print >> sys.stderr, "This is the results of the get request from experiment {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        try:
            # Validate the data or raise a Validation error if
            schemaExperiment.validate(raw_dict)
            # Create a master object with the API data recieved
            experiment = Experiment(cownumber=raw_dict['cownumber'],ts = None, dam=raw_dict['dam'], sire=raw_dict['sire'],
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
            experiment.add(experiment)
            query = Experiment.query.all()
            results = schemaExperiment.dump(query, many=True).data
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
        reproduction_query = Reproduction.query.filter_by(cownumber = cownumber).order_by(Reproduction.ts.desc())
        result = schemaReproduction.dump(reproduction_query,many = True).data
        print >> sys.stderr, "This is the results of the get request from reproduction {}".format(result)
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
                                        comments=raw_dict['comments'],
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
                                        deadabnormal =raw_dict['deadabnormal'])
            reproduction.add(reproduction)
            query = Reproduction.query.all()
            results = schemaReproduction.dump(query, many=True).data
            print >> sys.stderr, "THIS IS at thee end {}".format(results)
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

class table_medical(Resource):

    def get(self, cownumber):
        medical_query = Medical.query.filter_by(cownumber = cownumber).order_by(Medical.ts.desc())
        # Serialize the query results in the JSON API format
        result = schemaAnimalMedical.dump(medical_query,many = True).data
        print >> sys.stderr, "This is the results of the get request from medical {}".format(result)
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
                             dateoffollowup=raw_dict['dateoffollowup'], dateofaction=raw_dict['dateofaction'])
            medical.add(medical)
            query = Medical.query.all()
            results = schemaAnimalMedical.dump(query, many=True).data
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
        print >> sys.stderr, "This is the results of the get request from grazing {}".format(result)
        return result

    def post(self):
        raw_dict = request.form
        # master_dict = raw_dict['data']['attributes']
        try:
            # Validate the data or raise a Validation error if
            schemaGrazing.validate(raw_dict)
            # Create a master object with the API data recieved
            animal = Grazing(cownumber=raw_dict['cownumber'], ts = None,pastureacres=raw_dict['pastureacres'],
                             animalspresent=raw_dict['animalspresent'], datein=raw_dict['datein'],
                             dateout=raw_dict['dateout'], stockingrate=raw_dict['stockingrate'])
            animal.add(animal)
            query = Grazing.query.all()
            results = schemaGrazing.dump(query, many=True).data
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

#api.add_resource(Master_animalList11, '.json')
#api.add_resource(Master_animalList, '/api/master_animal/<int:cownumber>')
