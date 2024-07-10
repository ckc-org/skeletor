# realtime

### Enable frontend websockets 

Modify the user store to create the websocket connection
```diff
  // Start listening to the websocket
- //useRealtimeStore().startListening()
+ useRealtimeStore().startListening()
```

### Send messages from backend

When you want to send a message to the frontend, you can do this in 
Django channels like so:

```py
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


# Send a realtime notification to the receiving cats user with the notification count
channel_layer = get_channel_layer()

async_to_sync(channel_layer.group_send)(
    make_realtime_room_key(receiving_cat.user),  # Room name
    {
        "type": "update",
        "args": [notification_count],  # pinia store update args
        "store": 'notifications',  # pinia store name
        "action": 'updateNotificationCount'  # pinia store action
    }
)
```
