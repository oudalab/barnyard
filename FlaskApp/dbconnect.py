import MySQLdb

def connection():
    conn = MySQLdb.connect(host="localhost", user = "root", passwd = "Prithvi@0803", db = "pythonprogramming")
    c = conn.cursor()
    return c, conn
