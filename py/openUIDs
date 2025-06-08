import time
import hashlib
import random
import string

def genstr(length):
  characters = string.ascii_letters + string.digits
  return ''.join(random.choice(characters) for _ in range(length))

def UIDv1():
 now = time.time()
 now = hex(int(now))
 str = genstr(8)
 encoded_string = str.encode('utf-8')
 md5_hasher = hashlib.md5()
 md5_hasher.update(encoded_string)
 hash = md5_hasher.hexdigest()
 return f'{now}-{hash}-{str}'
 
def UIDv2():
 now = time.time()
 now = hex(int(now))
 str = genstr(8)
 encoded_string = str.encode('utf-8')
 md5_hasher = hashlib.sha1()
 md5_hasher.update(encoded_string)
 hash = md5_hasher.hexdigest()
 string = genstr(8)
 return f'{now}-{hash}-{string}'
 
def UIDv3():
 now = int(time.time())
 str = genstr(6)
 encoded_string = str.encode('utf-8')
 md5_hasher = hashlib.sha1()
 md5_hasher.update(encoded_string)
 hash = md5_hasher.hexdigest()
 return f'{now}-{hash}'
 
def UIDv4():
 s = genstr(4)
 s = s.encode('utf-8')
 hasher = hashlib.sha1()
 hasher.update(s)
 hash = hasher.hexdigest()
 return f'{genstr(12)}-{hash}'
 
def UIDv5(len=4, timeInc=True):
 if(timeInc is True):
  now = time.time_ns()
  return f'{genstr(len)}-{int(now)}'
 else:
  return f'{genstr(len)}-{genstr(12)}'
  
def UIDv6(len=12, timeInc=True):
 if(timeInc is False):
  return f'{genstr(len)}-{int(genstr(8), 16)}-{hex(hashlib.sha256(genstr(12)))}'
 else:
  return f'{genstr(len)}-{hex(time.time_ns())}-{hashlib.sha256(genstr(6).encode("utf-8")).hexdigest()}'
