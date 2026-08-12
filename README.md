Tutorat Maths
=============

Site vitrine pour des cours particuliers de mathématiques, du collège au lycée.

Ce que le site permet
---------------------

Tout tient sur une seule page. Elle présente le professeur et sa méthode en trois étapes — diagnostic, progression, autonomie —, les niveaux accompagnés de la 6ème à la Terminale, et le tarif : 35 € de l'heure, le même pour tous les niveaux, à domicile comme en ligne. Une FAQ répond aux questions qui reviennent le plus souvent, sur le supplément à domicile, l'engagement et le paiement.

Un bouton flottant ouvre un formulaire de contact depuis n'importe quel endroit de la page. Le message est enregistré en base, puis une notification part par email vers l'adresse du professeur. Cette adresse reste dans la configuration du serveur et n'apparaît jamais dans la page.

La navigation suit la lecture : le lien de la section visible se surligne au fil du défilement, les blocs apparaissent à mesure qu'ils entrent dans l'écran, et le message de confirmation s'efface seul au bout de quelques secondes.

Faire tourner le site
---------------------

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Copier `.env.example` en `.env` et remplir les valeurs : la clé secrète Flask, les identifiants du serveur SMTP, et l'adresse qui recevra les notifications. Puis :

```bash
python app.py
```

Le site répond sur http://127.0.0.1:5000. La base SQLite est créée toute seule au premier lancement, dans `instance/`.

Choix techniques
----------------

Flask sert la page unique et l'unique route de traitement du formulaire. Les champs passent par Flask-WTF, qui valide les saisies et apporte la protection CSRF. Les messages reçus sont stockés en SQLite via SQLAlchemy, et la notification part avec Flask-Mail.

Le style vient de Tailwind chargé en CDN, avec une palette et une police déclarées dans le gabarit de base. La feuille `static/css/style.css` ne contient que ce que Tailwind ne couvre pas : les animations d'apparition et l'accordéon de la FAQ. Le JavaScript est écrit à la main, sans dépendance.
