from flask import Flask, render_template, flash, request, url_for, redirect,session
from dbconnect import connection
#used for registration form
from wtforms import Form, BooleanField, TextField, PasswordField, validators
#used to handle passwords
from passlib.hash import sha256_crypt
#Escape string used to stop SQL injection
from MySQLdb import escape_string as thwart
import gc


app = Flask(__name__)

@app.route('/searchpage/')
def searchpage():
	return render_template("search.html")
 
@app.route('/dashboard/')
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


class RegistrationForm(Form):
        username = TextField('Username', [validators.Length(min = 4, max =20)])
        password = PasswordField('New Password', [
                validators.Required(),
                validators.EqualTo('confirm', message='Passwords must match')])

        confirm = PasswordField('Repeat Password')
        accept_tos = BooleanField('I accept the Terms of Service and Privacy Notice (updated October 22, 2016)',
                                  [validators.Required()])


@app.route('/register/', methods = ['GET','POST'])
def register_page():
        try:
                form = RegistrationForm(request.form)

                if request.method =="POST" and form.validate():
                        username = form.username.data
                        password = sha256_crypt.encrypt((str(form.password.data)))
                        c, conn = connection()

                        x = c.execute("SELECT * FROM users2 WHERE username = (%s)", (thwart(username)))

                        if int(len(x)) >0:
                                flash("That username is already taken, please choose another")
                                return render_template('register.html', form=form)
                        else:
                                c.execute ("INSERT INTO users2 (username,password) VALUES (%s,%s)", (thwart(username),thwart(password)))
                                conn.commit()
                                flash("Thanks for registering!")
                                c.close()
                                conn.close()
                                #garbage collection
                                gc.collect()

                                session['logged_in'] = True
                                session['Username'] = username
                                return redirect(url_for('dashboard'))

                return render_template("register.html", form =form)
        except Exception as e:
                return(str(e))






if __name__ == "__main__":
    app.run()
