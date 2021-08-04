from connection import *
from datetime import date

response_bp = Blueprint('response_bp',__name__)

#Un utente può rispondere ad un questionario creato da lui stesso?

@response_bp.route('/getsurvey/<id>')
@login_required
def show_survey(id):
    survey = session.query(Survey).filter(Survey.id==id).filter(Survey.template == False).filter(Survey.deleted == False).first()

    existingAnswer = session.query(Answer).filter(Answer.maker == str(current_user.get_id())).filter(Answer.survey == id).all()

    if not existingAnswer:
        
        if survey is not None:

            if survey.active == True:
                checkboxOptionList = []
                questionSet = []
                radioOptionList = []
                
                question = session.query(Question).filter(Question.survey==survey.id).order_by(Question.id).all()

                for entry in question:
                    if entry.type == "open":
                        questionSet += session.query(Question.type, OpenQuestion.id, OpenQuestion.text, Question.required).join(OpenQuestion).filter(OpenQuestion.id == entry.id).all()
                    elif entry.type == "checkbox":
                        questionSet += session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text, Question.required).join(CheckboxQuestion).filter(CheckboxQuestion.id == entry.id).all()
                        
                        checkboxOption = session.query(CheckboxOption).filter(CheckboxOption.id == entry.id).all()
                        checkboxOptionList += checkboxOption
                    elif entry.type == "radio":
                        questionSet += session.query(Question.type, RadioQuestion.id, RadioQuestion.text, Question.required).join(RadioQuestion).filter(RadioQuestion.id == entry.id).all()

                        radioOption = session.query(RadioOption).filter(RadioOption.id == entry.id).all()
                        radioOptionList += radioOption
                    elif entry.type == "file":
                        questionSet += session.query(Question.type, FileQuestion.id, FileQuestion.text, Question.required).join(FileQuestion).filter(FileQuestion.id == entry.id).all()
                
                return render_template("response.html", survey = survey, question = questionSet, checkbox = checkboxOptionList, radio = radioOptionList)
            
            else:
                return render_template("surveydisabled.html")
        else:
            return render_template("surveynotexisting.html")
    else:
        return render_template("alreadyanswered.html")


@response_bp.route('/getresponse/<id>', methods=['GET', 'POST'])
@login_required
def send_response(id):
    newAnswer = Answer(survey = id, maker = current_user.get_id(), date = date.today())
    session.add(newAnswer)
    session.commit()
    for k,v in request.form.items():
        idQuestion = k.split()[0]
        type = k.split()[1]
        if type == "open":
            newOpenAnswer = OpenAnswer(question = idQuestion, text = v, id = str(newAnswer.id))
            session.add(newOpenAnswer)
        elif type == "checkbox":
            optionSelected = k.split()[2]
            newCheckboxAnswer = CheckboxAnswer(question = idQuestion, number = optionSelected, id = str(newAnswer.id))
            session.add(newCheckboxAnswer)
        elif type == "radio":
            newRadioAnswer = RadioAnswer(question = idQuestion, number = v, id = str(newAnswer.id))
            session.add(newRadioAnswer)
        elif type == "file":
            name = v + ' file'
            file = request.files[name]
            extension = file.filename.split(".")[1]
            newName = "fileQ"+str(idQuestion)+"A"+str(newAnswer.id)+"."+extension
            newFileAnswer = FileAnswer(id = str(newAnswer.id), question = idQuestion, path = newName)
            session.add(newFileAnswer)
            session.commit()
            file = request.files[name]
            file.filename = newName
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))
            print("File stored")
            
    session.commit()

    return render_template("confirmation.html")


@response_bp.route('/answer', methods=['GET', 'POST']) 
@login_required     
def show_answer_page():
    return render_template("answer.html")

@response_bp.route('/redirect', methods=['GET', 'POST'])
@login_required
def redirect_to_answer_page():
    if request.form['link'] == "":
        return redirect(url_for('response_bp.show_survey', id = request.form['id']))
    else:
        idS = request.form['link'].split("/")[2]
        return redirect(url_for('response_bp.show_survey', id = idS))
