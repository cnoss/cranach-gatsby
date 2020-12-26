import cranachCfg from '~/cranach.config';

const { imageServer } = cranachCfg;
const imageServerBaseUrl = `${imageServer.urlJson}${imageServer.prefixes.graphics}`;
const getTypes = data => Object.keys(data).filter(key => key !== 'representative');

const fetchHeaders = { 'x-api-key': 'UgBtfP98rU', 'cache-control': 'no-cache' };

const images = inventoryNumber => fetch(`${imageServerBaseUrl}${inventoryNumber}`, { headers: fetchHeaders })
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
          imgData.srcXl = `${imageServer.urlImages}/G_${inventoryNumber}/${image.xl.path}/${image.xl.src}`;
          imgData.srcL = `${imageServer.urlImages}/G_${inventoryNumber}/${image.l.path}/${image.l.src}`;
          imgData.srcXs = `${imageServer.urlImages}/G_${inventoryNumber}/${image.xs.path}/${image.xs.src}`;
          imgData.altText = type;
          imageSources.push(imgData);
          return null;
        });
      }
      return null;
    });
    return imageSources;
  });

export default {
  getArtefaktImages({ inventoryNumber }) {
    return images(inventoryNumber);
  },
};
