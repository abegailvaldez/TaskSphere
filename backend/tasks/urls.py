from django.urls import path
from .views import UserCreateView, TaskListCreateView

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path("tasks/", TaskListCreateView.as_view(), name="task-list"),
]