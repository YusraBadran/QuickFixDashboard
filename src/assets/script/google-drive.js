window.onload = handleClientLoad;
var clientId =
  "889778684361-ttcqb017jh7u2eeomdrmfriq43146thq.apps.googleusercontent.com";
var apiKey = "AIzaSyAgvpPHtkVQd4XeZmSqxsHesFXM-v8t0Qk";
var discoveryDocs =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

var scope = "https://www.googleapis.com/auth/drive";
var pickerApiLoaded = false;
var singinButton = document.getElementById("signin-button");
var signoutButton = document.getElementById("signout-button");
function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

function initClient() {
  gapi.client
    .init({
      apiKey: apiKey,
      clientId: clientId,
      discoveryDocs: [discoveryDocs],
      scope: scope,
    })
    .then(
      function () {
        // pickerApiLoaded = true;
        console.log(10);
        onSignIn(gapi.auth2.getAuthInstance().currentUser.get());
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        console.log(11);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        singinButton.onclick = handleSingin;
        signoutButton.onclick = handleSignout;
      },
      function (error) {}
    );
}
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log(isSignedIn);
    singinButton.style.display = "none";
    signoutButton.style.display = "block";
    checkFolder();
  } else {
    checkFolder();
    singinButton.style.display = "block";
    signoutButton.style.display = "none";
  }
}
// handleSingin click
function handleSingin() {
  gapi.auth2.getAuthInstance().signIn();
}
// handleSignout click
function handleSignout() {
  gapi.auth2.getAuthInstance().signOut();
}
function checkFolder() {
  gapi.client.drive.files
    .list({
      // give name of the folder to check
      q: 'name = "test"',
    })
    .then(function (response) {
      var files = response.result.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log("Folder Available");
        }
      } else {
        // if folder not available

        createFolder();
      }
    });
}
function createFolder() {
  var access_token = gapi.auth.getToken().access_token;
  var request = gapi.client.request({
    path: "drive/v2/files",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    body: {
      title: "Backup Folder",
      mimeType: "application/vnd.google-apps.folder",
    },
  });
  request.execute(function (response) {
    // folder is created
  });
}
function upload() {
  // set file metadata
  var metadata = {
    name: "name.txt",
    mimeType: "plain/text",
    parents: [parent_Folder_id],
  };
  var formData = new FormData();
  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  // set file as blob formate
  formData.append("file", file_in_blob_formate);
  fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + gapi.auth.getToken().access_token,
      }),
      body: formData,
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (value) {
      // file is uploaded
    });
}
function downloadFile() {
  // only file can be download able not folder or zip
  gapi.client.drive.files
    .get({
      // give id of file to download
      fileId: id_of_file,
      alt: "media",
    })
    .then(function (res) {
      // set the different type if file is not text file
      var blob = new Blob([res.body], { type: "plain/text" });
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      // give file name
      a.download = "file-name";
      a.click();
    });
}
