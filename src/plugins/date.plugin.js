export default {
  install: (app, options) => {
    app.config.globalProperties.$date = (value, format = 'date') => {
      return NormalizeDate(value, format)
    }
  }
}

export const NormalizeDate = (value, format = 'date') => {
  const options = {

  }

  if(format.includes('date')){
      options.day = '2-digit'
      options.month = 'long'
      options.year = 'numeric'
  }

  if(format.includes('time')){
      options.hour = '2-digit'
      options.minute = '2-digit'
      options.second = '2-digit'
  }

  return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(value))
}

