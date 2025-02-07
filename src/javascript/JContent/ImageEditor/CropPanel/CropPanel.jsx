import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, Input, InputLabel} from '@material-ui/core';
import {Button, Link, Typography} from '@jahia/moonstone';
import styles from './CropPanel.scss';
import {useTranslation} from 'react-i18next';

export const CropPanel = ({onCrop, cropParams}) => {
    const {t} = useTranslation();
    const setWidth = event => {
        let width = event.target.value;

        if (/\d+/.test(width)) {
            onCrop({width: parseInt(width, 10)});
        }
    };

    const setHeight = event => {
        let height = event.target.value;

        if (/\d+/.test(height)) {
            onCrop({height: parseInt(height, 10)});
        }
    };

    const switchRatio = () => {
        onCrop({aspect: !cropParams.aspect});
    };

    return (
        <>
            <Typography variant="subheading">
                {t('jcontent:label.contentManager.editImage.cropInfo')}
            </Typography>
            <div className={styles.form}>
                <div className={styles.firstCol}>
                    <FormControl className={styles.formControl}>
                        <InputLabel shrink
                                    className={styles.inputLabel}
                        >{t('jcontent:label.contentManager.editImage.width')}
                        </InputLabel>
                        <Input
                            id="width-field"
                            value={cropParams.width ? Math.round(cropParams.width) : ''}
                            type="number"
                            margin="none"
                            onChange={setWidth}
                        />
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputLabel shrink
                                    className={styles.inputLabel}
                        >{t('jcontent:label.contentManager.editImage.height')}
                        </InputLabel>
                        <Input
                            id="height-field"
                            value={cropParams.height ? Math.round(cropParams.height) : ''}
                            type="number"
                            margin="none"
                            onChange={setHeight}
                        />
                    </FormControl>
                </div>
                <div className={styles.secondCol}>
                    <Button icon={<Link/>}
                            color={cropParams.aspect ? 'accent' : 'default'}
                            size="big"
                            variant="ghost"
                            data-cm-role="keep-ratio-button"
                            onClick={switchRatio}
                    />
                </div>
            </div>
        </>
    );
};

CropPanel.propTypes = {
    cropParams: PropTypes.object,
    onCrop: PropTypes.func.isRequired
};

export default CropPanel;
