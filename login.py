from connection import *

login_bp = Blueprint('login_bp',__name__)

@login_bp.route('/login', methods = ['GET', 'POST'])
def show_login_page():
    return render_template("login.html")

@login_bp.route('/login/access', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        e = request.form['email']
        if e is not "":
            rs = session.query(Utenti.password).filter(Utenti.email==e)
            if rs.first() is not None:
                real_pwd = rs.first()[0]
                if request.form['pwd'] == real_pwd:
                    user = get_user_by_email(request.form['email'])
                    login_user(user)
                    return redirect(url_for('login_bp.private'))
                else:
                    return render_template("wrongpassword.html")
            else:
                return render_template("wrongemail.html")
        else:
            return render_template("wrongemail.html")

    else:
        return redirect(url_for('login_bp.show_login_page'))

@login_bp.route('/private')
@login_required
def private():
    t = session.query(Survey).filter(Survey.maker == current_user.get_id()).filter(Survey.template == True).all()
    return render_template("profile.html", templates = t)

@login_bp.route('/register', methods = ['GET', 'POST'])
def show_register_page():
    return render_template("register.html")

@login_bp.route('/register/send', methods = ['GET', 'POST'])
def register():
    if request.form['email'] is not None and request.form['email'] is not "" and request.form['password'] is not None and request.form['password'] is not "" and request.form['first_name'] is not None and request.form['first_name'] is not "" and request.form['surname'] is not None and request.form['surname'] is not "":
        user = Utenti(email = request.form['email'], password = request.form['password'], first_name = request.form['first_name'], surname = request.form['surname'])
        session.add(user)
        session.commit()
        return redirect(url_for('login_bp.show_login_page'))
    else:
        return render_template("wrongcredentials.html")