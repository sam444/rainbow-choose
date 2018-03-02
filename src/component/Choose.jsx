import "../css/ui-choose.css";
import "../js/ui-choose.js";
import { UIInput,OnClickEvent,Param } from "rainbowui-core";
import PropTypes from 'prop-types';
import { Util } from "rainbow-foundation-tools";
export default class Choose extends UIInput {

    renderInput() {
        return (
            <ul className="ui-choose" id={this.componentId}>
                {this.buildData()}
            </ul>
        );
    }

    buildData() {
        const returnList = [];
        _.each(this.props.value, (item) => {
            const selectflag = false;
            const value = this.getValue(null);
            if (_.isArray(value)) {
                const resault = _.find(value, (_item) => {
                    return _item == item;
                });
                if (resault) {
                    returnList.push(<li className="selected">{item}</li>);
                } else {
                    returnList.push(<li>{item}</li>);
                }
            } else if (this.props.enabled == 'false') {
                const resault = _.find(value, (_item) => {
                    return _item == item;
                });
                returnList.push(<li className="disabled">{item}</li>);
            } else {
                if (item == value) {
                    returnList.push(<li className="selected">{item}</li>);
                } else {
                    returnList.push(<li>{item}</li>);
                }
            }

        });
        return returnList;
    }



    componentDidMount() {
        const multiSelectFlag = Util.parseBool(this.props.multiSelect);
        const chooseObject = $("#" + this.componentId);
        if (multiSelectFlag) {
            chooseObject.attr("multiple", "multiple");
            chooseObject.addClass("choose-type-right");
        }

        $('.ui-choose').ui_choose();
        chooseObject.data('ui-choose').click = (index, item) => {
            if (multiSelectFlag) {
                const valuelist = [];
                _.each(index, (item) => {
                    valuelist.push(this.props.value[item]);
                });
                this.setValue(null, valuelist);
            } else {
                this.setValue(null, item.text());
            }
            if (this.props.onClick) { 
                 this.props.onClick(new OnClickEvent(this, event, Param.getParameter(this)));
            }
        }
        this.modifyGap();
    }
    modifyGap() {
        const chooseObject = $("ul#" + this.componentId + " li");
        const chooseObject_first = $("ul#" + this.componentId + " li:first-child");
        if (this.props.gap) {
            let gap = this.props.gap
            chooseObject.css("margin-left", gap);
            chooseObject_first.css("margin-left", "0px");
        }
    }

};


Choose.propTypes = $.extend({}, UIInput.propTypes, {
    value: PropTypes.object,
    model: PropTypes.object,
    property: PropTypes.string,
    multiSelect: PropTypes.boolean,
    gap: PropTypes.string,
    enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onClick: PropTypes.func,
});


Choose.defaultProps = $.extend({}, UIInput.defaultProps, {
    multiSelect: true,
    enabled: true
});