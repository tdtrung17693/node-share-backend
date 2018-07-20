import sgMail from '@sendgrid/mail'
import mailerConfig from '../config/mailer'

export function sendDownloadLink (from, to, message, invitationLink) {
    // setup email data with unicode symbols
    const msg = {
        to,
        from,
        subject: '[TEILEN] Die Download-Einladung',
        html: `<p>${from} hat Dateien mit Ihnen geteilt. Besuchen Sie <a href="${invitationLink}">diesen Link</a>, um sie anzuzeigen.</p><p>${message || ""}</p>`
    }
    sgMail.setApiKey(mailerConfig.apiKey)

    return new Promise((resolve, reject) => {
        resolve(sgMail.send(msg))
    })
}
