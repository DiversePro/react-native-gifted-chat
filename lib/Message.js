import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import Day from './Day';
import { StylePropType, isSameUser, isSameDay, isUnreadStarted } from './utils';
const styles = {
    left: StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            marginLeft: 8,
            marginRight: 0,
        },
    }),
    right: StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginLeft: 0,
            marginRight: 13,
        },
    }),
};
export default class Message extends React.Component {
    shouldComponentUpdate(nextProps) {
        const next = nextProps.currentMessage;
        const current = this.props.currentMessage;
        const { previousMessage, nextMessage } = this.props;
        const nextPropsMessage = nextProps.nextMessage;
        const nextPropsPreviousMessage = nextProps.previousMessage;
        const shouldUpdate = (this.props.shouldUpdateMessage &&
            this.props.shouldUpdateMessage(this.props, nextProps)) ||
            false;
           
        return (next.sent !== current.sent ||
            nextProps.avoidBlur != this.props.avoidBlur ||
            next.received !== current.received ||
            next.pending !== current.pending ||
            next.createdAt !== current.createdAt ||
            next.text !== current.text ||
            next.image !== current.image ||
            next.video !== current.video ||
            next.audio !== current.audio ||
            next.reactions !== current.reactions ||
            previousMessage !== nextPropsPreviousMessage ||
            nextMessage !== nextPropsMessage ||
            shouldUpdate);
    }
    renderDay() {
        if (this.props.currentMessage && this.props.currentMessage.createdAt) {
            const { containerStyle, ...props } = this.props;
            
            if (this.props.renderDay) {
                return this.props.renderDay(props);
            }
            return <Day {...props}/>;
        }
        return null;
    }
    renderBubble() {
        const { containerStyle, ...props } = this.props;
        const cornerStyled = !isSameDay(props.currentMessage, props.nextMessage) ||  !isSameUser(props.currentMessage, props.nextMessage)  || isUnreadStarted(props.nextMessage,props.currentMessage,props.user);
        if (this.props.renderBubble) {
            return this.props.renderBubble({...props,cornerStyled});
        }
        // @ts-ignore
        return <Bubble {...props}/>;
    }
    renderSystemMessage() {
        const { containerStyle, ...props } = this.props;
        if (this.props.renderSystemMessage) {
            return this.props.renderSystemMessage(props);
        }
        return <SystemMessage {...props}/>;
    }
    renderAvatar() {
        const { user, currentMessage, showUserAvatar } = this.props;
       
        if (user &&
            user.id &&
            currentMessage &&
            currentMessage.createdBy &&
            user.id === currentMessage.createdBy.attorneyId &&
            !showUserAvatar) {
            return null;
        }
        if (currentMessage &&
            currentMessage.createdBy &&
            currentMessage.createdBy.pictureUrl === null) {
            return null;
        }
        const { containerStyle, ...props } = this.props;
        return <Avatar {...props}/>;
    }
    render() {
        const { currentMessage, nextMessage, position, containerStyle } = this.props;
        
        if (currentMessage) {
            const sameUser = isSameUser(currentMessage, nextMessage);
            return (<View >
          {this.renderDay()}
          {currentMessage.system ? (this.renderSystemMessage()) : (<View style={[
                styles[position].container,
                { marginBottom: sameUser ? 2 : 10 },
                !this.props.inverted && { marginBottom: 2 },
                containerStyle && containerStyle[position],
            ]}>
              {this.props.position === 'left' ? this.renderAvatar() : null}
              {this.renderBubble()}
              {this.props.position === 'right' ? this.renderAvatar() : null}
            </View>)}
        </View>);
        }
        return null;
    }
}
Message.defaultProps = {
    blur:false,
    avoidBlur:null,
    renderAvatar: undefined,
    renderBubble: null,
    renderDay: null,
    renderSystemMessage: null,
    position: 'left',
    currentMessage: {},
    nextMessage: {},
    previousMessage: {},
    user: {},
    containerStyle: {},
    showUserAvatar: false,
    inverted: true,
    shouldUpdateMessage: undefined,
};
Message.propTypes = {
    blur:PropTypes.bool,
    avoidBlur:PropTypes.string,
    renderAvatar: PropTypes.func,
    showUserAvatar: PropTypes.bool,
    renderBubble: PropTypes.func,
    renderDay: PropTypes.func,
    renderSystemMessage: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    user: PropTypes.object,
    inverted: PropTypes.bool,
    containerStyle: PropTypes.shape({
        left: StylePropType,
        right: StylePropType,
    }),
    shouldUpdateMessage: PropTypes.func,
};
//# sourceMappingURL=Message.js.map