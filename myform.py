from connection import *
import csv

myform_bp = Blueprint('myform_bp',__name__)

@myform_bp.route('/myform/<id>', methods = ['GET', 'POST'])
@login_required
def show_my_survey(id):

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
    try:
        selectedSurvey = getFormByID(id)
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore lettura form")
    #try:
    #    question = getFormQuestions(id)
    #except Exception as e:
    #    return render_template("error.html", error = e, message = "Errore lettura domande form")

    try:
        questionSet = getAllFormQuestion(id)
        
        openAnswer = getAllOpenAnswers(id)

        checkbox = getAllFormCheckboxOptions(id)
        checkboxAnswer = getAllCheckboxAnswers(id)
        singleAnswerCheck = getAllSingleCheckboxAnswer(id)

        radio = getAllFormRadioOptions(id)
        radioAnswer = getAllRadioAnswers(id)
        singleAnswerRadio = getAllSingleRadioAnswer(id)

        fileAnswer = getAllFileAnswers(id)
        #for entry in question: #entry = riga 
        #    if entry.type == 'open':
        #        questionSet += getOpenQuestion(entry.id)
                
                #newOpenAnswer = session.query(OpenAnswer.id, OpenAnswer.question, OpenAnswer.text, Answer.maker, Answer.date).join(Answer).filter(OpenAnswer.question == entry.id).all()
                
        #        openAnswer += getOpenAnswer(entry.id)
        #    elif entry.type == 'checkbox':
        #        questionSet += getCheckboxQuestion(entry.id)

                #checkboxQuestionText = session.query(CheckboxQuestion.id, CheckboxQuestion.text, CheckboxOption.number.label('optionNumber'), CheckboxOption.text.label('option',)).join(CheckboxOption).filter(CheckboxQuestion.id == entry.id).all()
        #        checkbox += getCheckboxOptions(entry.id)

                #checkboxOption = session.query(CheckboxOption.id, CheckboxOption.number, func.count(CheckboxAnswer.number).label('counter')).outerjoin(CheckboxAnswer, (CheckboxAnswer.question == CheckboxOption.id) & (CheckboxAnswer.number == CheckboxOption.number)).filter(CheckboxOption.id == entry.id).group_by(CheckboxOption.id, CheckboxOption.number).all()
        #        checkboxAnswer += getCheckboxAnswers(entry.id)

                #singleAnswerCheck += session.query(Answer.maker,Answer.date,CheckboxAnswer.number,CheckboxAnswer.question).join(Answer).filter(CheckboxAnswer.question == entry.id).all()
        #        singleAnswerCheck += getSingleCheckboxAnswer(entry.id)
        #    elif entry.type == "radio":
        #        questionSet += getRadioQuestion(entry.id)

                #radioQuestionText = session.query(RadioQuestion.id, RadioQuestion.text, RadioOption.number.label('optionNumber'), RadioOption.text.label('option')).join(RadioOption).filter(RadioQuestion.id == entry.id).all()
        #        radio += getRadioOptions(entry.id)

                #radioOption = session.query(RadioOption.id, RadioOption.number, func.count(RadioAnswer.number).label('counter')).outerjoin(RadioAnswer, (RadioAnswer.question == RadioOption.id) & (RadioAnswer.number == RadioOption.number)).filter(RadioOption.id == entry.id).group_by(RadioOption.id, RadioOption.number).all()
        #        radioAnswer += getRadioAnswers(entry.id)

        #        singleAnswerRadio += getSingleRadioAnswer(entry.id)
        #    elif entry.type == "file":
        #        questionSet += getFileQuestion(entry.id)

                #newFileAnswer = session.query(FileAnswer.id, FileAnswer.question, FileAnswer.path, Answer.maker).join(Answer).filter(FileAnswer.question == entry.id).all()
        #        fileAnswer += getFileAnswer(entry.id)
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore lettura testo domande, opzioni checkbox e radio button e testo risposte")
                
    try:
        answer = getAnswers(id)
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore lettura risposte")
    try:
        maker = getMakers(id)
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore lettura utenti che hanno risposto al form")
    return render_template("mysurvey.html", survey = selectedSurvey, questions = questionSet, checkboxs = checkbox, openAnswers = openAnswer, checkboxoption = checkboxAnswer, radios = radio, radiooption = radioAnswer,answers=answer,makers=maker,checkMakerAnswer=singleAnswerCheck,radioMakerAnswer=singleAnswerRadio, file = fileAnswer)

@myform_bp.route('/disable', methods = ['GET', 'POST'])
@login_required
def disable_survey():
    try:
        button = request.form['action']
    except Exception as e:
        render_template("error.html", error = e, message = "")
        
    action = button.split()[0]
    id = button.split()[1]
    
    if action == 'active':
        disableForm(id)
    elif action == 'disabled':
        activeForm(id)
    else:
        deleteForm(getFormByID(id))
    
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
    #questions = getFormQuestions(formID)
    #answers = getAnswers

    csvQuestion = []
    answerSet = []
    for question in getFormQuestions(formID):
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
    
    for answer in getAnswers(formID):
        answerSet = []
        for question in getFormQuestions(formID):
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
                answerSet.append(radioAnswer.text)
            elif question.type == "file":
                answerSet.append(" / ")
        writer.writerow(answerSet)
    file.close()

    return send_file(filename, as_attachment = True)
