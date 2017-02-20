from flask import Flask, render_template, flash, request, url_for, redirect,session,jsonify
from models import db, Users, Master_animal
import forms
import views
from secrets import whole_string
import config
import logging
from logging.handlers import RotatingFileHandler
from flask_bcrypt import Bcrypt
from flask_restful import Resource, Api
from views import table_master
import syslog
import json


app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = whole_string
#disables SQLAlchemy event system
app.config['SQLALCHEMY_TRACK_MODOFICATIONS'] = True
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['WTF_CSRF_ENABLED'] = config.WTF_CSRF_ENABLED
db.init_app(app)
api = Api(app)
api.add_resource(table_master, '/api/master_animal/<cownumber>')
api.add_resource(table_master, '/api/master_animal/', endpoint = "cownumber")

@app.route('/')
@app.route('/searchpage')
def searchpage():
	return render_template("search.html")
 
@app.route('/dashboard', methods = ['GET','POST'])
def dashboard():
	return render_template(("dashboard.html"))

	
@app.route('/login', methods = ['GET','POST'])
def login_page():
        error = None
        try:
                if request.method == "POST":
                        attempted_username = request.form['username']
                        attempted_password = request.form['password']

                        #flash(attempted_username)
                        #flash(attempted_password)

                        if attempted_username == "admin" and attempted_password == "password":
                                return redirect(url_for('searchpage'))
                        else:
                                error = "Invalid credentials. Try Again."
                return render_template(("login.html"), error=error)
                        
        except Exception as e:
                #flash(e)
                return render_template(("login.html"), error = error)


	
@app.errorhandler(404)
def page_not_found(e):
        return render_template("404.html")

@app.route('/signup', methods = ['GET', 'POST'])
def signup():

        form = forms.SignupForm()

        if request.method == "POST":
                if form.validate() == False:
                        app.logger.info('Form validate equals false')
                        return render_template("signup.html", form=form)
                else:
                        newuser = Users(form.firstname.data, form.lastname.data, form.email.data, form.password.data)
                        db.session.add(newuser)
                        db.session.commit()
                        return redirect(url_for('login_page'))

        elif request.method == "GET":
                return render_template(("signup.html"), form= form)

@app.route('/api/post', methods = ['GET', 'POST'])
def cowStatus():
    cownumber = request.form['cownumber'];
    height = request.form['height'];
    weight = request.form['weight'];
    return json.dumps({'status': 'OK', 'cownumber':cownumber, 'height': height, 'weight':weight});

@app.route('/new')
def newPage():
    return render_template(("new.html"))

@app.route('/background_process')
def background_process():
    lang = request.args.get('proglang')
    if str(lang).lower() == 'python':
        return jsonify(result = 'You are wise!')
    else:
        return jsonify(result = 'Try again')

@app.route('/new2')
def signUp():
    return render_template('new2.html')

@app.route('/signUpUser', methods=['POST'])
def signUpUser():
    user =  request.form['username'];
    password = request.form['password'];
    return json.dumps({'status':'OK','user':user,'pass':password});


if __name__ == '__main__':
    handler = RotatingFileHandler('barnyard.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    syslog.syslog('Processing started')
    syslog.syslog(syslog.LOG_ERR, 'Error message here')
    syslog.syslog(syslog.LOG_DEBUG, 'Debug message here')
    syslog.syslog(syslog.LOG_INFO, 'Informational message here')
    #app.run(debug = True)