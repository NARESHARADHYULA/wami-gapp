var Wami = window.Wami || {};

Wami.Turk = {};

Wami.Turk.setResultField = function(name, value) {
    var form = document.getElementById('mturk_form');

    if (!form) {
	alert("Expecting a form called 'mturk_form' that submits the HIT");
    }
    
    var previousField = document.getElementById(name);
    if (previousField) {
	form.removeChild(previousField);
    }
    
    var hiddenE = document.createElement('input');
    hiddenE.setAttribute('type', 'hidden');
    hiddenE.setAttribute('name', name);
    hiddenE.setAttribute('id', name);
    hiddenE.setAttribute('value', value);
    form.appendChild(hiddenE);
}

Wami.Turk.BrowserDetect = function() {
    var dataBrowser = [
			{
			    string: navigator.userAgent,
			    subString: "Chrome",
			    identity: "Chrome"
			},
			{ string: navigator.userAgent,
			  subString: "OmniWeb",
			  versionSearch: "OmniWeb/",
			  identity: "OmniWeb"
			},
			{
			    string: navigator.vendor,
			    subString: "Apple",
			    identity: "Safari",
			    versionSearch: "Version"
			},
			{
			    prop: window.opera,
			    identity: "Opera",
			    versionSearch: "Version"
			},
			{
			    string: navigator.vendor,
			    subString: "iCab",
			    identity: "iCab"
			},
			{
			    string: navigator.vendor,
			    subString: "KDE",
			    identity: "Konqueror"
			},
			{
			    string: navigator.userAgent,
			    subString: "Firefox",
			    identity: "Firefox"
			},
			{
			    string: navigator.vendor,
			    subString: "Camino",
			    identity: "Camino"
			},
			{// for newer Netscapes (6+)
			    string: navigator.userAgent,
			    subString: "Netscape",
			    identity: "Netscape"
			},
			{
			    string: navigator.userAgent,
			    subString: "MSIE",
			    identity: "Explorer",
			    versionSearch: "MSIE"
			},
			{
			    string: navigator.userAgent,
			    subString: "Gecko",
			    identity: "Mozilla",
			    versionSearch: "rv"
			},
			{ // for older Netscapes (4-)
			    string: navigator.userAgent,
			    subString: "Mozilla",
			    identity: "Netscape",
			    versionSearch: "Mozilla"
			}
		       ];
     var dataOS = [
		       {
			   string: navigator.platform,
			   subString: "Win",
			   identity: "Windows"
		       },
		       {
			   string: navigator.platform,
			   subString: "Mac",
			   identity: "Mac"
		       },
		       {
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
		       },
		       {
			   string: navigator.platform,
			   subString: "Linux",
			   identity: "Linux"
		       }
		       ];
    
    function searchString(data) {
	for (var i=0;i<data.length;i++){
	    var dataString = data[i].string;
	    var dataProp = data[i].prop;
	    this.versionSearchString = data[i].versionSearch || data[i].identity;
	    if (dataString) {
		if (dataString.indexOf(data[i].subString) != -1)
		    return data[i].identity;
	    }
	    else if (dataProp)
		return data[i].identity;
	}
    }
    
    function searchVersion(dataString) {
	var index = dataString.indexOf(this.versionSearchString);
	if (index == -1) return;
	return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    }
    
    this.browser = searchString(dataBrowser) || "An unknown browser";
    this.version = searchVersion(navigator.userAgent)
	|| searchVersion(navigator.appVersion)
	|| "an unknown version";
    this.OS = searchString(dataOS) || "an unknown OS";
}