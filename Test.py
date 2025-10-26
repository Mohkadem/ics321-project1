from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def create_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Mohammed32",
            database="racing"
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None
    
@app.route("/add-stable/", methods=["POST"])
def add_stable():
    data = request.json
    stableId = data.get("stableId")
    owner = data.get("owner")  # optional if you want owner stored somewhere
    location = data.get("location")
    color = data.get("color")

    connection = create_connection()
    if connection is None:
        return jsonify({"message": "Database connection failed"}), 500

    try:
        cursor = connection.cursor()
        query = "INSERT INTO Stable (stableId, stableName, location, colors) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (stableId, owner, location, color))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Stable added successfully"})
    except Error as e:
        return jsonify({"message": f"Error: {e}"}), 500

if __name__ == "__main__":
    app.run(port=5000)

def get_stables():
    connection = create_connection()
    if connection is None:
        return
    
    try:
        cursor = connection.cursor()
        query = "SELECT * FROM Stable"
        cursor.execute(query)
        
        results = cursor.fetchall()  # Fetch all rows
        for row in results:
            print(row)
        
        cursor.close()
        connection.close()
    except Error as e:
        print(f"Error: {e}")
