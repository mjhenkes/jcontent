import React from 'react';
import PropTypes from 'prop-types';
import {Tab, TabItem} from '@jahia/moonstone';
import {useDispatch, useSelector} from 'react-redux';
import JContentConstants from '~/JContent/JContent.constants';
import {setTableViewType} from '../../StructuredView/StructuredView.redux';
import classes from './ContentTypeSelector.scss';
import {useTranslation} from 'react-i18next';
import {batchActions} from 'redux-batched-actions';
import {cmSetPage} from '../../pagination.redux';

const localStorage = window.localStorage;
const VIEW_TYPE = JContentConstants.localStorageKeys.viewType;

const ContentTypeSelector = ({contentCount, pagesCount}) => {
    const {t} = useTranslation();
    const tableView = useSelector(state => state.jcontent.tableView);
    const dispatch = useDispatch();
    const isStructuredView = tableView.viewMode === JContentConstants.tableView.viewMode.STRUCTURED;
    const actionsBatch = [];

    // Reset pagination when changing view type in non structured mode to disassociate pagination between two tabs
    if (!isStructuredView) {
        actionsBatch.push(cmSetPage(0));
    }

    return (
        <Tab className={classes.tabs}>
            <TabItem isSelected={JContentConstants.tableView.viewType.CONTENT === tableView.viewType}
                     isDisabled={contentCount === 0}
                     label={t('jcontent:label.contentManager.contentTypeSelector.contents', {count: contentCount > 0 ? `(${contentCount})` : ' '})}
                     size="big"
                     onClick={() => {
                         actionsBatch.push(setTableViewType(JContentConstants.tableView.viewType.CONTENT));
                         dispatch(batchActions(actionsBatch));
                         localStorage.setItem(VIEW_TYPE, JContentConstants.tableView.viewType.CONTENT);
                     }}/>
            <TabItem isSelected={JContentConstants.tableView.viewType.PAGES === tableView.viewType}
                     isDisabled={pagesCount === 0}
                     label={t('jcontent:label.contentManager.contentTypeSelector.pages', {count: pagesCount > 0 ? `(${pagesCount})` : ' '})}
                     size="big"
                     onClick={() => {
                         actionsBatch.push(setTableViewType(JContentConstants.tableView.viewType.PAGES));
                         dispatch(batchActions(actionsBatch));
                         localStorage.setItem(VIEW_TYPE, JContentConstants.tableView.viewType.PAGES);
                     }}/>
        </Tab>
    );
};

ContentTypeSelector.propTypes = {
    contentCount: PropTypes.number,
    pagesCount: PropTypes.number
};

export default ContentTypeSelector;
