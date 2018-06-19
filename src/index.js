import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from 'RNCarousalMap/src/styles/SliderEntry.style';
import SliderEntry from 'RNCarousalMap/src/components/SliderEntry';
import styles, { colors } from 'RNCarousalMap/src/styles/index.style';
import { ENTRIES1, ENTRIES2 } from 'RNCarousalMap/src/static/entries';
import { scrollInterpolators, animatedStyles } from 'RNCarousalMap/src/utils/animations';
// import  { imgMarker } from 'RNCarousalMap/src/pin@2x';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export default class example extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            region: {
                latitude: 18.5143,
                longitude: 73.8555,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        };
    }

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _centerMapOnMarker (markerIndex) {
        const mapRef = this.map;
        const markerData = ENTRIES2[markerIndex];

        if (!markerData || !mapRef) {
            return;
        }
        mapRef.animateToRegion({
            latitude: markerData.coordinate.latitude,
            longitude: markerData.coordinate.longitude,
            latitudeDelta: 0.0315,
            longitudeDelta: 0.0258
        });
    }

    momentumExample (number, title) {
        return (
            <View style={styles.exampleContainer}>                
                <Carousel
                  data={ENTRIES2}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  inactiveSlideScale={0.75}
                  inactiveSlideOpacity={1}
                  enableMomentum={true}
                  activeSlideAlignment={'center'}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  activeAnimationType={'spring'}
                  activeAnimationOptions={{
                      friction: 4,
                      tension: 40
                  }}
                  onSnapToItem={(index) => this._centerMapOnMarker(index)}
                />
            </View>
        );
    }

    get gradient () {
        return (
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              startPoint={{ x: 1, y: 0 }}
              endPoint={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }

    render () {        
        const example2 = this.momentumExample(2, 'Momentum | Left-aligned | Active animation');
        
        return (            
            <SafeAreaView style={styles.safeArea}>
                 <View style={styles.container}>
                     <StatusBar
                       translucent={true}
                       backgroundColor={'rgba(0, 0, 0, 0.3)'}
                       barStyle={'light-content'}
                     />
                     <MapView
                        ref={map => this.map = map}
                        initialRegion={this.state.region}
                        style={styles.container}
                        >
                        {ENTRIES2.map((marker, index) => {
                                
                                return (
                                <MapView.Marker key={index} coordinate={marker.coordinate} title={marker.title}
                                description={marker.subtitle}>
                                    {/* <View><Image source={imgMarker} style={{width: 1, height: 1}} /></View> */}
                                </MapView.Marker>
                                );
                            })}
                     </MapView>
                     {/* { this.gradient } */}
                     <ScrollView
                       style={styles.scrollview}
                       scrollEventThrottle={200}
                       directionalLockEnabled={true}
                     >
                         { example2 }
                        
                     </ScrollView>
                 </View>
            </SafeAreaView>
        );
    }
}
