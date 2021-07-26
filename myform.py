from connection import *

myform_bp = Blueprint('myform_bp',__name__)

@myform_bp.route('/myform/<id>', methods = ['GET', 'POST'])
@login_required
def show_my_survey(id):

    checkbox = []
    answerOpen = []
    answerCheck = []

    s = session.query(Survey).filter(Survey.id == id).filter(Survey.template == False).filter(Survey.deleted == False).first()
 
    question = session.query(Question.id, Question.text, Question.type).filter(Question.survey == id).all()

    for r in question:
        if r.type == 'open':
            a = session.query(OpenAnswer.question, OpenAnswer.text, OpenAnswer.user).filter(OpenAnswer.question == r.id).all()
            answerOpen += a
        elif r.type == 'checkbox':
            c = session.query(CheckboxQuestion.id, CheckboxQuestion.number, CheckboxQuestion.text).filter(CheckboxQuestion.id == r.id).all()
            checkbox += c

            u = session.query(CheckboxQuestion.id, CheckboxQuestion.number, func.count(CheckboxAnswer.number)).outerjoin(CheckboxAnswer, (CheckboxAnswer.question == CheckboxQuestion.id) & (CheckboxAnswer.number == CheckboxQuestion.number)).filter(CheckboxQuestion.id == 19).group_by(CheckboxQuestion.id, CheckboxQuestion.number).all()
            answerCheck += u

    checkbox = zip(checkbox, answerCheck)

    return render_template("mysurvey.html", survey = s, questions = question, checkboxs = checkbox, openAnswers = answerOpen)

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
