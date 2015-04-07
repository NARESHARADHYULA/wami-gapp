This step-by-step tutorial will guide you through deploying an audio collection HIT on Amazon Mechanica Turk, using the Google App Engine to host the web app and store the audio.  An example of the interface deployed is on this project's [homepage](http://code.google.com/p/wami-gapp/).

  1. First, **run through the entire [Google App Engine tutorial](http://code.google.com/p/wami-gapp/wiki/GoogleAppEngineTutorial)**.
  1. **Check that you can do the following**:
    * Record audio at `http://NAME.appspot.com/client/index.html`
    * Play the audio back.
    * View and play the audio from the Blob Viewer web interface of Google App Engine.
  1. **Take a look at your** `app.yaml` **file**.
    * Notice that, in addition to `public/client`, the `public/turk` directory is also configured with a URL.
    * **Browse to**`http://NAME.appspot.com/turk/index.html` **to view the HIT** that we will be deploying.
    * It should look like the one on the front page of this project.
  1. **Register for [Amazon Mechanical Turk](https://www.mturk.com/mturk/welcome)** or use an existing Amazon account to sign in.
    * You will need an AWS account, since AMT is an Amazon Web Service.
    * They will ask for a credit card, but will not charge it until you use the service.
    * In this tutorial, we stick with the sandbox, which costs nothing.
  1. Rather than using the real AMT site linked to above, **log in to the [requester sandbox](https://requestersandbox.mturk.com/)** instead.
    * Using the sandbox is just like the real site, but doesn't cost anything.
    * It is always a good idea to test your HIT here before deploying the real thing.
  1. **Browse to the [Design](https://requestersandbox.mturk.com/start) tab** to create a HIT template.
    * If prompted with "Select the work you are asking Workers to do:" choose "Other".
    * **Find and use the Blank Template** by clicking _Start with This Template_.
    * Fill out the properties as you see fit and **move on to Design Layout**.
  1. Here we are going to replace the entire contents of the HIT with our own code.
    * In the Design Layout tab, click **Edit HTML Source**.
    * **Copy the demarcated code from** `~/wami-gapp/public/turk/index.html` **to the AMT's HTML source editor**.
    * **Add the complete URL path to recordHIT.`*`** as suggested in the comments.
    * Notice, in particular, the variable `${prompts}` in the code.  This will be filled in by a file we upload.
    * Note that if you just close the HTML source editor your HIT won't look like much, but that is OK.
    * **Select _Preview and Finish_ and then check** that your HIT looks satisfactory.
    * If it all looks good click **Finish** to create the template.
  1. **Browse to the [Publish](https://requestersandbox.mturk.com/batches/new) tab** to use your template to deploy a new task to the sandbox.
    * **Select your template** from the list.
    * At this point you should have the opportunity to upload input data to your HIT.
      * If you do not, it is likely that something went wrong during the design phase.
      * re you sure you clicked _Edit HTML Source_ and pasted the source correctly?
  1. **Upload a file** containing the prompts (in batches separated by `<>` if desired).
    * An example file of movie title prompts can be found at `~/wami-gapp/public/turk/movies.txt`.
    * There are a number of special characters due to AMT and Javascript parsing.
    * Double quotes (`"`) should surround all the prompts for a given HIT, so it cannot be found within one.
    * A single prompt cannot directly contain the prompt delimiter sequence (`<>`).
    * Use [HTML escape codes](http://www.escapecodes.info/) to put these special characters in.
  1. Once uploaded you should have a chance to **preview of the HIT containing the prompts**.
    * **Publish the HITs**.  Don't worry, if you are indeed using the sandbox, it will not cost you money.
  1. **Use the [worker sandbox](https://workersandbox.mturk.com/) to test your HIT**.
    * Make sure to test it all the way through to submission.
  1. To view the results, **return to the requestor sandbox's [Manage](https://requestersandbox.mturk.com/batches) tab**.
    * **Click on the _Results_ button** of your HITs.
    * You should see a submitted HIT with some meta-information.
    * You should also see the submitted audio URLs.
    * **Click the audio URLs or download them to make sure the audio is really there.**
    * A browser that understands WAV, such as Chrome, should be able to play the audio by clicking on the links directly.
    * Double check that your audio is going to your Google App Engine account.
  1. **Download the audio**
    * Get them one at a time by right-clicking on the links.
    * Use a command line tool such as `wget` or `curl`.
    * Download in batch by giving a list of links to a script or an external download tool.  (recommendations for such tools welcome)