from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, TextAreaField
from wtforms.validators import DataRequired, Email, Length


class ContactForm(FlaskForm):
    name = StringField(
        "Votre nom",
        validators=[DataRequired(message="Ce champ est requis."), Length(max=100)],
    )
    email = EmailField(
        "Adresse email",
        validators=[
            DataRequired(message="Ce champ est requis."),
            Email(message="Adresse email invalide."),
        ],
    )
    message = TextAreaField(
        "Message",
        validators=[
            DataRequired(message="Ce champ est requis."),
            Length(max=2000),
        ],
    )
