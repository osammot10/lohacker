from connection import *
from datetime import date

response_bp = Blueprint('response_bp',__name__)

#Un utente può rispondere ad un questionario creato da lui stesso?

@response_bp.route('/getsurvey/<id>')
@login_required
def show_survey(id):
    survey = session.query(Survey).filter(Survey.id==id).filter(Survey.template == False).filter(Survey.deleted == False).first()

    if survey is not None:

        if survey.active == True:
            checkboxOptionList = []
            questionSet = []
            
            question = session.query(Question).filter(Question.survey==survey.id).all()

            for entry in question:
                if entry.type == "open":
                    questionSet += session.query(Question.type, OpenQuestion.id, OpenQuestion.text).join(OpenQuestion).filter(OpenQuestion.id == entry.id)
                elif entry.type == "checkbox":
                    questionSet += session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(CheckboxQuestion.id == entry.id)
                    
                    checkboxOption = session.query(CheckboxOption).filter(CheckboxOption.id == entry.id).all()
                    checkboxOptionList += checkboxOption
            
            return render_template("response.html", survey = survey, question = questionSet, checkbox = checkboxOptionList)
        
        else:
            return render_template("surveydisabled.html")
    else:
        return render_template("surveynotexisting.html")


@response_bp.route('/getresponse/<id>', methods=['GET', 'POST'])
@login_required
def send_response(id):
    newAnswer = Answer(survey = id, maker = current_user.get_id(), date = date.today())
    session.add(newAnswer)
    session.commit()
    print(newAnswer)
    for k,v in request.form.items():    #TODO controllare se l'utente ha già risposto
        idQuestion = k.split()[0]
        type = k.split()[1]
        if type == "open":
            newOpenAnswer = OpenAnswer(question = idQuestion, text = v, id = str(newAnswer.id))
            session.add(newOpenAnswer)
        elif type == "checkbox":
            optionSelected = k.split()[2]
            newCheckboxAnswer = CheckboxAnswer(question = idQuestion, number = optionSelected, id = str(newAnswer.id))
            session.add(newCheckboxAnswer)
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
