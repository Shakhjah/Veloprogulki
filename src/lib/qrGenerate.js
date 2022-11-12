const qr = require('qrcode');

module.exports = async function qrGenerate(link) {
  const dataJson = JSON.stringify(link);
  const generateQR = async (data) => {
    try {
      return await qr.toDataURL(data);
    } catch (err) {
      console.error(err);
    }
  };
  const codeJson = await generateQR(dataJson);
  return codeJson;
};
