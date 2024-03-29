from flask import Flask, render_template, flash, request, url_for, redirect, session, jsonify, g
from flask_login import LoginManager, login_user, logout_user, current_user
from models import db, Users, Group, Group_Schema
from flask import send_from_directory
from forms import SignupForm, LoginForm
import mysql
from mysql.connector import (connection)
from mysql.connector import errorcode, errors, Error
from views import table_basics, table_medical_inventory, table_animal_inventory, table_experiment, table_reproduction, \
    table_medical, table_grazing, table_group, table_herdchange, table_eid, table_animalname, table_eartag,\
    table_group_all, table_users_a, table_users_s, table_users_s_email, table_drug_inventory_dic_s, \
    table_drug_inventory_dic_a, table_reporting, table_report_view, table_test, TableAnimalUpdate, TableAnimalAdd, \
<<<<<<< HEAD
    TableInventoryPasture, TableInventoryFormulary, TableHealthList, TableHerd, TableInventoryPastureHistory
=======
    TableInventoryPasture, TableInventoryFormulary, TableHealthList, TableHerd, TableInventoryPastureHistory,\
    TableHerdUniqueName, TableExperiment, TableHealthAdd, TableReproduction,Expt,TableInspection
>>>>>>> b9eac74a4a97d951d847caa48459460f6feb848b

from secrets import whole_string, short_string
import config
import logging
from functools import wraps
from logging.handlers import RotatingFileHandler
from flask_bcrypt import Bcrypt
from flask_restful import Resource, Api
import syslog
import sys
from werkzeug.utils import secure_filename
import os
# import json
from models import *

app = Flask(__name__)
bcrypt = Bcrypt(app)


# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = whole_string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['WTF_CSRF_ENABLED'] = config.WTF_CSRF_ENABLED
app.config['UPLOAD_FOLDER']='/var/www/barnyard/FlaskApp/static/pdf_files/'
ALLOWED_EXTENSIONS=set(['txt','pdf','png','jpg'])
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

# Api for reportings
# end point to hold intended attribute changes
api.add_resource(table_reporting, '/api/reporting/', endpoint="10")
api.add_resource(table_reporting, '/api/reporting/<reportnumber>')
api.add_resource(table_report_view, '/api/report_view/<cownumber>/<start_date>/<end_date>', endpoint="11")


# Testing for the new MYSQL db connection
api.add_resource(table_test, '/api/test/', endpoint="18")
api.add_resource(table_test, '/api/test/')
#
# api.add_resource(Addanimal, '/api/animal/add', endpoint="19")
# api.add_resource(Addanimal, '/api/animal/add')
# APIs for the new UI Design


api.add_resource(TableAnimalUpdate, '/api/animal/update/<Animal_ID>')
api.add_resource(TableAnimalUpdate, '/api/animal/update/', endpoint="20")

api.add_resource(TableAnimalAdd, '/api/animal/add/<Animal_ID>')
api.add_resource(TableAnimalAdd, '/api/animal/add/', endpoint="19")

api.add_resource(TableHerd, '/api/herd/create/')
api.add_resource(TableHerd, '/api/herd/create/', endpoint="21")

api.add_resource(TableInventoryPastureHistory, '/api/inventory/pasturehistory/')
api.add_resource(TableInventoryPasture, '/api/inventory/pasture/')
<<<<<<< HEAD
api.add_resource(TableInventoryFormulary, '/api/inventory/formulary/')
api.add_resource(TableHealthList, '/api/health/record/')


=======
api.add_resource(TableInventoryPasture, '/api/inventory/pasture/', endpoint="22")

api.add_resource(TableInventoryPastureHistory, '/api/inventory/pasturehistory/<pasture_ID>/<event_date>')
api.add_resource(TableInventoryPastureHistory, '/api/inventory/pasturehistory/', endpoint="23")

api.add_resource(TableHerdUniqueName, '/api/herd/name/<name>')
api.add_resource(TableHerdUniqueName, '/api/herd/name/', endpoint="24")

api.add_resource(TableInventoryFormulary, '/api/inventory/formulary/<Medicine_ID>')
api.add_resource(TableInventoryFormulary, '/api/inventory/formulary/', endpoint="25")

api.add_resource(TableExperiment, '/api/experiment/herd/<Animal_ID>')
api.add_resource(TableExperiment, '/api/experiment/herd/', endpoint="26")

api.add_resource(TableHealthAdd, '/api/health/add/<animalname>')
api.add_resource(TableHealthAdd, '/api/health/add/', endpoint="27")

api.add_resource(TableHealthList, '/api/health/record/<Record_ID>')
api.add_resource(TableHealthList, '/api/health/record/', endpoint="28")

api.add_resource(TableReproduction, '/api/reproduction/record/')
api.add_resource(TableReproduction, '/api/reproduction/record/', endpoint="29")

api.add_resource(Expt, '/api/experiment/list/')
api.add_resource(Expt, '/api/experiment/list/', endpoint="30")

