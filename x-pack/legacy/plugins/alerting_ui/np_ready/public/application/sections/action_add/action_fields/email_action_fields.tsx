/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { Fragment } from 'react';

import { EuiComboBox, EuiFieldText, EuiFormRow, EuiTextArea } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { ErrableFormRow } from '../../../components/page_error';
import { Action } from '../../../lib/api';

interface Props {
  action: Action;
  errors: { [key: string]: string[] };
  hasErrors: boolean;
}

export const EmailActionFields: React.FunctionComponent<Props> = ({
  action,
  errors,
  hasErrors,
}) => {
  const { to, subject, body }: any = action.config;
  const toOptions = to ? to.map((label: any) => ({ label })) : [];

  return (
    <Fragment>
      <ErrableFormRow
        id="emailRecipient"
        errorKey="to"
        fullWidth
        errors={errors}
        isShowingErrors={hasErrors && to !== undefined}
        label={i18n.translate(
          'xpack.alertingUI.sections.actionAdd.emailAction.recipientTextFieldLabel',
          {
            defaultMessage: 'To email address',
          }
        )}
      >
        <EuiComboBox
          noSuggestions
          fullWidth
          data-test-subj="toEmailAddressInput"
          selectedOptions={toOptions}
          onCreateOption={(searchValue: string) => {
            const newOptions = [...toOptions, { label: searchValue }];
            // editAction({ key: 'to', value: newOptions.map(newOption => newOption.label) });
          }}
          onChange={(selectedOptions: Array<{ label: string }>) => {
            /* editAction({
              key: 'to',
              value: selectedOptions.map(selectedOption => selectedOption.label),
            }); */
          }}
          onBlur={() => {
            if (!to) {
              /* editAction({
                key: 'to',
                value: [],
              }); */
            }
          }}
        />
      </ErrableFormRow>

      <EuiFormRow
        fullWidth
        label={i18n.translate(
          'xpack.alertingUI.sections.actionAdd.emailAction.subjectTextFieldLabel',
          {
            defaultMessage: 'Subject (optional)',
          }
        )}
      >
        <EuiFieldText
          fullWidth
          name="subject"
          data-test-subj="emailSubjectInput"
          value={subject || ''}
          onChange={e => {
            // editAction({ key: 'subject', value: e.target.value });
          }}
        />
      </EuiFormRow>

      <EuiFormRow
        fullWidth
        label={i18n.translate(
          'xpack.alertingUI.sections.actionAdd.emailAction.bodyTextAreaFieldLabel',
          {
            defaultMessage: 'Body',
          }
        )}
      >
        <EuiTextArea
          fullWidth
          value={body || ''}
          name="body"
          data-test-subj="emailBodyInput"
          onChange={e => {
            // editAction({ key: 'body', value: e.target.value });
          }}
        />
      </EuiFormRow>
    </Fragment>
  );
};
