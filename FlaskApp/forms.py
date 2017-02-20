from flask_wtf import FlaskForm, Form
from wtforms import StringField, BooleanField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length


class SignupForm(Form):
	firstname = StringField('First name', validators=[DataRequired("Please enter your first name.")])
	lastname = StringField('Last name', validators=[DataRequired("Please enter your last name.")])
	email = StringField('Email', validators=[DataRequired("Please enter your email address."), Email("Please enter your email address.")])
	password = PasswordField('Password', validators=[DataRequired("Please enter a password."), Length(min=6, message="Passwords must be 6 characters or more.")])
	submit = SubmitField('Sign up')
	
class Master_animalForm(Form):
	cow_number = StringField('cow_number', validators = [DataRequired("Please enter Cow number")])
	height = StringField('height', validators = [DataRequired("Please enter the height of the cow")])
	weight = StringField('weight', validators = [DataRequired("Please enter the weight of the cow")])
	submit = SubmitField('submit')