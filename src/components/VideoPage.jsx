import React, { useRef, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from './constant';

const VideoPage = () => {
  const { id } = useParams();
  const roomID = id;
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateKitToken = async () => {
      try {
        const appID = APP_ID;
        const serverSecret = SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "vr_production");
        return kitToken;
      } catch (error) {
        console.error('Error generating kit token:', error);
        setError(error);
        return null;
      }
    };

    const joinRoom = async (kitToken) => {
      if (!kitToken) return;

      try {
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: containerRef.current,
          mode: 'desktop',
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
            mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            config: {
              layout: {
                mode: 'desktop', // Set the layout mode to desktop
              },
            },
          },
        });
        setLoading(false);
      } catch (error) {
        console.error('Error joining room:', error);
        setError(error);
      }
    };

    generateKitToken().then((kitToken) => {
      joinRoom(kitToken);
    });
  }, [roomID]);

  const Notification = () => {
    if (loading) {
      return (
        <div className="notification">
          <p>Loading...</p>
        </div>
      );
    } else if (error) {
      return (
        <div className="notification error">
          <p>Error: {error.message}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Notification />
      <div ref={containerRef}>

      </div>
    </div>
  );
};

export default VideoPage;
