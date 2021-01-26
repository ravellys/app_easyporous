from django.contrib.auth.decorators import login_required
from django.urls import path

from apps.dashboard.views import DashboardViews

urlpatterns = [
    path('', login_required(DashboardViews.as_view()), name="dashboard-main"),
]
