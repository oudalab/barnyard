from flask import Flask, render_template, flash, request, url_for, redirect,session,jsonify, g
from flask_login import LoginManager, login_user, logout_user
from models import db, Users
from forms import SignupForm, LoginForm
from views import table_basics, table_medical_inventory,table_animal_inventory, table_experiment, table_reproduction, table_medical, \
    table_grazing
from secrets import whole_string
import config
import logging
from functools import wraps
from logging.handlers import RotatingFileHandler
from flask_bcrypt import Bcrypt
from flask_restful import Resource, Api
import syslog, sys
import json


app = Flask(__name__)
bcrypt = Bcrypt(app)

#Database config
app.config['SQLALCHEMY_DATABASE_URI'] = whole_string
app.config['SQLALCHEMY_TRACK_MODOFICATIONS'] = True
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['WTF_CSRF_ENABLED'] = config.WTF_CSRF_ENABLED
db.init_app(app)

#API configurations
api = Api(app)
api.add_resource(table_medical_inventory, '/api/medical_inventory/')
api.add_resource(table_basics, '/api/master_animal/<cownumber>')
api.add_resource(table_basics, '/api/master_animal/', endpoint = "1")
api.add_resource(table_animal_inventory, '/api/animal_inventory/<cownumber>')
api.add_resource(table_animal_inventory, '/api/animal_inventory/', endpoint = "2")
api.add_resource(table_experiment, '/api/experiment/<cownumber>')
api.add_resource(table_experiment, '/api/experiment/', endpoint = "3")
api.add_resource(table_reproduction, '/api/reproduction/<cownumber>')
api.add_resource(table_reproduction, '/api/reproduction/', endpoint = "4")
api.add_resource(table_medical, '/api/medical/<cownumber>')
api.add_resource(table_medical, '/api/medical/', endpoint = "5")
api.add_resource(table_grazing, '/api/grazing/<cownumber>')
api.add_resource(table_grazing, '/api/grazing/', endpoint = "6")

#Login Manager
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

@app.route('/test')
@login_required
def test():
    return render_template("test.html")
 
@app.route('/dashboard', methods = ['GET','POST'])
@login_required
def dashboard():
    return render_template(("dashboard.html"))

@app.route('/adddashboard', methods = ['GET','POST'])
@login_required
def adddashboard():
    return render_template("adddashboard.html")

@app.route('/', methods = ['GET','POST'])
@app.route('/login', methods = ['GET','POST'])
def login_page():
    formLogin = LoginForm()
    if formLogin.validate_on_submit():
        user = Users.query.filter_by(email = formLogin.email.data).first_or_404()
        if user.check_password(formLogin.password.data):
            login_user(user)
            flash("Logged in Succesfully")
            session['logged_in'] = True
            return redirect(url_for('searchpage'))
        else:
            flash("Incorrect Email/Password combination")
            return redirect(url_for('login_page'))
    return render_template('login.html', form=formLogin)

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

@app.route('/signup', methods = ['GET', 'POST'])
def signup():

        form = SignupForm()

        if request.method == "POST":
                if form.validate() == False:
                        return render_template("signup.html", form=form)
                else:
                        newuser = Users(form.firstname.data, form.lastname.data, form.email.data, form.password.data)
                        db.session.add(newuser)
                        db.session.commit()
                        return redirect(url_for('login_page'))

        elif request.method == "GET":
                return render_template(("signup.html"), form= form)

@app.route('/iacuc')
@login_required
def iacuc():
    return render_template("IACUC.html")

# @app.route('/api/post', methods = ['GET', 'POST'])
# def cowStatus():
#     if request.method == "POST":
#         basic = request.get_json
#         print >> sys.stderr, "data {}".format(basic)
#         cownumber = request.form.get('cownumber')
#         height = request.form.get('height')
#         weight = request.form.get('weight')
#         eartag = request.form.get('eartag')
#         eid = request.form.get('eid')
#         sex = request.form.get('sex')
#         pasturenumber = request.form.get('pasturenumber')
#         breed = request.form.get('breed')
#         status = request.form.get('status')
#         trial = request.form.get('trial')
#         herd = request.form.get('herd')
#         animaltype = request.form.get('animaltype')
#         newmaster = Master_animal(cownumber,height,weight,eartag,eid,sex,pasturenumber,breed,status,trial,herd,animaltype)
#         db.session.add(newmaster)
#         db.session.commit()
#         return json.dumps({'success': True}), 200, {
#             'ContentType': 'application/json'
#         }
#
#     elif request.method == "GET":
#             return render_template(("dashboard.html"), form = form)

if __name__ == '__main__':
    handler = RotatingFileHandler('barnyard.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    syslog.syslog('Processing started')
    syslog.syslog(syslog.LOG_ERR, 'Error message here')
    syslog.syslog(syslog.LOG_DEBUG, 'Debug message here')
    syslog.syslog(syslog.LOG_INFO, 'Informational message here')
    #app.run(debug = True)