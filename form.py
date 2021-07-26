from connection import *
from datetime import date

form_bp = Blueprint('form_bp',__name__)

@form_bp.route('/form', methods = ['GET', 'POST'])
@login_required
def show_form_create_page():
    if request.form['formButton'] == 'normal':
        return render_template("form.html", templates = True)
    else:
        checkbox = []
        idTemplate = request.form['formButton']
        q = session.query(Question).filter(Question.survey == idTemplate).all()
        n = len(q)
        for r in q:
            if r.type == 'checkbox':
                checkbox += session.query(CheckboxQuestion).filter(CheckboxQuestion.id == r.id).all()
        return render_template("form.html",templates = False ,questionTemplate = q, checkboxTemplate = checkbox, number = n)

@form_bp.route('/form/create', methods = ['GET', 'POST'])
@login_required
def create_survey():
    if request.method == 'POST':
        title = request.form['titleInput']
        s = Survey(maker = current_user.get_id(), name = title, date = date.today(), template = False, active = True, deleted = False)
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
                    j = j + 1
                elif k == 'checkbox':
                    q = Question(survey = str(s.id), text= v, type = "checkbox")
                    session.add(q)
                    id_check = q.id
                    j = j + 1
                    i = 1
                elif k == 'checkboxtext':
                    q = CheckboxQuestion(id = str(id_check), number = i, text = v)
                    session.add(q)
                    i = i + 1
                session.commit()         
        return redirect(url_for('form_bp.show_survey_link', id = str(s.id)))

@form_bp.route('/surveylink')
@login_required
def show_survey_link():
    id = request.args['id']
    url = "localhost:5000/getsurvey/"+id
    return render_template("link.html", link = url, idSurvey=id)

@form_bp.route('/myform', methods=['GET', 'POST'])
@login_required
def show_my_form():
    s = session.query(Survey).filter(Survey.maker == current_user.get_id()).filter(Survey.template == False).filter(Survey.deleted == False).all()
    return render_template("myform.html", surveys = s)        