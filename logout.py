from connection import *

logout_bp = Blueprint('logout_bp',__name__)

@logout_bp.route('/logout', methods = ['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))