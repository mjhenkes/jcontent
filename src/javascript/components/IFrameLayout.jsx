import React from 'react';
import Iframe from 'react-iframe';
import {lodash as _} from "lodash";
import connect from "react-redux/es/connect/connect";
import {cmGoto} from "./redux/actions";
import actionsRegistry from "./actionsRegistry";

class IFrameLayout extends React.Component {

    render() {
        const { actionKey, workspace, siteKey, lang, contextPath, redirectToBrowse } = this.props;
        const action = actionsRegistry[actionKey];
        if (!action || !action.iframeUrl) {
            redirectToBrowse();
            return null;
        }
        let iframeUrl = action.iframeUrl.replace(/:context/g, contextPath);
        iframeUrl = iframeUrl.replace(/:workspace/g, workspace);
        iframeUrl = iframeUrl.replace(/:lang/g, lang);
        iframeUrl = iframeUrl.replace(/:site/g, siteKey);

        return <Iframe url={iframeUrl}
                       position="relative"
                       width="100%"
                       className="myClassname"
                       height="100%"
                       allowFullScreen/>
    }

}


const mapStateToProps = (state, ownProps) => ({
    lang: state.language,
    siteKey: state.site,
    actionKey: state.path
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    redirectToBrowse: () => dispatch(cmGoto({mode: 'browse', path: '/'}))
})

IFrameLayout = _.flowRight(
    connect(mapStateToProps, mapDispatchToProps)
)(IFrameLayout);



export {IFrameLayout};