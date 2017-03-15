from flask import Blueprint, request, jsonify, make_response
from models import UsersSchema, db, Master_animal, Master_animal_Schema
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
import sys

master_animal= Blueprint('master_animal', __name__) # Seems to only change the format of returned json data
schemaMaster = Master_animal_Schema()

# master_animal table
class table_basics(Resource):

    def get(self, cownumber):
        master_animal_query = Master_animal.query.get_or_404(cownumber)
        #Serialize the query results in the JSON API format
        result = schemaMaster.dump(master_animal_query).data
        return result
       
    def post(self):
        raw_dict = request.get_json(force=True)
        master_dict = raw_dict['data']['attributes']
        #print >> sys.stderr, "data {}".format(raw_dict)
        try:
                #Validate the data or raise a Validation error if
                schemaMaster.validate(master_dict)
                #Create a master object with the API data recieved
                master = Master_animal(cownumber=master_dict['cownumber'], weight=master_dict['weight'],height=master_dict['height'],eartag=master_dict['eartag'],eid=master_dict['eid'],sex=master_dict['sex'],pasturenumber=master_dict['pasturenumber'],breed=master_dict['breed'],status=master_dict['status'],trial=master_dict['trial'],herd=master_dict['herd'],animaltype=master_dict['animaltype'])
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



class UsersUpdate(Resource):
 
    def get(self, uid):
        user_query = Users.query.get_or_404(uid)
        result = schema.dump(user_query).data
        return result

    def patch(self, id):
        user = Users.query.get_or_404(id)
        raw_dict = request.get_json(force=True)
        user_dict = raw_dict['data']['attributes']
        try:
            for key, value in user_dict.items():
                schema.validate({key: value})
                setattr(user, key, value)

            user.update()
            return self.get(id)

        except ValidationError as err:
            resp = jsonify({"error": err.messages})
            resp.status_code = 401
            return resp

        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({"error": str(e)})
            resp.status_code = 401
            return resp

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
