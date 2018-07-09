import mysql
from mysql.connector import (connection)
import sys
from mysql.connector import errorcode
from time import strftime
import json

try:
    cnx = mysql.connector.connect(user='root', password='password', host='localhost',
                                  database='new_barn')
except AttributeError:
    raise errors.OperationalError("MySQL Connection not available.")
except mysql.connector.IntegrityError as err:
    print("Error: {}".format(err))
    # return None
except TypeError, e:
    print(e)
    # return None
except ValueError, e:
    print(e)
    # return None
else:
    cursor = cnx.cursor(dictionary=True)
    print("here in add animal class from the API call")
    data = '{"animalname": "123456789","current_expt_no": "1","email_ID": "test","pasture_ID": "1"}'
    data1 = json.loads(data)
    insert_animaldata = (
        """INSERT INTO animal_table (email_id, animalname, current_expt_no, pasture_ID) VALUES (%(email_ID)s, %(animalname)s, %(current_expt_no)s, %(pasture_ID)s)""")
    try:
        cursor.execute(insert_animaldata, data1)
        print("here after execute")
        cnx.commit()
        # return "Success", 201
    except AttributeError:
        raise errors.OperationalError("MySQL Connection not available.")
    except mysql.connector.IntegrityError as err:
        print("Error: {}".format(err))
        # return None
    except TypeError, e:
        print(e)
        # return None
    except ValueError, e:
        print(e)
        # return None
    finally:
        cursor.close()
        cnx.close()