const shortsqueeze = require('shortsqueeze')
const nakedshort = require('nakedshort')
const finvizor = require('finvizor')
const tinkoff = require('./tinkoffstocks')

const getStockData = async (ticker = '') => {
    const squeeze = await shortsqueeze(ticker),
        naked = await nakedshort(ticker),
        fin = await finvizor.stock(ticker),
        targetUpside = (fin.targetPrice != null && fin.price != null) ? ((fin.targetPrice / fin.price - 1) * 100).toFixed(1) : null
    return {
        resp_name: fin.name,
        resp_price: fin.price,
        resp_pe: fin.pe,
        resp_ps: fin.ps,
        resp_roe: fin.roe,
        resp_roa: fin.roa,
        resp_debteq: fin.debtEq,
        resp_naked: naked.nakedShortPercent,
        resp_squeeze: squeeze.shortPercentOfFloat,
        resp_finviz: fin.shortFloat,
        resp_tinkoff: tinkoff.isTinkoff(ticker),
        resp_finviz_target: targetUpside,
        resp_finviz_rsi: fin.rsi,
        resp_finviz_recom: fin.recom.toFixed(1),
        resp_site: fin.site
    }
}

module.exports = getStockData