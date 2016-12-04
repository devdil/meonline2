 function AlbumView() {
     "use strict";
     var CREATE_ALBUM_SUBMIT = "#createAlbumButton";
     var ALBUM_REST_URI = "/rest/albums";
     var ALBUM_LAYOUT = '<tr></tr>';
     var ALBUM_TABLE = '#albumTableContent';

     function handleOnCreateAlbum() {

         var form = new FormData($("#createAlbumForm")[0]);
         $.ajax({
             url: ALBUM_REST_URI,
             method: "POST",
             dataType: 'json',
             data: form,
             processData: false,
             contentType: false,
             success: function(result) {},
             error: function(error) {}
         });
     }


     function getImagesFromAlbum() {
         // do a ajax call to get all the images from the album Repository
         $.ajax({
             url: ALBUM_REST_URI,
             method: "GET",
             dataType: 'json',
             success: function(data, status, jqXHR) {
             	layoutAbumDetailsAndShow(data);
             },
             error: function(jqXHR, status, err) {
                 alert("Error callback");
             },
             complete: function(jqXHR, status) {}
         });

     }

     function layoutAbumDetailsAndShow(albumResources) {
         var albumTRContent = '<tr>';
         $.each(albumResources, function(index, item) {
         	if (item.images){}
             var tdContent = "<td><img width='300px' height='200px' src=" + 
             "http://www.freedigitalphotos.net/images/img/homepage/87357.jpg" + 
             "><p class = 'text-left' > "+item.name +
             "</p><p class = 'text-left' > "+item.description+
             "</p></td>";
             if (index % 4 != 0) {
                 albumTRContent += tdContent;
             } else {
                 albumTRContent += '</tr><tr>';
             }

         });
         
         albumTRContent += '</tr>';
         $(ALBUM_TABLE).append(albumTRContent);

     }


     this.init = function() {

         //attaching event handlers
         $(CREATE_ALBUM_SUBMIT).on('click', handleOnCreateAlbum);
         getImagesFromAlbum();
     }

 }

 var albumView = new AlbumView();
 albumView.init();