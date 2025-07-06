import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import generateUniqueId from 'generate-unique-id';
import { useUser } from '@clerk/clerk-react';



export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function GolivePage() {
  const roomID = getUrlParams().get('roomID') || generateUniqueId({length:6});
  const {user} = useUser();
  const {fullName, primaryEmailAddress} = user || {};
  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:
        window.location.protocol + '//' + 
        window.location.host + window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Cohost',
    });
  }
  sharedLinks.push({
    name: 'Join as audience',
    url:
     window.location.protocol + '//' + 
     window.location.host + window.location.pathname +
      '?roomID=' +
      roomID +
      '&role=Audience',
  });
 // generate Kit Token
  const appID = parseInt(import.meta.env.VITE_ZEGOCLOUD_APPID) as number;
  const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET as string;
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, 
    serverSecret, roomID,  primaryEmailAddress?.id ||  generateUniqueId({length:6}),
    fullName || generateUniqueId({length:6})
  );


  // start the call
  let myMeeting = async (element:any) => {
      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
      });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
