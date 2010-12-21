
  var map;
  var bounds = new google.maps.LatLngBounds();
  var overlay; 
  var map;
  var baseUrl="http://chart.apis.google.com/chart?chs=256x256";
  var global_index = 10;

  $(document).ready( function() {
    var styleMapType = new google.maps.StyledMapType(stylez, styledMapOptions);    

    var mapChartOptions = {
        getTileUrl: function(coord, zoom) {
            var lULP = new google.maps.Point(coord.x*256,(coord.y+1)*256);
            var lLRP = new google.maps.Point((coord.x+1)*256,coord.y*256);     
            var projectionMap = new MercatorProjection();
            var lULg = projectionMap.fromDivPixelToLatLng(lULP, zoom);
            var lLRg = projectionMap.fromDivPixelToLatLng(lLRP, zoom);                 
            return baseUrl+"&chd="+chd+"&chco="+chco+"&chld="+chld+"&chf="+chf+"&cht=map:fixed="+
               lULg.lat() +","+ lULg.lng() + "," + lLRg.lat() + "," + lLRg.lng();
        },
        tileSize: new google.maps.Size(256, 256),
        opacity:parseFloat(0.4),
        isPng: true
    };
    var mapChartType = new google.maps.ImageMapType(mapChartOptions);      

    var myOptions = {
      scrollwheel: false,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      zoom: 8,
      center: new google.maps.LatLng(18.93205126204314, -72.6361083984375)
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    map.overlayMapTypes.insertAt(2, mapChartType);
    map.mapTypes.set('labels', styleMapType);
    map.setMapTypeId('labels');
  
    google.maps.event.addListener(map, "zoom_changed", function() {
        if (map.getZoom() > 12) map.setZoom(12);
    });
  

    for (var i = 0; i<map_data.length; i++) {
      var marker_ = new IOMMarker(map_data[i], map_data[i].count, '/images/sites/maps/marker_image.png',map);
    }
  
    for (var j = 0; j<bbox.length; j++) {
      bounds.extend(new google.maps.LatLng(bbox[j].lat,bbox[j].lon));
    }

    map.fitBounds(bounds);
  
  
    //Positionate zoom controls
    positionZoomControls();
    $('#zoomIn').fadeIn();
    $('#zoomOut').fadeIn();
    window.onResize = positionZoomControls;
  
  });


  function positionZoomControls() {
    var column_position = $('#layout').offset().left;
    var map_position = $('#map').position().top + 40;
  
    $('#zoomIn').css('left',column_position+'px');
    $('#zoomIn').css('top',map_position+'px');
  
    $('#zoomOut').css('left',column_position+32+'px');
    $('#zoomOut').css('top',map_position+'px');
  }


  function zoomIn() {
    var zoom = map.getZoom();
    if (zoom<12) {
      map.setZoom(zoom+1);
    }
  }

  function zoomOut() {
    map.setZoom(map.getZoom() - 1);
  }






