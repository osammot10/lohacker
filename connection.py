from flask import *
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user

from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

import os
from werkzeug.utils import *
from datetime import date

app = Flask(__name__)

Base = declarative_base()
Base.metadata.schema = 'form'

engine = create_engine('postgresql://user:user@localhost/postgres')
metadata = MetaData()

Session = sessionmaker(bind=engine)
session = Session()

app.config['SECRET_KEY'] = 'ubersecret'
app.config['UPLOAD_FOLDER'] = os.path.abspath(os.path.dirname(__file__)) + '/uploads'
app.config['CSV_FOLDER'] = os.path.abspath(os.path.dirname(__file__)) + '/csv'

login_manager = LoginManager()
login_manager.init_app(app)

# Class for mapping with flask_login
# It allows you to track a user within a session
class User ( UserMixin ):
    def __init__ (self , id , email , password, first_name, surname):
        self.id = id
        self.email = email
        self.password = password
        self.first_name = first_name
        self.surname = surname

    def get_email(self):
        return self.email

# Class for the mapping of the User table in the DB
class Utenti(Base):
    __tablename__ = 'User'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    password = Column(String)
    first_name = Column(String)
    surname = Column(String)

# Class for the mapping of the Form table in the DB
class Form(Base):
    __tablename__ = "Form"

    id = Column(Integer, primary_key=True, autoincrement=True)
    maker = Column(Integer, ForeignKey(Utenti.id), primary_key=True)
    name = Column(String)
    date = Column(Date)
    template = Column(Boolean)
    active = Column(Boolean)
    deleted = Column(Boolean)
    anonymous = Column(Boolean)

    def toString(self):
        return "id: {0}, maker_id: {1}, name: {2}, date: {3}".format(self.id, self.maker, self.name, self.date)

# Class for the mapping of the Question table in the DB
class Question(Base):
    __tablename__ = "Question"

    id = Column(Integer, primary_key=True, autoincrement=True)
    form = Column(Integer, ForeignKey(Form.id), primary_key=True)
    type = Column(String)
    required = Column(Boolean)

    def toString(self):
        return "id: {0}, text: {1}, type: {2}".format(self.id, self.text, self.type)

# Class for the mapping of the OpenQuestion table in the DB
class OpenQuestion(Base):
    __tablename__ = "OpenQuestion"

    id = Column(Integer, ForeignKey(Question.id), primary_key = True, autoincrement = True)
    text = Column(String)

# Class for the mapping of the CheckBoxQuestion table in the DB
class CheckboxQuestion(Base):
    __tablename__ = "CheckboxQuestion"

    id = Column(Integer,ForeignKey(Question.id), primary_key=True, autoincrement=True)
    text = Column(String)

# Class for the mapping of the CheckboxOption table in the DB
class CheckboxOption(Base):
    __tablename__ = "CheckboxOption"

    id = Column(Integer, ForeignKey(CheckboxQuestion.id), primary_key = True, autoincrement = True)
    number = Column(Integer, primary_key = True)
    text = Column(String)

# Class for the mapping of the RadioQuestion table in the DB
class RadioQuestion(Base):
    __tablename__ = "RadioQuestion"

    id = Column(Integer,ForeignKey(Question.id), primary_key=True, autoincrement=True)
    text = Column(String)

# Class for the mapping of the RadioOption table in the DB
class RadioOption(Base):
    __tablename__ = "RadioOption"

    id = Column(Integer, ForeignKey(RadioQuestion.id), primary_key = True, autoincrement = True)
    number = Column(Integer, primary_key = True)
    text = Column(String)

# Class for the mapping of the FileQuestion table in the DB
class FileQuestion(Base):
    __tablename__ = "FileQuestion"

    id = Column(Integer, ForeignKey(Question.id), primary_key = True, autoincrement = True)
    text = Column(String)

# Class for the mapping of the Answer table in the DB
class Answer(Base):
    __tablename__ = "Answer"

    id = Column(Integer, primary_key = True, autoincrement = True)
    form = Column(Integer, ForeignKey(Form.id), primary_key = True)
    maker = Column(Integer, ForeignKey(Utenti.id), primary_key = True)
    date = Column(Date)

