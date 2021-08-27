from connection import *
import csv

myform_bp = Blueprint('myform_bp',__name__)

@myform_bp.route('/myform/<id>', methods = ['GET', 'POST'])
@login_required
def show_my_form(id):

    checkbox = []
    radio = []
    openAnswer = []
    checkboxAnswer = []
    radioAnswer = []
    fileAnswer = []
    questionSet = []
    answer = []
    maker = []
    singleAnswerRadio = []
    singleAnswerCheck = []
    
    selectedForm = getFormByID(id)
    if selectedForm is None:
        return render_template("error.html", error = " ", message = "Errore caricamento form")

    try:
        questionSet = getAllFormQuestion(id)
        if questionSet is None:
            return render_template("error.html", error = "", message = "Errore durante caricamento di tutte le domande del form")
        openAnswer = getAllOpenAnswers(id)
        if openAnswer is None:
            return render_template("error.html", error = "", message = "Errore caricamento risposte domande aperte del form")
        checkbox = getAllFormCheckboxOptions(id)
        if checkbox is None:
            return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande checkbox del form")
        checkboxAnswer = getAllCheckboxAnswers(id)
        if checkboxAnswer is None:
            return render_template("error.html", error = "", message = "Errore durante caricamento di tutte le risposte a domande checkbox del form")
        singleAnswerCheck = getAllSingleCheckboxAnswer(id)
        if singleAnswerCheck is None:
            return render_template("error.html", error = "", message = "Errore caricamento risposte domande checkbox")
        radio = getAllFormRadioOptions(id)
        if radio is None:
            return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande radio button del form")
        radioAnswer = getAllRadioAnswers(id)
        if radioAnswer is None:
            return render_template("error.html", error = "", message = "Errore durante caricamento di tutte le risposte a domande radio button del form")
        singleAnswerRadio = getAllSingleRadioAnswer(id)
        if singleAnswerRadio is None:
            return render_template("error.html", error = "", message = "Errore caricamento risposte domande radio button")
        fileAnswer = getAllFileAnswers(id)
        if fileAnswer is None:
            return render_template("error.html", error = "", message = "Errore caricamento file risposta")

    except Exception as e:
        return render_template("error.html", error = e, message = "Errore lettura testo domande, opzioni checkbox e radio button e testo risposte")
                
    answer = getAnswers(id)
    if answer is None:
        return render_template("error.html", error = "", message = "Errore caricamento risposte al form")
    
    maker = getMakers(id)
    if maker is None:
        return render_template("error.html", error = "", message = "Errore durante il caricamento degli utenti che hanno risposto al form")
        
    url = "localhost:5000/getform/"+id
    return render_template("mysurvey.html", form = selectedForm, questions = questionSet, checkboxs = checkbox, openAnswers = openAnswer, checkboxoption = checkboxAnswer, radios = radio, radiooption = radioAnswer,answers=answer,makers=maker,checkMakerAnswer=singleAnswerCheck,radioMakerAnswer=singleAnswerRadio, file = fileAnswer, link = url, idForm = id)

@myform_bp.route('/disable', methods = ['GET', 'POST'])
@login_required
def disable_form():
    try:
        button = request.form['action']
    except Exception as e:
        return render_template("error.html", error = e, message = "")
        
    action = button.split()[0]
    id = button.split()[1]
    
    if action == 'active':
        try:
            disableForm(id)
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore nella disattivazione del form")
    elif action == 'disabled':
        try:
            activeForm(id)
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore nell'attivazione del form")
    else:
        try:
            deleteForm(getFormByID(id))
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore nella cancellazione del form")
    
    return redirect(url_for('form_bp.show_my_form'))

@myform_bp.route('/download/<path:filename>', methods = ['GET', 'POST'])
@login_required
def download(filename):
    try:
        filename = app.config['UPLOAD_FOLDER']+"/"+filename
        return send_file(filename, as_attachment = True)
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante il download del file")

@myform_bp.route('/downloadCSV/<formID>', methods = ['GET', 'POST'])
@login_required
def downloadCSV(formID):
    form = getFormByID(formID)
    if form is None:
        return render_template("error.html", error = "", message = "Errore caricamento form")

    csvQuestion = []
    answerSet = []
    questionForm = getFormQuestions(formID)
    if questionForm is None:
        return render_template("error.html", error = "", message = "Errore durante il caricamento delle domande")
    else:
        for question in questionForm:
            if question.type == 'open':
                openQuestionText = session.query(Question.type, OpenQuestion.id, OpenQuestion.text).join(OpenQuestion).filter(OpenQuestion.id == question.id).first()
                csvQuestion.append(openQuestionText.text)
            elif question.type == 'checkbox':
                checkboxQuestionText = session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(CheckboxQuestion.id == question.id).first()
                csvQuestion.append(checkboxQuestionText.text)
            elif question.type == 'radio':
                radioQuestionText = session.query(Question.type, RadioQuestion.id, RadioQuestion.text).join(RadioQuestion).filter(RadioQuestion.id == question.id).first()
                csvQuestion.append(radioQuestionText.text)
            elif question.type == 'file':
                fileQuestionText = session.query(Question.type, FileQuestion.id, FileQuestion.text).join(FileQuestion).filter(FileQuestion.id == question.id).first()
                csvQuestion.append(fileQuestionText.text)

        filename = app.config['CSV_FOLDER'] + '/form' + str(form.id) + '.csv'
        file = open(filename, 'w', newline = '')
        writer = csv.writer(file)
        writer.writerow(csvQuestion)
        
        allAnswers = getAnswers(formID)
        if allAnswers is None:
            return render_template("error.html", error = "", message = "Errore caricamento risposte al form")

        for answer in allAnswers:
            answerSet = []
            questionForm = getFormQuestions(formID)
            if questionForm is None:
                return render_template("error.html", error = "", message = "Errore durante il caricamento delle domande")
            else:
                for question in questionForm:
                    if question.type == "open":
                        openAnswer = session.query(OpenAnswer.text).filter(OpenAnswer.id == answer.id).filter(OpenAnswer.question == question.id).first()
                        answerSet.append(openAnswer.text)
                    elif question.type == "checkbox":
                        checkboxAnswer = session.query(CheckboxOption.text, CheckboxAnswer.number).filter(CheckboxAnswer.id == answer.id).filter(CheckboxAnswer.question == question.id).filter(CheckboxOption.id == CheckboxAnswer.question).filter(CheckboxOption.number == CheckboxAnswer.number).all()
                        option = " | "
                        for r in checkboxAnswer:
                            option = option + r.text + " | "
                        answerSet.append(option)
                    elif question.type == "radio":
                        radioAnswer = session.query(RadioOption.text, RadioAnswer.number).filter(RadioAnswer.id == answer.id).filter(RadioAnswer.question == question.id).filter(RadioOption.id == RadioAnswer.question).filter(RadioOption.number == RadioAnswer.number).first()
                        if not radioAnswer:
                            answerSet.append("|")
                        else:
                            answerSet.append(radioAnswer.text)
                    elif question.type == "file":
                        answerSet.append(" / ")
                writer.writerow(answerSet)
            file.close()

            return send_file(filename, as_attachment = True)
