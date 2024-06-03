function generateSlug(value) {
    return value.toLowerCase().split(" ").join('-');
}

module.exports = generateSlug
