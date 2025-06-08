export function genstr(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function genhex(length) {
    let result = '';
    let characters = 'abcdef0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export class openUID {
  constructor() {
    
  }
  async UIDv2() {
    let now = Date.now().toString(16)
    let str = genstr(8)
    const data = new TextEncoder().encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    let string = genstr(8)
    return `${now}-${hex}-${string}`
  }
  async UIDv3() {
    let now = Date.now()
    let str = genstr(8)
    const data = new TextEncoder().encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return `${now}-${hex}`
  }
  async UIDv4() {
    let str = genstr(4)
    const data = new TextEncoder().encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return `${genstr(12)}-${hex}`
  }
  UIDv5(len=4, timeInc=true) {
    if(timeInc === true) {
      let now = performance.now() * 10
      return `${genstr(len)}-${now}`
    }
    else {
      return `${genstr(len)}-${genstr(12)}`
    }
  }
  async UIDv6(len=12, timeInc=true) {
    if(timeInc === false) {
      let str = genstr(len)
      const data = new TextEncoder().encode(genstr(12))
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      return `${str}-${genhex(8)}-${hex}`
    } else {
      let str = genstr(len)
      let now = performance.now() * 10
      const data = new TextEncoder().encode(genstr(12))
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      return `${str}-${now.toString(16)}-${hex}`
    }
  }
}
