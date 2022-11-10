import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import dayjs from 'dayjs';
import Color from './Color';
import { StylePropType, isSameDay } from './utils';
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
        color: 'rgba(4, 28, 44,0.5)',
        fontSize: RFValue(12),
        fontWeight: '400',
        marginBottom:RFValue(8)
    },
});
export default class Day extends PureComponent {
    render() {
        const { dateFormat, currentMessage, previousMessage, containerStyle, wrapperStyle, textStyle, } = this.props;
        if (currentMessage && !isSameDay(currentMessage, previousMessage)) {
            return (<View style={[styles.container, containerStyle]}>
          <View style={wrapperStyle}>
            <Text style={[styles.text, textStyle]}>
              {dayjs(currentMessage.createdAt)
                .locale(this.context.getLocale())
                .format(dateFormat)}
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