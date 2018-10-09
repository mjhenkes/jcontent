import {List, ListItem, withStyles} from "@material-ui/core";
import {ExpandMore, ChevronRight} from "@material-ui/icons";
import Actions from "./Actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {lodash as _} from "lodash";
import {translate} from "react-i18next";

const styles = (theme) => ({
    root: {
        marginLeft: theme.spacing.unit * 2,
        marginTop: '0px'
    },
    ListRoot: {
        paddingTop: '0',
    },
    iconDrawer: {
        color: '#504e4d',
    },
    overList: {
        paddingTop: '4px',
        paddingBottom: '4px'
    },
    clearList: {
        boxShadow: 'none!important',
        textOverflow: 'ellipsis',
        opacity: '0.8',
        fontSize: '0.828rem',
        fontFamily: 'Nunito sans, sans-serif',
        fontWeight: '400',
        background: 'transparent',
        padding: '5px 10px',
        color: theme.palette.background.paper,

    },
    selectedList: {
        boxShadow: 'none!important',
        fontSize: '0.872rem',
        textAlign: 'center',
        fontFamily: 'Nunito sans, sans-serif',
        fontWeight: '400',
        padding: '5px 10px',
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    triangle: {
        width: 0,
        height: 0,
        padding: 0,
        marginRight: 10,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 6.5px',
        borderColor: 'transparent transparent transparent #5c6164'
    },
    triangle_bottom: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '6.5px 4px 0 4px',
        borderColor: '#5c6164 transparent transparent transparent'
    },
    iconTree : {
        fontSize: '15px',
    },
    textPadding: {
        paddingLeft: theme.spacing.unit * 2,
        textAlign: 'left'
    }
});

class CmLeftDrawerContent extends React.Component {

    render() {

        let {menuId, context, handleDrawerClose, actionPath, t, classes} = this.props;

        return <List className={classes.root} classes={{root: classes.ListRoot}}>
            {console.log("CmLeftDrawerContent", menuId, _.includes(actionPath, menuId))}
            <Actions menuId={menuId} context={context} handleDrawerClose={handleDrawerClose} actionPath={actionPath}>
                {(menuConfig) =>
                    <ListItem className={classes.clearList}
                              classes={{root: classes.overList}}
                              selected={_.includes(actionPath, menuConfig.actionKey)} button onClick={(event) => menuConfig.onClick(event)}>

                        {menuConfig.hasChildren
                            ?
                            <div>
                                {(menuConfig.open || menuConfig.selected) ?
                                    <ExpandMore classes={{root: classes.iconTree}}/> :
                                    <ChevronRight classes={{root: classes.iconTree}}/>
                                }
                            </div>
                            : null
                        }
                        {console.log("CmLeftDrawerContent",  menuConfig.actionKey, _.includes(actionPath, menuConfig.actionKey))}
                        <FontAwesomeIcon className={classes.iconDrawer} icon={menuConfig.icon != null ? menuConfig.icon : ["far", "file"]}/>
                        <div className={classes.textPadding}>
                            &nbsp;
                            {t(menuConfig.labelKey, menuConfig.labelParams)}
                        </div>
                    </ListItem>
                }
            </Actions>
        </List>;
    }
}

CmLeftDrawerContent = _.flowRight(
    translate(),
    withStyles(styles)
)(CmLeftDrawerContent);

export default CmLeftDrawerContent;
