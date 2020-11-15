import React from 'react';
import Async from 'react-async';
import cranachCfg from '~/cranach.config';

// import Link from '~/components/atoms/link';
// import Image from '~/components/atoms/image';

import './image-stripe.scss';

const { imageServer } = cranachCfg;
const imageServerBaseUrl = `${imageServer.urlJson}/${imageServer.prefixes.graphics}`;

// const { imageServer } = cranachCfg;
const getTypes = data => Object.keys(data).filter(key => key !== 'representative');

const images = ({ inventoryNumber }) => fetch(`${imageServerBaseUrl}${inventoryNumber}/${imageServer.filenameJson}`)
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json())
  .then((res) => {
    const imageSources = [];
    const jsonData = res.imageStack;
    const types = getTypes(jsonData);
    types.map((type) => {
      if (jsonData[type].images.length > 0) {
        jsonData[type].images.map((image) => {
          const imgData = {};
          imgData.srcL = `${imageServer.urlImages}/G_${inventoryNumber}/${image.xs.path}/${image.l.src}`;
          imgData.srcXs = `${imageServer.urlImages}/G_${inventoryNumber}/${image.xs.path}/${image.xs.src}`;
          imgData.altText = type;
          imageSources.push(imgData);
          return true;
        });
      }
      return true;
    });
    return imageSources;
  });


export default ({
  inventoryNumber,
}) => (<div
  className="image-stripe"
  data-component="molecules/image-stripe"
>
    <Async promiseFn={images} inventoryNumber={inventoryNumber}>
    <Async.Loading>Loading...</Async.Loading>
    <Async.Fulfilled>
    {data => (
  <ul class="image-stripe-list">
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
