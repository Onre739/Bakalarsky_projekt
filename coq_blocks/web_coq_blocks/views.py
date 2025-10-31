# # Create your views here.
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NewTypeSerializer, HypothesisSerializer
import json
import os, sys
# Dynamicky přidej hlavní složku projektu do sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..'))  # jedna úroveň výš, kde máš BlockClasses.py
sys.path.append(PROJECT_ROOT)

from antlr import COQMain

from BlockClasses import *

def index(request):
    return render(request, 'web_coq_blocks/index.html', {})


# In-memory data store
items = []

@api_view(['GET', 'POST'])
def new_definition(request):
    if request.method == 'GET':
        # serializer = ItemSerializer(items, many=True)
        # return Response(serializer.data)
        pass
    
    elif request.method == 'POST':
        # Zpracování dat a volání funkce main
        try:
            textData = request.body.decode('utf-8')
            print("Text data: ", textData)

            # Vrací pole hypotéz a nových typů (objektů) 
            ObjResponse = COQMain.main(textData)

            hypothesis = []
            newTypes = []
            for obj in ObjResponse:
                if isinstance(obj, Hypothesis):  # Porovnání s třídou Hypothesis
                    hypothesis.append(obj)
                elif isinstance(obj, NewType):  # Porovnání s třídou NewType
                    newTypes.append(obj)

            # Převod python objektu na JSON objekt/slovník
            hypothesisData = HypothesisSerializer(hypothesis, many=True).data
            newTypesData = NewTypeSerializer(newTypes, many=True).data

            # Spojení 2 JSONů
            jsonResponse = {
                "hypothesis": hypothesisData,
                "newTypes": newTypesData
            }

            # Vracím přímo JSON slovník a ne JSON string bo to dělá Django automaticky
            return Response(jsonResponse, content_type='application/json', status=status.HTTP_201_CREATED)
        
        except Exception as e:
            import traceback
            print("Chyba v new_definition:", str(e))
            traceback.print_exc()   # vypíše celý stack trace do konzole
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # serializer = ItemSerializer(data=request.data)
        # if serializer.is_valid():
        #     items.append(serializer.validated_data)
        #     return Response(serializer.data, status=201)
        # return Response(serializer.errors, status=400)

# @api_view(['GET', 'PUT', 'DELETE'])
# def item_detail(request, pk):
#     try:
#         item = items[pk]
#     except IndexError:
#         return Response(status=404)

#     if request.method == 'GET':
#         serializer = ItemSerializer(item)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         serializer = ItemSerializer(data=request.data)
#         if serializer.is_valid():
#             items[pk] = serializer.validated_data
#             return Response(serializer.data)
#         return Response(serializer.errors, status=400)
    
#     elif request.method == 'DELETE':
#         items.pop(pk)
#         return Response(status=204)