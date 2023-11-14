import requests

url = 'https://ip-intel.aws.eu.pangea.cloud/v1/reputation'
headers = {
    'Authorization': 'Bearer pts_h6nko2dtxo3xg4wwairw5qygmdsy3oob',
    'Content-Type': 'application/json',
}

data = {
    'ip': '190.28.74.251',
}

response = requests.post(url, headers=headers, json=data)

print(response.json())
