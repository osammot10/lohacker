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
        try:
            templateTitle = request.form['titleInput']
        except Exception as e:
            return render_template("error.html", error = e, message="")
        
        newtemplate = createNewTemplate(templateTitle)

        #id_check = -1
        #id_radio = -1
        #idRequiredQuestion = 0
        #i = 1

        #try:
        #    for k,v in request.form.items():
        #        if k != "titleInput":
        #            k = k.split()[1]
        #            if k == 'open':
        #                newQuestion = Question(survey = str(newTemplate.id), type = "open", required = False)
        #                session.add(newQuestion)
        #                session.commit()
        #                newOpenQuestion = OpenQuestion(id = str(newQuestion.id), text = v)
        #                session.add(newOpenQuestion)
        #                idRequiredQuestion = newQuestion.id
        #            elif k == 'checkbox':
        #                newQuestion = Question(survey = str(newTemplate.id), type = "checkbox", required = False)
        #                session.add(newQuestion)
        #                session.commit()
        #                newCheckboxQuestion = CheckboxQuestion(id = str(newQuestion.id), text= v)
        #                session.add(newCheckboxQuestion)
        #                id_check = newCheckboxQuestion.id
        #                idRequiredQuestion = newQuestion.id
        #                i = 1
        #            elif k == 'checkboxtext':
        #                newCheckboxOption = CheckboxOption(id = str(id_check), number = i, text = v)
        #                session.add(newCheckboxOption)
        #                i = i + 1
        #            elif k == "radio":
        #                newQuestion = Question(survey = str(newTemplate.id), type = "radio", required = False)
        #                session.add(newQuestion)
        #                session.commit()
        #                newRadioQuestion = RadioQuestion(id = str(newQuestion.id), text= v)
        #                session.add(newRadioQuestion)
        #                id_radio = newRadioQuestion.id
        #                idRequiredQuestion = newQuestion.id
        #                i = 1
        #            elif k == 'radiobtntext' :
        #                newRadioOption = RadioOption(id = str(id_radio), number = i, text = v)
        #                session.add(newRadioOption)
        #                i = i + 1
        #            elif k == 'fileText':
        #                newQuestion = Question(survey = str(newTemplate.id), type = "file", required = False)
        #                session.add(newQuestion)
        #                session.commit()
        #                newFileQuestion = FileQuestion(id = str(newQuestion.id), text = v)
        #                session.add(newFileQuestion)
        #                idRequiredQuestion = newFileQuestion.id
        #            elif k == "required":
        #                requiredQuestion = session.query(Question).filter(Question.id == idRequiredQuestion).first()
        #                requiredQuestion.required = True
        #                session.commit()
        #            session.commit()      
        #    return render_template('newTemplateConfirmation.html')
        #except Exception as e:
        #    return render_template("error.html", error = e, message = "Errore nella creazione delle domande")
        questionsInsertion(newtemplate, request.form.items())
        return render_template('newTemplateConfirmation.html')

@templates_bp.route('/useTemplate', methods = ['GET', 'POST'])
@login_required
def actionTemplate():
    try:
        buttonClicked = request.form['action']
    except Exception as e:
        return render_template("error.html", error = e, message = "")

    action = buttonClicked.split()[0]
    templateId = buttonClicked.split()[1]

    if action == 'import':
        return redirect(url_for('form_bp.show_form_create_page', id = templateId))
    elif action == 'visualize':
        question = getAllFormQuestion(templateId)
        checkboxOption = getAllFormRadioOptions(templateId)
        radioOption = getAllFormRadioOptions
        templateToShow = getTemplate(templateId)
        #templateQuestion = getForm
        n = len(getFormQuestions(templateId))

        #for entry in templateQuestion:
        #    if entry.type == 'open':
        #        question += session.query(Question.type, Question.required, OpenQuestion.id, OpenQuestion.text).join(OpenQuestion).filter(OpenQuestion.id == entry.id).all()
        #    elif entry.type == 'checkbox':
        #        question += session.query(Question.type, Question.required, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(CheckboxQuestion.id == entry.id).all()
        #        checkboxOption += session.query(CheckboxOption).filter(CheckboxOption.id == entry.id).all()
        #    elif entry.type == 'radio':
        #        question += session.query(Question.type, Question.required, RadioQuestion.id, RadioQuestion.text).join(RadioQuestion).filter(RadioQuestion.id == entry.id).all()
        #        radioOption += session.query(RadioOption).filter(RadioOption.id == entry.id).all()
        #    elif entry.type == 'file':
        #        question += session.query(Question.type, Question.required, FileQuestion.id, FileQuestion.text).join(FileQuestion).filter(FileQuestion.id == entry.id).all()
        return render_template('showTemplate.html', template = templateToShow, question = question, checkboxOption = checkboxOption, radioOption = radioOption, number = n)
    elif action == 'delete':
        #templateToDelete = session.query(Survey).filter(Survey.id == templateId).first()
        #templateToDelete.deleted = True
        #session.commit()
        deleteForm(getTemplate(templateId))
        return redirect(url_for('login_bp.private'))

