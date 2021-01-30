const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

export const REMOTE_BANK_API = CORS_PROXY + "https://lifeblood-bloodbank.herokuapp.com/api"
export const REMOTE_ACCOUNTS_API = CORS_PROXY + "https://lifeblood-accounts.herokuapp.com/api"

export const LOCAL_BLOOD_BANK_API = "http://localhost:5001/api"
export const LOCAL_ACCOUNT_SERVICE_API = "http://localhost:4200/accounts"

export const BLOOD_BANK_API = REMOTE_BANK_API
export const ACCOUNT_SERVICE_API = REMOTE_ACCOUNTS_API
