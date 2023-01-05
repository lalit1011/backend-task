const crypto = require('crypto');
const resizedIV = Buffer.allocUnsafe(16);
const iv = crypto
	.createHash("sha256")
	.update(process.env.CRYPTO_KEY)
	.digest();

iv.copy(resizedIV);

const key = crypto
	.createHash("sha256")
	.update(process.env.CRYPTO_KEY)
	.digest();

exports.generateToken = () => {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(20, (err, buf) => {
			if (err) { reject(err) } else {
				resolve(buf.toString('hex'))
			}
		})
	})
}

exports.md5Hash = (string) => {
	let updatedString = string

	if (string) {
		updatedString = updatedString.trim().toLowerCase()
		updatedString = crypto.createHash('md5').update(updatedString).digest('hex');
	}

	return updatedString
}

exports.hmacHashCipher = (string) => {
	const cipher = crypto.createCipheriv('aes256', key, resizedIV);
	let encrypted = cipher.update(string, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}


exports.hmacHashDecipher = (string) => {

	const decipher = crypto.createDecipheriv('aes256', key, resizedIV);
	let decrypted = decipher.update(string, 'hex', 'utf8')
	decrypted += decipher.final('utf8');
	return decrypted;
}