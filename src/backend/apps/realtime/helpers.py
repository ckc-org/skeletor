def make_realtime_room_key(user):
    return f"user_socket_{user.pk}"
