export default {
  install: (app, option) => {
    app.config.globalProperties.$currency = (value, currency = 'UAH') => {
      return new Intl.NumberFormat('ru-RU',{
        style: 'currency',
        currency
      }).format(value)
    }
  }
}

