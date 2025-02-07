import React from 'react';
import {ButtonGroup, Separator} from '@jahia/moonstone';
import {ButtonRenderer, ButtonRendererNoLabel, ButtonRendererShortLabel} from '~/utils/getButtonRenderer';
import {DisplayAction} from '@jahia/ui-extender';
import {useNodeInfo} from '@jahia/data-helper';
import {useSelector} from 'react-redux';
import styles from './MainActionBar.scss';

export const MainActionBar = () => {
    const {path, language, selection} = useSelector(state => ({path: state.jcontent.path, language: state.language, selection: state.jcontent.selection}));

    const {node, loading} = useNodeInfo({path, language}, {getIsNodeTypes: ['jnt:page', 'jnt:contentFolder', 'jnt:folder']});

    if (loading || !node) {
        return false;
    }

    const publishAction = node['jnt:folder'] || node['jnt:contentFolder'] ? 'publishAll' : 'publish';
    const editActionKey = node['jnt:page'] ? 'editPage' : 'edit';
    const isDisabled = selection && selection.length > 0;

    return (
        <div className={styles.root}>
            <DisplayAction actionKey="search" path={path} isDisabled={isDisabled} render={ButtonRenderer} buttonProps={{variant: 'ghost', size: 'big', 'data-sel-role': 'open-search-dialog'}}/>
            <Separator variant="vertical" invisible="firstOrLastChild" className={styles.showSeparator}/>
            <DisplayAction actionKey="pageComposer" path={path} isDisabled={isDisabled} render={ButtonRenderer} buttonProps={{variant: 'ghost', size: 'big', color: 'accent', className: styles.item}}/>
            <DisplayAction actionKey={editActionKey} path={path} isDisabled={isDisabled} render={ButtonRenderer} buttonProps={{variant: 'outlined', size: 'big', className: styles.item}}/>

            <ButtonGroup size="big" variant="default" color="accent" className={styles.item}>
                <DisplayAction isMediumLabel actionKey={publishAction} path={path} isDisabled={isDisabled} render={ButtonRendererShortLabel} buttonProps={{variant: 'default', size: 'big', color: 'accent'}}/>
                <DisplayAction menuUseElementAnchor actionKey="publishMenu" path={path} isDisabled={isDisabled} render={ButtonRendererNoLabel} buttonProps={{variant: 'default', size: 'big', color: 'accent'}}/>
            </ButtonGroup>
            <DisplayAction actionKey="publishDeletion" path={path} isDisabled={isDisabled} render={ButtonRendererShortLabel}/>
            <DisplayAction actionKey="deletePermanently" path={path} isDisabled={isDisabled} render={ButtonRendererShortLabel}/>
        </div>
    );
};

MainActionBar.propTypes = {};
