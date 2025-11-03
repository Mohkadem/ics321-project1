from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def db_connection():
    return  mysql.connector.connect(
    host= "localhost", 
    user="root", 
    password="Mohammed32", 
    database="Racing"
)
@app.route("/")
def home():
    return "Flask server is running"
# This is for adding race & adding its results

# Amin Functionalities
# Adding race 
@app.route("/add-race", methods=["POST"])
def add_race():
    data = request.json
    db = db_connection()
    cursor = db.cursor()
    try:
        # Call the stored procedure via RacingDB method
        cursor.callproc("AddRace", [
            data.get("raceId", ""),
            data.get("raceName", ""),
            data.get("trackName", ""),
            data.get("raceDate", ""),
            data.get("raceTime", ""),
            data.get("horse1", ""),
            data.get("result1", ""),
            data.get("prize1", 0),
            data.get("horse2", ""),
            data.get("result2", ""),
            data.get("prize2", 0),
            data.get("horse3", ""),
            data.get("result3", ""),
            data.get("prize3", 0)
        ])
        db.commit() 

        return jsonify({"status": "success"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

  # Delete owner
@app.route("/admin/manageOwners", methods=["DELETE"])
def del_owner():
    data = request.get_json()
    owner_id = data.get("ownerId")
    db = db_connection()
    cursor = db.cursor()
    try:
        cursor.callproc("DeleteOwner", [owner_id])
        db.commit()
        return jsonify({"status": "success", "message": f"{owner_id} has been deleted successfully!"})
    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        cursor.close()
        db.close()

# Move Horses
@app.route("/admin/manageHorses", methods=["POST"])
def move_horse():
    data = request.json
    db = db_connection()
    cursor = db.cursor()
    horse_ID = data.get("horseID")
    to_stable = data.get("toStable")
    try: 
        cursor.callproc("MoveHorse", [horse_ID, to_stable])
        db.commit()
        return jsonify({"status": "success", "message": f"{horse_ID} moved to {to_stable}"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        cursor.close()
# This is the route that is defined in the App.jsx
        
# Approve trainers
@app.route("/admin/manageTrainers", methods= ["POST"]) # using post method because we want to send info to the server to be added to the database
def add_trainer():
    # Getting the data as from the request (which is raw json) into something that python understand (which is dictionary)
    data = request.json
    db = db_connection()
    cursor = db.cursor()
    # Getting the values we stored previously (via the frontend) and sent in the body of the request from the dictionary
    trainerId  = data.get("trainerId")
    lName = data.get("lName")
    fName = data.get("fName")
    stable = data.get("stable")
    # Making object of cursor, this is the tool to interact with the database as we will use it below
    try:
        
        cursor.callproc("ApproveTrainer", [trainerId, lName, fName, stable])
        db.commit()
        return jsonify({"status": "success", "message": f"{fName} {lName} with {trainerId} has been added to {stable}" }), 200
    except Exception as e:
        # The rollback is the completion of transaction concept (if some has succeed, reject all)
        db.rollback()
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        cursor.close()

# Guest Functionalities 
# Browse horses & search for specific one
@app.route("/browseHorses", methods=["GET"])
def BrowseHorse():
    db = db_connection()
    cursor = db.cursor()
    try:
        cursor.callproc("BrowseHorse")
        result = []
        print(result)
        for res in cursor.stored_results():
            rows = res.fetchall()
            columns = [col[0] for col in res.description]  # get column names
            for row in rows:
                result.append(dict(zip(columns, row)))  # map row values to column names

        return jsonify({"status": "success", "data": result})
    except Exception as e:
        print("ERROR in /home/browseHorses:", e)
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        cursor.close()


# Browse Trainers
@app.route("/browseTrainer", methods=["GET"])
def browse_trainers():
    db = db_connection()
    try:
        with db.cursor(dictionary=True) as cursor:
            cursor.execute("""
                SELECT CONCAT(t.fname, ' ', t.lname) AS Trainer_Name,
                       H.horseName,
                       R.raceName
                FROM Horse H
                JOIN RaceResults RR ON H.horseId = RR.horseId
                JOIN Race R ON RR.raceId = R.raceId
                JOIN Trainer T ON T.stableId = H.stableId
                WHERE RR.results = 'first';
            """)
            result = cursor.fetchall()  # Already a list of dicts
        return jsonify({"status": "success", "data": result})

    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
# Browse trainers and their total prizes
@app.route("/trainers", methods=["GET"])
def trainers():
    db = db_connection()
    cursor = db.cursor()
    try:
        cursor.callproc("winTrainers")
        result = []
        for res in cursor.stored_results():
            rows = res.fetchall()
            columns = [col[0] for col in res.description]
            for row in rows:
                result.append(dict(zip(columns, row)))
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        print("ERROR in /home/viewTracks:", e)
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        cursor.close()


@app.route("/viewTracks", methods= ["GET"])
def view_tracks(): 
    db = db_connection()

    try:
        with db.cursor(dictionary=True) as cursor: 
            cursor.execute(
            """
                SELECT T.trackName AS trackName,
                COUNT(DISTINCT R.raceId) AS raceCount,
                COUNT(DISTINCT RR.horseId) AS horseCount
                FROM Track T JOIN Race R ON T.trackName = R.trackName
                JOIN RaceResults RR on RR.raceId = R.raceId
                GROUP BY T.trackName;
            """)
            result = cursor.fetchall()
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        print("ERROR in /home/viewTracks:", e)
        return jsonify({"status": "error", "message": str(e)}), 500
    
@app.route("/horsesInStables", methods= ["GET"])
def view_horses_inStables(): 
    db = db_connection()
    try:
        with db.cursor(dictionary=True) as cursor: 
            cursor.execute(
            """
                SELECT 
    s.stableId,
    COUNT(h.horseId) AS numberOfHorses
FROM 
    Stable s
LEFT JOIN 
    Horse h ON s.stableId = h.stableId
GROUP BY 
    s.stableId
ORDER BY 
    s.stableId;
            """)
            result = cursor.fetchall()
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        print("ERROR in /home/horsesInStables:", e)
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/trainerHorses", methods= ["GET"])
def view_trainers_horses(): 
    db = db_connection()
    try:
        with db.cursor(dictionary=True) as cursor: 
            cursor.execute(
            """
                SELECT 
    t.trainerId,
    t.lname,
    t.fname,
    COUNT(h.horseId) AS num_horses
FROM Trainer t
LEFT JOIN Horse h ON t.stableId = h.stableId
GROUP BY t.trainerId, t.lname, t.fname
ORDER BY num_horses DESC;
            """)
            result = cursor.fetchall()
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        print("ERROR in /home/trainerHorses:", e)
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/ownersHorses", methods= ["GET"])
def view_owners_horses(): 
    db = db_connection()
    try:
        with db.cursor(dictionary=True) as cursor: 
            cursor.execute(
            """
                SELECT 
    o.ownerId,
    o.fname,
    o.lname,
    COUNT(ow.horseId) AS num_horses
FROM Owner o
LEFT JOIN Owns ow ON o.ownerId = ow.ownerId
GROUP BY o.ownerId, o.fname, o.lname
ORDER BY num_horses DESC;
            """)
            result = cursor.fetchall()
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        print("ERROR in /home/ownersHorses:", e)
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0" ,port=5001, debug=False)


    
