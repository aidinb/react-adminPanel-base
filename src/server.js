import skygear from 'skygear';
skygear.config({
  'endPoint': 'http://0.0.0.0:3000', // trailing slash is required
  'apiKey': 'apikey',
}).then(() => {
  console.log('skygear container is now ready for making API calls.');
}, (error) => {
  console.error(error);
});

export default skygear;
