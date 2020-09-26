import React, { useState } from 'react';
import { useTranslation } from '~/i18n';

import Btn from '~/components/atoms/btn';
import TextInput from '~/components/atoms/text-input';
import Accordion from '~/components/molecules/accordion';

import translations from './translations.json';
import './search-sidebar.scss';

export default () => {
  const { t } = useTranslation('SearchSidebar', translations);

  const allFields = useState('*');
  const title = useState('*');
  const catalogWorkReferenceNumber = useState('*');
  const location = useState('*');
  const cdaIDInventorynumber = useState('*');
  const catalogWorkReferenceNames = 'Friedländer, Rosenberg (1978)';

  return (
    <div
      className="search-sidebar"
      data-component="organisms/search-sidebar"
    >
      <fieldset class="block">
        <legend className="headline">{ t('Search archive') }</legend>

        <TextInput className="search-input" label={ t('all fields') } value={ allFields }></TextInput>

        <TextInput className="search-input" label={ t('Title') } value={ title }></TextInput>

        <TextInput className="search-input" label={ t('{{catalogWorkReferenceNames}} No.', { catalogWorkReferenceNames }) } value={ catalogWorkReferenceNumber }></TextInput>

        <TextInput className="search-input" label={ t('Location') } value={ location }></TextInput>

        <TextInput className="search-input" label={ t('CDA ID / Inventorynumber') } value={ cdaIDInventorynumber }></TextInput>

        <Btn className="search-button">{ t('find') }</Btn>
      </fieldset>


      <fieldset class="block">
        <legend className="headline">{ t('Filter results by') }</legend>

        <Accordion>
          <Accordion.Entry title={ t('Attribution') } toggle={ useState(false) }>
            Attribution
          </Accordion.Entry>
          <Accordion.Entry title={ t('Kind') } toggle={ useState(false) }>
            Kind
          </Accordion.Entry>
          <Accordion.Entry title={ t('Dating') } toggle={ useState(false) }>
            Dating
          </Accordion.Entry>
          <Accordion.Entry title={ t('Collection / Location') } toggle={ useState(false) }>
            Collection / Location
          </Accordion.Entry>
          <Accordion.Entry title={ t('Examination Techniques') } toggle={ useState(false) }>
            Examination Techniques
          </Accordion.Entry>
          <Accordion.Entry title={ t('Content') } toggle={ useState(false) }>
            Content
          </Accordion.Entry>,
          <Accordion.Entry title={ t('Form') } toggle={ useState(false) }>
            Form
          </Accordion.Entry>
          <Accordion.Entry title={ t('Function') } toggle={ useState(false) }>
            Function
          </Accordion.Entry>
          <Accordion.Entry title={ t('Constituents') } toggle={ useState(false) }>
            Constituents
          </Accordion.Entry>
        </Accordion>
      </fieldset>
    </div>
  );
};