# Class for the mapping of the OpenAnswer table in the DB
class OpenAnswer(Base):
    __tablename__ = "OpenAnswer"

    question = Column(Integer, ForeignKey(OpenQuestion.id), primary_key=True, autoincrement=True)
    text = Column(String)
    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)

# Class for the mapping of the CheckboxAnswer table in the DB
class CheckboxAnswer(Base):
    __tablename__ = "CheckboxAnswer"

    question = Column(Integer, ForeignKey(CheckboxOption.id), primary_key=True, autoincrement=True)
    number = Column(Integer, ForeignKey(CheckboxOption.number), primary_key=True, autoincrement=True)
    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)

# Class for the mapping of the RadioAnswer table in the DB
class RadioAnswer(Base):
    __tablename__ = "RadioAnswer"

    question = Column(Integer, ForeignKey(RadioOption.id), primary_key=True, autoincrement=True)
    number = Column(Integer, ForeignKey(RadioOption.number), primary_key=True, autoincrement=True)
    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)

# Class for the mapping of the FileAnswer table in the DB
class FileAnswer(Base):
    __tablename__ = "FileAnswer"

    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)
    question = Column(Integer, ForeignKey(FileQuestion.id), primary_key = True)
    path = Column(String)

# Loads the user in session using the id
@login_manager.user_loader
def load_user(user_id):
    try:
        user = session.query(Utenti).filter(Utenti.id == user_id).first()
        return User(user.id, user.email, user.password, user.first_name, user.surname)
    except Exception as e:
        session.rollback()
        print(e)
        print("Exception loading user using ID")
        return None

# Use the user's email to find it into the DB
def get_user_by_email(email):
    try:
        user = session.query(Utenti).filter(Utenti.email == email).first()
        return User(user.id, user.email, user.password, user.first_name, user.surname)
    except Exception as e:
        return None 


def get_key(val, dict):
    for key, value in dict.items():
         if val == value:
             return key

# Get the form using the id
def getFormByID(formID):
    try:
        return session.query(Form).filter(Form.id == formID).filter(Form.template == False).filter(Form.deleted == False).first()
    except Exception as e:
        return None

def getFormQuestions(formID):
    try:
        return session.query(Question).filter(Question.form == formID).order_by(Question.id).all()
    except Exception as e:
        return None

# Open questions
def getOpenQuestion(questionID):
    try:
        return session.query(Question.type, OpenQuestion.id, OpenQuestion.text, Question.required).join(OpenQuestion).filter(Question.id == questionID).all()
    except Exception as e:
        return None

def getAllOpenAnswers(formID):
    try:
        return session.query(OpenAnswer.id, OpenAnswer.question, OpenAnswer.text, Answer.maker, Answer.date).join(Answer).filter(Answer.form == formID).all()
    except Exception as e:
        return None

# Checkbox question
def getCheckboxQuestion(questionID):
    try:
        return session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text, Question.required).join(CheckboxQuestion).filter(Question.id == questionID).all()
    except Exception as e:
        return None

def getAllCheckboxQuestions(formID):
    try:
        return session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(Question.form == formID).filter(Question.type == "checkbox").all()
    except Exception as e:
        return None

def getCheckboxOptions(questionID):
    try:
        return session.query(CheckboxQuestion.id, CheckboxQuestion.text, CheckboxOption.number.label('optionNumber'), CheckboxOption.text.label('option',)).join(CheckboxOption).filter(CheckboxQuestion.id == questionID).all()
    except Exception as e:
        return None

def getCheckboxAnswers(questionID):
    try:
        return session.query(CheckboxOption.id, CheckboxOption.number, func.count(CheckboxAnswer.number).label('counter')).outerjoin(CheckboxAnswer, (CheckboxAnswer.question == CheckboxOption.id) & (CheckboxAnswer.number == CheckboxOption.number)).filter(CheckboxOption.id == questionID).group_by(CheckboxOption.id, CheckboxOption.number).all()
    except Exception as e:
        return None

