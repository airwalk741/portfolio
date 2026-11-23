import http from 'http';

http.get('http://localhost:3000/ko/projects', res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const titles = [...body.matchAll(/href="\/ko\/projects\/([^"]+)"/g)].map(m => m[1]);
    console.log('Ordered slugs on page:');
    titles.forEach((slug, i) => console.log(`${i+1}. ${slug}`));
  });
});
