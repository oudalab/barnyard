import mysql
import pprint
from mysql.connector import (connection)
# import MySQLdb
import sys
from mysql.connector import errorcode


try:
    cnx = mysql.connector.connect(user='root', password='password', host='localhost', database='Barn1')

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
else:
    cursor = cnx.cursor(dictionary=True)

    cursor.execute("SELECT * FROM animal_table")

    for row in cursor:
        print("{Animal_ID}'s animalname is : {animalname}".format(**row))
    # rows = cursor.fetchall()
    # print >> sys.stderr, "This is the output for from cow_table{}".format(rows)

    cursor.close()
    cnx.close()



# db = MySQLdb.connect(host="localhost", port=3306, user="root", passwd="password", db="Barn1")
# cursor = db.cursor()
#
# cursor.execute("SELECT EID FROM animal_table")
# rows = cursor.fetchall()
# print >> sys.stderr, "This is the output for from cow_table{}".format(rows)
#
# cursor.close()