import cranachCfg from '~/cranach.config';

const { imageServer } = cranachCfg;
const imageServerBaseUrl = `${imageServer.urlJson}${imageServer.prefixes.graphics}`;

const fetchHeaders = { 'x-api-key': imageServer.imageDataApiKey, 'cache-control': 'no-cache' };
const images = (inventoryNumber) => fetch(`${imageServerBaseUrl}${inventoryNumber}`, { headers: fetchHeaders })
  .then((res) => (res.ok ? res : Promise.reject(res)))
  .then((res) => res.json())
  .then((res) => {
    const imageSources = [];
    const jsonData = res.imageStack;

    jsonData.map((type) => {
      if (jsonData[type].images.length > 0) {
        jsonData[type].images.map((image, index) => {
          const imgData = {};

          imgData.imageVariants = image;
          imgData.thumbnail = `${imageServer.urlImages}/${imageServer.prefixes.graphics}${inventoryNumber}/${image.small.path}/${image.small.src}`;
          imgData.altText = type;
          imgData.pathPrefix = `${imageServer.urlImages}/${imageServer.prefixes.graphics}${inventoryNumber}`;
          imgData.id = `${inventoryNumber}-${type}-${index}`;
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
