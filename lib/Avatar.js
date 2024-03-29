import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import GiftedAvatar from './GiftedAvatar';
import { StylePropType, isSameUser, isSameDay, isUnreadStarted } from './utils';
const styles = {
    left: StyleSheet.create({
        container: {
            marginRight: 8,
        },
        onTop: {
            alignSelf: 'flex-start',
        },
        onBottom: {},
        image: {
            height: 36,
            width: 36,
            borderRadius: 18,
        },
    }),
    right: StyleSheet.create({
        container: {
            marginLeft: 8,
        },
        onTop: {
            alignSelf: 'flex-start',
        },
        onBottom: {},
        image: {
            height: 36,
            width: 36,
            borderRadius: 18,
        },
    }),
};
export default class Avatar extends React.Component {
    renderAvatar() {
        if (this.props.renderAvatar) {
            const { renderAvatar, ...avatarProps } = this.props;
            return this.props.renderAvatar(avatarProps);
        }
        if (this.props.currentMessage) {
            return (<GiftedAvatar avatarStyle={[
                styles[this.props.position].image,
                this.props.imageStyle &&
                    this.props.imageStyle[this.props.position],
            ]} textStyle={this.props.textStyle ? this.props.textStyle : {}} user={this.props.currentMessage.createdBy} onPress={() => this.props.onPressAvatar &&
                this.props.onPressAvatar(this.props.currentMessage.createdBy)} onLongPress={() => this.props.onLongPressAvatar &&
                this.props.onLongPressAvatar(this.props.currentMessage.createdBy)}/>);
        }
        return null;
    }
    render() {
        const { renderAvatarOnTop, showAvatarForEveryMessage, containerStyle, position, currentMessage, renderAvatar, previousMessage, nextMessage, imageStyle,user } = this.props;
        const messageToCompare = nextMessage;
        //renderAvatarOnTop ? previousMessage : nextMessage;
        const computedStyle = renderAvatarOnTop ? 'onTop' : 'onBottom';
        if (renderAvatar === undefined) {
            return (<View style={[
                styles[position].container,
                containerStyle && containerStyle[position],
            ]}>
         
        </View>);
        }
        if (!showAvatarForEveryMessage &&
            currentMessage &&
            messageToCompare &&
            isSameUser(currentMessage, messageToCompare) &&
            isSameDay(currentMessage, messageToCompare)&& !isUnreadStarted(currentMessage,messageToCompare,user))  {
            return (<View style={[
                styles[position].container,
                containerStyle && containerStyle[position],
            ]}>
         <View style={{marginLeft:RFValue(32)}}/>
        </View>);
        }

        return (<View style={[
            styles[position].container,
            styles[position][computedStyle],
            containerStyle && containerStyle[position],
        ]}>
        {this.renderAvatar()}
      </View>);
    }
}
Avatar.defaultProps = {
    renderAvatarOnTop: false,
    showAvatarForEveryMessage: false,
    position: 'left',
    currentMessage: {
        user: null,
    },
    previousMessage: {},
    nextMessage: {},
    containerStyle: {},
    imageStyle: {},
    onPressAvatar: () => { },
    onLongPressAvatar: () => { },
};
Avatar.propTypes = {
    renderAvatarOnTop: PropTypes.bool,
    showAvatarForEveryMessage: PropTypes.bool,
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    onPressAvatar: PropTypes.func,
    onLongPressAvatar: PropTypes.func,
    renderAvatar: PropTypes.func,
    containerStyle: PropTypes.shape({
        left: StylePropType,
        right: StylePropType,
    }),
    imageStyle: PropTypes.shape({
        left: StylePropType,
        right: StylePropType,
    }),
};
//# sourceMappingURL=Avatar.js.map