import mysql.connector
import config
from flask import Flask, jsonify, g
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_db_connection():
    if "db" not in g or not g.db.is_connected():
        g.db = mysql.connector.connect(
            host=config.DB_HOST,
            port=config.DB_PORT,
            user=config.DB_USER,
            password=config.DB_PASS,
            database=config.DB_NAME,
        )
    return g.db


@app.teardown_appcontext
def close_db_connection(exception=None):
    db = g.pop("db", None)
    if db is not None and db.is_connected():
        db.close()


@app.route("/api/stores")
def get_stores():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM stores")
    stores = cursor.fetchall()
    formatted_stores = [
        {
            "id": store[0],
            "name": store[1],
            "address": store[2],
            "hours": store[3],
            "image_url": store[4],
        }
        for store in stores
    ]
    cursor.close()
    return jsonify(formatted_stores)


@app.route("/api/stores/<store_id>/items")
def get_store_items(store_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items WHERE store_id = %s", (store_id,))
    items = cursor.fetchall()
    print(items)
    formatted_items = [
        {
            "id": item[0],
            "store_id": item[1],
            "name": item[2],
            "brand": item[3],
            "price": float(item[4]),
            "original_price": float(item[5]),
            "tags": item[6],
            "image_url": item[7],
            "description": item[8],
        }
        for item in items
    ]
    cursor.close()
    return jsonify(formatted_items)


@app.route("/api/stores/<store_id>/items/<item_id>")
def get_store_item(store_id, item_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM items WHERE store_id = %s AND id = %s", (store_id, item_id)
    )
    item = cursor.fetchone()
    if item is None:
        return jsonify({"error": "Item not found"}), 404

    formatted_item = {
        "id": item[0],
        "store_id": item[1],
        "name": item[2],
        "brand": item[3],
        "price": float(item[4]),
        "original_price": float(item[5]),
        "tags": item[6],
        "image_url": item[7],
        "description": item[8],
    }
    cursor.close()
    return jsonify(formatted_item)


if __name__ == "__main__":
    app.run(debug=True, port=5001)
