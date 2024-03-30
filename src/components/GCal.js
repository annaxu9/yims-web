import React, { useState, useEffect } from 'react';
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = 'YOUR_CLIENT_ID';

const GCal = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: clientId,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
      }).then(() => {
        if (accessToken) {
          gapi.auth.setToken({ access_token: accessToken });
          fetchEvents();
        }
      });
    };
    gapi.load('client', initClient);
  }, [accessToken]);

  const onSuccess = (response) => {
    setAccessToken(response.accessToken);
  };

  const onFailure = (error) => {
    console.error(error);
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess: () => setAccessToken(null),
  });

  const fetchEvents = () => {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => {
      setEvents(response.result.items);
    });
  };

  return (
    <div>
      {!accessToken ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          scope="https://www.googleapis.com/auth/calendar.readonly"
        />
      ) : (
        <>
          <button onClick={signOut}>Logout</button>
          <ul>
            {events.map(event => (
              <li key={event.id}>{event.summary} ({new Date(event.start.dateTime).toLocaleString()})</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GCal;
