from connection import *

myform_bp = Blueprint('myform_bp',__name__)

@myform_bp.route('/myform/<id>', methods = ['GET', 'POST'])
@login_required
def show_my_survey(id):

    checkbox = []
    openAnswer = []
    checkboxAnswer = []
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
      
    return render_template("mysurvey.html", survey = selectedSurvey, questions = questionSet, checkboxs = checkbox, openAnswers = openAnswer, checkboxoption = checkboxAnswer)

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
