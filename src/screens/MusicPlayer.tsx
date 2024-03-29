import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';

import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { playListData } from '../constants';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>(null);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    switch (event.type) {
      case 'playback-track-changed':
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack ?? null);
        break;
    }
  });
  
  

  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork ? (
            <Image
              style={styles.albumArtImg}
              source={{ uri: track?.artwork?.toString() }}
            />
          ) : (
            // Render a placeholder image or any fallback UI when track.artwork is null
            <Image
              style={styles.albumArtImg}
              source={require('../path/to/placeholderImage.png')}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={(song) => song.id.toString()}
      />

      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});

export default MusicPlayer;
