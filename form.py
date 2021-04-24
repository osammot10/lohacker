from connection import *

form_bp = Blueprint('form_bp',__name__)

@form_bp.route('/form', methods = ['GET', 'POST'])
def show_form_create_page():
    return render_template("form.html")