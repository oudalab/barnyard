import mysql
from mysql.connector import (connection)
import sys
from mysql.connector import errorcode

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
    getanimaldata = ("""Select * from animal_table;""")
    cursor.execute(getanimaldata)
    rows = cursor.fetchall()
    print(rows)
    cnx.close()