@templates_bp.route('/saveTemplate/<id>', methods = ['GET', 'POST'])
@login_required
def saveTemplate(id):
    if request.method == 'POST':
        deleteForm(getTemplate(id))
        #templateToDelete = session.query(Survey).filter(Survey.id == id).first()
        #templateToDelete.deleted = True
        #session.commit()
        try:
            templateTitle = request.form['titleInput']
        except Exception as e:
            return render_template("error.html", error = e, message="")

        newTemplate = templateCreation(templateTitle)
        #newTemplate = Survey(maker = current_user.get_id(), name = templateTitle, date = date.today(), template = True, active = True, deleted = False)
        #session.add(newTemplate)
        #session.commit()

        questionsInsertion(newTemplate, request.form.items())

        #id_check = -1
        #id_radio = -1
        #id_openQuestion = 0
        #i = 1
        #j = 1
        #for k,v in request.form.items():
        #    if k != "titleInput":
        #        k = k.split()[1]
        #        if k == 'open':
        #            newQuestion = Question(survey = str(newTemplate.id), type = "open", required = False)
        #            session.add(newQuestion)
        #            session.commit()
        #            newOpenQuestion = OpenQuestion(id = str(newQuestion.id), text = v)
        #            session.add(newOpenQuestion)
        #            id_openQuestion = newQuestion.id
        #            j = j + 1
        #        elif k == 'checkbox':
        #            newQuestion = Question(survey = str(newTemplate.id), type = "checkbox", required = False)
        #            session.add(newQuestion)
        #            session.commit()
        #            newCheckboxQuestion = CheckboxQuestion(id = str(newQuestion.id), text= v)
        #            session.add(newCheckboxQuestion)
        #            id_check = newCheckboxQuestion.id
        #            id_openQuestion = newQuestion.id
        #            j = j + 1
        #            i = 1
        #        elif k == 'checkboxtext':
        #            newCheckboxOption = CheckboxOption(id = str(id_check), number = i, text = v)
        #            session.add(newCheckboxOption)
        #            i = i + 1
        #        elif k == "radio":
        #            newQuestion = Question(survey = str(newTemplate.id), type = "radio", required = False)
        #            session.add(newQuestion)
        #            session.commit()
        #            newRadioQuestion = RadioQuestion(id = str(newQuestion.id), text= v)
        #            session.add(newRadioQuestion)
        #            id_radio = newRadioQuestion.id
        #            id_openQuestion = newQuestion.id
        #            j = j + 1
        #             i = 1
        #         elif k == 'radiobtntext' :
        #            newRadioOption = RadioOption(id = str(id_radio), number = i, text = v)
        #            session.add(newRadioOption)
        #            i = i + 1
        #        elif k == 'fileText':
        #            newQuestion = Question(survey = str(newTemplate.id), type = "file", required = False)
        #            session.add(newQuestion)
        #            session.commit()
        #            newFileQuestion = FileQuestion(id = str(newQuestion.id), text = v)
        #            session.add(newFileQuestion)
        #            id_openQuestion = newQuestion.id
        #            j = j + 1
        #        elif k == "required":
        #            requiredQuestion = session.query(Question).filter(Question.id == id_openQuestion).first()
        #            requiredQuestion.required = True
        #            session.commit()
        #        session.commit()         
        return render_template('templateUpdatedConfirmation.html')