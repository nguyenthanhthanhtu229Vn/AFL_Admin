const initAuth = () => {
    return window.gapi.auth2.init({
      client_id: "67772401711-q8r4726ido6n07e20hacno6fo7b7llar.apps.googleusercontent.com", //paste your client ID here
      scope: "https://www.googleapis.com/auth/analytics.readonly",
    });
  };