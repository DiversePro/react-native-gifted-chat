import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Keyboard, } from 'react-native';
import Composer from './Composer';
import Send from './Send';
import {BlurView} from '@react-native-community/blur';
import Actions from './Actions';
import Color from './Color';
import { StylePropType } from './utils';
import { RFValue } from 'react-native-responsive-fontsize';
const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Color.defaultColor,
        backgroundColor: Color.white,
        bottom: 0,
        left: 0,
        right: 0,
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    accessory: {
        height: 44,
    },
});
export default class InputToolbar extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            
        };
       
    }
    componentDidMount() {
    }
    componentWillUnmount() {
      
    }
    renderActions() {
        const { containerStyle, ...props } = this.props;
        if (this.props.renderActions) {
            return this.props.renderActions(props);
        }
        else if (this.props.onPressActionButton) {
            return <Actions {...props}/>;
        }
        return null;
    }
    renderSend() {
        if (this.props.renderSend) {
            return this.props.renderSend(this.props);
        }
        return <Send {...this.props}/>;
    }
    renderComposer() {
        if (this.props.renderComposer) {
            return this.props.renderComposer(this.props);
        }
        return <Composer {...this.props}/>;
    }
    renderAccessory() {
        if (this.props.renderAccessory) {
            return (<View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>);
        }
        return null;
    }
    render() {
        return (<View 
            style={[
            styles.container,
             {
                bottom:this.props.position =="relative" ? (this.props?.isReplyActive ? RFValue(10)+this.props?.extraMargin
                 : RFValue(20) + this?.props?.extraMargin):0,
                position: this.props.position,
            },
            this.props.containerStyle,
        ]}
        >
        <View 
         style={[styles.primary, this.props.primaryStyle]}
        >
          {this.renderActions()}
          {this.renderComposer()}
          {this.renderSend()}
        </View>
        {this.props.blur && (
        <BlurView
          blurType="light"
          blurAmount={2.5}
          reducedTransparencyFallbackColor="white"
          style={{
            zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            position: 'absolute',
            top: -10,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
         {this.renderAccessory()}
      </View>);
    }
}
InputToolbar.defaultProps = {
    renderAccessory: null,
    renderActions: null,
    renderSend: null,
    renderComposer: null,
    containerStyle: {},
    primaryStyle: {},
    accessoryStyle: {},
    onPressActionButton: () => { },
    extraMargin:0
};
InputToolbar.propTypes = {
    renderAccessory: PropTypes.func,
    renderActions: PropTypes.func,
    renderSend: PropTypes.func,
    renderComposer: PropTypes.func,
    onPressActionButton: PropTypes.func,
    containerStyle: StylePropType,
    primaryStyle: StylePropType,
    accessoryStyle: StylePropType,
    extraMargin: PropTypes.number,
};
//# sourceMappingURL=InputToolbar.js.map