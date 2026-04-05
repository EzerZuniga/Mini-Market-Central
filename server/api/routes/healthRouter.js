const express = require('express');

function createHealthRouter({ environment }) {
  const router = express.Router();

  router.get('/', (_request, response) => {
    response.json({
      ok: true,
      provider: 'paypal + metodos_locales_peru',
      environment
    });
  });

  return router;
}

module.exports = {
  createHealthRouter
};
