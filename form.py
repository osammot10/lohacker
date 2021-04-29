from connection import *
from datetime import date

form_bp = Blueprint('form_bp',__name__)

@form_bp.route('/form', methods = ['GET', 'POST'])
@login_required
def show_form_create_page():
    return render_template("form.html")

@form_bp.route('/form/create', methods = ['GET', 'POST'])
@login_required
def create_survey():
    if request.method == 'POST':
        title = request.form['titleInput']
        s = Survey(maker = current_user.get_id(), name = title, date = date.today(), template = False)
        session.add(s)
        session.commit()
        id_check = -1
        i = 1
        j = 1
        for k,v in request.form.items():
            if k != "titleInput":
                k = k.split()[1]
                if k == 'open':
                    q = Question(survey = str(s.id), text = v, type = "open")
                    session.add(q)
                    session.commit()
                    j = j + 1
                elif k == 'checkbox':
                    q = Question(survey = str(s.id), text= v, type = "checkbox")
                    session.add(q)
                    session.commit()
                    id_check = q.id
                    j = j + 1
                elif k == 'checkboxtext':
                    q = CheckboxQuestion(id = str(id_check), number = i, text = v)
                    session.add(q)
                    session.commit()
                    i = i + 1           
        return redirect(url_for('form_bp.show_survey_link', id = str(s.id)))

@form_bp.route('/surveylink')
@login_required
def show_survey_link():
    id = request.args['id']
    url = "localhost:5000/getsurvey/"+id
    return render_template("link.html", link = url, idSurvey=id)

        