import {batchActions} from 'redux-batched-actions';
import {composeActions} from '@jahia/react-material';
import requirementsAction from './requirementsAction';
import {reduxAction} from './reduxAction';
import {onFilesSelected} from '../ContentRoute/ContentLayout/Upload/Upload.utils';
import {setPath} from '../ContentRoute/ContentLayout/Upload/Upload.redux-actions';

export default composeActions(requirementsAction, reduxAction(null, dispatch => ({dispatchBatch: actions => dispatch(batchActions(actions))})), {
    init: context => {
        context.initRequirements({
        });
        let element = document.getElementById('file-upload-input-' + context.key);
        if (element !== null) {
            element.remove();
        }

        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        if (context.uploadType !== 'replaceWith') {
            input.setAttribute('multiple', 'true');
        }

        input.setAttribute('id', 'file-upload-input-' + context.key);
        document.body.appendChild(input);
        input.addEventListener('change', e => {
            setPath(context.path);
            onFilesSelected(
                [...e.target.files],
                context.dispatchBatch,
                {path: context.path},
                context.uploadType
            );
        });
    },

    onClick: context => {
        let input = document.getElementById('file-upload-input-' + context.key);
        input.click();
    }
});
