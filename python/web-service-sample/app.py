from flask import Flask
from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy

import pickle
import numpy as np

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/db_project'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(30), nullable = False)
    email = db.Column(db.String(50), nullable = False)

with app.app_context():
    db.create_all()

model = 'models/logistic_regression_diabetes_model.pkl'
with open(model, 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    feature_input = request.get_json()

    name = feature_input['name']
    no_hp = feature_input['no_hp']
    pregnancies = int(feature_input['pregnancies'])
    glucose = int(feature_input['glucose'])
    bloodpressure = int(feature_input['bloodpressure'])
    skinthickness = int(feature_input['skinthickness'])
    insulin = int(feature_input['insulin'])
    bmi = float(feature_input['bmi'])
    diabetespedigree = float(feature_input['diabetespedigree'])
    age = int(feature_input['age'])

    features = [pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, diabetespedigree, age]
    prediction = model.predict([features])
    output = "DIABETES" if prediction[0] == 1 else "TIDAK DIABETES"

    return jsonify({
        "prediction_text": output,
        "input_data": {
            "Pregnancies": pregnancies,
            "Glucose": glucose,
            "Blood Pressure": bloodpressure,
            "Skin Thickness": skinthickness,
            "Insulin": insulin,
            "BMI": bmi,
            "Diabetes Pedigree": diabetespedigree,
            "Age": age
        }
    })

@app.route('/add-user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = Users(name = data['name'], email = data['email'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "data": data})

@app.route('/')
def home():
    return "Flask page intro"

@app.route('/about')
def about():
    return "About page"

@app.route('/service')
def service():
    return jsonify({"message": "Service page", "status": "Success"})

@app.post('/add-service')
def add_service():
    name = request.form['name']
    city = request.form['city']

    return jsonify({"name": name, "city": city})

if __name__ == '__main__':
    app.run(debug = True)