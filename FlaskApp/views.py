from flask import Blueprint, request, jsonify, make_response
from models import UsersSchema, db, Master_animal, Master_animal_Schema
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
import sys

master_animal= Blueprint('master_animal', __name__) # Seems to only change the format of returned json data
schemaMaster = Master_animal_Schema()
#api = Api(app)

# master_animal table
class table_master(Resource):

    def get(self, cownumber):
        master_animal_query = Master_animal.query.get_or_404(cownumber)
        #Serialize the query results in the JSON API format
        result = schemaMaster.dump(master_animal_query).data
        return result
    
    """http://jsonapi.org/format/#crud
    A resource can be created by sending a POST request to a URL that represents a collection of resources. The request MUST include a single resource object as primary data. The resource object MUST contain at least a type member.
    If a POST request did not include a Client-Generated ID and the requested resource has been created successfully, the server MUST return a 201 Created status code"""
    
    def post(self):
        raw_dict = request.get_json(force=True)
        master_dict = raw_dict['data']['attributes']
        print >> sys.stderr, "data {}".format(raw_dict)
        try:
                #Validate the data or raise a Validation error if
                schemaMaster.validate(master_dict)
                #Create a master object with the API data recieved
                #master = Master_animal(master_dict['cownumber'], master_dict['weight'], master_dict['height'])
                master = Master_animal(cownumber=master_dict['cownumber'], weight=master_dict['weight'],height=master_dict['height'])
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
    
    """http://jsonapi.org/format/#fetching
    A server MUST respond to a successful request to fetch an individual resource or resource collection with a 200 OK response.
    A server MUST respond with 404 Not Found when processing a request to fetch a single resource that does not exist, except when the request warrants a 200 OK response with null as the primary data (as described above)
    a self link as part of the top-level links object"""
    
    def get(self, uid):
        user_query = Users.query.get_or_404(uid)
        result = schema.dump(user_query).data
        return result
        
    """http://jsonapi.org/format/#crud-updating
    The PATCH request MUST include a single resource object as primary data. The resource object MUST contain type and id members.
    If a request does not include all of the attributes for a resource, the server MUST interpret the missing attributes as if they were included with their current values. The server MUST NOT interpret missing attributes as null values.
    If a server accepts an update but also changes the resource(s) in ways other than those specified by the request (for example, updating the updated-at attribute or a computed sha), it MUST return a 200 OK response. The response document MUST include a representation of the updated resource(s) as if a GET request was made to the request URL.
    A server MUST return 404 Not Found when processing a request to modify a resource that does not exist."""
    
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
