import mysql
from mysql.connector import (connection)
import sys
from mysql.connector import errorcode
from time import strftime
import json
data = {'animalname' : '2345',
       'email_id' : "testing",
        'height': "testing",
        'weight' : "testing",
        'eartag' : "testing",
        'eid': "testing",
        'sex': "testing",
        'pasture_ID' : "1",
        'breed': "testing",
        'status': "testing",
        'current_expt_no': "1",
        'Herd': "testing",
        'breeder': "testing",
        'currentframescore': "testing",
        'damframescore': "testing",
        'comments': "testing",
        'species' : "testing",
        'animaltype' : "testing",
       # 'brand ': "0",
        'brandlocation': "testing",
        'tattooleft' : "testing",
        'tattooright' : "testing",
        'alternativeid' : "testing",
        'registration' : "testing",
        'color' : "testing",
        'hornstatus' : "testing",
        'dam' : "testing",
        'sire' : "testing",
        #'DOB ': "2017-01-07",
        'howacquired' : "testing",
        'dateacquired' : "testing",
        'howdisposed' : "testing",
        'datedisposed' : "2018-01-04",
        'disposalreason' : "testing",
        'herdnumberlocation' : "testing",
        'herdstatus' : "testing",
        'howconceived' : "testing",
        'managementcode' : "testing",
        'ownerID': "testing",
        'springfall' : "testing",
        'gender':"female",
        'includeinlookups':"yes"}
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
    print ("here test ++++")
    insert_animaldata = ("""INSERT INTO animal_table (animalname,animaltype,eartag,eid,pasture_ID,
                         weight,height,gender,sex,breed,status,current_expt_no,Herd,breeder,currentframescore,
                         damframescore,comments,species,email_id,brandlocation,tattooleft,tattooright,
                         alternativeid,registration,color,hornstatus,dam,sire,howacquired,dateacquired,
                         howdisposed,datedisposed ,disposalreason ,herdnumberlocation ,herdstatus ,howconceived,
                         managementcode ,ownerID ,springfall ,includeinlookups ) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s,
                         %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                         %s, %s, %s, %s, %s, %s, %s""")
    cursor.execute(insert_animaldata, data)
    cnx.commit()
    cnx.close()



