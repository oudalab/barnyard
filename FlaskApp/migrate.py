#migrate.py
from flask import Flask
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from models import db
from secrets import whole_string
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = whole_string

migrate = Migrate(app, db)
 
manager = Manager(app)
manager.add_command('db', MigrateCommand)




if __name__ == '__main__':
 manager.run()