from flask import *
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

app = Flask(__name__)

Base = declarative_base()
Base.metadata.schema = 'form'

engine = create_engine('postgresql://postgres:postgres@localhost/lohacker')
metadata = MetaData()

# Da inserire in ogni route
Session = sessionmaker(bind=engine)       # creazione della factory
session = Session()

app.config['SECRET_KEY'] = 'ubersecret'

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

    id = Column(Integer, primary_key=True)    # almeno un attributo deve fare parte della primary key
    email = Column(String)
    password = Column(String)
    first_name = Column(String)
    surname = Column(String)



@login_manager.user_loader # attenzione a questo !
def load_user ( user_id ):
    rs = session.query(Utenti).filter(Utenti.id == user_id)
    user = rs.first()

    return User(user.id, user.email, user.password, user.first_name, user.surname)

def get_user_by_email(email):
    rs = session.query(Utenti).filter(Utenti.email == email)
    user = rs.first()
    return User(user.id, user.email, user.password, user.first_name, user.surname)



  