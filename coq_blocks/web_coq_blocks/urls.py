from django.urls import path
from web_coq_blocks import views


urlpatterns = [
    path('api/newdef/', views.new_definition, name='new_definition'),
    # path('items/<int:pk>/', views.item_detail, name='item-detail')
]
