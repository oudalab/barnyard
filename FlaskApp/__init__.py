from flask import Flask, render_template, flash, request, url_for, redirect,session
import sqlite3
from models import db, User
from forms import LoginForm, SignupForm
from secrets import sql_login
import config
from flask import g
import logging
from logging.handlers import RotatingFileHandler

DATABASE = '/var/www/barnyard/FlaskApp/barnyard'



sqlite_login = sql_login()
app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////var/www/barnyard/FlaskApp/barnyard.db'
#disables SQLAlchemy event system
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)
#app.config['OPENID_PROVIDERS'] = config.OPENID_PROVIDERS
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['WTF_CSRF_ENABLED'] = config.WTF_CSRF_ENABLED

def connect_db():
    return sqlite3.connect(DATABASE)

@app.before_request
def before_request():
    g.db = connect_db()

@app.route('/')
@app.route('/searchpage')
def searchpage():
	return render_template("search.html")
 
@app.route('/dashboard')
def dashboard():
	return render_template("dashboard.html")

@app.route('/login/', methods = ['GET','POST'])
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
                return render_template("login.html", error=error)
                        
        except Exception as e:
                #flash(e)
                return render_template("login.html", error = error)

@app.errorhandler(404)
def page_not_found(e):
        return redirect(url_for('login_page'))

@app.route('/signup', methods = ['GET', 'POST'])
def signup():

        form = SignupForm()

        if request.method == "POST":
                if form.validate() == False:
                        app.logger.info('Form validate equals false')
                        return render_template("signup.html", form=form)
                else:
                        newuser = User(form.first_name.data, form.last_name.data, form.email.data, form.password.data)
                        db.session.add(newuser)
                        db.session.commit()
                        return redirect("login.html")

        elif request.method == "GET":
                return render_template("signup.html", form= form)




if __name__ == '__main__':
    handler = RotatingFileHandler('barnyard.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.run(debug = True)