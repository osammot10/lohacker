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

    def toString(self):
        return "id: {0}, text: {1}, type: {2}".format(self.id, self.text, self.type)

class OpenQuestion(Base):
    __tablename__ = "OpenQuestion"

    id = Column(Integer, ForeignKey(Question.id), primary_key = True, autoincrement = True)
    text = Column(String)

class CheckboxQuestion(Base):
    __tablename__ = "CheckboxQuestion"

    id = Column(Integer,ForeignKey(Question.id), primary_key=True, autoincrement=True)
    number = Column(Integer, primary_key=True)
    text = Column(String)

class Answer(Base):
    __tablename__ = "Answer"

    id = Column(Integer, primary_key = True, autoincrement = True)
    survey = Column(Integer, ForeignKey(Survey.id), primary_key = True, autoincrement = True)
    maker = Column(Integer, ForeignKey(Utenti.id), primary_key = True, autoincrement = True)
    date = Column(Date)

class OpenAnswer(Base):
    __tablename__ = "OpenAnswer"

    question = Column(Integer, ForeignKey(OpenQuestion.id), primary_key=True, autoincrement=True)
    text = Column(String)
    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)

class CheckboxAnswer(Base):
    __tablename__ = "CheckboxAnswer"

    question = Column(Integer, ForeignKey(CheckboxQuestion.id), primary_key=True, autoincrement=True)
    number = Column(Integer, ForeignKey(CheckboxQuestion.number), primary_key=True, autoincrement=True)
    id = Column(Integer, ForeignKey(Answer.id), primary_key = True, autoincrement = True)

q = Question(Survey)