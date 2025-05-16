import sys
import os
from dotenv import load_dotenv
import datetime

load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from server.app.factory import create_app
from server.app.api.utils import get_db, send_summary_email

app = create_app() 
print("🚀 RemindRx Flask server started:", datetime.datetime.now()) #print everytime a new push is made and tmux is restarted

if __name__ == "__main__":
    try:
        db = get_db()
        #send_summary_email(db, 6)
    except Exception as e:
        print(f"Error sending summary email: {e}")

    app.run(host='0.0.0.0',port=8080, debug=True, use_reloader=False)
