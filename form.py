from sqlalchemy.log import Identified
from connection import *
from datetime import date

import os
from werkzeug.utils import *

form_bp = Blueprint('form_bp',__name__)

@form_bp.route('/form', methods = ['GET', 'POST'])
@login_required
def show_form_create_page():
    if request.form.get('formButton', False) == 'normal':
        return render_template("form.html", templates = True)
    else:
        checkboxOption = []
        radioOption = []
        templateQuestions = []
        idTemplate = request.args['id']
        question = session.query(Question).filter(Question.survey == idTemplate).all()
        n = len(question)
        for entry in question:
            if entry.type == 'open':
                templateQuestions += session.query(Question.type, OpenQuestion.id, OpenQuestion.text).join(OpenQuestion).filter(OpenQuestion.id == entry.id).all()
            elif entry.type == 'checkbox':
                templateQuestions += session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(CheckboxQuestion.id == entry.id).all()
                checkboxOption += session.query(CheckboxOption).filter(CheckboxOption.id == entry.id).all()
            elif entry.type == 'radio':
                templateQuestions += session.query(Question.type, RadioQuestion.id, RadioQuestion.text).join(RadioQuestion).filter(RadioQuestion.id == entry.id).all()
                radioOption += session.query(RadioOption).filter(RadioOption.id == entry.id).all()
            elif entry.type == 'file':
                templateQuestions += session.query(Question.type, FileQuestion.id, FileQuestion.text).join(FileQuestion).filter(FileQuestion.id == entry.id).all()
        return render_template("form.html", templates = False, questionTemplate = templateQuestions, checkboxTemplate = checkboxOption, radioTemplate = radioOption, number = n)

@form_bp.route('/form/create', methods = ['GET', 'POST'])
@login_required
def create_survey():
    if request.method == 'POST':
        surveyTitle = request.form['titleInput']
        newSurvey = Survey(maker = current_user.get_id(), name = surveyTitle, date = date.today(), template = False, active = True, deleted = False)
        session.add(newSurvey)
        session.commit()
        id_check = -1
        id_radio = -1
        idRequiredQuestion = 0
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
                    idRequiredQuestion = newQuestion.id
                    j = j + 1
                elif k == 'checkbox':
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newSurvey.id), type = "checkbox", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newCheckboxQuestion = CheckboxQuestion(id = str(newQuestion.id), text= v)
                    session.add(newCheckboxQuestion)
                    id_check = newCheckboxQuestion.id
                    idRequiredQuestion = newQuestion.id
                    j = j + 1
                    i = 1
                elif k == 'checkboxtext':
                    newCheckboxOption = CheckboxOption(id = str(id_check), number = i, text = v)
                    session.add(newCheckboxOption)
                    i = i + 1
                elif k == 'radio' :
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newSurvey.id), type = "radio", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newRadioQuestion = RadioQuestion(id = str(newQuestion.id), text= v)
                    session.add(newRadioQuestion)
                    id_radio = newRadioQuestion.id
                    idRequiredQuestion = newQuestion.id
                    j = j + 1
                    i = 1
                elif k == 'radiobtntext' :
                    newRadioOption = RadioOption(id = str(id_radio), number = i, text = v)
                    session.add(newRadioOption)
                    i = i + 1
                elif k == 'fileText':
                    newQuestion = Question(survey = str(newSurvey.id), type = "file", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newFileQuestion = FileQuestion(id = str(newQuestion.id), text = v)
                    session.add(newFileQuestion)
                    idRequiredQuestion = newFileQuestion.id
                    j = j + 1
                elif k == "required":
                    requiredQuestion = session.query(Question).filter(Question.id ==    idRequiredQuestion).first()
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