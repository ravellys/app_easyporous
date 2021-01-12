from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class DashboardViews(TemplateView):
    template_name = "dashboard/main-page/main_dashboard.html"
    # template_name = "base/index.html"