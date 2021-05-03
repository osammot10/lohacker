from flask import *
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user

from datetime import date

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, contains_eager, joinedload, with_loader_criteria
from sqlalchemy.sql.expression import and_

app = Flask(__name__)

Base = declarative_base()
Base.metadata.schema = 'form'

# postgresql(nome del server, non cambiare)://username:password@hostname/db_name
# username e password sono le credenziali con le quali si accede al db
# hostname è l'hostname o l'ip di dove si trova il server
engine = create_engine('postgresql://postgres:postgres@localhost/lohacker')
metadata = MetaData()

# Da inserire in ogni route
Session = sessionmaker(bind=engine)       # creazione della factory
session = Session()

app.config['SECRET_KEY'] = 'ubersecret'

login_manager = LoginManager()
login_manager.init_app(app)

# Classe per il mapping con la tabella "User" del db 
class Utenti(Base):
    __tablename__ = 'User'                   # obbligatorio

    id = Column(Integer, primary_key=True)    # almeno un attributo deve fare parte della primary key
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

    def toString(self):
        return "id: {0}, maker_id: {1}, name: {2}, date: {3}".format(self.id, self.maker, self.name, self.date)

class Question(Base):
    __tablename__ = "Question"

    id = Column(Integer, primary_key=True, autoincrement=True)
    survey = Column(Integer, ForeignKey(Survey.id), primary_key=True)
    text = Column(String)
    type = Column(String)

    def toString(self):
        return "id: {0}, text: {1}, type: {2}".format(self.id, self.text, self.type)

class CheckboxQuestion(Base):
    __tablename__ = "CheckboxQuestion"

    id = Column(Integer,ForeignKey(Question.id), primary_key=True, autoincrement=True)
    number = Column(Integer, primary_key=True)
    text = Column(String)

    def toString(self):
        return "id: {0}, number: {1}, text: {2}".format(self.id, self.number, self.text)

class OpenAnswer(Base):
    __tablename__ = "OpenAnswer"

    question = Column(Integer, ForeignKey(Question.id), primary_key=True, autoincrement=True)
    text = Column(String)
    user = Column(Integer, ForeignKey(Utenti.id), primary_key=True)

    def toString(self):
        return "question: {0}, text: {1}, user: {2}".format(self.question, self.text, self.user)

class CheckboxAnswer(Base):
    __tablename__ = "CheckboxAnswer"

    question = Column(Integer, ForeignKey(CheckboxQuestion.id), primary_key=True, autoincrement=True)
    number = Column(Integer, ForeignKey(CheckboxQuestion.number), primary_key=True, autoincrement=True)
    user = Column(Integer, ForeignKey(Utenti.id), primary_key=True)

    def toString(self):
        return "question: {0}, number: {1}, user: {2}".format(self.question, self.number, self.user)


#s = session.query(Survey.id, Survey.name, Question.id, Question.text, Question.type, CheckboxQuestion.number, CheckboxQuestion.text, OpenAnswer.user, OpenAnswer.text, CheckboxAnswer.user, CheckboxAnswer.number).join(Question.survey == Survey.id, CheckboxQuestion.id == Question.id, OpenAnswer.question == Question.id, CheckboxAnswer.question == CheckboxQuestion.id).filter(Survey.id==17).all()
#print(s)

# Dati del questionario
print("Questionario\n")
s = session.query(Survey).filter(Survey.id == 18).first()
print(s.toString() + '\n')

checkbox = []
answerOpen = []
answerCheck = []

# Domande
print("Lista\n") 
question = session.query(Question.id, Question.text, Question.type).filter(Question.survey == 18).all()

for r in question:
    if r.type == 'open':
        a = session.query(OpenAnswer.question, OpenAnswer.text, OpenAnswer.user).filter(OpenAnswer.question == r.id).all()
        answerOpen += a
    elif r.type == 'checkbox':
        c = session.query(CheckboxQuestion.id, CheckboxQuestion.number, CheckboxQuestion.text).filter(CheckboxQuestion.id == r.id).all()
        checkbox += c

        u = session.query(CheckboxQuestion.id, CheckboxQuestion.number, func.count(CheckboxAnswer.number)).outerjoin(CheckboxAnswer, (CheckboxAnswer.question == CheckboxQuestion.id) & (CheckboxAnswer.number == CheckboxQuestion.number)).filter(CheckboxQuestion.id == 19).group_by(CheckboxQuestion.id, CheckboxQuestion.number).all()
        answerCheck += u

for r in question:
    print(r)

print('\n')

for r in answerOpen:
    print(r)

print('\n')

#l = zip(checkbox, answerCheck)

for r in checkbox:
    print(r)

print('\n')

for r in answerCheck:
    print(r)


#    l = []

#    s = session.query(Survey).filter(Survey.id == id).first()

#    question = session.query(Question.id, Question.text, Question.type).filter(Question.survey == id).all()

#    for r in question:
#        l.append(r)
#        if r.type == 'open':
#            a = session.query(OpenAnswer.question, OpenAnswer.text, OpenAnswer.user).filter(OpenAnswer.question == r.id).all()
#            for i in a:
#                l.append(i)
#        elif r.type == 'checkbox':
#            c = session.query(CheckboxQuestion.id, CheckboxQuestion.number, CheckboxQuestion.text).filter(CheckboxQuestion.id == r.id).all()
#            for i in c:
#                l.append(i) 

#            u = session.query(CheckboxQuestion.id, CheckboxQuestion.number, func.count(CheckboxAnswer.number)).outerjoin(CheckboxAnswer, (CheckboxAnswer.question == CheckboxQuestion.id) & (CheckboxAnswer.number == CheckboxQuestion.number)).filter(CheckboxQuestion.id == 19).group_by(CheckboxQuestion.id, CheckboxQuestion.number).all()
#            for i in u:
#                l.append(i)