from django.contrib import admin
from django.urls import path, include
from articles import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', views.fetch_articles),
    path('ai/define/', views.request_definition),
    path('ai/explain/', views.request_explanation),
    path('ai/search/', views.custom_search),
]
