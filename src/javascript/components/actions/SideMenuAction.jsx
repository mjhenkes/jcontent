import React from "react";
import Actions from "../Actions";
import {List, ListItem, withStyles} from '@material-ui/core';
import {VerifiedUser} from '@material-ui/icons';
import Typography from "@material-ui/core/Typography";
import {lodash as _} from "lodash";
import {translate} from 'react-i18next';

const styles = (theme) => {

}

class SideMenuAction extends React.Component {

    render() {
        const {t, menuId, children, context, handleDrawer, classes, ...rest} = this.props;
        const actionContent = <List style={{marginLeft: '18px', marginTop: '18px'}}>
            <Actions menuId={menuId} context={context}>
                {(menuConfig) =>
                    <ListItem button onClick={(event) => menuConfig.onClick(event)}>
                        {t(menuConfig.labelKey, menuConfig.labelParams)}
                    </ListItem>
                }
            </Actions>
        </List>
        return (handleDrawer && <React.Fragment>
                {children({...rest, onClick: handleDrawer.bind(this, actionContent)})}
            </React.Fragment>
        )
    };
}

SideMenuAction = _.flowRight(
    translate(),
    withStyles(styles),
)(SideMenuAction);


export default SideMenuAction;