export function genstr(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export function rot13(str) {
  const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const shift = 13;
  
  return str.split('').map(char => {
    const index = base64chars.indexOf(char);
    if (index === -1) {
      return char;
    }
    
    const newIndex = (index + shift) % base64chars.length;
    return base64chars[newIndex];
  }).join('');
}

export function rotC(str, len) {
  const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const shift = Number(len);
  
  return str.split('').map(char => {
    const index = base64chars.indexOf(char);
    if (index === -1) {
      return char;
    }
    
    const newIndex = (index + shift) % base64chars.length;
    return base64chars[newIndex];
  }).join('');
}

export function rot1327(str) {
  const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const shift = 13;
  const shift2 = 27
  
  const times = Math.floor(Date.now());
  
  return str.split('').map(char => {
    const index = base64chars.indexOf(char);
    if (index === -1) {
      return char;
    }
    
    let newIndex
    if((times % 2) == 0) {
      newIndex = (index + shift) % base64chars.length;
    } else {
      newIndex = (index + shift2) % base64chars.length;
    }
    return base64chars[newIndex];
    }).join('');
}

export function web2base(message) {
  if(typeof message !== "string") {
    throw new Error("Message is have to be string")
  }
  message = btoa(message)
  let str = message.split("")
  let result = []
  for(let i = 0; i < str.length; i++) {
    let code = str[i].charCodeAt(0)
    let shift = code >> 1
    result.push(String.fromCharCode(shift))
  }
  return rot13(result.join(""))
}



export function web3base(message) {
  if(typeof message !== "string") {
    throw new Error("Message is have to be string")
  }
  message = btoa(message)
  let str = message.split("")
  let result = []
  for(let i = 0; i < str.length; i++) {
    let code = str[i].charCodeAt(0)
    let shift = code + 1
    result.push(String.fromCharCode(shift))
  }
  return rot1327(result.join(""))
}

export function web4base(message, key, localkey) {
  if(typeof message !== "string") {
    message = String(message)
  }
  
  if(typeof key !== "string") {
    key = String(key)
  }
  
  if(typeof localkey !== "string") {
    localkey = String(localkey)
  }
  
  if(key.length < 18) {
    throw new Error("Size(length) of key must be more than 18 characters")
  }
  
  if(localkey.length < 8) {
    throw new Error("Size(length) of local key must be more than 18 characters")
  }
  
  message = btoa(unescape(encodeURIComponent(message)))
  let str = message.split("")
  key = key.split("")
  let result = []
  let keyMod = 0;
  let lkey = btoa(localkey)
  lkey = lkey.split("")
  let lkeyMod = 0;
  for(let i = 0; i < lkey.length; i++){
    let code = lkey[i].charCodeAt(0)
    lkeyMod += (code ^ message.length) % (i + 2)
  }
  for(let i = 0; i < key.length; i++){
    let code = key[i].charCodeAt(0)
    keyMod += (code ^ message.length) % (i + 1)
    keyMod ^= lkeyMod
  }
  for(let i = 0; i < str.length; i++) {
    let code = str[i].charCodeAt(0)
    let shift = (code + 1) ^ keyMod
    result.push(String.fromCharCode(shift))
  }
  return rotC(result.join(""), message.length)
}
