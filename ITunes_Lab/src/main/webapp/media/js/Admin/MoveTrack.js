$(function (){
		$('#semenu5').on('click', function(){
		document.getElementById("UserDevice").style.display = "none";
		document.getElementById("moveTrack").style.display = "none";
		document.getElementById("from").style.display = "none";
		document.getElementById("to").style.display = "none";
		document.getElementById("move").style.display = "none";
		
		 $.ajax({
				type: 'GET',
				url : 'rest/user/getUserLibraries/'+window.sessionStorage.getItem("UserName"),
				contentType: "application/json",
				success: function(data){
					if(data==""){
						window.alert("No Data");
					}
					else{
						$("#UserDevice tbody").empty();
	 					markup0 =[];
	 					$.each(data, function(i, library){
							markup0.push("<tr>");
							markup0.push("<td>" + (i+1) + "</td>");
							markup0.push("<td>" + library.uniqueId + "</td>");
							markup0.push("</tr>");
							
	 					});
	 					$("#UserDevice tbody").append(markup0.join(""));
	 					$("#UserDevice").trigger('update');
	 					document.getElementById("UserDevice").style.display = "table";
					}
				}
		 })
	});
	$('#UserDevice tbody').on("click", "tr", function(e){
		document.getElementById("moveTrack").style.display = "none";
		document.getElementById("from").style.display = "none";
		document.getElementById("to").style.display = "none";
		document.getElementById("move").style.display = "none";
		
		window.sessionStorage.setItem("playlistFrom", "");
		window.sessionStorage.setItem("playlistTo", "");
		window.sessionStorage.setItem("moveTrack", "");
		
		var x = document.getElementById("UserDevice").getElementsByTagName("tbody")[0].getElementsByTagName("td").length;
		 for(i=0; i<x; i++){
			 $('#UserDevice tbody tr td').eq(i).css("backgroundColor","");
		 }
		 $('td', this).css({ 'background-color' : 'yellow' });
		 
		 var deviceID = $(this).find('td').last().text();
			 $.ajax({
					type: 'GET',
					url : 'rest/user/getDevicePlaylist/'+deviceID,
					contentType: "application/json",
					success: function(data){
						if(data==""){
							window.alert("No data");
						}
						else{
							$("#PlaylistFrom tbody").empty();
							$("#PlaylistTo tbody").empty();
		 					markup1 = [];
		 					$.each(data, function(i, playlist){
		 						markup1.push("<tr>");
								markup1.push("<td>" + playlist.playlistId + "</td>");
								markup1.push("<td>" + playlist.playlistName + "</td>");
								markup1.push("</tr>");
		 					})
		 					$("#PlaylistFrom tbody").append(markup1.join("")); 
		 					$("#PlaylistTo tbody").append(markup1.join("")); 
		 					$("#PlaylistFrom").trigger('update');
		 					$("#PlaylistTo").trigger('update');
		 					document.getElementById("from").style.display = "block";
						}
					}
			 })
	});
	$('#PlaylistFrom tbody').on("click", "tr", function(e){
		document.getElementById("moveTrack").style.display = "none";
		document.getElementById("to").style.display = "none";
		document.getElementById("move").style.display = "none";
		
		window.sessionStorage.setItem("playlistFrom", "");
		window.sessionStorage.setItem("playlistTo", "");
		window.sessionStorage.setItem("moveTrack", "");
		
		
		 var x = document.getElementById("PlaylistFrom").getElementsByTagName("tbody")[0].getElementsByTagName("td").length;
		 for(i=0; i<x; i++){
			 $('#PlaylistFrom tbody tr td').eq(i).css("backgroundColor","");
		 }
		 $('td', this).css({ 'background-color' : 'lime' });
		 
		 var playlistID = $(this).find('td').first().text();
		 window.sessionStorage.setItem("playlistFrom", playlistID);
			$.ajax({
					type: 'GET',
					url : 'rest/user/getPlaylistTracks/'+playlistID,
					contentType: "application/json",
					success: function(data){
						$("#PlaylistMoveTrack tbody").empty();
						markup2 = [];
						if(data==""){
							var message = "**********************  NO DATA  **********************";
							markup2.push("<tr value=''>");
							markup2.push(" <td colspan='5'>"+ message+ "</td>");
							markup2.push("</tr>");
							$("#PlaylistMoveTrack tbody").append(markup2.join(""));
		 					$("#PlaylistMoveTrack").trigger('update');
		 					document.getElementById("moveTrack").style.display = "block";
							window.alert("No data");
						}
						else{
		 					$.each(data, function(i, playlistTrack){
		 						markup2.push("<tr value="+ playlistTrack[0] + ">");
								markup2.push("<td>" + playlistTrack[1] + "</td>");
								markup2.push("<td>" + playlistTrack[2] + "</td>");
								markup2.push("<td>" + playlistTrack[3] + "</td>");
								markup2.push("<td>" + playlistTrack[4] + "</td>");
								markup2.push("<td>" + playlistTrack[5] + "</td>");
								markup2.push("</tr>");
		 					})
		 					$("#PlaylistMoveTrack tbody").append(markup2.join(""));
		 					$("#PlaylistMoveTrack").trigger('update');
		 					document.getElementById("moveTrack").style.display = "block";
						}
					}
			 
			 })
	});
	$('#PlaylistMoveTrack tbody').on("click", "tr", function(e){
		document.getElementById("to").style.display = "none";
		document.getElementById("move").style.display = "none";

		window.sessionStorage.setItem("playlistTo", "");
		window.sessionStorage.setItem("moveTrack", "");
		
		var x = document.getElementById("PlaylistMoveTrack").getElementsByTagName("tbody")[0].getElementsByTagName("td").length;
		 for(i=0; i<x; i++){
			 $('#PlaylistMoveTrack tbody tr td').eq(i).css("backgroundColor","");
		 }
		 $('td', this).css({ 'background-color' : 'gold' });
		 
		 var trackID = $(this).attr("value");
		 window.sessionStorage.setItem("moveTrack", trackID);
		 
		 var x = document.getElementById("PlaylistTo").getElementsByTagName("tbody")[0].getElementsByTagName("td").length;
		 for(i=0; i<x; i++){
			 $('#PlaylistTo tbody tr td').eq(i).css("backgroundColor","");
		 }
		 document.getElementById("to").style.display = "block";
	});
	$('#PlaylistTo tbody').on("click", "tr", function(e){
		document.getElementById("move").style.display = "none";
		
		window.sessionStorage.setItem("playlistTo", "");
		
		var x = document.getElementById("PlaylistTo").getElementsByTagName("tbody")[0].getElementsByTagName("td").length;
		 for(i=0; i<x; i++){
			 $('#PlaylistTo tbody tr td').eq(i).css("backgroundColor","");
		 }
		 $('td', this).css({ 'background-color' : 'lime' });
		 var playlistID = $(this).find('td').first().text();
		 window.sessionStorage.setItem("playlistTo", playlistID);
		 document.getElementById("move").style.display = "inline-block";
		 
	});
	
	$('#move').on('click', function(){
		var my_arr = [];
		my_arr.push(window.sessionStorage.getItem("playlistFrom"));
		my_arr.push(window.sessionStorage.getItem("playlistTo"));
		my_arr.push(window.sessionStorage.getItem("moveTrack"));
		var jsonString = JSON.stringify(my_arr);
		
		var val = confirm('Are you sure you want to move this track?');
		if (val) {
			$.ajax({
				type: 'POST',
				url : 'rest/user/movePlayListTrack/',
				contentType: "application/json",
				data: jsonString,
				success: function(data){
					alert("successfully moved track");
					$('#semenu5').click();
				},
				error: function(data){
					window.alert('Error occured while moving Track. \nPlease try again');
				}
		 	})
		}
	});
});