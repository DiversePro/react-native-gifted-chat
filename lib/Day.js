import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import dayjs from 'dayjs';
import Color from './Color';
import { StylePropType, isSameDay, isUnreadStarted } from './utils';
import { DATE_FORMAT } from './Constant';
import { RFValue } from 'react-native-responsive-fontsize';
import { BlurView } from '@react-native-community/blur';
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    text: {
        backgroundColor: Color.backgroundTransparent,
        color: '#818D95',
        fontSize: RFValue(12),
        fontWeight: '400',
        marginBottom:RFValue(8),
        
    },
});


const datediff=(first, second) =>{
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  
const  parseDate=(str)=> {
    var mdyTemp = str.split('T');
    var mdy = mdyTemp[0].split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  }

const dateHandler=( messagedate)=>{
    
let nowDate = new Date();
let msgdate = new Date(messagedate);


let differenceOfDays = datediff(
  parseDate(msgdate.toISOString()),
  parseDate(nowDate.toISOString()),
);
if (differenceOfDays == 0) {
  var options = {hour: '2-digit', minute: '2-digit'};
 let time = msgdate.toLocaleDateString('en-US', options).split(', ')[1];
  let portions = time.split(" ");
  console.log("Portions", portions)
  let numericPart =portions[0];
  let numericPortions = numericPart?.split(":");
  let hours = numericPortions[0][0] == 0 ? numericPortions[0][1] : numericPortions[0];
  let minutes =  numericPortions[1];
  let alphabeticPart = portions[1];
  return `Today ${hours}:${minutes} ${alphabeticPart}`;
} else if (differenceOfDays == 1) {
  var options = {hour: '2-digit', minute: '2-digit'};
  let time = msgdate.toLocaleDateString('en-US', options).split(',')[1];
  let portions = time.split(" ");
  let numericPart = portions?.length == 3 ? portions[1] : portions[0];
  let numericPortions = numericPart?.split(":");
  let hours = numericPortions[0][0] == 0 ? numericPortions[0][1] : numericPortions[0];
  let minutes =  numericPortions[1];
  let alphabeticPart = portions?.length == 3 ?portions[2]:portions[1];
  return `Yesterday ${hours}:${minutes} ${alphabeticPart}`;
} else if (differenceOfDays < 7) {
  var options = {weekday: 'short', hour: '2-digit', minute: '2-digit'};
  let time = msgdate.toLocaleDateString('en-US', options);
  let portions = time.split(" ");
  let day = portions[0];
  let numericPart = portions[1];
  let numericPortions = numericPart?.split(":");
  let hours = numericPortions[0][0] == 0 ? numericPortions[0][1] : numericPortions[0];
  let minutes =  numericPortions[1];
  let alphabeticPart = portions[2];
  return `${day} ${hours}:${minutes} ${alphabeticPart}`;
} else {
  let msgYear = msgdate.getFullYear();
  let nowYear = nowDate.getFullYear();
  if (msgYear == nowYear) {
    var options = {month: 'short', day: '2-digit'};
    let time = msgdate.toLocaleDateString('en-US', options);
    let portions = time.split(" ");
    let month = portions[0];
    let day = portions[1][0] == 0 ? portions[1][1] : portions[1];
    return `${month} ${day}`;  
  } 
    else {
    var options = {month: 'short', day: '2-digit', year: 'numeric'};
    let time = msgdate.toLocaleDateString('en-US', options);
    let portions = time.split(" ");
    let month = portions[0];
    let day = portions[1][0] == 0 ? portions[1][1] : portions[1];
    let year = portions[2]
    return `${month} ${day}, ${year}`;
   }
}

}
export default class Day extends PureComponent {
    render() {
        const {  currentMessage, previousMessage, containerStyle, wrapperStyle, textStyle,user,blur } = this.props;
      
        if (currentMessage && currentMessage.createdAt && (!isSameDay(currentMessage, previousMessage) || isUnreadStarted(currentMessage,previousMessage,user))) {

            return (<><View style={[styles.container, containerStyle]}>
          <View style={wrapperStyle}>
            <Text style={[styles.text, textStyle,{marginTop:previousMessage.system ?RFValue(8):RFValue(12)}]}>
            
                {dateHandler(currentMessage.createdAt)}
              
            </Text>
          </View>
            { blur &&   <BlurView
            blurType="light"
            blurAmount={2.5}
            reducedTransparencyFallbackColor="white"
            style={{
              zIndex: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />}

        </View>
     
        </>);
        }
        return null;
    }
}
Day.contextTypes = {
    getLocale: PropTypes.func,
};
Day.defaultProps = {
  blur:false,
  avoidBlur:null,
    currentMessage: {
        createdAt: null,
    },
    previousMessage: {},
    nextMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    dateFormat: DATE_FORMAT,
};
Day.propTypes = {
  blur:PropTypes.bool,
  avoidBlur:PropTypes.string,
    currentMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    inverted: PropTypes.bool,
    containerStyle: StylePropType,
    wrapperStyle: StylePropType,
    textStyle: StylePropType,
    dateFormat: PropTypes.string,
};
//# sourceMappingURL=Day.js.map