# lohacker

TODO:

CONSTRAINT:
# Le opzioni di una domanda realizzata con radio button o checkbox devono essere distinte OK CHECK TRIGGER
# L'attributo type della tabella Questions può assumere solo i valori open, checkbox, radio e file. OK CHECK
# Un template non può essere anonimo (Survey.anonymous = false) OK CHECK

TRIGGER:
# Quando si inserisce una risposta, tutte le domande required devono avere una risposta OK FUNCTION
# Un questionario deve avere almeno una domanda (vale anche per la modifica e creazione di un template) OK FUNCTION
# Quando si inserisce una risposta ad un questionario, quest'ultimo deve essere attivo e non eliminato OK TRIGGER
# Quando si risponde ad un radio button solo un'opzione può essere selezionata OK

# TODO
Revisione nomi variabili
Cambiare nome oggeto Data Model da Survey a Form

