from dotenv import load_dotenv

# Doit précéder l'import de config, qui lit os.environ au chargement
load_dotenv()

from flask import Flask, render_template, redirect, url_for, flash
from flask_mail import Mail, Message
from config import Config
from models import db, ContactMessage
from forms import ContactForm


app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
mail = Mail(app)

with app.app_context():
    db.create_all()


def send_notification_email(subject: str, body: str):
    owner_email = app.config.get("OWNER_EMAIL")
    if not owner_email:
        app.logger.warning("OWNER_EMAIL non configuré — email non envoyé.")
        return

    try:
        msg = Message(subject=subject, recipients=[owner_email])
        msg.body = body
        mail.send(msg)
        app.logger.info(f"Notification envoyée à {owner_email}")
    except Exception as e:
        app.logger.error(f"Erreur lors de l'envoi de l'email : {e}")


def render_single_page(scroll_to=None, contact_form=None):
    if contact_form is None:
        contact_form = ContactForm()
    return render_template(
        "index.html",
        contact_form=contact_form,
        scroll_to=scroll_to,
    )


@app.route("/")
def index():
    return render_single_page()


@app.route("/contact", methods=["POST"])
def contact():
    form = ContactForm()

    if form.validate_on_submit():
        new_message = ContactMessage(
            name=form.name.data,
            email=form.email.data,
            message=form.message.data,
        )
        db.session.add(new_message)
        db.session.commit()

        email_body = (
            f"📩 Nouveau message de contact !\n\n"
            f"Nom : {new_message.name}\n"
            f"Email : {new_message.email}\n"
            f"Message :\n{new_message.message}\n"
        )
        send_notification_email(
            subject=f"Nouveau message de {new_message.name}",
            body=email_body,
        )

        flash(
            "Votre message a bien été envoyé ! "
            "Je vous répondrai dans les plus brefs délais.",
            "success",
        )
        return redirect(url_for("index") + "#contact")

    return render_single_page(scroll_to="contact", contact_form=form)


if __name__ == "__main__":
    app.run(debug=True)
