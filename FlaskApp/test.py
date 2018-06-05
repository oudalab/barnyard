import MySQLdb
import sys


db = MySQLdb.connect(host="localhost", port=3306, user="root", passwd="password", db="Barn1")
cursor = db.cursor()

cursor.execute("SELECT EID FROM animal_table")
rows = cursor.fetchall()
print >> sys.stderr, "This is the output for from cow_table{}".format(rows)

cursor.close()