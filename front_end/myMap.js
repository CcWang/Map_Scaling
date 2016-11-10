var map_manager = {
  "map":null,
  "map_items":[]

}
map_manager.map_items = [

  {
    "pokemon_id":12,
    "expire":1478735498,
    "longitude":-122.446586608887,
    "latitude":37.3517337771191,
  }
]
function loadMapScenario() {
    map_manager.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AqwKmBTiuFl3Xj5OwqSHS7mjxUFE9mvHA2513saLgRwABPbuuzEULooiIbYgK2Y2',
         zoom: 15
    });
    add_pokemon_layer();

}
//1. Define pokemon data format, create mock pokemon data
  // need location (lati, longtitude)
  // pokemon_id
  //expire time

//2.Create pokemon image on map
  //create layer
function get_pokemon_layer_from_map_items(map_items){
  // console.log("check for map_items",map_items)
  var layer = new Microsoft.Maps.Layer();
  var pushpins=[];
  for(var i in map_items){
    var map_item = map_items[i];
    var pushpin = new Microsoft.Maps.Pushpin(
                        new Microsoft.Maps.Location(map_item["latitude"],map_item["longitude"]),
                        { icon: 'images/pushpin_images/pokemon/'+map_item["pokemon_id"]+".png",
                        //use pushpin title
                        title:get_counter_down_time_from_expire_epoch(map_item["expire"])
                      });
    pushpins.push(pushpin);
  }
  layer.add(pushpins);
  return layer;
}

function add_pokemon_layer(){
  var pokemon_layer =get_pokemon_layer_from_map_items(map_manager.map_items);
  map_manager.map.layers.insert(pokemon_layer)
}

//3. Add pokemon counter down refresh
function get_counter_down_time_from_expire_epoch(epoch){
  var now_time = new Date().getTime()/1000;
  var time_left = epoch / 1000 - now_time; //unit:second
  var second = Math.floor(time_left%60);
  var mins =Math.floor(time_left /60);
  return mins+":"+second;

}
function refresh_pokemon_layer(){
  //prepare new layer
  var pokemon_layer =get_pokemon_layer_from_map_items(map_manager.map_items);
  //remove old layer
  map_manager.map.layers.clear()
  //add new layer
  map_manager.map.layers.insert(pokemon_layer)
}


//4. Connect with REST APT
function refresh_pokemon_data(){

  //get boundary of current map view -- used bing api
  // console.log('map',map_manager.map)
  var bounds = map_manager.map.getBounds();
  //request pokemons in current map view
  //initialize AWS API

  var apigClient = apigClientFactory.newClient();
  var params = {
      north:bounds.getNorth(),
      south:bounds.getSouth(),
      west:bounds.getWest(),
      east:bounds.getEast(),
  };
  // console.log(params)
  var body={};
  var additionalParams = {};
  // mapPokemonsGET is from AWS API resource /map/pokemons get method
  apigClient.mapPokemonsGet(params, body, additionalParams)
      .then(function(result){
          //This is where you would put a success callback
          map_manager.map_items=result.data;
          // console.log(result)
      }).catch( function(result){
          //This is where you would put an error callback
          console.log(result)
      });
}

// refresh_pokemon_data()
// refresh_pokemon_layer()
window.setInterval(refresh_pokemon_data,1000)
window.setInterval(refresh_pokemon_layer,1000)
