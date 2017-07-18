var map;//記錄地圖
var data = "";//記錄取得的資料
var markers = [];//記錄載入的標記
var tableData = [];//記錄載入的表單資料
var currentInfoWindow = '';//記錄載入的說明視窗

//監聽select
var tbody = document.querySelector('.js-tbody');
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
  		showmarkers(data[i].wgs84aY,data[i].wgs84aX,data[i].CHR_Name);
    }

  }
}

//放置標記與說明
function showmarkers (lat,lng,title) {
  var infowindow = new google.maps.InfoWindow({
    content: title
  });
  var marker = new google.maps.Marker({
    position: {lat: parseFloat(lat), lng: parseFloat(lng)},//字串轉數字
    title: title,
    map: map,
  });
  marker.addListener('click',function(){
    //將目前info關掉
  	if(currentInfoWindow != ''){
  		currentInfoWindow.close();   
      currentInfoWindow = '';   
  	}
    //開起點擊的info
  	infowindow.open(map, marker);   
    currentInfoWindow = infowindow; 
  });
  markers.push(marker);
}

//Select改變時，更新標記與表單資料
function  changeSelectList (e){
	for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);   
  }
  markers = []; 
  infoWindows = [];
  for(var i = 0; i < data.length; i++){
    if(data[i].CHR_Area == e.target.value){
      showmarkers(data[i].wgs84aY,data[i].wgs84aX,data[i].CHR_Name);
      var dict = {
        area : data[i].CHR_Area,
        name : data[i].CHR_Name,
        address : data[i].CHR_Address
      }
      tableData.push(dict);
      console.log(tableData);
      updateTable(tableData);
    }
  }
}

function updateTable (items) {
  var str = "";
  for (var i = 0; i < items.length; i++){
    str += '<tr><td>' + items[i].area + '</td><td>' + items[i].name + '</td><td>' + items[i].address + '</td></tr>'
  }
  console.log(tbody);
  tbody.innerHTML = str;
}



$(document).ready(function(){
  $('#content').hide();
  $('#select-list').on('change', function(e){
    $('#content').show();
    google.maps.event.trigger(map, 'resize');
    map.setCenter({lat: 25.0756191, lng: 121.5788063});
    //var target = e.target.dataset.target;
    //var target = document.getElementById('select-list').dataset.target;
    var target = $(this).attr('data-target'); 
    var offset = $(target).offset();
    $('html,body').animate({scrollTop : offset.top}, 1000);
  });
});