api.add_resource(TableInspection, '/api/inspection/report/')
api.add_resource(TableInspection, '/api/inspection/report/', endpoint="31")
>>>>>>> b9eac74a4a97d951d847caa48459460f6feb848b

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


@app.route('/experiment', methods=['get', 'post'])
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
def oldexperimentupdate():
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


@app.route('/importfunc', methods=['GET', 'POST'])
@login_required
def importfunc():
    return render_template("page.html")


@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    return render_template("dashboard.html")


@app.route('/adddashboard', methods=['GET', 'POST'])
@login_required
def adddashboard():
    return render_template("adddashboard.html")


@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def login_page():
    formLogin = LoginForm()
    if formLogin.validate_on_submit():
        user = Users.query.filter_by(email=formLogin.email.data).first_or_404()
        print >> sys.stderr, "This is the output for results{}".format(user)
        if user.check_password(formLogin.password.data):
            user.authenticated = True
            login_user(user)
            flash("Logged in Successfully")
            session['logged_in'] = True
            session['email'] = formLogin.email.data
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


@app.route('/tempsearchpage')
@login_required
def tempsearchpage():
    return render_template("tempsearchpage.html")


@app.route('/animal/add', methods=['GET','POST','PATCH'])
@login_required
def animaladd():
        return render_template("animaladd.html")


@app.route('/animal/list')
@login_required
def animallist():
    return render_template("animallist.html")


<<<<<<< HEAD
@app.route('/animal/update',methods=['GET','DELETE'])
=======
@app.route('/animal/update', methods=['GET','DELETE'])
>>>>>>> b9eac74a4a97d951d847caa48459460f6feb848b
@login_required
def animalupdate():
    return render_template("animalupdate.html")


@app.route('/experiment/add', methods=['GET', 'POST'])
@login_required
def experimentadd():
    return render_template("experimentadd.html")


@app.route('/experiment/list', methods=['GET','PATCH','DELETE'])
@login_required
def experiment_list():
    return render_template("experiment_list.html")


@app.route('/experiment/edit', methods=['GET', 'POST','PATCH','DELETE'])
@login_required
def experiment_edit():
    return render_template("experiment_edit.html")


@app.route('/experiment/update', methods=['GET', 'POST', 'PATCH'])
@login_required
def experimentupdate():
    return render_template("experiment_update.html")


@app.route('/report/create')
@login_required
def report_create():
    return render_template("report_create.html")


@app.route('/report/view')
@login_required
def report_view():
    return render_template("report_view.html")


@app.route('/inventory/formulary',methods=['GET', 'POST', 'PATCH', 'DELETE'])
@login_required
def inventory_formulary():
    return render_template("inventory_formulary.html")


@app.route('/inventory/pasture',methods=['GET','POST','PATCH','DELETE'])
@login_required
def inventory_pasture():
    return render_template("inventory_pasture.html")


@app.route('/inventory/procedure')
@login_required
def inventory_procedure():
    return render_template("inventory_procedure.html")


@app.route('/inspection/submit',methods=['GET','POST'])
@login_required
def inspection_submit():
    return render_template("inspection_submit.html")


@app.route('/inspection/view')
@login_required
def inspection_view():
    return render_template("inspection_view.html")


@app.route('/reproduction/calfadd')
@login_required
def reproduction_add_calf():
    return render_template("reproduction_add_calf.html")


@app.route('/reproduction/listview')
@login_required
def reproduction_view_list():
    return render_template("reproduction_view_list.html")


@app.route('/reproduction/calfview')
@login_required
def reproduction_view_calf():
    return render_template("reproduction_view_calf.html")


@app.route('/health/add',methods=['POST','GET',])
@login_required
def healthadd():
    return render_template("health_add.html")


@app.route('/health/list',methods=['POST','GET','PATCH','DELETE'])
@login_required
def healthlist():
    return render_template("health_list.html")


@app.route('/health/update',methods=['PATCH','GET'])
@login_required
def healthupdate():
    return render_template("health_update.html")


@app.route('/herd/create', methods=['GET','POST'])
@login_required
def herd_create():
    return render_template("herd_create.html")


@app.route('/herd/view')
@login_required
def herd_view():
    return render_template("herd_view.html")


@app.route('/herd/grazing')
@login_required
def herd_grazing():
    return render_template("herd_grazing.html")


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploadajax', methods=['POST'])
def upload():
    file = request.files['file']

    if file and allowed_file(file.filename):
         filename = secure_filename(file.filename)
         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
         return filename,200



if __name__ == '__main__':
    handler = RotatingFileHandler('barnyard.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    syslog.syslog('Processing started')
    syslog.syslog(syslog.LOG_ERR, 'Error message here')
    syslog.syslog(syslog.LOG_DEBUG, 'Debug message here')
    syslog.syslog(syslog.LOG_INFO, 'Informational message here')
    app.run(debug=False)