def getAllSingleCheckboxAnswer(formID):
    try:
        return session.query(Answer.maker,Answer.date,CheckboxAnswer.number,CheckboxAnswer.question).join(Answer).filter(Answer.form == formID).all()
    except Exception as e:
        return None

# Radio question
def getRadioQuestion(questionID):
    try:
        return session.query(Question.type, RadioQuestion.id, RadioQuestion.text, Question.required).join(RadioQuestion).filter(Question.id == questionID).all()
    except Exception as e:
        return None

def getAllRadioQuestions(formID):
    try:
        return session.query(Question.type, RadioQuestion.id, RadioQuestion.text).join(RadioQuestion).filter(Question.form == formID).filter(Question.type == "radio").all()
    except Exception as e:
        return None

def getRadioOptions(questionID):
    try:
        return session.query(RadioQuestion.id, RadioQuestion.text, RadioOption.number.label('optionNumber'), RadioOption.text.label('option')).join(RadioOption).filter(RadioQuestion.id == questionID).all()
    except Exception as e:
        return None

def getRadioAnswers(questionID):
    try:
        return session.query(RadioOption.id, RadioOption.number, func.count(RadioAnswer.number).label('counter')).outerjoin(RadioAnswer, (RadioAnswer.question == RadioOption.id) & (RadioAnswer.number == RadioOption.number)).filter(RadioOption.id == questionID).group_by(RadioOption.id, RadioOption.number).all()
    except Exception as e:
        return None

def getAllSingleRadioAnswer(formID):
    try:
        return session.query(Answer.maker,Answer.date,RadioAnswer.number,RadioAnswer.question).join(Answer).filter(Answer.form == formID).all()
    except Exception as e:
        return None

# File question
def getFileQuestion(questionID):
    try:
        return session.query(Question.type, FileQuestion.id, FileQuestion.text, Question.required).join(FileQuestion).filter(Question.id == questionID).all()
    except Exception as e:
        return None

# Get all the answers of a form
def getAllFileAnswers(formID):
    try:
        return session.query(FileAnswer.id, FileAnswer.question, FileAnswer.path, Answer.maker).join(Answer).filter(Answer.form == formID).all()
    except Exception as e:
        return None

# Get all the questions of a form
def getAllFormQuestion(formID):
    try:
        questionSet = []
        questionForm = getFormQuestions(formID)
        if questionForm is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento delle domande")
        else:
            for question in questionForm:
                if question.type == "open":
                    questionSet += getOpenQuestion(question.id)
                elif question.type == "checkbox":
                    questionSet += getCheckboxQuestion(question.id)
                elif question.type == "radio":
                    questionSet += getRadioQuestion(question.id)
                elif question.type == "file":
                    questionSet += getFileQuestion(question.id)
            return questionSet
    except Exception as e:
        return None

# Get all the checkboxOption of all the checkboxQuestion in the form
def getAllFormCheckboxOptions(formID):
    try:
        checkboxOptions = []
        checkboxQuestions = getAllCheckboxQuestions(formID)
        if checkboxQuestions is None:
            return render_template("error.html", error = "", message = "Errore caricamento durante caricamento di tutte le opzioni delle domande checkbox del form")
        else:
            for question in checkboxQuestions:
                checkboxOptions += getCheckboxOptions(question.id)
            return checkboxOptions
    except Exception as e:
        return None

# Get all the checkboxAnswer of all the checkbox in the form
def getAllCheckboxAnswers(formID):
    try:
        checkboxAnswer = []
        for question in getAllCheckboxQuestions(formID):
            checkboxAnswer += getCheckboxAnswers(question.id)
        return checkboxAnswer
    except Exception as e:
        return None

# Get all the radioOption of all the radioQuestion in the form
def getAllFormRadioOptions(formID):
    try:
        radioOptions = []
        radioQuestions = getAllRadioQuestions(formID)
        if radioQuestions is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento delle domande di tipo radio")
        for question in getAllRadioQuestions(formID):
            radioOptions += getRadioOptions(question.id)
        return radioOptions
    except Exception as e:
        return None

