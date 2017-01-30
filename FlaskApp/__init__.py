from flask import Flask, render_template, flash, request, url_for, redirect,session
from models import db, User
from forms import LoginForm, SignupForm
from secrets import login
import config

import logging
from logging.handlers import RotatingFileHandler

whole_string = login()
app = Flask(__name__)
app.config['OPENID_PROVIDERS'] = config.OPENID_PROVIDERS
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['WTF_CSRF_ENABLED'] = config.WTF_CSRF_ENABLED

app.config['SQLALCHEMY_DATABASE_URI'] = whole_string
#disables SQLAlchemy event system
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)



@app.route('/')
@app.route('/searchpage')
def searchpage():
	return render_template("search.html")
 
@app.route('/dashboard')
def dashboard():
	return render_template("dashboard.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for OpenID="%s", remember_me=%s' %(form.openid.data, str(form.remember_me.data)))
        return redirect('/searchpage')
	print(app.config)
    return render_template('login.html', title='Sign In', form=form, providers=app.config['OPENID_PROVIDERS'])

@app.errorhandler(404)
def page_not_found(e):
        return redirect(url_for('login'))

@app.route('/signup', methods = ['GET', 'POST'])
def signup():
        app.logger.info('hellow')
        app.logger.error('hellow hellow')
        form = SignupForm()
        app.logger.info('starting Signup %s', form)

        if request.method == "POST":
                if form.validate() == False:
                        app.logger.info('Form validate equals false')
                        return render_template("signup.html", form=form)
                else:

                        newuser = User(form.first_name.data, form.last_name.data, form.email.data, form.password.data)
                        app.logger.info('adding newuser %s', newuser)
                        db.session.add(newuser)
                        db.session.commit()
                        return render_template ("dashboard.html")

        elif request.method == "GET":
                return render_template('signup.html', form= form)




if __name__ == '__main__':
    handler = RotatingFileHandler('barnyard.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.run(debug = True)