import React from 'react';
import {Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@material-ui/core';
import {Typography} from '@jahia/ds-mui-theme';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import {compose} from 'react-apollo';

export class ContentListHeader extends React.Component {
    render() {
        const {order, orderBy, columnData, t, classes, setSort, allSelected, anySelected, selectAll, unselectAll} = this.props;
        let direction = order === 'DESC' ? 'ASC' : 'DESC';
        let noneSelected = !anySelected;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="none"/>
                    <TableCell padding="checkbox">
                        <Checkbox indeterminate={anySelected && !allSelected} checked={anySelected} onClick={allSelected ? unselectAll : selectAll}/>
                    </TableCell>
                    {columnData.map(column => {
                        if (column.sortable) {
                            return (
                                <TableCell
                                    key={column.id}
                                    className={classes[column.id + 'Cell']}
                                    sortDirection={orderBy === column.property ? order.toLowerCase() : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.property}
                                        direction={direction.toLowerCase()}
                                        className={anySelected ? classes.disabledSort : ''}
                                        onClick={() => noneSelected && setSort({order: direction, orderBy: column.property})}
                                    >
                                        <Typography noWrap variant="zeta">{t(column.label)}</Typography>
                                    </TableSortLabel>
                                </TableCell>
                            );
                        }
                        return (
                            <TableCell
                                key={column.id}
                                className={classes[column.id + 'Cell']}
                                sortDirection={orderBy === column.property ? order.toLowerCase() : false}
                            >
                                <Typography noWrap variant="zeta">{t(column.label)}</Typography>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

ContentListHeader.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
};

export default compose(
    translate(),
)(ContentListHeader);
