import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import dayjs from 'dayjs';
import Color from './Color';
import { StylePropType, isSameDay, isUnreadStarted } from './utils';
import { DATE_FORMAT } from './Constant';
import { RFValue } from 'react-native-responsive-fontsize';
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

const dateHandler=( msgdate)=>{
    
let nowDate = new Date();



let differenceOfDays = datediff(
  parseDate(msgdate.toISOString()),
  parseDate(nowDate.toISOString()),
);
if (differenceOfDays == 0) {
  var options = {hour: '2-digit', minute: '2-digit'};
  return `Today${msgdate.toLocaleDateString('en-US', options).split(',')[1]}`;
} else if (differenceOfDays == 1) {
  var options = {hour: '2-digit', minute: '2-digit'};
 return `Yesterday${msgdate.toLocaleDateString('en-US', options).split(',')[1]}`;
} else if (differenceOfDays < 7) {
  var options = {weekday: 'short', hour: '2-digit', minute: '2-digit'};
  return msgdate.toLocaleDateString('en-US', options);
} else {
  let msgYear = msgdate.getFullYear();
  let nowYear = nowDate.getFullYear();

  if (msgYear == nowYear) {
    var options = {month: 'short', day: '2-digit'};
    return  msgdate.toLocaleDateString('en-US', options)
  } else {
    var options = {month: 'short', day: '2-digit', year: 'numeric'};

    return msgdate.toLocaleDateString('en-US', options);
  }
}

}
export default class Day extends PureComponent {
    render() {
        const {  currentMessage, previousMessage, containerStyle, wrapperStyle, textStyle,user } = this.props;
      
        if (currentMessage && currentMessage.createdAt && (!isSameDay(currentMessage, previousMessage) || isUnreadStarted(currentMessage,previousMessage,user))) {

            return (<View style={[styles.container, containerStyle]}>
          <View style={wrapperStyle}>
            <Text style={[styles.text, textStyle,{marginTop:previousMessage.system ?RFValue(8):RFValue(12)}]}>
            
                {dateHandler(currentMessage.createdAt)}
              
            </Text>
          </View>
        </View>);
        }
        return null;
    }
}
Day.contextTypes = {
    getLocale: PropTypes.func,
};
Day.defaultProps = {
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