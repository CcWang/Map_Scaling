
import logging

import json
from django.shortcuts import render

from django.http import HttpResponse
from my_pokemon_api import *
from db_accessor import *

logger = logging.getLogger("worker")
# Create your views here.

class Config:
    pass

def add_crawl_point(request):
    
    logger.info("I am in add_crawl_pointt")

    # Crawl pokemon data


    # 1. get cell id from request
    request_obj = json.loads(request.body)
    cell_id = request_obj["cell_id"]

    #2. call my search api
    config = Config()
    config.auth_service = "ptc"
    config.username="testuser"
    config.password="testuser"
    config.proxy="sock5://127.0.0.1:9050"
    
    api = init_api(config)
    search_response=search_point(cell_id, api)
    result = parse_pokemon(search_response) 
    
    logger.info("Crawl result:{0}".format(json.dumps(result, indent=2)))
    #3. Store serach result into databases
    for pokemon in result:

        add_pokemon_to_db(pokemon["encounter_id"],
                        pokemon["expiration_timestamp_ms"],
                        pokemon["pokemon_id"],
                        pokemon["longitude"],
                        pokemon["latitude"],
                )

    return HttpResponse("Result")
