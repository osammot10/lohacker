from os import close
from connection import *

login_bp = Blueprint('login_bp',__name__)

@login_bp.route('/login', methods = ['GET', 'POST'])
def show_login_page():
    try:
        if current_user.is_authenticated:
            return redirect(url_for('home'))
        else:
            return render_template("login.html")
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore, non è possibile verificare se l'utente è auntenticato")

@login_bp.route('/login/access', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        try:
            email = request.form['email']
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore: campo email mancante")
        if email != "":
            userPassword = getUserPassword(email)
            if userPassword is None:
                return render_template("error.html", error = "", message = "Errore: non è possibile caricare la password")
            if userPassword is not None:
                userPassword = userPassword[0]
            else:
                return render_template("wrongemail.html")
            try:
                if userPassword is not None:
                    if request.form['pwd'] == userPassword:
                        user = get_user_by_email(request.form['email'])
                        if user is None:
                            render_template("error.html", error = " ", message = "Errore durante il caricamento dell'utente")
                        login_user(user)
                        return redirect(url_for('login_bp.private'))
                    else:
                        return render_template("wrongpassword.html")
                else:
                    return render_template("wrongemail.html")
            except Exception as e:
                return render_template("error.html", error = e, message = "Errore: la password è None")
        else:
            return render_template("wrongemail.html")
    else:
        return redirect(url_for('login_bp.show_login_page'))

@login_bp.route('/private')
@login_required
def private():
    try:
        myTemplates = getAllMyTemplates()
        if myTemplates is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento dei form")
        return render_template("profile.html", templates = myTemplates)
    except Exception as e:
        print(e)

@login_bp.route('/register', methods = ['GET', 'POST'])
def show_register_page():
    return render_template("register.html")

@login_bp.route('/register/send', methods = ['GET', 'POST'])
def register():
    try:
        if request.form['email'] is not None and request.form['email'] != "" and request.form['password'] is not None and request.form['password'] != "" and request.form['first_name'] is not None and request.form['first_name'] != "" and request.form['surname'] is not None and request.form['surname'] != "":
            try:
                createNewUser(request.form['email'], request.form['password'], request.form['first_name'], request.form['surname'])
            except Exception as e:
                return render_template("error.html", error = e, message = "Errore durante la registrazione di un nuovo utente")
            return redirect(url_for('login_bp.show_login_page'))
        else:
            return render_template("wrongcredentials.html")
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore: non sono stati compilati tutti i campi")