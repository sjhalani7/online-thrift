import mysql.connector
import config
from flask import Flask
from flask import jsonify

conn = mysql.connector.connect(
    host=config.DB_HOST,
    port=config.DB_PORT,
    user=config.DB_USER,
    password=config.DB_PASS,
    database=config.DB_NAME,
)

cursor = conn.cursor()

app = Flask(__name__)


@app.route("/api/stores")
def get_stores():
    cursor.execute("SELECT * FROM stores")
    stores = cursor.fetchall()
    formatted_stores = [
        {"id": store[0], "name": store[1], "address": store[2], "hours": store[3]}
        for store in stores
    ]
    return jsonify(formatted_stores)


@app.route("/api/stores/<store_id>/items")
def get_store_items(store_id):
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
    return jsonify(formatted_items)


if __name__ == "__main__":
    app.run(debug=True)
