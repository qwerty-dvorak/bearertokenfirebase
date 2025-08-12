fetch('/env')
  .then(res => res.json())
  .then(config => {
    firebase.initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      appId: config.appId,
      measurementId: config.measurementId
    });

    const provider = new firebase.auth.GoogleAuthProvider();
    document.getElementById('google-signin').onclick = () => {
      firebase.auth().signInWithPopup(provider)
        .then(result => result.user.getIdToken())
        .then(token => {
          document.getElementById('token').textContent = `Bearer ${token}`;
        })
        .catch(err => {
          document.getElementById('token').textContent = err.message;
        });
    };
  });
