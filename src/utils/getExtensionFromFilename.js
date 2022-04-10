export default fileName => {
  let language = 'text',
    extension,
    tokens = fileName.split('.');

  if (tokens.length === 1) return language;
  if (tokens.length > 1) extension = tokens[tokens.length-1];

  switch (extension) {
    case 'js':
      language = 'javascript';
      break;
    case 'ts':
      language = 'typescript';
      break;
    case 'py':
      language = 'python';
      break;
    case 'java':
      language = 'java';
      break;
    case 'go':
      language = 'go';
      break;
    case 'html':
      language = 'html';
      break;
    case 'json':
      language = 'json';
      break;
    case 'png':
      language = 'NotSupported';
      break;
    case 'jpeg':
      language = 'NotSupported';
      break;
    case 'jpg':
      language = 'NotSupported';
      break;
    case 'ico':
      language = 'NotSupported';
      break;
    case 'scss':
      language = 'scss';
      break;
    case 'css':
      language = 'css';
      break;
    case 'svg':
      language = 'NotSupported';
      break;
    default:
      language = 'text'
  }

  return language;
}