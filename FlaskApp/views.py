from flask import Blueprint, request, jsonify, make_response
from models import UsersSchema, db, Master_animal, Master_animal_Schema, Medical_Inventory, Medical_Inventory_Schema
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
import sys

master_animal= Blueprint('master_animal', __name__) # Seems to only change the format of returned json data
schemaMaster = Master_animal_Schema()
schemaMedical = Medical_Inventory_Schema()

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
        #raw_dict = request.get_json(force=True)
        #master_dict = raw_dict['data']['attributes']
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


#api.add_resource(Master_animalList11, '.json')
#api.add_resource(Master_animalList, '/api/master_animal/<int:cownumber>')
