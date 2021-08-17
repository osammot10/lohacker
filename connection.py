from flask import *
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

import os
from werkzeug.utils import *
from datetime import date

app = Flask(__name__)

Base = declarative_base()
Base.metadata.schema = 'form'

engine = create_engine('postgresql://postgres:postgres@localhost/lohacker')
metadata = MetaData()

Session = sessionmaker(bind=engine)
session = Session()

app.config['SECRET_KEY'] = 'ubersecret'
app.config['UPLOAD_FOLDER'] = os.path.abspath(os.path.dirname(__file__)) + '/uploads'
app.config['CSV_FOLDER'] = os.path.abspath(os.path.dirname(__file__)) + '/csv'

login_manager = LoginManager()
login_manager.init_app(app)

# Classe per il mapping con flask_login
# Permette di tener traccia di un utente all'interno di una sessione 
class User ( UserMixin ):   #TODO estendere User con l'attributo Role
    def __init__ (self , id , email , password, first_name, surname ):
        self.id = id
        self.email = email
        self.password = password
        self.first_name = first_name
        self.surname = surname

    def get_email(self):
        return self.email

# Classe per il mapping con la tabella "User" del db 
class Utenti(Base):
    __tablename__ = 'User'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String)
    password = Column(String)
    first_name = Column(String)
    surname = Column(String)

class Survey(Base):
    __tablename__ = "Survey"

    id = Column(Integer, primary_key=True, autoincrement=True)
    maker = Column(Integer, ForeignKey(Utenti.id), primary_key=True)
    name = Column(String)
    date = Column(Date)
    template = Column(Boolean)
    active = Column(Boolean)
    deleted = Column(Boolean)

    def toString(self):
        return "id: {0}, maker_id: {1}, name: {2}, date: {3}".format(self.id, self.maker, self.name, self.date)

class Question(Base):
    __tablename__ = "Question"

    id = Column(Integer, primary_key=True, autoincrement=True)
    survey = Column(Integer, ForeignKey(Survey.id), primary_key=True)
    type = Column(String)
    required = Column(Boolean)

    def toString(self):
        return "id: {0}, text: {1}, type: {2}".format(self.id, self.text, self.type)

class OpenQuestion(Base):
    __tablename__ = "OpenQuestion"

    id = Column(Integer, ForeignKey(Question.id), primary_key = True, autoincrement = True)
    text = Column(String)

class CheckboxQuestion(Base):
    __tablename__ = "CheckboxQuestion"

    id = Column(Integer,ForeignKey(Question.id), primary_key=True, autoincrement=True)
    text = Column(String)

class CheckboxOption(Base):
    __tablename__ = "CheckboxOption"

    id = Column(Integer, ForeignKey(CheckboxQuestion.id), primary_key = True, autoincrement = True)
    number = Column(Integer, primary_key = True)
    text = Column(String)

class RadioQuestion(Base):
    __tablename__ = "RadioQuestion"

    id = Column(Integer,ForeignKey(Question.id), primary_key=True, autoincrement=True)
    text = Column(String)

class RadioOption(Base):
    __tablename__ = "RadioOption"

    id = Column(Integer, ForeignKey(RadioQuestion.id), primary_key = True, autoincrement = True)
    number = Column(Integer, primary_key = True)
    text = Column(String)

class FileQuestion(Base):
    __tablename__ = "FileQuestion"

    id = Column(Integer, ForeignKey(Question.id), primary_key = True, autoincrement = True)
    text = Column(String)

class Answer(Base):
    __tablename__ = "Answer"

    id = Column(Integer, primary_key = True, autoincrement = True)
    survey = Column(Integer, ForeignKey(Survey.id), primary_key = True)
    maker = Column(Integer, ForeignKey(Utenti.id), primary_key = True)
    date = Column(Date)

class OpenAnswer(Base):
    __tablename__ = "OpenAnswer"

    question = Column(Integer, ForeignKey(OpenQuestion.id), primary_key=True, autoincrement=True)
    text = Column(String)
    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)

