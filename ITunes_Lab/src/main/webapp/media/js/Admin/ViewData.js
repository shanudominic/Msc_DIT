function hideTable() {
	document.getElementById("welcomeUser").innerHTML = "Welcome "
			+ window.sessionStorage.getItem("UserName");
	document.getElementById("UserLibrary2").style.display = "none";
	document.getElementById("UserLibrary1").style.display = "none";
	document.getElementById("Playlist").style.display = "none";
	document.getElementById("Playlist1").style.display = "none";
	document.getElementById("PlaylistTrack").style.display = "none";
	if (window.sessionStorage.getItem("greeting") == "true") {
		alert("Welcome back " + window.sessionStorage.getItem("UserName"));
		window.sessionStorage.setItem("greeting", "false");
	}
	document.getElementById("two2").style.visibility = "hidden";
}

function sendForm() {
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	    // Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	
	var val = $('#uploadedFile').val().split('\\')[2];
	if (val == undefined)
		window.alert("Please choose a file");
	else if((val.indexOf(".xml") >= 0)==false){
		window.alert("Please only choose XML backup file");
	}
	else {
		document.getElementById("progress").style.display = "block";
		$("body").css("cursor", "progress");
		document.getElementById("uploadedFile").disabled = true;
		document.getElementById("formSubmit").disabled = true;
		var new_Path = '/home/shanu/git/Msc_DIT/ITunes_Lab/' + val;
		
		var my_arr = [];
		if(isIE || isEdge)
			my_arr.push($('#uploadedFile').val());
		else
			my_arr.push(new_Path);
		my_arr.push(window.sessionStorage.getItem("UserName"));
		var jsonString = JSON.stringify(my_arr);
		
		$.ajax({
					type : 'POST',
					url : 'rest/xml/populateDB/',
					contentType : "application/json",
					data : jsonString,
					success : function(data, textStatus, xhr) {
						console.log(xhr.status);
					},
					error : function(xhr, textStatus, status, error) {
						if (xhr.status == 200){
							document.getElementById("progress").style.display = "none";
							$("body").css("cursor", "default");
							document.getElementById("uploadedFile").disabled = false;
							document.getElementById("formSubmit").disabled = false;
							window.alert("Data successfully added");
						}
						else{
							var errorMessage = xhr.responseText;
							if(errorMessage.indexOf("org.jboss.resteasy.spi.UnhandledException: javax.xml.bind.UnmarshalException: ") > -1){
								document.getElementById("progress").style.display = "none";
								$("body").css("cursor", "default");
								document.getElementById("uploadedFile").disabled = false;
								document.getElementById("formSubmit").disabled = false;
								window.alert("invalid xml file");
							}
							else{
								document.getElementById("progress").style.display = "none";
								$("body").css("cursor", "default");
								document.getElementById("uploadedFile").disabled = false;
								document.getElementById("formSubmit").disabled = false;
								window.alert("This device backup already exists. \nPlease try agin with a different backup");
							}
						}
					}
		});
	}
}
function getUserLibraries() {
	hideTable();
	$
			.ajax({
				type : 'GET',
				url : 'rest/user/getUserLibraries/'
						+ window.sessionStorage.getItem("UserName"),
				contentType : "application/json",
				success : function(data) {
					if (data == "") {
						window.alert("No Data");
					} else {
						$("#UserLibrary2 tbody").empty();
						markup0 = [];
						$.each(data, function(i, library) {
							markup0.push("<tr>");
							markup0.push("<td>" + (i + 1) + "</td>");
							markup0.push("<td>" + library.uniqueId + "</td>");
							markup0.push("</tr>");

						})
						$("#UserLibrary2 tbody").append(markup0.join(""));
						$("#UserLibrary2").trigger('update');
						document.getElementById("UserLibrary2").style.display = "table";
					}
				}
			})
}

$(function() {
	$('#UserLibrary2 tbody')
			.on(
					"click",
					"tr",
					function(e) {
						document.getElementById("PlaylistTrack").style.display = "none";

						var x = document.getElementById("UserLibrary2")
								.getElementsByTagName("tbody")[0]
								.getElementsByTagName("td").length;
						for (i = 0; i < x; i++) {
							$('#UserLibrary2 tbody tr td').eq(i).css(
									"backgroundColor", "");
						}
						$('td', this).css({
							'background-color' : 'yellow'
						});

						var deviceID = $(this).find('td').last().text();
						$
								.ajax({
									type : 'GET',
									url : 'rest/user/getDevicePlaylist/'
											+ deviceID,
									contentType : "application/json",
									success : function(data) {
										if (data == "") {
											window.alert("No data");
										} else {
											$("#Playlist tbody").empty();
											markup1 = [];
											$.each(data, function(i, playlist) {
												markup1.push("<tr>");
												markup1.push("<td>"
														+ playlist.playlistId
														+ "</td>");
												markup1.push("<td>"
														+ playlist.playlistName
														+ "</td>");
												markup1.push("</tr>");
											})
											$("#Playlist tbody").append(
													markup1.join(""));
											$("#Playlist").trigger('update');
											document.getElementById("Playlist").style.display = "table";
										}
									}
								})
					});

	$('#Playlist tbody')
			.on(
					"click",
					"tr",
					function(e) {
						document.getElementById("PlaylistTrack").style.display = "none";

						var x = document.getElementById("Playlist")
								.getElementsByTagName("tbody")[0]
								.getElementsByTagName("td").length;
						for (i = 0; i < x; i++) {
							$('#Playlist tbody tr td').eq(i).css(
									"backgroundColor", "");
						}
						$('td', this).css({
							'background-color' : 'yellow'
						});

						var playlistID = $(this).find('td').first().text();
						$
								.ajax({
									type : 'GET',
									url : 'rest/user/getPlaylistTracks/'
											+ playlistID,
									contentType : "application/json",
									success : function(data) {
										$("#PlaylistTrack tbody").empty();
										markup2 = [];
										if (data == "") {
											var message = "**********************  NO DATA  **********************";
											markup2.push("<tr>");
											markup2.push(" <td colspan='5'>"
													+ message + "</td>");
											markup2.push("</tr>");
											$("#PlaylistTrack tbody").append(
													markup2.join(""));
											$("#PlaylistTrack").trigger(
													'update');
											document
													.getElementById("PlaylistTrack").style.display = "table";
											window.alert("No data");
										} else {
											$.each(data, function(i,
													playlistTrack) {
												markup2.push("<tr>");
												markup2.push("<td>"
														+ playlistTrack[1]
														+ "</td>");
												markup2.push("<td>"
														+ playlistTrack[2]
														+ "</td>");
												markup2.push("<td>"
														+ playlistTrack[3]
														+ "</td>");
												markup2.push("<td>"
														+ playlistTrack[4]
														+ "</td>");
												markup2.push("<td>"
														+ playlistTrack[5]
														+ "</td>");
												markup2.push("</tr>");
											})
											$("#PlaylistTrack tbody").append(
													markup2.join(""));
											$("#PlaylistTrack").trigger(
													'update');
											document
													.getElementById("PlaylistTrack").style.display = "table";
										}
									}

								})
					});
	$('#semenu2').on('click', function() {
		getUserLibraries();
	});

	$('#logout').on("click", function() {
		sessionStorage.clear();
		localStorage.clear();
		window.location.replace("http://"+document.location.host+"/ITunes_Lab/");
	});

});