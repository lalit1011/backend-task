const SendgridMail =  require('@sendgrid/mail')
const consolidate = require('consolidate')
const path = require('path')

const { EMT001_RESET_PASSWORD } = require('../constants/emailTemplate')

SendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

class EmailBuilder {
	static parseBody(view, data) {
		return new Promise((resolve, reject) => {
			const fileName = path.join(__dirname, '/../', view)
			consolidate.swig(fileName, data, (err, html) => err ? reject(err) : resolve(html))
		})
	}

	template
	to
	from
	subject
	data
	subjectData

	constructor(template, to, data, subjectData) {
		this.template = template
		this.to = to
		this.from = template.from
		this.subject = template.subject
		this.data = data
		this.subjectData = subjectData
	}

	setFrom(from) {
		this.from = from
	}

	setSubject(subject) {
		this.subject = subject
	}

	async send() {
		const { to, from, subject, template, data, subjectData } = this
		if (!to || to.length === 0) return
		
		let updatedSubject = subject
		
		if (subjectData) {
			Object.keys(subjectData).map(key => {
				updatedSubject = updatedSubject.replace(`{${key}}`, subjectData[key])
			})
		}
		try {
			const html = await EmailBuilder.parseBody(template.view, data)
			
				await SendgridMail.send({to, from: {email: from, name: template.name}, subject: updatedSubject, html})
		
		} catch (error) {
			console.log('failed to send email',error)
		}
	}
}

exports.EmailBuilder = EmailBuilder
exports.EmailClient = SendgridMail
