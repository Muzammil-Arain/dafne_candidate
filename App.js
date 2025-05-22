import {StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import AudioCalling from './src/screen/audiocalling';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import VideoPlayer from 'react-native-video-player';

const App = () => {
  return (
    <SafeAreaProvider>
      {/* <AudioCalling /> */}
      <VideoPlayer
        // ref={playerRef}
        endWithThumbnail
        thumbnail={{
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        }}
        source={{
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        onError={e => console.log(e)}
        showDuration={true}
      />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
