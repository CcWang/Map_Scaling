import logging
import json


from django.shortcuts import render

from django.http import HttpResponse
# Create your views here.
def pokemons(request):
    return HttpResponse("Pokemons")

