enum SimpleLanguageCodes {
  EN = 'en',
  FR = 'fr'
}

const language:string = 'en'

const message:string = (language === SimpleLanguageCodes.EN ? "english" : "french")

console.log(message)
