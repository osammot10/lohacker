from connection import *
from werkzeug.utils import *

form_bp = Blueprint('form_bp',__name__)

 
@form_bp.route('/form', methods = ['GET', 'POST'])
@login_required
# Load the template to create a new form, if there are any errors they are reported
def show_form_create_page():
    if request.form.get('formButton', False) == 'normal':
        return render_template("form.html", templates = True)
    else:
        try:
            idTemplate = request.args['id']

            templateQuestions = getAllFormQuestion(idTemplate)
            if templateQuestions is None:
                return render_template("error.html", error = "", message = "Errore durante caricamento di tutte le domande del form")

            checkboxOption = getAllFormCheckboxOptions(idTemplate)
            if checkboxOption is None:
                return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande checkbox del form")

            radioOption = getAllFormRadioOptions(idTemplate)
            if radioOption is None:
                return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande radio button del form")

            questionForm = getFormQuestions(idTemplate)
            if questionForm is None:
                return render_template("error.html", error = "", message = "Errore durante il caricamento delle domande")
            else:
                questionNumber = len(questionForm)
                
            return render_template("form.html", templates = False, questionTemplate = templateQuestions, checkboxTemplate = checkboxOption, radioTemplate = radioOption, number = questionNumber)
        except Exception as e:
            return render_template("error.html", error = e, message = "")

@form_bp.route('/form/create', methods = ['GET', 'POST'])
@login_required
# Create a new form to be inserted in the DB
def create_form():
    if request.method == 'POST':
        try:
            formTitle = request.form['titleInput']
            if request.form.get('anonymous', False):
                anonymous = True
            else:
                anonymous = False
        except Exception as e:
            return render_template("error.html", error = e, message="")

        newForm = formCreation(formTitle, anonymous)
        if newForm is None:
            return render_template("error.html", error = "", message = "Errore durante la creazione del form")

        try:
            questionsInsertion(newForm, request.form.items())
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore nella creazione delle domande")
            
        res = session.query(func.form.validform(newForm.id)).first()[0]
        if res == False:
            return render_template("error.html", e = "", message = "Errore creazione form: un form deve contenere almeno una domanda")
        else:
            return redirect(url_for('form_bp.show_form_link', id = str(newForm.id)))


@form_bp.route('/formlink')
@login_required
# Get the form id and shows it
def show_form_link():
    try:
        id = request.args['id']
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore ottenimento ID form")
    url = "localhost:5000/getform/"+id
    return render_template("link.html", link = url, idForm=id)

@form_bp.route('/myform', methods=['GET', 'POST'])
@login_required
# Load all the form into the DB and shows them
def show_my_form():
    try:
        myForm = getAllMyForm()
        if myForm is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento dei form")
        else:
            return render_template("myform.html", forms = myForm)
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore lettura form")        