from django.urls import path
from . import views
from . import button_views

urlpatterns = [
  path('category_btns/', button_views.get_selection)
  
]