var Turk = window.Turk || {};

/**
 * Assumes a standard format for MTurk forms on an HTML page:
 * <form name="mturk_form" ...>
 *   <input type="hidden" id="assignmentId" name="assignmentId" />
 *   ...
 *   <input type="submit" id="submitButton" value="Submit" />
 * </form>
 *
 * This optionally takes a validator, which returns true if the input of
 * a HIT is valid.
 */
Turk.setup = function(validator) {
    var assnElem = document.getElementById("assignmentId");
    var submitButton = document.getElementById('submitButton');

    var assignmentId = this.gup("assignmentId");

    if (document.referrer && ( document.referrer.indexOf('workersandbox') != -1) ) {
	var form = document.getElementById('mturk_form');
	form.action = "https://workersandbox.mturk.com/mturk/externalSubmit";
    } else {
	form.action = "https://www.mturk.com/mturk/externalSubmit";
    }

    if (!assignmentId) {
	submitButton.disabled = true;
    } else if (this.isPreview()) {
	submitButton.disabled = true;
	submitButton.value = "You must ACCEPT the HIT before you can submit the results.";
	submitButton.style.width = "400px";
    } else {
	assnElem.value = assignmentId;
    }

    if (validator) {
	if (submitButton.attachEvent) {
	    submitButton.attachEvent('onclick', validator); 
	} else {
	    submitButton.onclick = validator; 
	}
    }

    // Center the submit on the web-interface
    var parent = submitButton.parentNode;
    if (parent && parent.nodeName === "P") {
	parent.style.textAlign = 'center';
    }
    this.show('submitButton');

    var bd = new Turk.BrowserDetect();
    var browserInfo = bd.OS + " : " +bd.browser + " " + bd.version;
    var fp = Wami.swfobject.getFlashPlayerVersion();
    var flashInfo = "None";
    if (fp) {
	var flashInfo = "Flash Player " + fp.major + "." + fp.minor + "." + fp.release;
    }

    Turk.setResultField("platform", browserInfo);
    Turk.setResultField("flash", flashInfo);
}

Turk.isPreview = function() {
    var assignmentId = Turk.gup("assignmentId");
    return assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE";
} 

/**
 * Get a URL parameter of a given naem..
 */
Turk.gup = function(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    var results = regex.exec(tmpURL);
    if (!results) {
	return null;
    } else {
	return results[1];
    }
}

/**
 * Show an element of the DOM.
 */
Turk.show = function(id) {
    // safe function to show an element with a specified id
    if (document.getElementById) { // DOM3 = IE5, NS6
	var e = document.getElementById(id);
	if (e) {
	    e.style.display = 'block';
	}
    } else {
	if (document.layers) { // Netscape 4
	    if (document.id) {
		document.id.display = 'block';
	    }
	} else { // IE 4
	    if (document.all.id) {
		document.all.id.style.display = 'block';
	    }
	}
    }
}

/**
 * Hide an element of the DOM.
 */
Turk.hide = function(id) {
    // safe function to hide an element with a specified id
    if (document.getElementById) { // DOM3 = IE5, NS6
	var e = document.getElementById(id);
	if (e) {
	    e.style.display = 'none';
	}
    } else {
	if (document.layers) { // Netscape 4
	    if (document.id) {
		document.id.display = 'none';
	    }
	} else { // IE 4
	    if (document.all.id) {
		document.all.id.style.display = 'none';
	    }
	}
    }
}

/**
 * Set a result field (if submitted these will end up in Amazon's
 * database and the  Amazon Turk results)
 */
Turk.setResultField = function(name, value) {
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

Turk.BrowserDetect = function() {
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
