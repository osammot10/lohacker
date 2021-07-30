from connection import *
from datetime import date
import requests

templates_bp = Blueprint('templates_bp',__name__)

@templates_bp.route('/template', methods = ['GET', 'POST'])
@login_required
def templateCreation():
    return render_template("template.html")

@templates_bp.route('/template/create', methods = ['GET', 'POST'])
@login_required
def createTemplate():
    if request.method == 'POST':
        templateTitle = request.form['titleInput']
        newTemplate = Survey(maker = current_user.get_id(), name = templateTitle, date = date.today(), template = True, active = True, deleted = False)
        session.add(newTemplate)
        session.commit()
        id_check = -1
        id_openQuestion = 0
        i = 1
        j = 1
        for k,v in request.form.items():
            if k != "titleInput":
                k = k.split()[1]
                if k == 'open':
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newTemplate.id), type = "open", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newOpenQuestion = OpenQuestion(id = str(newQuestion.id), text = v)
                    session.add(newOpenQuestion)
                    id_openQuestion = newQuestion.id
                    j = j + 1
                elif k == 'checkbox':
                    #id è autoincrement, si può omettere
                    newQuestion = Question(survey = str(newTemplate.id), type = "checkbox", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newCheckboxQuestion = CheckboxQuestion(id = str(newQuestion.id), text= v)
                    session.add(newCheckboxQuestion)
                    id_check = newCheckboxQuestion.id
                    id_openQuestion = newQuestion.id
                    j = j + 1
                    i = 1
                elif k == 'checkboxtext':
                    newCheckboxOption = CheckboxOption(id = str(id_check), number = i, text = v)
                    session.add(newCheckboxOption)
                    i = i + 1
                elif k == "required":
                    requiredQuestion = session.query(Question).filter(Question.id == id_openQuestion).first()
                    requiredQuestion.required = True
                    session.commit()
                session.commit()         
        return render_template('newTemplateConfirmation.html')

@templates_bp.route('/useTemplate', methods = ['GET', 'POST'])
@login_required
def actionTemplate():
    buttonClicked = request.form['formButton']
    action = buttonClicked.split()[0]
    id = buttonClicked.split()[1]

    data = {"formButton": id}
    response = requests.post("http://172.27.150.172:5000/form", data=data)
    print(response)

    
    return redirect(url_for('form_bp.show_form_create_page'))