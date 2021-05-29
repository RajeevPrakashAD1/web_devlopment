# import sqlite3
# db = sqlite3.connect("book_collection.db")
#
#
# cursor = db.cursor()
#
#
#
#
# #cursor.execute("CREATE TABLE books (id INTEGER PRIMARY KEY, title varchar(250) NOT NULL UNIQUE, author varchar(250) NOT NULL, rating FLOAT NOT NULL)")
# # cursor.execute("INSERT INTO books VALUES(1, 'Harry Potter', 'J. K. Rowling', '9.3')")
# # db.commit()
# cursor.execute("INSERT INTO books VALUES(1, 'Harry Potter', 'J. K. Rowling', '9.3')")
# db.commit()

from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///new-books-collection.db"

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book = db.Column(db.String(80), unique=True, nullable=False)
    author = db.Column(db.String(120), unique=True, nullable=False)
    rating = db.Column(db.String(100))
    def __repr__(self):
        return '<User %r>' % self.username


db.create_all()

admin = User(book = "Harry Potter",author= "J. K. Rowling",rating="9")
db.session.add(admin)
db.session.commit()