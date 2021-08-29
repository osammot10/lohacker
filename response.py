from connection import *
from datetime import date

response_bp = Blueprint('response_bp',__name__)

@response_bp.route('/getform/<id>')
@login_required
# Show the question of a specific form
def show_form(id):
    form = getFormByID(id)
    if form is None:
        return render_template("error.html", error = "", message = "Errore caricamento form")
    existingAnswer = getUserAnswer(id)
    if existingAnswer is None:
        return render_template("error.html", error = "", message = "Errore durante il caricamento delle risposte esistenti dell'utente al form")
    if not existingAnswer:
        try:
            if form is not None:
                try:
                    if form.active == True:

                        questionSet = getAllFormQuestion(id)
                        if questionSet is None:
                            return render_template("error.html", error = "", message = "Errore durante caricamento di tutte le domande del form")

                        checkboxOptionList = getAllFormCheckboxOptions(id)
                        if checkboxOptionList is None:
                            return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande checkbox del form")
                        radioOptionList = getAllFormRadioOptions(id)
                        if radioOptionList is None:
                            return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande radio button del form")
                        return render_template("response.html", form = form, question = questionSet, checkbox = checkboxOptionList, radio = radioOptionList)
                except Exception as e:
                        return render_template("error.html", error = e, message = "Errore, il form non è attivo")
                else:
                    return render_template("surveydisabled.html")
            else:
                return render_template("surveynotexisting.html")
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore, il questionario è None")
    else:
        return render_template("alreadyanswered.html")


@response_bp.route('/getresponse/<id>', methods=['GET', 'POST'])
@login_required
# Load all the answer to a form into the DB
def send_response(id):
    try:
        newAnswer = createNewAnswer(id)
        if newAnswer is None:
            return render_template("error.html", error = "", message = "Errore creazione nuova risposta")
        for k,v in request.form.items():
            idQuestion = k.split()[0]
            type = k.split()[1]
            if type == "open":
                try:
                    createNewOpenAnswer(idQuestion, v, newAnswer.id)
                except Exception as e:
                    return render_template("error.html", error = e, message = "Errore inserimento risposta aperta")
            elif type == "checkbox":
                optionSelected = k.split()[2]
                try:
                    createNewCheckboxAnswer(idQuestion, optionSelected, newAnswer.id)
                except Exception as e:
                    return render_template("error.html", error = e, message = "Errore inserimento risposta checkbox")
            elif type == "radio":
                try:
                    createNewRadioAnswer(idQuestion, v, newAnswer.id)
                except Exception as e:
                    return render_template("error.html", error = e, message = "Errore inserimento risposta radio button")
            elif type == "file":
                try:
                    createNewFileAnswer(v, idQuestion, newAnswer.id)
                except Exception as e:
                    return render_template("error.html", error = e, message = "Errore durante il salvataggio del file")
    except Exception as e:
        return render_template("error.html", error = e, message = "Error: form disabilitato o elimianto")
            
    test = session.query(func.form.checkRequiredQuestion(id)).first()[0]
    if(test):
        return render_template("confirmation.html")
    else:
        return render_template("error.html", error = "", message = "Errore: non tutte le domande obbligatorie sono state risposte")


@response_bp.route('/answer', methods=['GET', 'POST']) 
@login_required     
# Redirect the user to the answer page in which you insert the link or the id of a form
def show_answer_page():
    return render_template("answer.html")

@response_bp.route('/redirect', methods=['GET', 'POST'])
@login_required
# Redirect the user to the page to answer the questions on the form
def redirect_to_answer_page():
    try:
        if request.form.get('link', True):
            return redirect(url_for('response_bp.show_form', id = request.form['id']))
        else:
            idS = request.form['link'].split("/")[2]
            return redirect(url_for('response_bp.show_form', id = idS))
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore, non è possibile ottenere il link o l'id")