class CheckboxAnswer(Base):
    __tablename__ = "CheckboxAnswer"

    question = Column(Integer, ForeignKey(CheckboxOption.id), primary_key=True, autoincrement=True)
    number = Column(Integer, ForeignKey(CheckboxOption.number), primary_key=True, autoincrement=True)
    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)

class RadioAnswer(Base):
    __tablename__ = "RadioAnswer"

    question = Column(Integer, ForeignKey(RadioOption.id), primary_key=True, autoincrement=True)
    number = Column(Integer, ForeignKey(RadioOption.number), autoincrement=True)
    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)

class FileAnswer(Base):
    __tablename__ = "FileAnswer"

    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)
    question = Column(Integer, ForeignKey(FileQuestion.id), primary_key = True)
    path = Column(String)


@login_manager.user_loader
def load_user(user_id):
    try:
        rs = session.query(Utenti).filter(Utenti.id == user_id)
        user = rs.first()
        return User(user.id, user.email, user.password, user.first_name, user.surname)
    except:
        print("Exception loading user using ID")

def get_user_by_email(email):
    try:
        user = session.query(Utenti).filter(Utenti.email == email).first()
        return User(user.id, user.email, user.password, user.first_name, user.surname)
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante il caricamento dell'utente")

def get_key(val, dict):
    for key, value in dict.items():
         if val == value:
             return key

def getFormByID(formID):
    try:
        return session.query(Survey).filter(Survey.id == formID).filter(Survey.template == False).filter(Survey.deleted == False).first()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento form")

def getFormQuestions(formID):
    try:
        return session.query(Question).filter(Question.survey == formID).order_by(Question.id).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento domande")

