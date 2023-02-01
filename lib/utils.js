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
        diffMessage.createdBy &&
        currentMessage.createdBy &&
        diffMessage.createdBy.attorneyId === currentMessage.createdBy.attorneyId);
}
const styleString = (color) => `color: ${color}; font-weight: bold`;
const headerLog = '%c[react-native-gifted-chat]';

export const isUnreadStarted =(currentMessage, diffMessage,user)=> {
    if (currentMessage && currentMessage.createdBy.attorneyId != user.id  ) {
        if(currentMessage.myStatus != "read" && (diffMessage.createdBy.attorneyId == user.id || diffMessage.myStatus =="read"))
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