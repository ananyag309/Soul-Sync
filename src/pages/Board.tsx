import React, { useEffect } from "react";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const App: React.FC = () => {
  const appID = parseInt(import.meta.env.VITE_ZEGO_APP_ID);
  const serverUrl = import.meta.env.VITE_ZEGO_SERVER_URL;
  const userID = "12345678";
  const roomID = "1234";
  const userName = "diva";
  const token =
    "04AAAAAGfzaqUADBdA8ZY0GjBtP8XBGACzxkIYHqGkhRtmx7p3hb0kQ4gT0Z7sD1tLk68Psurgz4AebtgbSon++QhrGiHw7pEJGQtG8KYzF/sq+OgioW1fMvV2QXfQ06JKuia0S/SpxC7AzyyxG4m4VtfJQLb/fhMU40w1KXddKlWk3riKN4q5cL7zuueLmJ/MYqN9oXWecuctrbfFDw+Ny63oyWFYjgYUVszX6TncavrNPMYLtTvGNdZJms+i03hu7K/Upg0Cuto+UwcB";

  const zg: ZegoExpressEngine = new ZegoExpressEngine(appID, serverUrl);
  const zegoSuperBoard = ZegoSuperBoardManager.getInstance();

  const initSuperBoard = async (): Promise<void> => {
    try {
      await zegoSuperBoard.init(zg, {
        parentDomID: "superboard",
        appID,
        userID,
        token,
        isTestEnv: false, // Set to true for testing mode
      });

      await zg.loginRoom(roomID, token, { userID, userName }, { userUpdate: true });

      await zegoSuperBoard.createWhiteboardView({
        name: "My learning platform",
        perPageWidth: 1600,
        perPageHeight: 900,
        pageCount: 1,
      });
    } catch (error) {
      console.error("Failed to initialize board:", error);
    }
  };

  useEffect(() => {
    initSuperBoard();
  }, []); // Runs only once when the component mounts

  return (
    <div>
      <h1>Whiteboard App</h1>
      <div id="superboard" style={{ width: "100%", height: "500px", border: "1px solid #ddd" }}></div>
    </div>
  );
};

export default App;
