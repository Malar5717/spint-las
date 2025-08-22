require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// map 3-LETTER codes wuth 2-letter codes
const countryMapping = {
  'AFG': 'af', 'ALB': 'al', 'DZA': 'dz', 'AND': 'ad', 'AGO': 'ao',
  'ARG': 'ar', 'ARM': 'am', 'AUS': 'au', 'AUT': 'at', 'AZE': 'az',
  'BHS': 'bs', 'BHR': 'bh', 'BGD': 'bd', 'BRB': 'bb', 'BLR': 'by',
  'BEL': 'be', 'BLZ': 'bz', 'BEN': 'bj', 'BTN': 'bt', 'BOL': 'bo',
  'BIH': 'ba', 'BWA': 'bw', 'BRA': 'br', 'BRN': 'bn', 'BGR': 'bg',
  'BFA': 'bf', 'BDI': 'bi', 'KHM': 'kh', 'CMR': 'cm', 'CAN': 'ca',
  'CPV': 'cv', 'CAF': 'cf', 'TCD': 'td', 'CHL': 'cl', 'CHN': 'cn',
  'COL': 'co', 'COM': 'km', 'COG': 'cg', 'COD': 'cd', 'CRI': 'cr',
  'CIV': 'ci', 'HRV': 'hr', 'CUB': 'cu', 'CYP': 'cy', 'CZE': 'cz',
  'DNK': 'dk', 'DJI': 'dj', 'DMA': 'dm', 'DOM': 'do', 'ECU': 'ec',
  'EGY': 'eg', 'SLV': 'sv', 'GNQ': 'gq', 'ERI': 'er', 'EST': 'ee',
  'ETH': 'et', 'FJI': 'fj', 'FIN': 'fi', 'FRA': 'fr', 'GAB': 'ga',
  'GMB': 'gm', 'GEO': 'ge', 'DEU': 'de', 'GHA': 'gh', 'GRC': 'gr',
  'GRD': 'gd', 'GTM': 'gt', 'GIN': 'gn', 'GNB': 'gw', 'GUY': 'gy',
  'HTI': 'ht', 'HND': 'hn', 'HUN': 'hu', 'ISL': 'is', 'IND': 'in',
  'IDN': 'id', 'IRN': 'ir', 'IRQ': 'iq', 'IRL': 'ie', 'ISR': 'il',
  'ITA': 'it', 'JAM': 'jm', 'JPN': 'jp', 'JOR': 'jo', 'KAZ': 'kz',
  'KEN': 'ke', 'KIR': 'ki', 'PRK': 'kp', 'KOR': 'kr', 'KWT': 'kw',
  'KGZ': 'kg', 'LAO': 'la', 'LVA': 'lv', 'LBN': 'lb', 'LSO': 'ls',
  'LBR': 'lr', 'LBY': 'ly', 'LIE': 'li', 'LTU': 'lt', 'LUX': 'lu',
  'MKD': 'mk', 'MDG': 'mg', 'MWI': 'mw', 'MYS': 'my', 'MDV': 'mv',
  'MLI': 'ml', 'MLT': 'mt', 'MHL': 'mh', 'MRT': 'mr', 'MUS': 'mu',
  'MEX': 'mx', 'FSM': 'fm', 'MDA': 'md', 'MCO': 'mc', 'MNG': 'mn',
  'MNE': 'me', 'MAR': 'ma', 'MOZ': 'mz', 'MMR': 'mm', 'NAM': 'na',
  'NRU': 'nr', 'NPL': 'np', 'NLD': 'nl', 'NZL': 'nz', 'NIC': 'ni',
  'NER': 'ne', 'NGA': 'ng', 'NOR': 'no', 'OMN': 'om', 'PAK': 'pk',
  'PLW': 'pw', 'PSE': 'ps', 'PAN': 'pa', 'PNG': 'pg', 'PRY': 'py',
  'PER': 'pe', 'PHL': 'ph', 'POL': 'pl', 'PRT': 'pt', 'QAT': 'qa',
  'ROU': 'ro', 'RUS': 'ru', 'RWA': 'rw', 'KNA': 'kn', 'LCA': 'lc',
  'VCT': 'vc', 'WSM': 'ws', 'SMR': 'sm', 'STP': 'st', 'SAU': 'sa',
  'SEN': 'sn', 'SRB': 'rs', 'SYC': 'sc', 'SLE': 'sl', 'SGP': 'sg',
  'SVK': 'sk', 'SVN': 'si', 'SLB': 'sb', 'SOM': 'so', 'ZAF': 'za',
  'SSD': 'ss', 'ESP': 'es', 'LKA': 'lk', 'SDN': 'sd', 'SUR': 'sr',
  'SWZ': 'sz', 'SWE': 'se', 'CHE': 'ch', 'SYR': 'sy', 'TWN': 'tw',
  'TJK': 'tj', 'TZA': 'tz', 'THA': 'th', 'TLS': 'tl', 'TGO': 'tg',
  'TON': 'to', 'TTO': 'tt', 'TUN': 'tn', 'TUR': 'tr', 'TKM': 'tm',
  'TUV': 'tv', 'UGA': 'ug', 'UKR': 'ua', 'ARE': 'ae', 'GBR': 'gb',
  'USA': 'us', 'URY': 'uy', 'UZB': 'uz', 'VUT': 'vu', 'VEN': 've',
  'VNM': 'vn', 'YEM': 'ye', 'ZMB': 'zm', 'ZWE': 'zw'
};

// sending a GET request to gnews.io 
app.get('/news', async (req, res) => {
  try {
    const { country, category = 'general' } = req.query;

    if (!country) {
      return res.status(400).json({ success: false, error: 'country param required' });
    }

    const countryCode = countryMapping[country];
    if (!countryCode) {
      return res.status(400).json({ success: false, error: 'what? country ra' });
    }

    const apiUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${countryCode}&max=10&apikey=${process.env.GNEWS_API_KEY}`;
    const apiResponse = await fetch(apiUrl);
    
    if(!apiResponse) {
      console.error(error);
    }

    const news = await apiResponse.json();

    if(!news.articles || news.articles.length === 0) {
      console.warn("no news found");
      return res.json({ success: true, country: country, articles: [] });
    }
    
    res.json({
      success: true,
      country: country,
      articles: news.articles
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'failed to fetch news' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});