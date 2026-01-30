const bcrypt = require('bcrypt');

async function generateHash() {
    const password = 'Amoreton1988@'; 
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);
}

generateHash();