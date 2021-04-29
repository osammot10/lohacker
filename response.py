from connection import *

response_bp = Blueprint('response_bp',__name__)

#Un utente può rispondere ad un questionario creato da lui stesso?

@response_bp.route('/getsurvey/<id>')
def show_survey(id):
    survey = session.query(Survey).filter(Survey.id==id).first()

    checkboxList = []
    
    q = session.query(Question).filter(Question.survey==survey.id).all()
    for r in q:
        if r.type == "checkbox":
            #print("Checkbox option:")
            o = session.query(CheckboxQuestion).filter(CheckboxQuestion.id==r.id).all()
            checkboxList += o
    
    return render_template("response.html", survey =survey, question=q, checkbox=checkboxList)


@response_bp.route('/getresponse', methods=['GET', 'POST'])
def send_response():
    for k,v in request.form.items():    #TODO controllare se l'utente ha già risposto
        idQuestion = k.split()[0]
        type = k.split()[1]
        if type == "open":
            o = OpenAnswer(question = idQuestion, text = v, user = current_user.get_id())
            session.add(o)
            session.commit()
        elif type == "checkbox":
            nSelected = k.split()[2]
            c = CheckboxAnswer(question = idQuestion, number = nSelected, user = current_user.get_id())
            session.add(c)
            session.commit()

    return render_template("confirmation.html")


@response_bp.route('/answer', methods=['GET', 'POST'])      
def show_answer_page():
    return render_template("answer.html")

@response_bp.route('/redirect', methods=['GET', 'POST'])
def redirect_to_answer_page():
    if request.form['link'] == "":
        return redirect(url_for('response_bp.show_survey', id = request.form['id']))
    else:
        idS = request.form['link'].split("/")[2]
        return redirect(url_for('response_bp.show_survey', id = idS))
