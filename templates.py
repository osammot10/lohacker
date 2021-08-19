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
        if newtemplate is None:
            return render_template("error.html", error = "", message = "Errore creazione template")
        try:
            questionsInsertion(newtemplate, request.form.items())
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore nella creazione delle domande")
        res = session.query(func.form.validform(newtemplate.id)).first()[0]
        if res == False:
            return render_template("error.html", e = "", message = "Errore creazione template: un template deve contenere almeno una domanda")
        else:
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
        if question is None:
            return render_template("error.html", error = "", message = "Errore durante caricamento di tutte le domande del form")

        checkboxOption = getAllFormCheckboxOptions(templateId)
        if checkboxOption is None:
            return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande checkbox del form")

        radioOption = getAllFormRadioOptions(templateId)
        if radioOption is None:
            return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande radio button del form")
            
        templateToShow = getTemplate(templateId)
        if templateToShow is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento del template")
        
        questionForm = getFormQuestions(templateId)
        if questionForm is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento delle domande")
        else:
            questionNumber = len(questionForm)

        return render_template('showTemplate.html', template = templateToShow, question = question, checkboxOption = checkboxOption, radioOption = radioOption, number = questionNumber)
    elif action == 'delete':
        myTemplate = getTemplate(templateId)
        if myTemplate is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento del template")
        try:
            deleteForm(myTemplate)
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore nella cancellazione del form")
        return redirect(url_for('login_bp.private'))

@templates_bp.route('/saveTemplate/<id>', methods = ['GET', 'POST'])
@login_required
def saveTemplate(id):
    if request.method == 'POST':
        try:
            templateTitle = request.form['titleInput']
        except Exception as e:
            return render_template("error.html", error = e, message="")

        newTemplate = createNewTemplate(templateTitle)
        if newTemplate is None:
            return render_template("error.html", error = "", message = "Errore creazione template")
        try:
            questionsInsertion(newTemplate, request.form.items())
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore nella creazione delle domande")
        
        template = getTemplate(id)
        if template is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento del template")
        else:
            try:
                deleteForm(template)
            except Exception as e:
                return render_template("error.html", error = e, message = "Errore nela modifica del template")

        res = session.query(func.form.validform(newTemplate.id)).first()[0]
        if res == False:
            return render_template("error.html", e = "", message = "Errore modifica template: un template deve contenere almeno una domanda")
        else:
            return render_template('templateUpdatedConfirmation.html')