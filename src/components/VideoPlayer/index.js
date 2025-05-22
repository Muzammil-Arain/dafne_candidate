import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Platform,
  ViewPropTypes,
  AppState,
  Dimensions,
  StatusBar,
  BackHandler,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import Video from 'react-native-video';
import Slider from 'react-native-sliders';
import Orientation from 'react-native-orientation-locker';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../theme';

const MoVideoPlayer = ({
  style = {},
  source,
  poster,
  title = '',
  Type,
  isthisfullsreen,
  playList = [],
  autoPlay,
  playInBackground = false,
  showSeeking10SecondsButton = true,
  showHeader = true,
  showMuteButton = true,
  footerStyle,
  headerStyle,
}) => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(!autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoSeeked, setIsVideoSeeked] = useState(false);
  const [isVideoFocused, setIsVideoFocused] = useState(true);
  const [isShowSettingsBottomSheet, setIsShowSettingsBottomSheet] =
    useState(false);
  const [isShowVideoRateSettings, setIsShowVideoRateSettings] = useState(false);
  const [isShowVideoQualitiesSettings, setIsShowVideoQualitiesSettings] =
    useState(false);
  const [isShowVideoSoundSettings, setIsShowVideoSoundSettings] =
    useState(false);
  const [isShowVideoPlaylist, setIsShowVideoPlaylist] = useState(false);
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false);
  const [isErrorInLoadVideo, setIsVErrorInLoadVideo] = useState(false);
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const [isVideoCovered, setIsVideoCovered] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoQuality, setVideoQuality] = useState(480);
  const [videoSound, setVideoSound] = useState(1.0);
  const [currentVideoDuration, setCurrentVideoDuration] = useState(0);
  const [videoRate, setVideoRate] = useState(1);
  const [playlistSelectedVideo, setPlaylistSelectedVideo] = useState(null);
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [showloader, setShowLoader] = useState(false);

  const portraitStyle = {
    alignSelf: 'center',
    height: 200,
    width: 330,
    ...style,
  };
  const landScapeStyle = {
    alignSelf: 'center',
    height: dimension.height,
    width: dimension.width,
  };
  const videoStyle = isVideoFullScreen ? landScapeStyle : portraitStyle;

  useEffect(() => {
    const dimensionSubscriber = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimension(window);
        setIsVideoFullScreen(window.width > window.height ? true : false);
      },
    );

    const backHandlerSubscriber = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isVideoFullScreen) {
          Orientation.lockToPortrait();
          StatusBar.setHidden(false);
          isthisfullsreen;
          return true;
        } else {
          return false;
        }
      },
    );

    return () => {
      dimensionSubscriber.remove();
      backHandlerSubscriber.remove();
    };
  }, [isVideoFullScreen]);

  useEffect(() => {
    const appStateSubscriber = AppState.addEventListener('change', state => {
      console.log('APP STATE CHANGE IS ', state);
      if (playInBackground && isPaused == false) {
        setIsPaused(true);
      } else {
        setIsPaused(true);
      }
    });

    return () => {
      appStateSubscriber.remove();
    };
  }, [isPaused]);

  const videoHeaders = () => (
    <View
      style={{
        paddingHorizontal: 10,
        width: videoStyle.width,
        height: 35,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        zIndex: 100000,
        marginTop: 20,
      }}>
      {showMuteButton && (
        <TouchableOpacity
          style={[
            headerStyle,
            {
              backgroundColor: '#262626',
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              width: 35,
              height: 35,
              borderRadius: 100,
            },
          ]}
          onPress={() => {
            setIsMuted(!isMuted);
            if (isMuted && videoSound == 0) {
              setVideoSound(1.0);
            }
          }}>
          <Image
            source={
              isMuted
                ? require('./images/muteSound.png')
                : require('./images/fullSound.png')
            }
            style={{width: 15, height: 15}}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const videoFooter = () => (
    <View
      style={{
        width: videoStyle.width,
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100000,
      }}>
      <TouchableOpacity
        style={[
          footerStyle,
          {
            backgroundColor: '#262626',
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 35,
            height: 35,
            marginBottom: 40,
            borderRadius: 100,
          },
        ]}
        onPress={() => {
          if (isVideoEnd) {
            videoRef.current.seek(0);
            setIsVideoEnd(false);
            setCurrentVideoDuration(0);
            setIsPaused(false);
          } else {
            setIsPaused(!isPaused);
          }
        }}>
        <Image
          source={
            isPaused
              ? require('./images/play.png')
              : require('./images/pause.png')
          }
          style={{width: 15, height: 15}}
        />
      </TouchableOpacity>

      {Type && (
        <Slider
          //disabled={isRecordBeforePlay}
          maximumValue={videoDuration}
          minimumValue={0}
          minimumTrackTintColor="white"
          maximumTrackTintColor="gray"
          thumbTintColor="white"
          thumbStyle={{height: 12, width: 12}}
          trackStyle={{height: 1.8, width: videoStyle.width - 140}}
          useNativeDriver
          value={currentVideoDuration}
          onSlidingComplete={sliderData => {
            setCurrentVideoDuration(sliderData[0]);
            videoRef.current.seek(sliderData[0]);
          }}
        />
      )}

      {Type && (
        <Text style={{color: 'white', fontSize: 12}}>
          {new Date(currentVideoDuration * 1000).toISOString().substr(14, 5)} /
          <Text style={{color: 'white', fontSize: 14}}>
            {' '}
            {new Date(videoDuration * 1000).toISOString().substr(14, 5)}
          </Text>
        </Text>
      )}
    </View>
  );

  const videoSeekingIncreaseButton = () => (
    <>
      <TouchableOpacity
        style={{
          height: videoStyle.height - 70,
          justifyContent: 'center',
          alignItems: 'center',
          width: 35,
          borderColor: 'red',
          position: 'absolute',
          right: 30,
          top: 35,
          bottom: 0,
          zIndex: 100000,
        }}
        onPress={() => videoRef.current.seek(currentVideoDuration + 10)}>
        {Type && (
          <Image
            source={require('./images/increase10Seconds.png')}
            style={{width: 35, height: 35}}
          />
        )}
      </TouchableOpacity>

      {showloader && (
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            top: 200,
          }}>
          <ActivityIndicator color={Colors.White} size={45} />
        </View>
      )}
    </>
  );

  const videoSeekingDecreaseButton = () => (
    <TouchableOpacity
      style={{
        height: videoStyle.height - 70,
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        borderColor: 'red',
        position: 'absolute',
        left: 30,
        top: 35,
        bottom: 0,
        zIndex: 100000,
      }}
      onPress={() => videoRef.current.seek(currentVideoDuration - 10)}>
      {Type && (
        <Image
          source={require('./images/decrease10Seconds.png')}
          style={{width: 35, height: 35}}
        />
      )}
    </TouchableOpacity>
  );

  const videoSettingsView = () => (
    <TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0 ,0, 0,0.9)',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          ...videoStyle,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          onPress={() => {
            setIsShowSettingsBottomSheet(false);
            setIsVideoFocused(true);
          }}>
          <Image
            source={require('./images/close.png')}
            style={{width: 20, height: 22}}
          />
        </TouchableOpacity>

        <View
          style={{
            width: 170,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              setIsShowSettingsBottomSheet(false);
              setIsShowVideoQualitiesSettings(true);
            }}>
            <Image
              source={require('./images/quality.png')}
              style={{width: 31, height: 32}}
            />
            <Text style={{color: 'white', fontSize: 13}}>Quality</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              setIsShowSettingsBottomSheet(false);
              setIsShowVideoRateSettings(true);
            }}>
            <Image
              source={require('./images/speed.png')}
              style={{width: 25, height: 30}}
            />
            <Text style={{color: 'white', fontSize: 13}}>Speed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              setIsShowSettingsBottomSheet(false);
              setIsShowVideoSoundSettings(true);
            }}>
            <Image
              source={require('./images/soundMixer.png')}
              style={{width: 30, height: 32}}
            />
            <Text style={{color: 'white', fontSize: 13}}>Sound</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const videoRateSettingView = () => (
    <TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0 ,0, 0,0.9)',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          ...videoStyle,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          onPress={() => {
            setIsShowVideoRateSettings(false);
            setIsVideoFocused(true);
          }}>
          <Image
            source={require('./images/close.png')}
            style={{width: 25, height: 27}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 10,
            top: 10,
          }}
          onPress={() => {
            setIsShowVideoRateSettings(false);
            setIsShowSettingsBottomSheet(true);
          }}>
          <Image
            source={require('./images/back.png')}
            style={{width: 28, height: 23}}
          />
        </TouchableOpacity>

        <View
          style={{
            width: 230,
            height: 50,
            borderWidth: 0,
            borderColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 70,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoRate(0.5);
            }}>
            {videoRate == 0.5 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 15, height: 15}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoRate == 0.5 ? 3 : 0,
              }}>
              Slow
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 70,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoRate(1);
            }}>
            {videoRate == 1 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 15, height: 15}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoRate == 1 ? 3 : 0,
              }}>
              Normal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 70,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoRate(4);
            }}>
            {videoRate == 4 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 15, height: 15}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoRate == 4 ? 3 : 0,
              }}>
              Fast
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const videoQualitiesSettingView = () => (
    <TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0 ,0, 0,0.9)',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          ...videoStyle,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          onPress={() => {
            setIsShowVideoQualitiesSettings(false);
            setIsVideoFocused(true);
          }}>
          <Image
            source={require('./images/close.png')}
            style={{width: 25, height: 27}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 10,
            top: 10,
          }}
          onPress={() => {
            setIsShowVideoQualitiesSettings(false);
            setIsShowSettingsBottomSheet(true);
          }}>
          <Image
            source={require('./images/back.png')}
            style={{width: 27, height: 23}}
          />
        </TouchableOpacity>

        <View
          style={{
            width: 260,
            borderWidth: 0,
            borderColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoQuality(144);
            }}>
            {videoQuality == 144 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 10, height: 10}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoQuality == 144 ? 3 : 0,
              }}>
              144p
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoQuality(240);
            }}>
            {videoQuality == 240 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 10, height: 10}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoQuality == 240 ? 3 : 0,
              }}>
              240p
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoQuality(360);
            }}>
            {videoQuality == 360 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 10, height: 10}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoQuality == 360 ? 3 : 0,
              }}>
              360p
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoQuality(480);
            }}>
            {videoQuality == 480 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 10, height: 10}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoQuality == 480 ? 3 : 0,
              }}>
              480p
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 260,
            marginTop: 15,
            borderWidth: 0,
            borderColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoQuality(720);
            }}>
            {videoQuality == 720 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 10, height: 10}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoQuality == 720 ? 3 : 0,
              }}>
              720p
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoQuality(1080);
            }}>
            {videoQuality == 1080 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 10, height: 10}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoQuality == 1080 ? 3 : 0,
              }}>
              1080p
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoQuality(1440);
            }}>
            {videoQuality == 1440 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 10, height: 10}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoQuality == 1440 ? 3 : 0,
              }}>
              1440p
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 25,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 4,
            }}
            onPress={() => {
              setVideoQuality(2160);
            }}>
            {videoQuality == 2160 && (
              <Image
                source={require('./images/dot.png')}
                style={{width: 10, height: 10}}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                marginLeft: videoQuality == 2160 ? 3 : 0,
              }}>
              2160p
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const videoSoundView = () => (
    <TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0 ,0, 0,0.9)',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          ...videoStyle,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          onPress={() => {
            setIsShowVideoSoundSettings(false);
            setIsVideoFocused(true);
          }}>
          <Image
            source={require('./images/close.png')}
            style={{width: 20, height: 22}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 10,
            top: 10,
          }}
          onPress={() => {
            setIsShowVideoSoundSettings(false);
            setIsShowSettingsBottomSheet(true);
          }}>
          <Image
            source={require('./images/back.png')}
            style={{width: 23, height: 18}}
          />
        </TouchableOpacity>

        <Slider
          //disabled={isRecordBeforePlay}
          maximumValue={1}
          minimumValue={0}
          step={0.1}
          minimumTrackTintColor="white"
          maximumTrackTintColor="gray"
          thumbTintColor="white"
          thumbStyle={{height: 12, width: 12}}
          trackStyle={{height: 1.8, width: videoStyle.width - 130}}
          useNativeDriver
          value={videoSound}
          onSlidingComplete={sliderData => {
            console.log('TYPE OF', typeof Number(sliderData[0].toFixed(1)));
            setVideoSound(Number(sliderData[0].toFixed(1)));
            if (sliderData[0] == 0) {
              setIsMuted(true);
            } else {
              setIsMuted(false);
            }
          }}
        />

        <Text style={{color: 'white', fontsize: 14}}>{videoSound}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const videoSeekedLoader = () => (
    <View
      style={{
        height: videoStyle.height,
        width: videoStyle.width,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0 ,0, 0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );

  const videoErrorView = () => (
    <View
      style={{
        height: videoStyle.height,
        width: videoStyle.width,
        position: 'absolute',
        top: -10,
        left: 0,
        backgroundColor: 'rgba(0 ,0, 0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 60,
      }}>
      {/* <Image
        source={require('../../assets/Appicon.png')}
        style={{width: 90, height: 90}}
      /> */}
      <Text
        style={{
          textAlign: 'center',
          color: 'red',
          fontSize: 15,
          marginTop: 0,
        }}>
        Error play video, please try again
      </Text>
    </View>
  );

  const videoPosterView = () => (
    <Image
      source={{
        uri: playlistSelectedVideo
          ? playlistSelectedVideo.poster
            ? playlistSelectedVideo.poster
            : ''
          : poster,
      }}
      style={{
        height: videoStyle.height,
        width: videoStyle.width,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0 ,0, 0,0.5)',
      }}
    />
  );

  const videoPlaylistView = () => {
    console.log(
      'INDEX OF LIST  ',
      playlistSelectedVideo && playlistSelectedVideo.index > 0
        ? playlistSelectedVideo.index - 1
        : 0,
    );
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0 ,0, 0,0.9)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
            ...videoStyle,
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 10,
              top: 10,
            }}
            onPress={() => {
              setIsShowVideoPlaylist(false);
              setIsVideoFocused(true);
            }}>
            <Image
              source={require('./images/close.png')}
              style={{width: 20, height: 22}}
            />
          </TouchableOpacity>

          <View
            style={{
              marginVertical: 5,
              height: playlistSelectedVideo ? 140 : 120,
              marginHorizontal: 20,
            }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{alignItems: 'center'}}
              initialScrollIndex={
                playlistSelectedVideo && playlistSelectedVideo.index > 0
                  ? playlistSelectedVideo.index - 1
                  : 0
              }
              keyExtractor={(item, index) => index}
              data={playList}
              renderItem={({item, index}) => {
                const isSelected = playlistSelectedVideo
                  ? playlistSelectedVideo.url == item.url
                    ? true
                    : false
                  : false;
                return (
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: isSelected ? 150 : 130,
                      height: isSelected ? 140 : 120,
                    }}
                    onPress={() => {
                      if (isSelected) {
                        setIsPaused(!isPaused);
                        setIsShowVideoPlaylist(false);
                      } else {
                        videoRef.current.seek(0);
                        setPlaylistSelectedVideo({...item, index: index});
                        setIsPaused(false);
                        setIsShowVideoPlaylist(false);
                        setIsVideoFocused(true);
                      }
                    }}>
                    <Image
                      source={{uri: item.poster}}
                      resizeMode="stretch"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: isSelected ? 150 : 130,
                        height: isSelected ? 140 : 120,
                        borderRadius: 5,
                        borderWidth: 2,
                        borderColor: 'white',
                      }}
                    />
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#900C3F',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10000,
                      }}>
                      <Image
                        source={
                          isSelected
                            ? isPaused
                              ? require('./images/play.png')
                              : require('./images/pause.png')
                            : require('./images/play.png')
                        }
                        style={{width: 17, height: 17}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const videoCoverView = () => (
    <TouchableWithoutFeedback>
      <ImageBackground
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          ...videoStyle,
        }}
        source={require('./images/blur.png')}>
        <Image
          source={require('./images/eye.png')}
          style={{height: 70, width: 100}}
        />

        <TouchableOpacity
          style={{
            width: 80,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0 ,0, 0,0.5)',
            marginTop: 20,
            borderRadius: 5,
          }}
          onPress={() => {
            setIsVideoFocused(true);
            setIsVideoCovered(false);
          }}>
          <Text style={{color: 'white', fontsize: 14}}>Uncover</Text>
        </TouchableOpacity>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('TOUCH');
        setIsVideoFocused(!isVideoFocused);
      }}>
      <View style={videoStyle}>
        <Video
          style={{
            flex: 1,
            width: '130%',
            marginLeft: -33,
            backgroundColor: '#000',
          }}
          posterResizeMode="contain"
          resizeMode="contain"
          bufferConfig={{
            minBufferMs: 1000 * 60,
            bufferForPlaybackMs: 1000 * 60,
            bufferForPlaybackAfterRebufferMs: 1000 * 60,
          }}
          ref={videoRef}
          source={source}
          paused={isPaused}
          muted={isMuted}
          rate={videoRate}
          selectedVideoTrack={{
            type: 'resolution',
            value: videoQuality,
          }}
          volume={videoSound}
          playInBackground={playInBackground}
          onLoadStart={videoData => {
            setShowLoader(true);
            setIsVideoFocused(true);
            setIsVErrorInLoadVideo(false);
            setIsPaused(true);
          }}
          onLoad={videoData => {
            console.log(videoData);
            setShowLoader(false);
            setIsVErrorInLoadVideo(false);
            setVideoDuration(videoData.duration);
          }}
          onProgress={videoData =>
            setCurrentVideoDuration(videoData.currentTime)
          }
          /*onSeek={()=>{
              if(Platform.OS=='android'){
                setIsVideoSeeked(true)
              }
            }}
            onReadyForDisplay={()=>{
              console.log("onReadyForDisplay")
              setIsVideoSeeked(false)
              setIsVErrorInLoadVideo(false)
            }}*/
          onError={videoData => setIsVErrorInLoadVideo(true)}
          onEnd={() => {
            console.log('on end');
            setIsVideoEnd(true);
            setIsPaused(true);
            if (playList.length > 0) {
              setIsShowVideoPlaylist(true);
            }
          }}
        />
        {currentVideoDuration == 0 && poster && videoPosterView()}
        {isVideoFocused && showHeader && videoHeaders()}
        {isVideoFocused &&
          showSeeking10SecondsButton &&
          !isErrorInLoadVideo &&
          videoSeekingIncreaseButton()}
        {isVideoFocused &&
          showSeeking10SecondsButton &&
          !isErrorInLoadVideo &&
          videoSeekingDecreaseButton()}
        {isVideoFocused && videoFooter()}
        {isShowSettingsBottomSheet && videoSettingsView()}
        {isShowVideoRateSettings && videoRateSettingView()}
        {isShowVideoSoundSettings && videoSoundView()}
        {isShowVideoQualitiesSettings && videoQualitiesSettingView()}
        {isVideoSeeked && videoSeekedLoader()}
        {isErrorInLoadVideo && videoErrorView()}
        {playList.length > 0 && isShowVideoPlaylist && videoPlaylistView()}
        {isVideoCovered && videoCoverView()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(MoVideoPlayer);
