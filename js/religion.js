var map;//記錄地圖
var data = "";//記錄取得的資料
var makers = [];//記錄載入的標記
var currentInfoWindow = '';//記錄載入的說明視窗

//監聽select
var selectList = document.querySelector('#select-list');
selectList.addEventListener('change', changeSelectList, false);

//一開始的地圖
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 25.0756191, lng: 121.5788063},
    zoom: 11
  });
  getData();
}
//取得資料並在此函數裡執行標記
function getData(){
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'https://raw.githubusercontent.com/kir7741/religion-map/gh-pages/str/religion.json');
  xhr.send(null);  
  xhr.onload = function(){
  	data = JSON.parse(xhr.responseText);
  	for(var i = 0; i < data.length; i++){
  		showmakers(data[i].wgs84aY,data[i].wgs84aX,data[i].CHR_Name);
  	}

  }
}

function showmakers (lat,lng,title) {
  var infowindow = new google.maps.InfoWindow({
    content: title
  });
  var marker = new google.maps.Marker({
    position: {lat: parseFloat(lat), lng: parseFloat(lng)},
    title: title,
    map: map,
  });
  maker.addListener('click',function(){
  	if(currentInfoWindow != ''){
  		currentInfoWindow.close();   
      currentInfoWindow = '';   
  	}
  	infowindow.open(map, marker);   
    currentInfoWindow = infowindow; 
  });
  markers.push(marker);
}

function  changeSelectList (e){
	for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);   
  }
  markers = []; 
  infoWindows = [];
  for(var i = 0; i < data.length; i++){
    if(data[i].CHR_Area == e.target.value){
      loadData(data[i].wgs84aY,data[i].wgs84aX,data[i].CHR_Name);
    }
  }
}
