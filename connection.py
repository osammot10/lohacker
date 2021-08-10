from flask import *
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

import os
from werkzeug.utils import *

app = Flask(__name__)

Base = declarative_base()
Base.metadata.schema = 'form'

# postgresql(nome del server, non cambiare)://username:password@hostname/db_name
# username e password sono le credenziali con le quali si accede al db
# hostname è l'hostname o l'ip di dove si trova il server
engine = create_engine('postgresql://postgres:postgres@localhost/lohacker')
metadata = MetaData()

Session = sessionmaker(bind=engine)       # creazione della factory
session = Session()

app.config['SECRET_KEY'] = 'ubersecret'
app.config['UPLOAD_FOLDER'] = os.path.abspath(os.path.dirname(__file__)) + '/uploads'
app.config['CSV_FOLDER'] = os.path.abspath(os.path.dirname(__file__)) + '/csv'

login_manager = LoginManager()
login_manager.init_app(app)

# Classe per il mapping con flask_login
# Permette di tener traccia di un utente all'interno di una sessione 
class User ( UserMixin ):   #TODO estendere User con l'attributo Role
# costruttore di classe
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
    __tablename__ = 'User'                   # obbligatorio

    id = Column(Integer, primary_key=True, autoincrement=True)    # almeno un attributo deve fare parte della primary key
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


@login_manager.user_loader # attenzione a questo !
def load_user ( user_id ):
    rs = session.query(Utenti).filter(Utenti.id == user_id)
    user = rs.first()
    return User(user.id, user.email, user.password, user.first_name, user.surname)

def get_user_by_email(email):
    rs = session.query(Utenti).filter(Utenti.email == email)
    user = rs.first()
    return User(user.id, user.email, user.password, user.first_name, user.surname)

def get_key(val, dict):
    for key, value in dict.items():
         if val == value:
             return key
    print("prova")





  