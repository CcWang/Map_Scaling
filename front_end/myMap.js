var map_manager = {
  "map":null,
  "map_items":[]

}
map_manager.map_items = [

  {
    "pokemon_id":12,
    "expire":1478735498,
    "longtitute":-122.4285031,
    "latitude":37.4848542,
  }
]
function loadMapScenario() {
    map_manager.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AqwKmBTiuFl3Xj5OwqSHS7mjxUFE9mvHA2513saLgRwABPbuuzEULooiIbYgK2Y2'
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
  var layer = new Microsoft.Maps.Layer();
  var pushpins=[];
  for(var i in map_items){
    var map_item = map_items[i];
    var pushpin = new Microsoft.Maps.Pushpin(
                        new Microsoft.Maps.Location(map_item["latitude"],map_item["longtitute"]),
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
  var time_left = epoch - now_time; //unit:second
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


window.setInterval(refresh_pokemon_layer,1000)
