var map;
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AqwKmBTiuFl3Xj5OwqSHS7mjxUFE9mvHA2513saLgRwABPbuuzEULooiIbYgK2Y2'
    });
    add_pokemon_layer();
}
//1. Define pokemon data format, create mock pokemon data
  // need location (lati, longtitude)
  // pokemon_id
  //expire time

map_items = [

  {
    "pokemon_id":12,
    "expire":1234567,
    "longtitute":-122.1703695,
    "latitude":37.425713,
  }
]
//2.Create pokemon image on map
  //create layer
function get_pokemon_layer_from_map_items(map_items){

  var layer = new Microsoft.Maps.Layer();
  // create own pushpin
  var pushpins=[];
  for(var i in map_items){
    var map_item = map_items[i];
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), { icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
    anchor: new Microsoft.Maps.Point(12, 39) });

  }
  var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), { icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
    anchor: new Microsoft.Maps.Point(12, 39) }
  var pushpins = Microsoft.Maps.TestDataGenerator.getPushpins(10, map.getBounds());
  layer.add(pushpins);
  return layer;
}

function add_pokemon_layer(){
  var pokemon_layer =get_pokemon_layer_from_map_items(map_items);
  map.layers.insert(pokemon_layer)
}

//3. Add pokemon counter down refresh

//4. Connect with REST APT
