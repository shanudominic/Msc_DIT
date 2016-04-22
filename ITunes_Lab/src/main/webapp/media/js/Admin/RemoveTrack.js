function getTracks(username){
		document.getElementById("two3").style.visibility = "hidden";
		 $.ajax({
				type: 'GET',
				url : 'rest/user/getUserPlayListTracks/'+username,
				contentType: "application/json",
				success: function(data){
					if(data==""){
						window.alert("No Data");
					}
					else{
						$("#Track1 tbody").empty();
	 					markup41 =[];
	 					$.each(data, function(i, track){
							markup41.push("<tr value="+ track.trackPK+">");
							markup41.push("<td>"+track.trackName+"</td>");
							markup41.push("<td>"+track.album+"</td>");
							markup41.push("<td>"+track.artist+"</td>");
							markup41.push("<td>"+track.composer+"</td>");
							markup41.push("<td>"+track.genre+"</td>");
							markup41.push("</tr>");
	 					})
	 					$("#Track1 tbody").append(markup41.join(""));
	 					$("#Track1").trigger('update');
					}
				}
		 })
	};
	
	$(function (){
		$('#semenu4').on('click', function(){
			getTracks(window.sessionStorage.getItem("UserName"));
		});
		
		$('#Track1 tbody').on("click", "tr", function(e){
			document.getElementById("two3").style.visibility = "hidden";
			
			 var x = document.getElementById("Track1").getElementsByTagName("tbody")[0].getElementsByTagName("td").length;
			 for(i=0; i<x; i++){
				 $('#Track1 tbody tr td').eq(i).css("backgroundColor","");
			 }
			 $('td', this).css({ 'background-color' : 'yellow' });
			 var trackID =$(this).attr("value");

			 document.getElementById("TrackID").value = trackID;
			 document.getElementById("Trackname").value = $(this).find('td').first().text();
			 document.getElementById("two3").style.visibility = "visible";
		});
		
		$('#delete').on("click",function(){
			var val = confirm('Are you sure you want to remove this track?');
			if (val) {
				$.ajax({
						type: 'POST',
						url : 'rest/user/removeTrack/',
						contentType: "application/json",
						data: JSON.stringify($("#TrackID").val()),
						success: function(data){
							document.getElementById("two3").style.visibility = "hidden";
							alert("successfully removed track");
							getTracks(window.sessionStorage.getItem("UserName"));
						},
						error: function(data){
							window.alert('Error occured while removing Track. \nPlease try again');
						}
				 
				 })
			}
		});
		$('#cancelDelete').on("click",function(){
			document.getElementById("two3").style.visibility = "hidden";
			getTracks(window.sessionStorage.getItem("UserName"));
		});
	});