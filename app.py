from flask import Flask, request, send_from_directory
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/submit', methods=['POST'])
def submit():
    email = request.form['email']
    try:
        msg = MIMEText(f'Email: {email}')
        msg['Subject'] = 'Demo Request'
        msg['From'] = 'dpreddy11@gmail.com'
        msg['To'] = 'dpreddy11@gmail.com'
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('dpreddy11@gmail.com', 'meos naoa ffkd xbee')
        server.sendmail('dpreddy11@gmail.com', 'dpreddy11@gmail.com', msg.as_string())
        server.quit()
        return 'Demo request submitted successfully! Our executive will contact you soon.'
    except Exception as e:
        return f'Error: {str(e)}'

if __name__ == '__main__':
    app.run(debug=True, port=3000)