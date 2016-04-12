export function domain (url) {
  var d
  // find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf('://') > -1) {
    d = url.split('/')[2]
  } else {
    d = url.split('/')[0]
  }

  // find & remove port number
  d = d.split(':')[0]

  return d
}
