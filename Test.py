from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


db = mysql.connector.connect(
    host= "localhost", 
    user="root", 
    password="Mohammed32", 
    database="Racing"
)
@app.route("/")
def home():
    return "Flask server is running"
@app.route("/add-race", methods=["POST"])
def add_race():
    data = request.json
    cursor = db.cursor()
    try:
        cursor.callproc("AddRace", [
            data["raceId"],
            data["raceName"],
            data["trackName"],
            data["raceDate"],
            data["raceTime"],
            data["horse1"],
            data["result1"],
            data["prize1"],
            data["horse2"],
            data["result2"],
            data["prize2"],
            data.get("horse3", "horse2"),  # optional
            data.get("result3", "horse3"),
            data.get("prize3", 0)
        ])
        db.commit()
        return jsonify({"Status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        cursor.close()
if __name__ == "__main__":
    app.run(host="0.0.0.0" ,port=5001, debug=True)