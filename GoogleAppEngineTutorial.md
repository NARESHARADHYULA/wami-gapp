By the end of this step-by-step walkthrough, you should have a fully functioning WAMI recorder with an operational Google App Engine back-end.  An example of the final product can be found here:  https://wami-recorder.appspot.com/client/index.html

  1. **Make sure your system is up to date**, by getting the latest version of your OS, Browser, and Flash.
    * You may find Chrome to be a good choice since Flash is built right in.
    * Firefox or Safari will need Flash 10 or above.
    * Internet Explorer is another browser...
  1. **Install [Mercurial](http://mercurial.selenic.com/)**, the distributed source control management tool we use to manage this project.
  1. **Checkout the code** using the command line:
    * `cd ~/`
    * `hg clone https://code.google.com/p/wami-gapp/ `
  1. **Peruse the resulting directory.**  Make sure that `~/wami-gapp` contains `app.yaml` and a couple of directories.
  1. **Sign up for a [Google App Engine](http://code.google.com/appengine/) (GAE) account through the Google Developers website.**
  1. **Create a GAE application** through the Google App Engine web-interface by giving it a unique application identifier and a title.
    * This can be done by logging into GAE or right after signing up.
    * The app ID (e.g. `NAME`) will be a unique reference to your application.
    * The URL associated with your app will eventually be `https://NAME.appspot.com/`
  1. **Download the [Google App Engine SDK](http://code.google.com/appengine/downloads.html)** (the python version) for your OS.
    * For Mac and Windows users install the friendly graphical user interface.
    * Linux users will need to read the GAE documentation to figure out the command line version.
  1. Launch the Google App Engine SDK, go the the File menu, and select **Add Existing Application...**.
  1. **Browse in the file chooser and select ~/wami-gapp** to link the web app you have just checked out to the Google App Engine Launcher.
  1. **Select a port on which to run your application.**
    * The default, 8080, is probably fine.
    * You will only need to change this if you are simultaneously running another application that is bound to port 8080.
    * If 8080 does not work, try 8081.
  1. **Click "Run"** (as opposed to Deploy) to launch your application locally.
    * At this point, you should be able to **browse to**`http://localhost:8080/client/index.html`
    * You should be able to record.
    * You should be able to play back the audio.
  1. **Open**`app.yaml`**in a text editor.**
    * `app.yaml` is the main configuration file for a Google web-app.  It maps URLs to scripts, directories, files, etc.
    * The launcher has an `Edit` button which will open it, or you can just use your favorite text editor.
    * **Change the application name at the top** to reflect the name you chose through the Google App Engine web-interface.
    * **Make sure that**`/audio`**url maps correctly** to the `python/sessions.py` script.
  1. **Open**`index.html`**in a text editor**
    * **Map the urls to your app's location** (`recordUrl` and `playUrl` should point to `https://NAME.appspot.com/audio`)
  1. **Click deploy** and wait for the SDK to upload your application to Google's web servers.
    * You should now be able to **browse to**`https://NAME.appspot.com/client/index.html`
    * You should be able to **record audio**.
    * You should be able to **play back audio**.
  1. **Browse to the Blob Viewer** tab of your application's admin console.
    * Log into GAE and click admin console tab, and open the admin console for your application.
    * Along the left-hand-side are a number of useful features for managing your web app.
    * The Blob Viewer, under the Data section, provides an interface for looking at Binary Large OBjects stored in the blobstore.
    * You should be able to **view your audio in the Blob Viewer**.
    * Provided your browser understands WAV audio, you can even play the audio back in the browser.

<a href='Hidden comment: 
1.  Not the title (the unique ID) when replacing.
2.  Add Mercurial checkout instructions in both apps.
3.  Download the SDK.
4.  Browse... checkout
5.  Run vs. Deploy
6.  Confusing to http://localhost:8080/turk/index.html
7.  The CSV needs	headers.
Sandbox.
Dev
Path changes in URLs
Get default paths right.
'></a>