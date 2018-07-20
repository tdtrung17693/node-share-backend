import { sendDownloadLink } from '../src/libs/mailer'

sendDownloadLink('nodeshare@nodeshare.com', 'trungsuper@gmail.com', 'asdasd', 'asdasdasdasd')
    .then(console.log)
    .catch(console.error)