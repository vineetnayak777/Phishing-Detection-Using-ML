	chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
	   let link = tabs[0].url;
	   document.getElementById('host').innerHTML = link;
   }
);

$(document).ready(function() {
    chrome.tabs.captureVisibleTab(null,{},function(dataUri){
        // document.open();
        // document.write('<img src="'+dataUri+'">');
        // document.close();
    console.log(dataUri);

	$("#scan").click(function() {
			var url = document.getElementById('host').innerHTML;
			$('#fafa').hide();
			$('#id1').hide();
			$('#id3').hide();
			$('#scan').hide();
			$('#loader').show();
			$('#id2').show();
			$('#ss').hide();
				// alert(url);
            $.ajax({
                url: "http://127.0.0.1:8000/api/",
                type: "POST",
                dataType: "json",
                data: {
                    url: url,
                    csrfmiddlewaretoken: '{{ csrf_token }}'
                    },
                success : function(success) {
                    alert("Successfully sent the URL to Django");
                },
                error : function(xhr) {
                	$('#loader').hide();
					if(xhr.status == 200){
						// document.open();
						// document.write(xhr.responseText);
						// document.close();
						let result = xhr.responseText;
						if(result == "Legitimate Url"){
							document.getElementById('UrlResult').style.color = "green";
						}else if(result == "Phishing Url"){
							document.getElementById('UrlResult').style.color = "red";
						}else{
						    document.getElementById('UrlResult').style.color = "yellow";
                        }
						document.getElementById('urlText').innerHTML = "The URL Scanning Result";
						document.getElementById('UrlResult').innerHTML = result;
	                    // alert(xhr.status + ": " + xhr.responseText);
					}else {
						alert("Error while Scanning Please try again");
					}
                }
            });

              $.ajax({
                        url:"http://127.0.0.1:8000/screenshot/",
                        type : "POST",
                        dataType: "json",
                        data : {
                            image : dataUri,csrfmiddlewaretoken: '{{ csrf_token }}',
                            url : url, csrfmiddlewaretoken: '{{ csrf_token }}'
                        },
                        success : function () {
                            // alert("Screenshot has been taken successfully");
                            alert("Error while taking Screen shot");
                        },
                        error : function (xhr) {
                            let result = xhr.responseText;
                            document.getElementById('ssText').innerHTML = "Screen Shot Result";
                            document.getElementById('ScreenShotResult').innerHTML = result;
                        }
                    })
                });
        });
    });