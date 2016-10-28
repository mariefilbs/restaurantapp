function initMap() {
        var atlanta = {lat: 33.751, lng:  -84.391};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16 ,
          center: atlanta,
        });
        var marker = new google.maps.Marker({
          position: atlanta,
          map: map
        });
      }
      export{initMap}