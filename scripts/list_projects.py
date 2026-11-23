import re

with open('src/data/projects.ts', encoding='utf-8') as f:
    text = f.read()

pattern = r'slug:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?period:\s*\{\s*start:\s*"([^"]+)"(?:,\s*end:\s*"([^"]+)")?\s*\}'
matches = re.findall(pattern, text)
for i, m in enumerate(matches, 1):
    print(f'{i}. slug: {m[0]:<16} category: {m[1]:<10} start: {m[2]:<8} end: {m[3]}')