# Get all the radioAnswer of all the radioQuestion in the form
def getAllRadioAnswers(formID):
    try:
        radioAnswer = []
        radioQuestions = getAllRadioQuestions(formID)
        if radioQuestions is None:
            return render_template("error.html", error = "", message = "Errore durante il caricamento delle domande di tipo radio")
        else:
            for question in radioQuestions:
                radioAnswer += getRadioAnswers(question.id)
            return radioAnswer
    except Exception as e:
        return None

#Get all the answers of a specific  form
def getAnswers(formID):
    try:
        return session.query(Answer).filter(Answer.form == formID).all()
    except Exception as e:
        return None

# Get all the user that have replied to a specific  form
def getMakers(formID):
    try:
        return session.query(Answer.maker,func.count(Answer.maker).label('number'), Answer.date, Utenti.email).join(Utenti).filter(Answer.form == formID).group_by(Answer.maker, Answer.date, Utenti.email).all()
    except Exception as e:
        return None

# Get all the form of the current user
def getAllMyForm():
    try:
        return session.query(Form).filter(Form.maker == current_user.get_id()).filter(Form.template == False).filter(Form.deleted == False).all()
    except Exception as e:
        return None

# Add the new form into the DB
def formCreation(formTitle, anonymousOption):
    try:
        form = Form(maker = current_user.get_id(), name = formTitle, date = date.today(), template = False, active = True, deleted = False, anonymous = anonymousOption)
        session.add(form)
        session.commit()
        return form
    except Exception as e:
        session.rollback()
        print(e)
        return None

# Add a new template into the DB
def createNewTemplate(templateTitle):
    try:
        form = Form(maker = current_user.get_id(), name = templateTitle, date = date.today(), template = True, active = True, deleted = False, anonymous = False)
        session.add(form)
        session.commit()
        return form
    except Exception as e:
        session.rollback()
        return None

# Receives the in input a form and populates it with questions
def questionsInsertion(form, formRequest):
    id_check = -1
    id_radio = -1
    idRequiredQuestion = 0
    i = 1
    for k,v in formRequest:
        if k != "titleInput" and k != "anonymous":
            k = k.split()[1]
            if k == 'open':
                newQuestion = Question(form = str(form.id), type = "open", required = False)
                session.add(newQuestion)
                session.commit()
                newOpenQuestion = OpenQuestion(id = str(newQuestion.id), text = v)
                session.add(newOpenQuestion)
                idRequiredQuestion = newQuestion.id
            elif k == 'checkbox':
                newQuestion = Question(form = str(form.id), type = "checkbox", required = False)
                session.add(newQuestion)
                session.commit()
                newCheckboxQuestion = CheckboxQuestion(id = str(newQuestion.id), text= v)
                session.add(newCheckboxQuestion)
                id_check = newCheckboxQuestion.id
                idRequiredQuestion = newQuestion.id
                i = 1
            elif k == 'checkboxtext':
                newCheckboxOption = CheckboxOption(id = str(id_check), number = i, text = v)
                session.add(newCheckboxOption)
                i = i + 1
            elif k == 'radio' :
                newQuestion = Question(form = str(form.id), type = "radio", required = False)
                session.add(newQuestion)
                session.commit()
                newRadioQuestion = RadioQuestion(id = str(newQuestion.id), text= v)
                session.add(newRadioQuestion)
                id_radio = newRadioQuestion.id
                idRequiredQuestion = newQuestion.id
                i = 1
            elif k == 'radiobtntext' :
                newRadioOption = RadioOption(id = str(id_radio), number = i, text = v)
                session.add(newRadioOption)
                i = i + 1
            elif k == 'fileText':
                newQuestion = Question(form = str(form.id), type = "file", required = False)
                session.add(newQuestion)
                session.commit()
                newFileQuestion = FileQuestion(id = str(newQuestion.id), text = v)
                session.add(newFileQuestion)
                idRequiredQuestion = newFileQuestion.id
            elif k == "required":
                requiredQuestion = session.query(Question).filter(Question.id == idRequiredQuestion).first()
                requiredQuestion.required = True
                session.commit()
            session.commit()

