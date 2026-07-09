from django.urls import path
from .views import UserCreateView, login_view, logout_view, TaskListCreateView, TaskDetailView

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("tasks/", TaskListCreateView.as_view(), name="task-list"),
    path("tasks/<int:pk>/", TaskDetailView.as_view(), name="task-detail"),
]