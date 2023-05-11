import requests


def harvest_request(url, body=None):
    # Replace with your Harvest account ID and personal access token
    account_id = '736110'
    access_token = '2799260.pt.vhe5Mbna7sn7hG5P-otFin_pPsShGLAUVrD-zXKokYtmw6kfUMuM2xR37bVdEiUsp9weqDjb56jLFwL7zMbm1A'

    # Set the base URL for the Harvest API
    base_url = 'https://api.harvestapp.com/v2'

    # Set headers with your account ID and access token for authentication
    headers = {
        'Harvest-Account-ID': account_id,
        'Authorization': f'Bearer {access_token}',
        'User-Agent': 'MGMT2.0 (jess@ckcollab.com)',  # Replace with your app name and email
        'Content-Type': 'application/json',
    }

    # Make a GET request to retrieve all projects
    # response = requests.get(f'{base_url}/users/me', headers=headers)
    response = requests.get(f'{base_url}{url}', headers=headers)

    return response


def get_current_days_tracked_time():
    # get user
    resp = harvest_request('/users/me')
    print("USERS RESP", resp.json())

    user_id = resp.json()['id']

    resp = harvest_request('/time_entries/?from=2023-05-10')
    print("time entry RESP", resp.json())