# Get a user answer from a specific  form
def getUserAnswer(formID):
    try:
        return session.query(Answer).filter(Answer.maker == str(current_user.get_id())).filter(Answer.form == formID).all()
    except Exception as e:
        return None

# Add the answer of a form into the DB
def createNewAnswer(formID):
    try:
        newAnswer = Answer(form = formID, maker = current_user.get_id(), date = date.today())
        session.add(newAnswer)
        session.commit()
        return newAnswer
    except Exception as e:
        session.rollback()
        return None

# Add the open answer of a form into the DB
def createNewOpenAnswer(questionID, content, answerID):
    try:
        newOpenAnswer = OpenAnswer(question = questionID, text = content, id = str(answerID))
        session.add(newOpenAnswer)
        session.commit()
    except Exception as e:
        session.rollback()

# Add the checkbox answer of a form into the DB
def createNewCheckboxAnswer(questionID, optionSelected, answerID):
    try:
        newCheckboxAnswer = CheckboxAnswer(question = questionID, number = optionSelected, id = str(answerID))
        session.add(newCheckboxAnswer)
        session.commit()
    except Exception as e:
        session.rollback()

# Add the radio answer of a form into the DB
def createNewRadioAnswer(questionID, optionSelected, answerID):
    try:
        newRadioAnswer = RadioAnswer(question = questionID, number = optionSelected, id = str(answerID))
        session.add(newRadioAnswer)
        session.commit()
    except Exception as e:
        session.rollback()
        print(e)

# Add the file answer of a form into the DB
def createNewFileAnswer(value, questionID, answerID):
    try:
        try:
            name = value + ' file'
            file = request.files.get(name)
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore, non ?? possibile ottenere il nome del file")
        if file.filename != "":
            extension = file.filename.split(".")[1]
            newName = "fileQ"+str(questionID)+"A"+str(answerID)+"."+extension
            try:
                newFileAnswer = FileAnswer(id = str(answerID), question = questionID, path = newName)
                session.add(newFileAnswer)
                session.commit()
            except Exception as e:
                session.rollback()
                return render_template("error.html", error = e, message = "Errore inserimento risposta file")
            try:
                file.filename = newName
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))
            except Exception as e:
                return render_template("error.html", error = e, message = "Errore durante il salvataggio del file")
    except Exception as e:
        session.rollback()

# Get a specific  template from the DB
def getTemplate(templateID):
    try:
        return session.query(Form).filter(Form.id == templateID).first()
    except Exception as e:
        None

# Disables a form by changing its active field in the DB
def disableForm(formID):
    form = getFormByID(formID)
    if form is None:
        return render_template("error.html", error = " ", message = "Errore caricamento form")
    else:
        try:
            form.active = False
            session.commit()
        except Exception as e:
            session.rollback()

# Activates a form by changing its active field in the DB
def activeForm(formID):
    form = getFormByID(formID)
    if form is None:
        return render_template("error.html", error = "", message = "Errore caricamento form")
    else:
        try:
            form.active = True
            session.commit()
        except Exception as e:
            session.rollback()

# Delete a specific  form in the DB, by changing its deleted field
def deleteForm(form):
    if form is None:
        return render_template("error.html", error = " ", message = "Errore caricamento form")
    else:
        try:
            form.deleted = True
            session.commit()
        except Exception as e:
            session.rollback()

# Get the user password using his email
def getUserPassword(userEmail):
    try:
        return session.query(Utenti.password).filter(Utenti.email == userEmail).first()
    except Exception as e:
        session.rollback()
        return None

# Get all the template of the current user
def getAllMyTemplates():
    try:
        return session.query(Form).filter(Form.maker == current_user.get_id()).filter(Form.template == True).filter(Form.deleted == False).all()
    except Exception as e:
        return None

# Create a new user into the DB
def createNewUser(email, password, firstName, surname):
    try:
        user = Utenti(email = email, password = password, first_name = firstName, surname = surname)
        session.add(user)
        session.commit()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante la registrazione di un nuovo utente")