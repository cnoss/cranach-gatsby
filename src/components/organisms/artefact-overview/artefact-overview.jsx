import React from 'react';

import Switcher from '~/components/atoms/switcher';
import ArtefactCard from '~/components/molecules/artefact-card';
import ArtefactLine from '~/components/molecules/artefact-line';

import './artefact-overview.scss';

const CardView = {
  type: 'card',
  icon: 'view_column',
};

const CardSmallView = {
  type: 'card-small',
  icon: 'view_module',
};

const ListView = {
  type: 'list',
  icon: 'view_list',
};

const SupportedViews = [
  CardView,
  CardSmallView,
  ListView,
];

const DefaultView = CardView;

const ArtefactOverview = ({
  items = [],
  view = DefaultView,
}) => (
    <div
      className="artefact-overview"
      data-component="organisms/artefact-overview"
      data-active-view={ view.type }
    >
    {
        items.map((item) => (<div
          key={ item.inventoryNumber }
          className="overview-item"
          data-src={JSON.stringify(item)}
        >
        { CardView === view && <ArtefactCard
            title={ item.titleShort }
            subtitle={ item.subtitle }
            date={ item.date }
            to={item.to}
            classification={item.classification}
            imgSrc={ item.imgSrc }
          />
        }

          { CardSmallView === view && <ArtefactCard
            to={ item.to }
            imgSrc={ item.imgSrc }
          />
          }

        { ListView === view && <ArtefactLine
            title={ item.title }
            subtitle={ item.subtitle }
            date={item.date}
            masterData={item.masterData}
            classification={item.classification}
            to={ item.to }
            imgSrc={ item.imgSrc }
          />
        }
        </div>
        ))
    }
  </div>
);

ArtefactOverview.Switcher = ({
  view = DefaultView,
  handleChange = () => {},
}) => (
  <Switcher className="artefact-overview-switcher" >
    { SupportedViews.map((currentView) => (
      <Switcher.Item
        key={ currentView.type }
      >
        <i
          className={ `material-icons artefact-overview-switcher-item-icon ${(currentView === view) ? 'is-active' : ''}` }
          onClick={ () => handleChange(currentView) }
        >{ currentView.icon }</i>
      </Switcher.Item>
    )) }
  </Switcher>
);

ArtefactOverview.DefaultView = DefaultView;

export default ArtefactOverview;