# Open questions
def getOpenQuestion(questionID):
    try:
        return session.query(Question.type, OpenQuestion.id, OpenQuestion.text, Question.required).join(OpenQuestion).filter(Question.id == questionID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento domande aperte")

def getAllOpenAnswers(formID):
    try:
        return session.query(OpenAnswer.id, OpenAnswer.question, OpenAnswer.text, Answer.maker, Answer.date).join(Answer).filter(Answer.survey == formID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento risposte domande aperte del form")

# Checkbox question
def getCheckboxQuestion(questionID):
    try:
        return session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text, Question.required).join(CheckboxQuestion).filter(Question.id == questionID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento domanda checkbox")

def getAllCheckboxQuestions(formID):
    try:
        return session.query(Question.type, CheckboxQuestion.id, CheckboxQuestion.text).join(CheckboxQuestion).filter(Question.survey == formID).filter(Question.type == "checkbox").all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento domande di tipo checkbox del form")

def getCheckboxOptions(questionID):
    try:
        return session.query(CheckboxQuestion.id, CheckboxQuestion.text, CheckboxOption.number.label('optionNumber'), CheckboxOption.text.label('option',)).join(CheckboxOption).filter(CheckboxQuestion.id == questionID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento opzioni checkbox")

def getCheckboxAnswers(questionID):
    try:
        return session.query(CheckboxOption.id, CheckboxOption.number, func.count(CheckboxAnswer.number).label('counter')).outerjoin(CheckboxAnswer, (CheckboxAnswer.question == CheckboxOption.id) & (CheckboxAnswer.number == CheckboxOption.number)).filter(CheckboxOption.id == questionID).group_by(CheckboxOption.id, CheckboxOption.number).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento risposte domanda checkbox")

def getAllSingleCheckboxAnswer(formID):
    try:
        return session.query(Answer.maker,Answer.date,CheckboxAnswer.number,CheckboxAnswer.question).join(Answer).filter(Answer.survey == formID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento risposte domande checkbox")

# Radio question
def getRadioQuestion(questionID):
    try:
        return session.query(Question.type, RadioQuestion.id, RadioQuestion.text, Question.required).join(RadioQuestion).filter(Question.id == questionID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento domanda radio button")

def getAllRadioQuestions(formID):
    try:
        return session.query(Question.type, RadioQuestion.id, RadioQuestion.text).join(RadioQuestion).filter(Question.survey == formID).filter(Question.type == "radio").all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento domande radio button")

def getRadioOptions(questionID):
    try:
        return session.query(RadioQuestion.id, RadioQuestion.text, RadioOption.number.label('optionNumber'), RadioOption.text.label('option')).join(RadioOption).filter(RadioQuestion.id == questionID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento opzioni domanda radio button")

def getRadioAnswers(questionID):
    try:
        return session.query(RadioOption.id, RadioOption.number, func.count(RadioAnswer.number).label('counter')).outerjoin(RadioAnswer, (RadioAnswer.question == RadioOption.id) & (RadioAnswer.number == RadioOption.number)).filter(RadioOption.id == questionID).group_by(RadioOption.id, RadioOption.number).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento risposte a domanda radio button")

def getAllSingleRadioAnswer(formID):
    try:
        return session.query(Answer.maker,Answer.date,RadioAnswer.number,RadioAnswer.question).join(Answer).filter(Answer.survey == formID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento risposte domande radio button")

# File question
def getFileQuestion(questionID):
    try:
        return session.query(Question.type, FileQuestion.id, FileQuestion.text, Question.required).join(FileQuestion).filter(Question.id == questionID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento domanda file")

def getAllFileAnswers(formID):
    try:
        return session.query(FileAnswer.id, FileAnswer.question, FileAnswer.path, Answer.maker).join(Answer).filter(Answer.survey == formID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento file risposta")


def getAllFormQuestion(formID):
    try:
        questionSet = []
        for question in getFormQuestions(formID):
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
        return render_template("error.html", error = e, message = "Errore durante caricamento di tutte le domande del form")


def getAllFormCheckboxOptions(formID):
    try:
        checkboxOptions = []
        for question in getAllCheckboxQuestions(formID):
            checkboxOptions += getCheckboxOptions(question.id)
        return checkboxOptions
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento durante caricamento di tutte le opzioni delle domande checkbox del form")

def getAllCheckboxAnswers(formID):
    try:
        checkboxAnswer = []
        for question in getAllCheckboxQuestions(formID):
            checkboxAnswer += getCheckboxAnswers(question.id)
        return checkboxAnswer
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante caricamento di tutte le risposte a domande checkbox del form")
    


def getAllFormRadioOptions(formID):
    try:
        radioOptions = []
        for question in getAllRadioQuestions(formID):
            radioOptions += getRadioOptions(question.id)
        return radioOptions
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento durante caricamento di tutte le opzioni delle domande radio button del form")

def getAllRadioAnswers(formID):
    try:
        radioAnswer = []
        for question in getAllRadioQuestions(formID):
            radioAnswer += getRadioAnswers(question.id)
        return radioAnswer
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante caricamento di tutte le risposte a domande radio button del form")


def getAnswers(formID):
    try:
        return session.query(Answer).filter(Answer.survey == formID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore caricamento risposte al form")

def getMakers(formID):
    try:
        return session.query(Answer.maker,func.count(Answer.maker).label('number')).filter(Answer.survey == formID).group_by(Answer.maker).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante il caricamento degli utenti che hanno risposto al form")

def getAllMyForm():
    try:
        return session.query(Survey).filter(Survey.maker == current_user.get_id()).filter(Survey.template == False).filter(Survey.deleted == False).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante il caricamento dei form")

def formCreation(formTitle):
    try:
        form = Survey(maker = current_user.get_id(), name = formTitle, date = date.today(), template = False, active = True, deleted = False)
        session.add(form)
        session.commit()
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore creazione form")
    return form

def createNewTemplate(templateTitle):
    try:
        form = Survey(maker = current_user.get_id(), name = templateTitle, date = date.today(), template = True, active = True, deleted = False)
        session.add(form)
        session.commit()
        return form
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore creazione form")

def questionsInsertion(form, formRequest):
    id_check = -1
    id_radio = -1
    idRequiredQuestion = 0
    i = 1
    
    try:
        for k,v in formRequest:
            if k != "titleInput":
                k = k.split()[1]
                if k == 'open':
                    newQuestion = Question(survey = str(form.id), type = "open", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newOpenQuestion = OpenQuestion(id = str(newQuestion.id), text = v)
                    session.add(newOpenQuestion)
                    idRequiredQuestion = newQuestion.id
                elif k == 'checkbox':
                    newQuestion = Question(survey = str(form.id), type = "checkbox", required = False)
                    session.add(newQuestion)
                    session.commit()
                    newCheckboxQuestion = CheckboxQuestion(id = str(newQuestion.id), text= v)
                    session.add(newCheckboxQuestion)
                    id_check = newCheckboxQuestion.id
                    idRequiredQuestion = newQuestion.id
                    i = 1
                elif k == 'checkboxtext':
                    print(v)
                    newCheckboxOption = CheckboxOption(id = str(id_check), number = i, text = v)
                    session.add(newCheckboxOption)
                    i = i + 1
                elif k == 'radio' :
                    newQuestion = Question(survey = str(form.id), type = "radio", required = False)
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
                    newQuestion = Question(survey = str(form.id), type = "file", required = False)
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
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore nella creazione delle domande")

def getUserAnswer(formID):
    try:
        return session.query(Answer).filter(Answer.maker == str(current_user.get_id())).filter(Answer.survey == formID).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante il caricamento delle risposte esistenti dell'utente al form")

def createNewAnswer(formID):
    try:
        newAnswer = Answer(survey = formID, maker = current_user.get_id(), date = date.today())
        session.add(newAnswer)
        session.commit()
        return newAnswer
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore creazione nuova risposta")

def createNewOpenAnswer(questionID, content, answerID):
    try:
        newOpenAnswer = OpenAnswer(question = questionID, text = content, id = str(answerID))
        session.add(newOpenAnswer)
        session.commit()
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore inserimento risposta aperta")

def createNewCheckboxAnswer(questionID, optionSelected, answerID):
    try:
        newCheckboxAnswer = CheckboxAnswer(question = questionID, number = optionSelected, id = str(answerID.id))
        session.add(newCheckboxAnswer)
        session.commit()
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore inserimento risposta checkbox")

def createNewRadioAnswer(questionID, optionSelected, answerID):
    try:
        newRadioAnswer = RadioAnswer(question = questionID, number = optionSelected, id = str(answerID.id))
        session.add(newRadioAnswer)
        session.commit()
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore inserimento risposta radio button")

def createNewFileAnswer(value, questionID, answerID):
    try:
        try:
            name = value + ' file'
            file = request.files.get(name)
        except Exception as e:
            return render_template("error.html", error = e, message = "Errore, non è possibile ottenere il nome del file")
        if file.filename != "":
            extension = file.filename.split(".")[1]
            newName = "fileQ"+str(questionID)+"A"+str(answerID)+"."+extension
            try:
                print("prova")
                newFileAnswer = FileAnswer(id = str(answerID), question = questionID, path = newName)
                print("Inserito")
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
        return render_template("error.html", error = e, message = "Errore durante il salvataggio del file")


def getTemplate(templateID):
    try:
        return session.query(Survey).filter(Survey.id == templateID).first()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante il caricamento del template")

def disableForm(formID):
    form = getFormByID(formID)
    try:
        form.active = False
        session.commit()
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore nella disattivazione del form")

def activeForm(formID):
    form = getFormByID(formID)
    try:
        form.active = True
        session.commit()
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore nell'attivazione del form")

def deleteForm(form):
    try:
        form.deleted = True
        session.commit()
    except Exception as e:
        session.rollback()
        return render_template("error.html", error = e, message = "Errore nella cancellazione del form")

def getUserPassword(userEmail):
    try:
        return session.query(Utenti.password).filter(Utenti.email == userEmail).first()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore: non è possibile caricare la password")

def getAllMyTemplates():
    try:
        return session.query(Survey).filter(Survey.maker == current_user.get_id()).filter(Survey.template == True).filter(Survey.deleted == False).all()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante il caricamento dei form")


def createNewUser(email, password, firstName, surname):
    try:
        user = Utenti(email = email, password = password, first_name = firstName, surname = surname)
        session.add(user)
        session.commit()
    except Exception as e:
        return render_template("error.html", error = e, message = "Errore durante la registrazione di un nuovo utente")