from flask import Flask, render_template, request, redirect, url_for, session

# import sqlite3
# db = sqlite3.connect("book_collection.db")

from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///new-books-collection.db"
db = SQLAlchemy(app)

class Book( db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True, nullable=False)
    author = db.Column(db.String(120), unique=True, nullable=False)
    rating = db.Column(db.String(100))

    # def __repr__(self):
    #     return '<User %r>' % self.username



db.create_all()










@app.route('/')

def home():

    all_books = db.session.query(Book).all()


    return render_template('index.html',books = all_books)


@app.route("/add",methods=["GET","POST"])
def add():
    if request.method == "POST":
        new_book = Book(title =  request.form["book_name"], author = request.form["author"],rating=request.form["rating"])
        db.session.add(new_book)
        db.session.commit()


        return redirect('/')

    return render_template("add.html")


@app.route("/edit",methods=["POST","GET"])
def edit():

    if request.method == "POST":


        book_id = request.form["idd"]
        book_to_update = Book.query.get(book_id)
        print( request.form['new_rating'])


        book_to_update.rating = request.form['new_rating']


        db.session.commit()

        return redirect('/')
    book_id = request.args.get("id")
    book_selected = Book.query.get(book_id)
    return render_template("edit.html",book=book_selected)

@app.route("/delete",methods=["GET","POST"])
def delete():
    book_id = request.args.get("id")
    print(book_id)
    print("delete me aya")
    book_selected = Book.query.get(book_id)
    db.session.delete(book_selected)
    db.session.commit()
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)

