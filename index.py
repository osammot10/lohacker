from connection import *
from login import login_bp
from logout import logout_bp
from form import form_bp

app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(form_bp)

@app.route('/')
def home():
    if current_user.is_authenticated:
        return redirect(url_for('login_bp.private'))
    else:
        return render_template("index.html")
