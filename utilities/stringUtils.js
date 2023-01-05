
module.exports.validateEmail = (email) => {
  try {
    // validation without +1 email
    // return /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/i.test(email);

    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email);
  } catch (e) {
    console.warn(e);
    return false;
  }
};

module.exports.checkNumber = (number) => {
  try {
    return !isNaN(number);
  } catch (e) {
    return false;
  }
};

module.exports.checkURL = (url) => {
  const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regex.test(url);
};

module.exports.validName = (name) => {
  const regex = /^[a-zA-Z0-9_\s-]*$/g;
  return regex.test(name);
};

module.exports.filterObject = (subject, keys) => {
	const matchingKeys = Object.keys(subject).filter(k => keys.indexOf(k) !== -1)
	const matchingObject = {}
	matchingKeys.map(mk => matchingObject[mk] = subject[mk])

	return matchingObject
}

module.exports.slugify = (subject) => {
	return subject.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '')             // Trim - from end of text
}

module.exports.capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
