export default async function handler(req, res) {
  const { cc, month, year, cvv } = req.query;

  if (!cc || !month || !year || !cvv) {
    return res.status(400).json({ error: 'Eksik kart bilgisi' });
  }

  const url = `https://checkout-gw.prod.ticimax.net/payments/9/card-point?cc=${cc}&month=${month}&year=${year}&cvv=${cvv}&lid=45542`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://www.ticimax.com',
        'Origin': 'https://www.ticimax.com',
        'X-Domain-Name': 'ticimax.com'
      }
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'İstek sırasında hata oluştu', details: error.message });
  }
}
