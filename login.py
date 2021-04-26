from connection import *

login_bp = Blueprint('login_bp',__name__)

@login_bp.route('/login', methods = ['GET', 'POST'])
def show_login_page():
    return render_template("login.html")

@login_bp.route('/login/access', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        e = request.form['email']
        rs = session.query(Utenti.password).filter(Utenti.email==e)
        real_pwd = rs.first()[0]

        if(real_pwd is not None):
            if request.form['pwd'] == real_pwd:
                user = get_user_by_email(request.form['email'])
                login_user(user)
                return redirect(url_for('login_bp.private'))
            else:
                #return redirect(url_for('home'))
                return "Password sbagliata"
        else:
            #return redirect(url_for('home'))
            return "Password è None"
    else:
        #return redirect(url_for('show_login_page'))
        return "GET"

@login_bp.route('/private')
@login_required
def private():
    resp = make_response(render_template("profile.html"))
    return resp

@login_bp.route('/register', methods = ['GET', 'POST'])
def show_register_page():
    return render_template("register.html")

@login_bp.route('/register/send', methods = ['GET', 'POST'])
def register():
    user = Utenti(email = request.form['email'], password = request.form['password'], first_name = request.form['first_name'], surname = request.form['surname'])
    session.add(user)
    session.commit()
    return redirect(url_for('login_bp.show_login_page'))