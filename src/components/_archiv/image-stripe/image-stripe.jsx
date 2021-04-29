import React from 'react';
import Async from 'react-async';
import imageData from '~/libs/artefact-data';
import './image-stripe.scss';

export default ({
  inventoryNumber,
}) => (<div
  className="image-stripe"
  data-component="molecules/image-stripe"
>
    <Async promiseFn={imageData.getArtefaktImages} inventoryNumber={inventoryNumber}>
    <Async.Loading>Loading...</Async.Loading>
    <Async.Fulfilled>
    {data => (
  <ul className="image-stripe-list">
    {data.map(image => (
      <li key={image.srcXs} className="image-stripe-list__item">
          <img src={image.srcXs} alt={image.altText} />
      </li>
    ))}
  </ul>
    )}
    </Async.Fulfilled>
  <Async.Rejected>
    {error => `Something went wrong: ${error.message}`}
  </Async.Rejected>
  </Async>
</div >);
