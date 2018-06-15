from flask import Flask, render_template, flash, request, url_for, redirect, session, jsonify, g
from flask_login import LoginManager, login_user, logout_user, current_user
from models import db, Users, Group, Group_Schema
from flask import send_from_directory
from forms import SignupForm, LoginForm
from views import table_basics, table_medical_inventory, table_animal_inventory, table_experiment, table_reproduction, \
    table_medical, table_grazing, table_group, table_herdchange, table_eid, table_animalname, table_eartag,\
    table_group_all, table_users_a, table_users_s, table_users_s_email, table_drug_inventory_dic_s, \
    table_drug_inventory_dic_a, table_reporting, table_report_view, table_test

from secrets import whole_string, short_string
import config
import logging
from functools import wraps
from logging.handlers import RotatingFileHandler
from flask_bcrypt import Bcrypt
from flask_restful import Resource, Api
import syslog
import sys
# import json
from models import *

app = Flask(__name__)
bcrypt = Bcrypt(app)


# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = whole_string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['WTF_CSRF_ENABLED'] = config.WTF_CSRF_ENABLED
db.init_app(app)

# API configurations
api = Api(app)
api.add_resource(table_medical_inventory, '/api/medical_inventory/')
api.add_resource(table_basics, '/api/master_animal/<cownumber>')
api.add_resource(table_basics, '/api/master_animal/', endpoint="1")
api.add_resource(table_animal_inventory, '/api/animal_inventory/<cownumber>')
api.add_resource(table_animal_inventory, '/api/animal_inventory/', endpoint="2")
api.add_resource(table_experiment, '/api/experiment/<cownumber>')
api.add_resource(table_experiment, '/api/experiment/', endpoint="3")
api.add_resource(table_reproduction, '/api/reproduction/<cownumber>')
api.add_resource(table_reproduction, '/api/reproduction/', endpoint="4")
api.add_resource(table_medical, '/api/medical/<cownumber>')
api.add_resource(table_medical, '/api/medical/', endpoint="5")
api.add_resource(table_grazing, '/api/grazing/<cownumber>')
api.add_resource(table_grazing, '/api/grazing/', endpoint="6")
# Table GETs and POSTs are done here.

api.add_resource(table_group, '/api/group/<groupnumber>')
api.add_resource(table_group, '/api/group/', endpoint="7")
api.add_resource(table_herdchange, '/api/herdchange/', endpoint="17")

# Get Cownumber from providing either of the identifications
api.add_resource(table_eid, '/api/eid/<eid>')
api.add_resource(table_eartag, '/api/eartag/<eartag>')
api.add_resource(table_animalname, '/api/animalname/<animalname>')
api.add_resource(table_group_all, '/api/groupall/')
# "a" for all (All users)
api.add_resource(table_users_a, '/api/users_a/')
# "s" for all (Single user)
api.add_resource(table_users_s, '/api/users_s/', endpoint="8")
api.add_resource(table_users_s, '/api/users_s/<userid>')
# "s" for all (Single user) with email
api.add_resource(table_users_s_email, '/api/users_s_email/<email>')
# "a" for all (All Data in the dictionary)
api.add_resource(table_drug_inventory_dic_a, '/api/drug_inventory_dic_a/')
# "s" for all (Single Row Data in the dictionary)
api.add_resource(table_drug_inventory_dic_s, '/api/drug_inventory_dic_s/', endpoint="9")
api.add_resource(table_drug_inventory_dic_s, '/api/drug_inventory_dic_s/<drug>')

# Testing for the new MYSQL db connection
api.add_resource(table_test, '/api/test/', endpoint="18")
api.add_resource(table_test, '/api/test/')

# Api for reportings
# end point to hold intended attribute changes
api.add_resource(table_reporting, '/api/reporting/', endpoint="10")
api.add_resource(table_reporting, '/api/reporting/<reportnumber>')
api.add_resource(table_report_view, '/api/report_view/<cownumber>/<start_date>/<end_date>', endpoint="11")

# Login Manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash("You need to login first")
            return redirect(url_for('login_page'))

    return wrap


@login_manager.user_loader
def load_user(userid):
    return Users.query.get(userid)


@app.before_request
def get_current_user():
    g.user = current_user


@app.route('/inspectionreport')
def inspectionreport():
    return render_template("Inspectionreport.html")


@app.route('/pharma')
@login_required
def pharma():
    return render_template("Pharma.html")


@app.route('/searchpage')
@login_required
def searchpage():
    return render_template("search.html")


@app.route('/newexperimentpage')
@login_required
def groupadd():
    return render_template("newexperimentpage.html")


