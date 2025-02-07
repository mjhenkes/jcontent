import PropTypes from 'prop-types';
import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Button} from '@jahia/moonstone';
import styles from './SaveAsDialog.scss';

export const SaveAsDialog = ({isOpen, handleClose, handleSave, name, onChangeName, isNameValid}) => {
    const {t} = useTranslation();
    return (
        <Dialog open={isOpen}
                aria-labelledby="form-dialog-title"
                classes={{paper: styles.root}}
                onClose={handleClose}
        >
            <DialogTitle id="form-dialog-title">{t('jcontent:label.contentManager.editImage.saveAsDialog.title')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('jcontent:label.contentManager.editImage.saveAsDialog.text')}
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    error={!isNameValid}
                    value={name}
                    id="fileName"
                    margin="dense"
                    onChange={onChangeName}
                />
            </DialogContent>
            <DialogActions>
                <Button label={t('jcontent:label.contentManager.editImage.saveAsDialog.cancel')} size="big" data-cm-role="image-save-as-cancel" onClick={handleClose}/>
                <Button label={t('jcontent:label.contentManager.editImage.saveAsDialog.save')} size="big" color="accent" data-cm-role="image-save-as-confirm" disabled={!isNameValid} onClick={handleSave}/>
            </DialogActions>
        </Dialog>
    );
};

SaveAsDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,
    isNameValid: PropTypes.bool.isRequired
};

export default SaveAsDialog;
