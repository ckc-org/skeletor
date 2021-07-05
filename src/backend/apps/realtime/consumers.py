import json

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from json import JSONDecodeError

from realtime.helpers import make_realtime_room_key


class RealtimeConsumer(AsyncJsonWebsocketConsumer):
    """This consumer helps hand off commits to Vue frontend.

    Example:
        from asgiref.sync import async_to_sync
        from channels.layers import get_channel_layer
        from realtime.helpers import make_realtime_room_key

        channel_layer = get_channel_layer()

        # TODO dont do this if generate results has not been clicked
        async_to_sync(channel_layer.group_send)(
            make_realtime_room_key(user),
            {
                "type": "update",
                "data": some_dictionary_of_data_for_frontend,
                "commit": 'activities/update',
            }
        )
    """

    async def connect(self):
        if self.scope["user"].is_anonymous:
            # Reject the connection
            await self.close()
            return

        await self.accept()

        # We make a "group" where the "key" of the group is made from
        # make_realtime_room_key. This is the "channel layer" NOT the
        # "web socket" layer. When messages are sent to groups they're
        # handled by consumer methods.
        await self.channel_layer.group_add(
            make_realtime_room_key(self.scope['user']),
            self.channel_name
        )

    async def disconnect(self):
        await self.channel_layer.group_discard(
            make_realtime_room_key(self.scope['user']),
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        """Wrapping the original receive to give back the user some kind of error."""
        try:
            await super().receive(text_data, bytes_data, **kwargs)
        except JSONDecodeError:
            await self.send_json({"message": "ERROR: Last message was not valid JSON!", "status": 400})

    async def receive_json(self, content, **kwargs):
        # TODO: We can handle realtime commands here, if we want?!
        pass

    # ------------------------------------------------------------------------
    # Methods below are "Groups" channel layer event handlers
    # ------------------------------------------------------------------------
    async def update(self, event):
        """Called from channel_layer.group_send's"""
        await self.send(json.dumps({
            "type": "update",
            "data": event['data'],
            "commit": event.get('commit')
        }))
