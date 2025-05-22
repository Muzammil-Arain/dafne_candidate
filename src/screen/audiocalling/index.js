import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RtcEngine from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VoiceCallScreen = () => {
  const appId = 'ec80363b7d284a049c8fd0a88a590b17'; // Replace with your Agora App ID
  const token = null; // Replace with your Agora Token
  const channelName = 'testChannel'; // Replace with your channel name

  const [engine, setEngine] = useState(null);
  console.log('====================================');
  console.log(engine,'engine');
  console.log('====================================');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    const initAgora = async () => {
      const rtcEngine = await RtcEngine.create(appId);
      setEngine(rtcEngine);

      rtcEngine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log('Joined channel successfully:', channel);
        setIsCallActive(true);
      });

      rtcEngine.addListener('UserOffline', (uid, reason) => {
        console.log('User went offline:', uid);
      });

      rtcEngine.addListener('Error', (error) => {
        console.error('Agora Error:', error);
      });

      await rtcEngine.enableAudio();
    };

    initAgora();

    return () => {
      if (engine) {
        engine.destroy();
      }
    };
  }, []);

  const joinChannel = async () => {
    if (engine) {
      await engine.joinChannel(token, channelName, null, 0);
    }
  };

  const leaveChannel = async () => {
    if (engine) {
      await engine.leaveChannel();
      setIsCallActive(false);
    }
  };

  const toggleMute = () => {
    if (engine) {
      engine.muteLocalAudioStream(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleSpeaker = () => {
    if (engine) {
      engine.setEnableSpeakerphone(!isSpeakerOn);
      setIsSpeakerOn(!isSpeakerOn);
    }
  };

  useEffect(() => {
    joinChannel();
  }, []);

  return (
    <LinearGradient
      colors={['#4e54c8', '#8f94fb']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Voice Call</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.callerName}>John Doe</Text>
        <Text style={styles.callStatus}>
          {isCallActive ? 'Connected' : 'Calling...'}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={toggleMute}>
          <Icon
            name={isMuted ? 'mic-off' : 'mic'}
            size={30}
            color="white"
          />
          <Text style={styles.actionText}>Mute</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.endCallButton]}
          onPress={leaveChannel}
        >
          <Icon name="call-end" size={30} color="white" />
          <Text style={styles.actionText}>End</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={toggleSpeaker}>
          <Icon
            name={isSpeakerOn ? 'volume-up' : 'volume-off'}
            size={30}
            color="white"
          />
          <Text style={styles.actionText}>Speaker</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  profileContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  callerName: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  callStatus: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 50,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    marginTop: 5,
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 40,
    padding: 20,
  },
});

export default VoiceCallScreen;
