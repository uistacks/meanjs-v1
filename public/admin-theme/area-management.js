function initAreaManagementMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 25.0874817, lng: 55.1786495},
    zoom: 15
  });

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYLINE,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polyline']
    }
  });
  drawingManager.setMap(map);


  google.maps.event.addListener(drawingManager, 'overlaycomplete', drawComplete);
}

function drawComplete(event) {
  var theList = event.overlay.getPath().getArray();
  for (var indx in theList) {
    var objLatLng = theList[indx];
    console.log(objLatLng.lat() + " " + objLatLng.lng());
  }
}