@app.route('/createherdchange')
@login_required
def newherdchange():
    return render_template("createherdchange.html")


@app.route('/herdchange')
@login_required
def herdchange():
    return render_template("herdchange.html")


@app.route('/experiment', methods=['GET', 'POST'])
@login_required
def cowgroup():
    return render_template("experiment.html")


# Used to provide user interface to build query for reporting
@app.route('/create_report')
@login_required
def create_report():
    return render_template("create_report.html")


# Used to display results of query
@app.route('/reporting')
@login_required
def reporting():
    return render_template("reporting.html")


@app.route('/allexperimentpage')
@login_required
def allexperiment():
    return render_template("allexperimentpage.html")


@app.route('/experimentedit')
@login_required
def experimentedit():
    return render_template("ExperimentEdit.html")


@app.route('/experimentupdate', methods=['GET', 'POST'])
@login_required
# route used to make POST call in experimentscript.js
def experimentupdate():
    # necessary schemas for all tables
    schemaMaster = Master_animal_Schema()
    schemaMedical = Medical_Inventory_Schema()
    schemaAnimal = Animal_Inventory_Schema()
    schemaExperiment = Experiment_Schema()
    schemaReproduction = Reproduction_Schema()
    schemaAnimalMedical = Medical_Schema()
    schemaGrazing = Grazing_Schema()
    schemaGroup = Group_Schema()

    data = request.get_json(force=True)
    master_animal_query = Master_animal.query.filter_by(cownumber=data["cownumber"]).order_by(Master_animal.ts.desc()).limit(1)
    result = schemaMaster.dump(master_animal_query, many=True).data
    print >> sys.stderr, "This is the results of the get request from master animal {}".format(result)

    return "Success", 200


@app.route('/mysqlpost', methods=['GET', 'POST'])
@login_required
# route used to make POST call in experimentscript.js
def mysqlpost():
    print >> sys.stderr, "Reached mysql post"
    data = request.get_json(force=True)
    # print >> sys.stderr, "Got the data"
    for k, v in data.iteritems():
        print >> sys.stderr, ("Code : {0} ==> Value : {1}".format(k, v))

    return "Success", 200

	
@app.route('/test')
@login_required
def test():
    return render_template("testing.html")


@app.route('/testdashboard')
@login_required
def testdashboard():
    return render_template("barn1dashboard.html")


@app.route('/importfunc', methods = ['GET','POST'])
@login_required
def importfunc():
    return render_template("page.html")


@app.route('/dashboard', methods = ['GET','POST'])
@login_required
def dashboard():
    return render_template(("dashboard.html"))


@app.route('/adddashboard', methods = ['GET','POST'])
@login_required
def adddashboard():
    return render_template("adddashboard.html")


@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def login_page():
    formLogin = LoginForm()
    if formLogin.validate_on_submit():
        user = Users.query.filter_by(email = formLogin.email.data).first_or_404()
        if user.check_password(formLogin.password.data):
            user.authenticated = True
            login_user(user)
            flash("Logged in Successfully")
            session['logged_in'] = True
            session['email'] = formLogin.email.data
            # session['firstname'] = formLogin.firstname.data
            # session['lastname'] = formLogin.lastname.data
            return render_template('search.html', user=current_user.email)
        else:
            flash("Incorrect Email/Password combination")
            return redirect(render_template('login.html'))
    return render_template('login.html', form=formLogin)


@app.route('/user_email', methods = ['GET', 'POST'])
def user_email():
    return session['email']


@app.route('/signout')
@login_required
def signout():
    logout_user()
    session.clear()
    flash("You have been logged out!")
    return redirect(url_for('login_page'))


@app.errorhandler(404)
def page_not_found(e):
        return render_template("404.html")


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    return render_template("signup.html")


@app.route('/pharma_addnew', methods=['GET', 'POST'])
def pharma_addnew():
    return render_template("newmedication.html")


# Admin management of users and roles
@app.route('/users_management', methods=['GET', 'POST'])
@login_required
def users_management():
    return render_template("users_management.html")


# User Information
@app.route('/UserInfo')
@login_required
def userinfo():
    return render_template("UserInfo.html")


@app.route('/change-password')
@login_required
def changepassword():
    return render_template("ChangePassword.html")


if __name__ == '__main__':
    handler = RotatingFileHandler('barnyard.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    syslog.syslog('Processing started')
    syslog.syslog(syslog.LOG_ERR, 'Error message here')
    syslog.syslog(syslog.LOG_DEBUG, 'Debug message here')
    syslog.syslog(syslog.LOG_INFO, 'Informational message here')
    app.run(debug = False)