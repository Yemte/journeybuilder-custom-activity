const { v1: Uuidv1 } = require('uuid');
const JWT = require('../utils/jwtDecoder');
const SFClient = require('../utils/sfmc-client');
const logger = require('../utils/logger');
const encrypt = require('../utils/encrypt')

/**
 * The Journey Builder calls this method for each contact processed by the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.execute = async (req, res) => {
  // decode data
  const data = JWT(req.body);

  logger.info(data);

  try {
    const id = Uuidv1();
    const amount = data.inArguments[0].Amount;
    const fname = data.inArguments[0].Firstname; 
    const lname= data.inArguments[0].Lastname;
    const rluid= data.inArguments[0].RelationUid;

    const jsnob = {
        "amount":{"amount":amount,"currencyCode":"EUR"},
        "customer":{"firstName": fname,"lastName":lname,"relationUid":rluid}
       /* "language":language,
        "productInfo":{"productCode":pcode,"productUid":puid,"referenceNumber":loanId},
        "tracking":{"countryCode":cc,"entityUid":entity}*/
        }

      const jsntext = JSON.stringify(jsnob)
 
      const entxt= encrypt.encryptdjsn(jsntext);

    await SFClient.saveData(process.env.DATA_EXTENSION_EXTERNAL_KEY, [
      {
        keys: {
          Id: id,
          dmCustomerID : data.inArguments[0].contactKey,
        },
        values: {
          encryptedText: entxt,
        },
      },
    ]);
  } catch (error) {
    logger.error(error);
  }

  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user saves the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.save = async (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};

/**
 *  Endpoint that receives a notification when a user publishes the journey.
 * @param req
 * @param res
 */
exports.publish = (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user performs
 * some validation as part of the publishing process.
 * @param req
 * @param res
 */
exports.validate = (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};
