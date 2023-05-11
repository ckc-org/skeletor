import requests


def send_message(message):
    print("what is message?", message)

    # TODO: Need to be in .env
    # real channel
    # webhook_url = 'https://hooks.slack.com/services/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'

    # test channel
    webhook_url = 'https://hooks.slack.com/services/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'

    payload = {
        'text': message
    }

    # Send the message using a POST request
    response = requests.post(webhook_url, json=payload)

    print("Message successfully sent to Slack")
    print(response.status_code)
