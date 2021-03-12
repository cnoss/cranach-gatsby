import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from '~/i18n';

import Btn from '~/components/atoms/btn';
import TextInput from '~/components/atoms/text-input';
import Accordion from '~/components/molecules/accordion';

import translations from './translations.json';
import './search-sidebar.scss';

import StoreContext from '~/store/StoreContext';

const SearchSidebar = () => {
  const { t } = useTranslation('SearchSidebar', translations);
  const { globalSearch } = useContext(StoreContext);

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
      <fieldset className="block">
        <legend className="headline">{ t('Search archive') }</legend>

        <TextInput
          className="search-input"
          label={ t('all Fields') }
          value={ globalSearch.allFieldsTerm }
          onChange={ term => globalSearch.searchForAllFieldsTerm(term) }
        ></TextInput>

        <TextInput
          className="search-input"
          label={ t('Title') }
          value={ title[0] }
          onChange={ title[1] }
        ></TextInput>

        <TextInput
          className="search-input"
          label={ t('{{catalogWorkReferenceNames}} No.', { catalogWorkReferenceNames }) } value={ catalogWorkReferenceNumber[0] }
          onChange={ catalogWorkReferenceNumber[1] }
        ></TextInput>

        <TextInput
          className="search-input"
          label={ t('Location') }
          value={ location[0] }
          onChange={ location[1] }
        ></TextInput>

        <TextInput
          className="search-input"
          label={ t('CDA ID / Inventorynumber') }
          value={ cdaIDInventorynumber[0] }
          onChange={ cdaIDInventorynumber[1] }
        ></TextInput>

        <Btn className="search-button">{ t('find') }</Btn>
      </fieldset>


      <fieldset className="block">
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
          </Accordion.Entry>
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

export default observer(SearchSidebar);
