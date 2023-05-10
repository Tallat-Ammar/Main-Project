import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  },
  dot: {
    color: '#888',
    fontSize: 50,
  },
  activeDot: {
    color: '#FFF',
    fontSize: 50,
  },
});

export default function ImageSwipe({imageList, width='100', height='25', ...otherProps}) {
  const [active, setActive] = useState(0);

  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View style={[{height: hp(height+'%')}, {width: wp(width+'%')}]}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showHorizontalScrollIndicator={false}
        style={[{height: hp(height+'%')}, {width: wp(width+'%')}, {overflow: 'hidden'},{...otherProps}]}>
        {imageList.map((image, index) => (
          <Image
            key={index}
            source={{uri: image.uri}}
            style={[{height: hp(height+'%')}, {width: wp(width+'%')}, {resizeMode: 'cover'},{...otherProps}]}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {imageList.map((i, k) => (
          <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
            •
          </Text>
        ))}
      </View>
    </View>
  );
}



