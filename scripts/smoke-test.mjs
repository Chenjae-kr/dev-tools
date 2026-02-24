#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

const errors = [];
const warns = [];

function ok(msg){ console.log(`✅ ${msg}`); }
function fail(msg){ errors.push(msg); console.log(`❌ ${msg}`); }
function warn(msg){ warns.push(msg); console.log(`⚠️  ${msg}`); }

// 1) tools.js href registry sanity
const toolsJs = read('tools.js');
const hrefMatches = [...toolsJs.matchAll(/href:\s*'([^']+)'/g)].map(m => m[1]);
if (!hrefMatches.length) fail('tools.js: href 항목을 찾지 못했습니다.');
else ok(`tools.js href ${hrefMatches.length}개 발견`);

for (const href of hrefMatches) {
  const full = path.join('tools', href);
  if (!exists(full)) fail(`등록된 툴 파일 누락: ${full}`);
}
ok('등록된 tools.js href 파일 존재 확인 완료');

// 2) tool html conventions
const toolFiles = fs.readdirSync(path.join(root, 'tools'), { recursive: true })
  .filter(f => String(f).endsWith('.html'))
  .map(f => path.join('tools', String(f)));

for (const file of toolFiles) {
  const html = read(file);
  const isRedirectOnly = file.endsWith('md-to-insert.html');

  if (!isRedirectOnly) {
    if (!html.includes('tools.js')) fail(`${file}: tools.js 로드 누락`);
    if (!html.includes('nav.js')) fail(`${file}: nav.js 로드 누락`);
    if (!html.includes('renderNav()')) fail(`${file}: renderNav() 호출 누락`);
    if (!html.includes('tool-header')) warn(`${file}: .tool-header 미검출(헤더 자동동기화 대상 아님)`);
  }

  const htmlWithoutScripts = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  if (/style\s*=\s*"/i.test(htmlWithoutScripts) || /style\s*=\s*'/i.test(htmlWithoutScripts)) {
    fail(`${file}: inline style 속성 검출(정적 마크업)`);
  }
}
ok(`tools/**/*.html ${toolFiles.length}개 점검 완료`);

// 3) index/nav basic checks
const indexHtml = read('index.html');
if (!indexHtml.includes('toolSearch')) fail('index.html: 검색 UI 누락');
if (!indexHtml.includes('catChips')) fail('index.html: 카테고리 칩 UI 누락');
if (!indexHtml.includes('toolsGroups')) fail('index.html: toolsGroups 컨테이너 누락');
ok('index 기본 UI 체크 완료');

const navJs = read('nav.js');
if (!navJs.includes('syncToolHeaderFromRegistry')) fail('nav.js: 헤더 동기화 함수 누락');
if (!navJs.includes('to-top-btn')) fail('nav.js: 맨위로 버튼 로직 누락');
ok('nav 기본 기능 체크 완료');

console.log('\n──────── Smoke Test Summary ────────');
if (warns.length) console.log(`Warnings: ${warns.length}`);
if (errors.length) {
  console.log(`Errors: ${errors.length}`);
  process.exit(1);
}
console.log('All checks passed.');
