import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: number = 5): string {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;

  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return result;
}

export function getUrlParams(url: string = window.location.href): URLSearchParams {
  const urlStr = url.split('?')[1] || '';
  return new URLSearchParams(urlStr);
}

const App: React.FC = () => {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const callContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeMeeting = async () => {
      const appID = 603841385;
      const serverSecret = "ba8025d784b95bbbbb522058565f1f92";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5), // userID
        randomID(5)  // userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (callContainerRef.current) {
        zp.joinRoom({
          container: callContainerRef.current,
          sharedLinks: [
            {
              name: 'Copy link',
              url:
                window.location.protocol + '//' +
                window.location.host + window.location.pathname +
                '?roomID=' +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // Change to OneONoneCall for 1-on-1 calls
          },
        });
      }
    };

    initializeMeeting();
  }, [roomID]);

  return (
    <div
      className="myCallContainer"
      ref={callContainerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default App;
