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
# This is for adding race & adding its results
@app.route("/add-race", methods=["POST"])
def add_race():
    data = request.json
    cursor = db.cursor()
    try:
        # Embedded SQL instead of calling stored procedure
        insert_sql = """
        INSERT INTO Race (raceId, raceName, trackName, raceDate, raceTime)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_sql, (
            data.get("raceId", ""),
            data.get("raceName", ""),
            data.get("trackName", ""),
            data.get("raceDate", ""),
            data.get("raceTime", "")
        ))
        insert_results_sql = """
        INSERT INTO RaceResults (raceId, horseId, results, prize)
        VALUES (%s, %s, %s, %s),
               (%s, %s, %s, %s),
               (%s, %s, %s, %s)
        """
        cursor.execute(insert_results_sql, (
            data.get("raceId", ""),
            data.get("horse1", ""),
            data.get("result1", ""),
            data.get("prize1", 0),
            data.get("raceId", ""),
            data.get("horse2", ""),
            data.get("result2", ""),
            data.get("prize2", 0),
            data.get("raceId", ""),
            data.get("horse3", ""),
            data.get("result3", ""),
            data.get("prize3", 0)
        ))
        db.commit()
        return jsonify({"status": "success"}), 200
    except mysql.connector.Error as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        cursor.close()
  
@app.route("/admin/manageOwners", methods=["DELETE"])
def del_owner():
    data = request.get_json()
    owner_id = data.get("ownerID")

    cursor = db.cursor()
    try:
        # Embedded SQL version
        delete_owns_sql = "DELETE FROM owns WHERE ownerId = %s"
        delete_owner_sql = "DELETE FROM Owner WHERE ownerId = %s"

        cursor.execute(delete_owns_sql, (owner_id,))
        cursor.execute(delete_owner_sql, (owner_id,))
        
        db.commit()
        return jsonify({"status": "success", "message": f"{owner_id} has been deleted successfully!"})
    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        cursor.close()

@app.route("/admin/manageHorses", methods=["POST"])
def move_horse():
    data = request.get_json()
    horse_ID = data.get("horseID")
    to_stable = data.get("toStable")

    cursor = db.cursor(dictionary=True)
    try: 
        query = "SELECT * FROM Horse WHERE horseId = %s"
        cursor.execute(query, (horse_ID, ))
        horse = cursor.fetchone()
        
        if horse:
          update_query = "UPDATE Horse SET stableId = %s WHERE horseId = %s"
          cursor.execute(update_query, (to_stable, horse_ID))
          db.commit()
#         Get the new horse
          cursor.execute("SELECT * FROM Horse WHERE horseId = %s", (horse_ID,))
          updated_horse = cursor.fetchone()
          return jsonify({"status": "success", "message": f"{horse_ID} moved to {to_stable}" ,"data": updated_horse}), 200
        else:
            return jsonify({"status": "error", "message": "Horse not found"}), 404
    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        cursor.close()
@app.route("/admin/manageTrainers", methods= ["POST"])
def add_trainer():
    data = request.get_json()
    trainerId  = data.get("trainerId")
    lName = data.get("lName")
    fName = data.get("fName")
    stable = data.get("stable")

    cursor = db.cursor()
    try:
        insert_query = "INSERT INTO Trainer (trainerId, lname, fname, stableId) VALUES (%s, %s, %s, %s)"
        cursor.execute(insert_query, (trainerId, lName, fName, stable))
        db.commit()
        return jsonify({"status": "success", "message": f"{fName} {lName} with {trainerId} has been added to {stable}" }), 200
    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        cursor.close()
if __name__ == "__main__":
    app.run(host="0.0.0.0" ,port=5001, debug=True)