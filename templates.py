from connection import *
from datetime import date
import requests

templates_bp = Blueprint('templates_bp',__name__)

@templates_bp.route('/template', methods = ['GET', 'POST'])
@login_required
def templateCreation():
    return render_template("template.html")

@templates_bp.route('/template/create', methods = ['GET', 'POST'])
@login_required
def createTemplate():
    if request.method == 'POST':
        templateTitle = request.form['titleInput']
        newTemplate = Survey(maker = current_user.get_id(), name = templateTitle, date = date.today(), template = True, active = True, deleted = False)
        session.add(newTemplate)
        session.commit()
        id_check = -1
        id_radio = -1
        id_openQuestion = 0
        i = 1
        j = 1
        for k,v in request.form.items():
            if k != "titleInput":
                k = k.split()[1]
                if k == 'open':
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newTemplate.id), type = "open", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newOpenQuestion = OpenQuestion(id = str(newQuestion.id), text = v)
                    session.add(newOpenQuestion)
                    id_openQuestion = newQuestion.id
                    j = j + 1
                elif k == 'checkbox':
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newTemplate.id), type = "checkbox", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newCheckboxQuestion = CheckboxQuestion(id = str(newQuestion.id), text= v)
                    session.add(newCheckboxQuestion)
                    id_check = newCheckboxQuestion.id
                    id_openQuestion = newQuestion.id
                    j = j + 1
                    i = 1
                elif k == 'checkboxtext':
                    newCheckboxOption = CheckboxOption(id = str(id_check), number = i, text = v)
                    session.add(newCheckboxOption)
                    i = i + 1
                elif k == "radio":
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newTemplate.id), type = "radio", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newRadioQuestion = RadioQuestion(id = str(newQuestion.id), text= v)
                    session.add(newRadioQuestion)
                    id_radio = newRadioQuestion.id
                    id_openQuestion = newQuestion.id
                    j = j + 1
                    i = 1
                elif k == 'radiobtntext' :
                    newRadioOption = RadioOption(id = str(id_radio), number = i, text = v)
                    session.add(newRadioOption)
                    i = i + 1
                elif k == "required":
                    requiredQuestion = session.query(Question).filter(Question.id == id_openQuestion).first()
                    requiredQuestion.required = True
                    session.commit()
                session.commit()         
        return render_template('newTemplateConfirmation.html')

@templates_bp.route('/useTemplate', methods = ['GET', 'POST'])
@login_required
def actionTemplate():
    buttonClicked = request.form['action']
    action = buttonClicked.split()[0]
    templateId = buttonClicked.split()[1]

    if action == 'import':   
        return redirect(url_for('form_bp.show_form_create_page', id = templateId))
    elif action == 'visualize':
        question = []
        checkboxOption = []
        radioOption = []
        templateToShow = session.query(Survey).filter(Survey.id == templateId).first()
        templateQuestion = session.query(Question).filter(Question.survey == templateToShow.id).order_by(Question.id).all()
        for entry in templateQuestion:
            if entry.type == 'open':
                question += session.query(Question.type, Question.required, OpenQuestion.id, OpenQuestion.text).join(OpenQuestion).filter(OpenQuestion.id == entry.id).all()
            elif entry.type == 'checkbox':
                question += session.query(Question.type, Question.required, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(CheckboxQuestion.id == entry.id).all()
                checkboxOption += session.query(CheckboxOption).filter(CheckboxOption.id == entry.id).all()
            elif entry.type == 'radio':
                question += session.query(Question.type, Question.required, RadioQuestion.id, RadioQuestion.text).join(RadioQuestion).filter(RadioQuestion.id == entry.id).all()
                radioOption += session.query(RadioOption).filter(RadioOption.id == entry.id).all()
        return render_template('showTemplate.html', template = templateToShow, question = question, checkboxOption = checkboxOption, radioOption = radioOption)
    elif action == 'delete':
        templateToDelete = session.query(Survey).filter(Survey.id == templateId).first()
        templateToDelete.deleted = True
        session.commit()
        return redirect(url_for('login_bp.private'))