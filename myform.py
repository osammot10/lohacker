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

    selectedSurvey = session.query(Survey).filter(Survey.id == id).filter(Survey.template == False).filter(Survey.deleted == False).first()
 
    question = session.query(Question).filter(Question.survey == id).all()

    for entry in question:
        if entry.type == 'open':
            questionSet += session.query(Question.type, OpenQuestion.id, OpenQuestion.text).join(OpenQuestion).filter(Question.id == entry.id).all()
            
            newOpenAnswer = session.query(OpenAnswer.id, OpenAnswer.question, OpenAnswer.text, Answer.maker).join(Answer).filter(OpenAnswer.question == entry.id).all()
            
            openAnswer += newOpenAnswer
        elif entry.type == 'checkbox':
            questionSet += session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(Question.id == entry.id).all()

            checkboxQuestionText = session.query(CheckboxQuestion.id, CheckboxQuestion.text, CheckboxOption.id.label('optionNumber'), CheckboxOption.text.label('option')).join(CheckboxOption).filter(CheckboxQuestion.id == entry.id).all()
            checkbox += checkboxQuestionText

            checkboxOption = session.query(CheckboxOption.id, CheckboxOption.number, func.count(CheckboxAnswer.number).label('counter')).outerjoin(CheckboxAnswer, (CheckboxAnswer.question == CheckboxOption.id) & (CheckboxAnswer.number == CheckboxOption.number)).filter(CheckboxOption.id == entry.id).group_by(CheckboxOption.id, CheckboxOption.number).all()
            checkboxAnswer += checkboxOption
        elif entry.type == "radio":
            questionSet += session.query(Question.type, RadioQuestion.id, RadioQuestion.text).join(RadioQuestion).filter(Question.id == entry.id).all()

            radioQuestionText = session.query(RadioQuestion.id, RadioQuestion.text, RadioOption.id.label('optionNumber'), RadioOption.text.label('option')).join(RadioOption).filter(RadioQuestion.id == entry.id).all()
            radio += radioQuestionText

            radioOption = session.query(RadioOption.id, RadioOption.number, func.count(RadioAnswer.number).label('counter')).outerjoin(RadioAnswer, (RadioAnswer.question == RadioOption.id) & (RadioAnswer.number == RadioOption.number)).filter(RadioOption.id == entry.id).group_by(RadioOption.id, RadioOption.number).all()
            radioAnswer += radioOption
        elif entry.type == "file":
            questionSet += session.query(Question.type, FileQuestion.id, FileQuestion.text).join(FileQuestion).filter(Question.id == entry.id).all()

            newFileAnswer = session.query(FileAnswer.id, FileAnswer.question, FileAnswer.path, Answer.maker).join(Answer).filter(FileAnswer.question == entry.id).all()
            fileAnswer += newFileAnswer
    return render_template("mysurvey.html", survey = selectedSurvey, questions = questionSet, checkboxs = checkbox, openAnswers = openAnswer, checkboxoption = checkboxAnswer, radios = radio, radiooption = radioAnswer, file = fileAnswer)

@myform_bp.route('/disable', methods = ['GET', 'POST'])
@login_required
def disable_survey():
    button = request.form['action']
    action = button.split()[0]
    id = button.split()[1]

    survey = session.query(Survey).filter(Survey.id == id).filter(Survey.template == False).filter(Survey.deleted == False).first()
    
    if action == 'active':
        survey.active = False
    elif action == 'disabled':
        survey.active = True
    else:
        survey.deleted = True
    session.commit()
    
    return redirect(url_for('form_bp.show_my_form'))

@myform_bp.route('/download/<path:filename>', methods = ['GET', 'POST'])
@login_required
def download(filename):
    filename = app.config['UPLOAD_FOLDER']+"/"+filename
    return send_file(filename, as_attachment = True)

@myform_bp.route('/downloadCSV/<formID>', methods = ['GET', 'POST'])
@login_required
def downloadCSV(formID):
    form = session.query(Survey).filter(Survey.id == formID).first()
    questions = session.query(Question).filter(Question.survey == form.id).order_by(Question.id).all()
    answers = session.query(Answer).filter(Answer.survey == form.id).all()

    csvQuestion = []
    answerSet = []
    for entry in questions:
        if entry.type == 'open':
            openQuestionText = session.query(Question.type, OpenQuestion.id, OpenQuestion.text).join(OpenQuestion).filter(OpenQuestion.id == entry.id).first()
            csvQuestion.append(openQuestionText.text)
        elif entry.type == 'checkbox':
            checkboxQuestionText = session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(CheckboxQuestion.id == entry.id).first()
            csvQuestion.append(checkboxQuestionText.text)
        elif entry.type == 'radio':
            radioQuestionText = session.query(Question.type, RadioQuestion.id, RadioQuestion.text).join(RadioQuestion).filter(RadioQuestion.id == entry.id).first()
            csvQuestion.append(radioQuestionText.text)
        elif entry.type == 'file':
            fileQuestionText = session.query(Question.type, FileQuestion.id, FileQuestion.text).join(FileQuestion).filter(FileQuestion.id == entry.id).first()
            csvQuestion.append(fileQuestionText.text)

    filename = app.config['CSV_FOLDER'] + '/form' + str(form.id) + '.csv'
    file = open(filename, 'w', newline = '')
    writer = csv.writer(file)
    writer.writerow(csvQuestion)
    
    for entry in answers:
        answerSet = []
        for q in questions:
            if q.type == "open":
                openAnswer = session.query(OpenAnswer.text).filter(OpenAnswer.id == entry.id).filter(OpenAnswer.question == q.id).first()
                answerSet.append(openAnswer.text)
            elif q.type == "checkbox":
                checkboxAnswer = session.query(CheckboxOption.text, CheckboxAnswer.number).filter(CheckboxAnswer.id == entry.id).filter(CheckboxAnswer.question == q.id).filter(CheckboxOption.id == CheckboxAnswer.question).filter(CheckboxOption.number == CheckboxAnswer.number).all()
                option = " | "
                for r in checkboxAnswer:
                    option = option + r.text + " | "
                answerSet.append(option)
            elif q.type == "radio":
                radioAnswer = session.query(RadioOption.text, RadioAnswer.number).filter(RadioAnswer.id == entry.id).filter(RadioAnswer.question == q.id).filter(RadioOption.id == RadioAnswer.question).filter(RadioOption.number == RadioAnswer.number).first()
                answerSet.append(radioAnswer.text)
            elif q.type == "file":
                answerSet.append(" / ")
        writer.writerow(answerSet)
    file.close()

    return send_file(filename, as_attachment = True)
