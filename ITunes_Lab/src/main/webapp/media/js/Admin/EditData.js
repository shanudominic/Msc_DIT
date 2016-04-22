function getUpdatedPlayList(deviceId){
	$.ajax({
		type: 'GET',
		url : 'rest/user/getDevicePlaylist/'+deviceId,
		contentType: "application/json",
		success: function(data){
			if(data==""){
				window.alert("No data");
			}
			else{
				$("#Playlist1 tbody").empty();
				markup1 = [];
				$.each(data, function(i, playlist){
					markup1.push("<tr>");
					markup1.push("<td>" + playlist.playlistId + "</td>");
					markup1.push("<td>" + playlist.playlistName + "</td>");
					markup1.push("</tr>");
				})
				$("#Playlist1 tbody").append(markup1.join("")); 
				$("#Playlist1").trigger('update');
				document.getElementById("Playlist1").style.display = "table";
			}
		}
 })
};
function getUserEditLibraries() {
	hideTable();
	 $.ajax({
			type: 'GET',
			url : 'rest/user/getUserLibraries/'+window.sessionStorage.getItem("UserName"),
			contentType: "application/json",
			success: function(data){
				if(data==""){
					window.alert("No Data");
				}
				else{
					$("#UserLibrary1 tbody").empty();
 					markup0 =[];
 					$.each(data, function(i, library){
						markup0.push("<tr>");
						markup0.push("<td>" + (i+1) + "</td>");
						markup0.push("<td>" + library.uniqueId + "</td>");
						markup0.push("</tr>");
						
 					})
 					$("#UserLibrary1 tbody").append(markup0.join(""));
 					$("#UserLibrary1").trigger('update');
 					document.getElementById("UserLibrary1").style.display = "table";
				}
			}
	 })
};

$(function (){
	$('#semenu3').on('click', function(){
		getUserEditLibraries();
	});
	
	$('#UserLibrary1 tbody').on("click", "tr", function(e){
		document.getElementById("two2").style.visibility = "hidden";
		
		 var x = document.getElementById("UserLibrary1").getElementsByTagName("tbody")[0].getElementsByTagName("td").length;
		 for(i=0; i<x; i++){
			 $('#UserLibrary1 tbody tr td').eq(i).css("backgroundColor","");
		 }
		 $('td', this).css({ 'background-color' : 'yellow' });
		 
		 var deviceID = $(this).find('td').last().text();
		 window.sessionStorage.setItem("DeviceId", deviceID);
			 $.ajax({
					type: 'GET',
					url : 'rest/user/getDevicePlaylist/'+deviceID,
					contentType: "application/json",
					success: function(data){
						if(data==""){
							window.alert("No data");
						}
						else{
							$("#Playlist1 tbody").empty();
		 					markup1 = [];
		 					$.each(data, function(i, playlist){
		 						markup1.push("<tr>");
								markup1.push("<td>" + playlist.playlistId + "</td>");
								markup1.push("<td>" + playlist.playlistName + "</td>");
								markup1.push("</tr>");
		 					})
		 					$("#Playlist1 tbody").append(markup1.join("")); 
		 					$("#Playlist1").trigger('update');
		 					document.getElementById("Playlist1").style.display = "table";
						}
					}
			 })
		});
		
	$('#Playlist1 tbody').on("click", "tr", function(e){
		 var x = document.getElementById("Playlist1").getElementsByTagName("tbody")[0].getElementsByTagName("td").length;
		 for(i=0; i<x; i++){
			 $('#Playlist1 tbody tr td').eq(i).css("backgroundColor","");
		 }
		 $('td', this).css({ 'background-color' : 'yellow' });
		 
		 var playlistID = $(this).find('td').first().text();
		 document.getElementById("PlayListID").value = $(this).find('td').first().text();
		 document.getElementById("playlistname").value = $(this).find('td').last().text();
		 document.getElementById("two2").style.visibility = "visible";
		 $('#playlistname').focus();
		 
		});
	
	$('#save').on("click",function(){
		 var my_arr = [];
		 my_arr.push($("#PlayListID").val());
		 my_arr.push($("#playlistname").val());
		 var jsonString = JSON.stringify(my_arr);
			$.ajax({
					type: 'POST',
					url : 'rest/user/updatePlayList/',
					contentType: "application/json",
					data: jsonString,
					success: function(data){
						document.getElementById("two2").style.visibility = "hidden";
						window.alert('successfully updated');
						getUpdatedPlayList(window.sessionStorage.getItem("DeviceId"));
					},
					error: function(data){
						window.alert('Error occured while Updating Playlist Name. \nPlease try again');
						$('#playlistname').focus();
					}
			 
			 })
	});
	$('#cancelSave').on("click",function(){
		document.getElementById("two2").style.visibility = "hidden";
		getUpdatedPlayList(window.sessionStorage.getItem("DeviceId"));
	});
	
	$('#Delete1').on("click",function(){
		var val = confirm('Are you sure you want to remove this playlist?');
		if (val) {
			$.ajax({
				type: 'POST',
				url : 'rest/user/removePlaylist/',
				contentType: "application/json",
				data: JSON.stringify($("#PlayListID").val()),
				success: function(data){
					document.getElementById("two2").style.visibility = "hidden";
					window.alert('successfully deleted the playlist');
					getUpdatedPlayList(window.sessionStorage.getItem("DeviceId"));
				},
				error: function(data){
					window.alert('Error occured while removing Playlist. \nPlease try again');
				}
		 
			})
		}
		
	});
	
});