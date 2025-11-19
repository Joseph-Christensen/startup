import React from 'react';

import {GameNotifier } from './gameNotifier';
import './playerNotif.css';

export function Players(props) {
  const username = props.username;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    GameNotifier.addHandler(handleGameEvent);

    return () => {
      GameNotifier.removeHandler(handleGameEvent);
    };
  });

  function handleGameEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = `${event.from} just found the weapon in ${event.value.score} guesses!`;

      messageArray.push(
        <div key={i} className='event'>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className='players'>
      Player
      <span className='player-name'>{username}</span>
      <div id='player-messages'>{createMessageArray()}</div>
    </div>
  );
}