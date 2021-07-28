from connection import *
from datetime import date

form_bp = Blueprint('form_bp',__name__)

@form_bp.route('/form', methods = ['GET', 'POST'])
@login_required
def show_form_create_page():
    if request.form['formButton'] == 'normal':
        return render_template("form.html", templates = True)
    else:
        checkboxOption = []
        templateQuestions = []
        idTemplate = request.form['formButton']
        question = session.query(Question).filter(Question.survey == idTemplate).all()
        n = len(templateQuestions)
        for entry in question:
            if entry.type == 'open':
                templateQuestions += session.query(Question.type, OpenQuestion.id, OpenQuestion.text).join(OpenQuestion).filter(OpenQuestion.id == entry.id).all()
            elif entry.type == 'checkbox':
                templateQuestions += session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(CheckboxQuestion.id == entry.id).all()
                checkboxOption += session.query(CheckboxOption).filter(CheckboxOption.id == entry.id).all()

        for r in templateQuestions:
            print(r.text)
        return render_template("form.html", templates = False, questionTemplate = templateQuestions, checkboxTemplate = checkboxOption, number = n)

@form_bp.route('/form/create', methods = ['GET', 'POST'])
@login_required
def create_survey():
    if request.method == 'POST':
        questionTitle = request.form['titleInput']
        newSurvey = Survey(maker = current_user.get_id(), name = questionTitle, date = date.today(), template = False, active = True, deleted = False)
        session.add(newSurvey)
        session.commit()
        id_check = -1
        id_openQuestion = 0
        i = 1
        j = 1
        for k,v in request.form.items():
            if k != "titleInput":
                k = k.split()[1]
                if k == 'open':
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newSurvey.id), type = "open", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newOpenQuestion = OpenQuestion(id = str(newQuestion.id), text = v)
                    session.add(newOpenQuestion)
                    id_openQuestion = newQuestion.id
                    j = j + 1
                elif k == 'checkbox':
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newSurvey.id), type = "checkbox", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newCheckboxQuestion = CheckboxQuestion(id = str(newQuestion.id), text= v)
                    session.add(newCheckboxQuestion)
                    id_check = newCheckboxQuestion.id
                    j = j + 1
                    i = 1
                elif k == 'checkboxtext':
                    newCheckboxOption = CheckboxOption(id = str(id_check), number = i, text = v)
                    session.add(newCheckboxOption)
                    i = i + 1
                elif k == "required":
                    requiredQuestion = session.query(Question).filter(Question.id == id_openQuestion).first()
                    requiredQuestion.required = True
                    session.commit()
                session.commit()         
        return redirect(url_for('form_bp.show_survey_link', id = str(newSurvey.id)))

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