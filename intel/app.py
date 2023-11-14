from flask import Flask, render_template, request, jsonify, flash
import time
import requests

# Pangea multi pBot API endpoint 
token = "pts_h6nko2dtxo3xg4wwairw5qygmdsy3oob"

# Intel Endpoints
ip_intel_url = 'https://ip-intel.aws.eu.pangea.cloud/v1/reputation'
domain_intel_url = 'https://domain-intel.aws.eu.pangea.cloud/v1/whois'
user_intel_url = 'https://user-intel.aws.eu.pangea.cloud/v1/user/breached'

headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json',
}

app = Flask(__name__, template_folder='templates', static_folder='static')
# app.secret_key = 'your_secret_key'  # Change this to a secure secret key

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit/ip', methods=['POST'])
def submit_ip():
    try:
        ip_address = request.form['ip']

        data = {
                'ip': ip_address,
            }
        response = requests.post(ip_intel_url, headers=headers, json=data)
        if response.status_code == 200:
            # Extract meaningful information from the response
            result = response.json().get('result', {})
            data = result.get('data', {})
            category = data.get('category', [])
            score = data.get('score', 0)
            verdict = data.get('verdict', '')

            # Construct a simplified response
            simplified_response = {
                'category': category,
                'score': score,
                'verdict': verdict
            }
            ip_intel = {'message': f'IP Intel response for {ip_address}, \n {simplified_response}'}
            return jsonify(ip_intel)
        else:
            # Handle error response
            return jsonify({'error': f'Request failed with status code {response.status_code}'})

    except KeyError:
        return jsonify({'error': 'IP address not provided'}), 400

@app.route('/submit/domain', methods=['POST'])
def submit_domain():
    try:
        domain = request.form['domain']
        data = {
                'domain': domain,
                "provider":"whoisxml",
            }
        response = requests.post(domain_intel_url, headers=headers, json=data)
        
        if response.status_code == 200:
            # Extract meaningful information from the response
            result = response.json().get('result', {})
            data = result.get('data', {})
            
            domain_name = data.get('domain_name', '')
            created_date = data.get('created_date', '')
            updated_date = data.get('updated_date', '')
            expires_date = data.get('expires_date', '')
            host_names = data.get('host_names', [])
            ips = data.get('ips', [])
            registrar_name = data.get('registrar_name', '')
            contact_email = data.get('contact_email', '')
            estimated_domain_age = data.get('estimated_domain_age', 0)
            domain_availability = data.get('domain_availability', '')
            registrant_organization = data.get('registrant_organization', '')
            registrant_country = data.get('registrant_country', '')

            # Construct a simplified response
            simplified_response = {
                'domain_name': domain_name,
                'created_date': created_date,
                'updated_date': updated_date,
                'expires_date': expires_date,
                'host_names': host_names,
                'ips': ips,
                'registrar_name': registrar_name,
                'contact_email': contact_email,
                'estimated_domain_age': estimated_domain_age,
                'domain_availability': domain_availability,
                'registrant_organization': registrant_organization,
                'registrant_country': registrant_country
            }
            response_data = {'message': f'Domain Intel response for {domain}; \n {simplified_response}'}
            return jsonify(response_data)
        else:
            # Handle error response
            return jsonify({'error': f'Request failed with status code {response.status_code}'})  
    except KeyError:
        return jsonify({'error': 'Domain not provided'}), 400

@app.route('/submit/user', methods=['POST'])
def submit_user():
    try:
        user = request.form['user']
        data = {
                'email': user,
                "provider":"spycloud",
            }
        response = requests.post(user_intel_url, headers=headers, json=data)

        if response.status_code == 200:
            # Extract meaningful information from the response
            result = response.json().get('result', {})
            data = result.get('data', {})
            summary = response.json().get('summary', '')

            found_in_breach = data.get('found_in_breach', False)
            breach_count = data.get('breach_count', 0)

            # Construct a simplified response
            simplified_response = {
                'summary': summary,
                'found_in_breach': found_in_breach,
                'breach_count': breach_count
                
            }
            response_data = {'message': f'User Intel response for {user}; \n {simplified_response}'}
            return jsonify(response_data)
        else:
            # Handle error response
            return jsonify({'error': f'Request failed with status code {response.status_code}'})  
    except KeyError:
        return jsonify({'error': 'User not provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
