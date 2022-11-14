import PropTypes from 'prop-types';
import dayjs from 'dayjs';
export const StylePropType = PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
]);
export function isSameDay(currentMessage, diffMessage) {
    if (!diffMessage || !diffMessage.createdAt) {
        return false;
    }
    const currentCreatedAt = dayjs(currentMessage.createdAt);
    const diffCreatedAt = dayjs(diffMessage.createdAt);
    if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
        return false;
    }
    return currentCreatedAt.isSame(diffCreatedAt, 'day');
}
export function isSameUser(currentMessage, diffMessage) {
    return !!(diffMessage &&
        diffMessage.user &&
        currentMessage.user &&
        diffMessage.user._id === currentMessage.user._id);
}
const styleString = (color) => `color: ${color}; font-weight: bold`;
const headerLog = '%c[react-native-gifted-chat]';

export const isUnreadStarted =(currentMessage, diffMessage,user)=> {
    if (currentMessage && currentMessage.user._id != user._id  ) {
        if(currentMessage.status != "read" && (diffMessage.user._id == user._id || diffMessage.status =="read"))
        {
            return true;
        }
        return false;
    }
    
    return false
}
export const warning = (...args) => console.log(headerLog, styleString('orange'), ...args);
export const error = (...args) => console.log(headerLog, styleString('red'), ...args);
//# sourceMappingURL=utils.js.map