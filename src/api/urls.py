
from django.urls import path
from .views import RoomView, CreateRoomView

urlpatterns = [
    path('get-room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view())
]
